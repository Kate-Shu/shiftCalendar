import React, { useState } from "react";
import { Container } from "@mui/material";
import { subWeeks, addWeeks } from "date-fns";
import { EmployeeType, EventType } from "@/types/AppType";
import employeesMock from '@/utils/mocks/EmployeesMock.json'
import { CommandBar } from "../commandBar/CommandBar";
import { EventDialog } from "../dialogs/EventDialog";
import { EmployeeDialog } from "../dialogs/EmployeeDialog";
import { ShiftTable } from "../shiftTable/ShiftTable";
import { generateWeekDates, getWeekRange, formatToISODate } from "@/utils/dateUtils";

const ShiftCalendar: React.FC = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [employees, setEmployees] = useState<EmployeeType[]>(employeesMock);
  const [openEmployeeModal, setEmployeeModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  // @ts-ignore
  const [dayNotes, setDayNotes] = useState<{ [date: string]: string }>({});

  const weekDays = generateWeekDates(selectedDate);

  const [eventDialog, setEventDialog] = useState({
    open: false,
    title: "",
    startDate: "",
    endDate: "",
    hours: 0,
    selectedEmployee: null as EmployeeType | null,
  });

  const openEventDialog = (employee: EmployeeType, date: Date) => {
    setEventDialog({
      open: true,
      title: "",
      startDate: formatToISODate(date),
      endDate: formatToISODate(date),
      hours: 0,
      selectedEmployee: employee,
    });
  };

  const handleAddEvent = () => {
    debugger
    const { selectedEmployee, title, startDate, endDate, hours } = eventDialog;
    if (selectedEmployee && title && startDate && endDate && hours) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
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

  // const openEventModal = (employee: EmployeeType, date: Date) => {
  //   setSelectedEmployee(employee);
  //   setEventStartDate(formatToISODate(date));
  //   setEventEndDate(formatToISODate(date));
  //   setAddEventModalOpen(true);
  // };

  // const handleAddEvent = () => {
  //   if (selectedEmployee && eventTitle && eventStartDate && eventEndDate && eventHours) {
  //     const startDate = new Date(eventStartDate);
  //     const endDate = new Date(eventEndDate);

  //     setEvents([
  //       ...events,
  //       {
  //         id: `${selectedEmployee.id}-${startDate.toISOString()}`,
  //         employeeId: selectedEmployee.id,
  //         startDate,
  //         endDate,
  //         title: eventTitle,
  //         hours: eventHours
  //       },
  //     ]);

  //     setAddEventModalOpen(false);
  //     setEventTitle("");
  //     setEventStartDate("");
  //     setEventEndDate("");
  //     setEventHours(0);
  //   }
  // };

  // Jump to previous week
  const handlePrevWeek = () => {
    setSelectedDate((prevDate) => subWeeks(prevDate, 1));
  };

  //CommandBar
  // Jump to next week
  const handleNextWeek = () => {
    setSelectedDate((prevDate) => addWeeks(prevDate, 1));
  };
  const handleTodayButtonClick = () => {
    setSelectedDate(new Date()); // Reset to today's date
  };

  //ShiftTable
  const calculateWeeklyHours = () => {
    return events
      .filter(
        (event) =>
          event.startDate >= weekDays[0] &&
          event.endDate <= weekDays[6] &&
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
          event.startDate >= weekDays[0] &&
          event.endDate <= weekDays[6]
      )
      .reduce((total, event) => total + event.hours, 0);
  };
  const handleNoteChange = (date: Date, value: string) => {
    const formattedDate = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    setDayNotes((prevNotes) => ({
      ...prevNotes,
      [formattedDate]: value,
    }));
  };

  return (
    <Container>
      <CommandBar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        getWeekRange={getWeekRange}
        handleTodayButtonClick={handleTodayButtonClick}
        handlePrevWeek={handlePrevWeek}
        handleNextWeek={handleNextWeek}
        openEmployeeModal={() => setEmployeeModalOpen(true)}
      />
      <ShiftTable
        dates={weekDays}
        employees={employees}
        events={events}
        calculateWeeklyHours={calculateWeeklyHours}
        calculateEmployeeHours={calculateEmployeeHours}
        onOpenEventDialog={openEventDialog}
        handleNoteChange={handleNoteChange}
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
    </Container>
  );
};
export default ShiftCalendar;


