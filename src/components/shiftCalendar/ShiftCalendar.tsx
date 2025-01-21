import React, { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Avatar,
  Box,
  useTheme,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { startOfWeek, addDays, format, subWeeks, addWeeks } from "date-fns";
import "./ShiftCalendar.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Employee and Event types
interface Employee {
  id: string;
  name: string;
}

interface Event {
  id: string;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  title: string;
  hours: number;
}
// TODO if hourses of event are not nesessary then delete hourses and everythink related to it

// Generate a week (starting from Monday)
const generateWeekDates = (selectedDate: Date): Date[] => {
  const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start from Monday
  return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
};
const formatToISODate = (date: Date): string => {
  return date.toISOString().split("T")[0]; // Returns 'YYYY-MM-DD'
};
const ShiftCalendar: React.FC = () => {
  const theme = useTheme();
  const [employees, setEmployees] = useState<Employee[]>([
    { id: "1", name: "Jon Snow" },
    { id: "2", name: "Daenerys Targaryen" },
    { id: "3", name: "Arya Stark" },
    { id: "4", name: "Tyrion Lannister" },
    { id: "5", name: "Cersei Lannister" },
    { id: "6", name: "Sansa Stark" },
    { id: "7", name: "Bran Stark" },
    { id: "8", name: "Jaime Lannister" },
    { id: "9", name: "Brienne of Tarth" },
    { id: "10", name: "Sandor Clegane" },
  ]);
  const [events, setEvents] = useState<Event[]>([]);
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [addEmployeeModalOpen, setAddEmployeeModalOpen] = useState(false);
  const [newEmployeeName, setNewEmployeeName] = useState<string>("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [eventTitle, setEventTitle] = useState("");
  const [eventStartDate, setEventStartDate] = useState<string>("");
  const [eventEndDate, setEventEndDate] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Selected date for week
  const [eventHours, setEventHours] = useState<number>(0);
  // @ts-ignore
  const [dayNotes, setDayNotes] = useState<{ [date: string]: string }>({});

  const dates = generateWeekDates(selectedDate); // Generate week based on selected date

  const openEventModal = (employee: Employee, date: Date) => {
    setSelectedEmployee(employee);
    setEventStartDate(formatToISODate(date));
    setEventEndDate(formatToISODate(date));
    setAddEventModalOpen(true);
  };

  const handleAddEvent = () => {
    if (selectedEmployee && eventTitle && eventStartDate && eventEndDate && eventHours) {
      const startDate = new Date(eventStartDate);
      const endDate = new Date(eventEndDate);

      setEvents([
        ...events,
        {
          id: `${selectedEmployee.id}-${startDate.toISOString()}`,
          employeeId: selectedEmployee.id,
          startDate,
          endDate,
          title: eventTitle,
          hours: eventHours
        },
      ]);

      setAddEventModalOpen(false);
      setEventTitle("");
      setEventStartDate("");
      setEventEndDate("");
      setEventHours(0);
    }
  };

  // Open Add Employee Modal
  const openAddEmployeeModal = () => {
    setAddEmployeeModalOpen(true);
    // setTimeout(() => {
    //   document.getElementById("close-focus")?.focus();
    // }, 0);
  };

  // Handle adding a new employee
  const handleAddEmployee = () => {
    if (newEmployeeName.trim()) {
      setEmployees([
        ...employees,
        {
          id: (employees.length + 1).toString(), // Generate new ID
          name: newEmployeeName.trim(),
        },
      ]);
      setNewEmployeeName("");
      setAddEmployeeModalOpen(false);
    }
  };

  // Calculate Monday and Sunday of the current week
  const getWeekRange = (date: Date): string => {
    const monday = startOfWeek(date, { weekStartsOn: 1 }); // Start on Monday
    const sunday = addDays(monday, 6); // Add 6 days to get Sunday

    // Format the range as "20 - 26 January 2025"
    const start = format(monday, "d MMMM yyyy");
    const end = format(sunday, "d MMMM yyyy");

    // If the months are the same, avoid repeating the month name
    if (monday.getMonth() === sunday.getMonth()) {
      return `${monday.getDate()} - ${format(sunday, "d MMMM yyyy")}`;
    }

    return `${start} - ${end}`;
  };

  // Jump to previous week
  const handlePrevWeek = () => {
    setSelectedDate((prevDate) => subWeeks(prevDate, 1));
  };

  // Jump to next week
  const handleNextWeek = () => {
    setSelectedDate((prevDate) => addWeeks(prevDate, 1));
  };

  const handleTodayClick = () => {
    setSelectedDate(new Date()); // Reset to today's date
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const calculateWeeklyHours = () => {
    return events
      .filter(
        (event) =>
          event.startDate >= dates[0] &&
          event.endDate <= dates[6] &&
          event.title.toLowerCase() !== "vocation" &&
          event.title.toLowerCase() !== "sick leave"
      )
      .reduce((total, event) => total + event.hours, 0);
  };

  // Calculate total hours for all events for a specific employee in the week
  const calculateEmployeeHours = (employeeId: string): number => {
    return events
      .filter(
        (event) =>
          event.employeeId === employeeId &&
          event.startDate >= dates[0] &&
          event.endDate <= dates[6]
      )
      .reduce((total, event) => total + event.hours, 0);
  };

  // Get initials from the employee's name
  const getInitials = (name: string): string => {
    const nameParts = name.split(" ");
    const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
    return initials;
  };
  const isSameOrBetweenDates = (currentDate: Date, startDate: Date, endDate: Date): boolean => {
    const normalizedCurrent = currentDate.toDateString(); // Normalize current date
    const normalizedStart = startDate.toDateString(); // Normalize start date
    const normalizedEnd = endDate.toDateString(); // Normalize end date

    return (
      new Date(normalizedCurrent) >= new Date(normalizedStart) &&
      new Date(normalizedCurrent) <= new Date(normalizedEnd)
    );
  };

  // Handle note change
  const handleNoteChange = (date: Date, value: string) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    setDayNotes((prevNotes) => ({
      ...prevNotes,
      [formattedDate]: value,
    }));
  };

  return (
    <>
      {/* Week Selector */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTodayClick}
            style={{ marginLeft: "10px" }}
          >
            Today
          </Button>
          <IconButton onClick={handlePrevWeek} aria-label="Next week">
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleNextWeek} aria-label="Previous week">
            <ArrowForwardIosIcon />
          </IconButton>
          <DatePicker
            label={getWeekRange(selectedDate)}
            value={selectedDate}
            onChange={(newDate) => {
              if (newDate) setSelectedDate(newDate);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={openAddEmployeeModal}
            style={{ marginLeft: "10px" }}
          >
            Add Employee
          </Button>
        </Box>
      </LocalizationProvider>

      {/* Calendar */}
      <Grid container spacing={0} className="calendar" >
        {/* Header Row: Dates */}
        <Grid item xs={2}>
          <Box style={{
            padding: "10px",
            border: "1px solid #ddd",
            backgroundColor: "#f0f0f0",
          }}>
            <Typography
              variant="body1"
              align="center"
              style={{
                fontWeight: "bold",
              }}
            >
              Week: {calculateWeeklyHours()} hrs
            </Typography>
          </Box>
        </Grid>
        {dates.map((date) => (
          <Grid item xs={1.4} key={date.toISOString()} style={{
            border: "1px solid #ddd",
          }}>
            <Box style={{
              backgroundColor: isToday(date) ? theme.palette.secondary.main : "transparent",
              padding: "5px",
              borderRadius: isToday(date) ? "5px" : "0",
            }}>
              <Typography variant="subtitle1" align="center" fontWeight="bold"
                style={{
                  color: isToday(date) ? "white" : "black",

                }}>
                {date.toLocaleDateString("de-DE", { weekday: "short", day: "numeric" })}
              </Typography>
            </Box>
          </Grid>
        ))}

        {/* Day Notes Row */}
        <Grid item xs={2}>
          <Typography
            variant="body1"
            align="center"
            style={{
              backgroundColor: "#f0f0f0",
              fontWeight: "bold",
              padding: "10px",
              border: "1px solid #ddd",
            }}
          >
            Day Notes
          </Typography>
        </Grid>
        {dates.map((date) => (
          <Grid item xs={1.4} key={`${date.toISOString()}-notes`} style={{
            border: "1px solid #ddd",
          }}>
            <TextField
              fullWidth
              variant="standard"
              size="small"
              onChange={(e) => handleNoteChange(date, e.target.value)}
              InputProps={{
                disableUnderline: true, // Removes the underline completely
                sx: {
                  border: 'none', // No borders
                  padding: '0',   // No extra padding
                },
              }}
              sx={{
                height: '100%',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                border: 'none',
                transition: 'background-color 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            />
          </Grid>
        ))}

        {/* Employee Rows */}
        {employees.map((employee) => (
          <React.Fragment key={employee.id}>
            <Grid item xs={2}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  border: "1px solid #ddd",
                  backgroundColor: "#f7f7f7",
                }}
              >
                <Avatar
                  style={{
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    marginRight: "7px",
                  }}
                >
                  {getInitials(employee.name)}
                </Avatar>
                <Box style={{
                  display: "flex",
                  flexDirection: "column",
                }}>
                  <Typography variant="body1" fontWeight="bold">
                    {employee.name}
                  </Typography>
                  <Typography variant="body2">
                    {calculateEmployeeHours(employee.id)} hrs
                  </Typography>
                </Box>

              </Box>
            </Grid>
            {dates.map((date) => (
              <Grid
                item
                xs={1.4}
                key={`${employee.id}-${date.toISOString()}`}
                style={{
                  border: "1px solid #ddd",
                  textAlign: "center",
                  cursor: "pointer",
                  padding: "10px",
                }}
                onClick={() => openEventModal(employee, date)}
              >
                {events
                  .filter(
                    (event) =>
                      event.employeeId === employee.id &&
                      isSameOrBetweenDates(date, event.startDate, event.endDate)
                  )
                  .map((event) => (
                    <Box
                      key={event.id}
                      style={{
                        backgroundColor: theme.palette.secondary.light,
                        color: "bla",
                        fontSize: "12px",
                        minHeight: '50%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {event.title}
                    </Box>
                  ))}
              </Grid>
            ))}
          </React.Fragment>
        ))}
      </Grid >
      {/* Add Event Modal */}
      <Dialog open={addEventModalOpen} onClose={() => setAddEventModalOpen(false)}>
        <DialogTitle>Add Event</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Event Title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Start Date"
            type="date"
            value={eventStartDate}
            onChange={(e) => setEventStartDate(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="End Date"
            type="date"
            value={eventEndDate}
            onChange={(e) => setEventEndDate(e.target.value)}
            margin="dense"
          />
          <TextField
            fullWidth
            label="Hours"
            type="number"
            value={eventHours}
            onChange={(e) => setEventHours(Number(e.target.value))}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddEventModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEvent} color="secondary" variant="contained">
            Add Event
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Employee Modal */}
      <Dialog
        open={addEmployeeModalOpen}
        onClose={() => {
          setAddEmployeeModalOpen(false)
          // document.getElementById("close-focus")?.focus(); // Restore focus
        }}
      // disableEnforceFocus
      // disableAutoFocus
      >
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Employee Name"
            value={newEmployeeName}
            onChange={(e) => setNewEmployeeName(e.target.value)}
            margin="dense"
          />
        </DialogContent>
        <DialogActions>
          <Button id="close-focus" onClick={() => setAddEmployeeModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddEmployee} color="primary" variant="contained">
            Add Employee
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ShiftCalendar;


