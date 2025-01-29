import React, { useState } from "react";
import { subWeeks, addWeeks, addMonths, subMonths } from "date-fns";
import { EmployeeType, EventType } from "@/types/AppType";
import employeesMock from '@/utils/mocks/EmployeesMock.json'
import { CommandBar } from "../commandBar/CommandBar";
import { ShiftTable } from "../shiftTable/ShiftTable";
import { generateWeekDates, getRange, formatDate, generateMonthDates } from "@/utils/dateUtils";
import { EventDialog } from "../eventDialog/EventDialog";
import { EmployeeDialog } from "../employeeDialog/EmployeeDialog";
import { StyledContainer } from "./ShiftCalendar.styles";

const ShiftCalendar: React.FC = () => {
  const [tableView, setTableView] = useState<string>("week");

  const [events, setEvents] = useState<EventType[]>([]);
  const [employees, setEmployees] = useState<EmployeeType[]>(employeesMock);
  const [openEmployeeModal, setEmployeeModalOpen] = useState(false);

  // 
  // setSelectedDate defined in datePicker in CommandBar
  // 
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // @ts-ignore
  const [dayNotes, setDayNotes] = useState<{ [date: string]: string }>({});

  const weekDays = tableView === 'week' ? generateWeekDates(selectedDate) : generateMonthDates(selectedDate);

  const [eventDialog, setEventDialog] = useState({
    open: false,
    title: "",
    startDate: "",
    endDate: "",
    hours: '',
    //////////////////////
    // selectedEmployee= {
    //     id: string;
    //     name: string;
    // }
    //
    selectedEmployee: null as EmployeeType | null,
  });

  const openEventDialog = (employee: EmployeeType, date: Date) => {
    setEventDialog({
      open: true,
      title: "",
      startDate: formatDate(date),
      endDate: formatDate(date),
      hours: '',
      selectedEmployee: employee,
    });
  };

  const handleAddEvent = () => {
    const { selectedEmployee, title, startDate, endDate, hours } = eventDialog;
    if (selectedEmployee && title && startDate && endDate && hours) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      //////////////
      //   type EventType = {
      //     id: string;  // // id: 1-10/01/2025 : selectEmplId-date
      //     employeeId: string;
      //     startDate: Date; // take from eventDialog
      //     endDate: Date;   // take from eventDialog
      //     title: string;
      //     hours: string;
      // }
      //
      setEvents((prev) => [
        ...prev,
        {
          id: `${selectedEmployee.id}-${startDateObj.toISOString()}`,
          employeeId: selectedEmployee.id,
          startDate: startDateObj,
          endDate: endDateObj,
          title,
          hours,
        },
      ]);

      setEventDialog({ ...eventDialog, open: false });
    }
  };

  // 
  // const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  //   const date = new Date('2023-01-15'); // 15 января 2023
  // const newDate = subWeeks(date, 1);   // 8 января 2023
  const handlePrev = () => {
    tableView === 'week' ?
      setSelectedDate((prevDate) => subWeeks(prevDate, 1)) :
      setSelectedDate((prevDate) => subMonths(prevDate, 1))
  };
  const handleNext = () => {
    tableView === 'week' ?
      setSelectedDate((prevDate) => addWeeks(prevDate, 1)) :
      setSelectedDate((prevDate) => addMonths(prevDate, 1))
  };
  const handleTodayButtonClick = () => {
    setSelectedDate(new Date()); // Reset to today's date
  };

  const calculateWeeklyHours = () => {
    return events
      .filter(
        (event) =>
          event.startDate >= weekDays[0] &&
          event.endDate <= weekDays[6] &&
          event.title.toLowerCase() !== "vocation" &&
          event.title.toLowerCase() !== "sick leave"
      )
      .reduce((total, event) => total + Number(event.hours), 0);
  };
  // Calculate total hours for all events for a specific employee in the week
  const calculateEmployeeHours = (employeeId: string): number => {
    return events
      .filter(
        (event) =>
          event.employeeId === employeeId &&
          event.startDate >= weekDays[0] &&
          event.endDate <= weekDays[6]
      )
      .reduce((total, event) => total + Number(event.hours), 0);
  };

  const handleNoteChange = (date: Date, value: string) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    setDayNotes((prevNotes) => ({
      ...prevNotes,
      [formattedDate]: value,
    }));
  };
  return (
    <StyledContainer>
      <CommandBar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        getRange={getRange}
        handleTodayButtonClick={handleTodayButtonClick}
        handlePrev={handlePrev}
        handleNext={handleNext}
        tableView={tableView} // Pass tableView to CommandBar
        setTableView={setTableView} // Pass setTableView to CommandBar
      />
      <ShiftTable
        dates={weekDays}
        employees={employees}
        events={events}
        calculateWeeklyHours={calculateWeeklyHours}
        calculateEmployeeHours={calculateEmployeeHours}
        onOpenEventDialog={openEventDialog}
        handleNoteChange={handleNoteChange}
        openEmployeeModal={() => setEmployeeModalOpen(true)}
        tableView={tableView}
        selectedDate={selectedDate}
      />
      <EventDialog
        openEventDialog={eventDialog.open}
        onClose={() => setEventDialog({ ...eventDialog, open: false })}
        eventDetails={eventDialog}
        onChange={(key, value) => setEventDialog({ ...eventDialog, [key]: value })}
        onAddEvent={handleAddEvent}
      />
      <EmployeeDialog
        openDialog={openEmployeeModal}
        onCloseDialog={() => setEmployeeModalOpen(false)}
        onAddEmployee={(name) =>
          setEmployees([...employees, { id: (employees.length + 1).toString(), name }])
        }
      />
    </StyledContainer>
  );
};
export default ShiftCalendar;


