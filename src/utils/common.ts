import { EventType } from "@/types/AppType";

export const getInitials = (name: string): string => {
 const nameParts = name.split(" ");
 const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
 return initials;
};

 export const calculateHours = (events: EventType[], weekDays?: Date[]) => ({
  day: () => {
   return events
     .filter((event) => new Date(event.startDate).toISOString().split('T')[0] === new Date(event.endDate).toISOString().split('T')[0])
     .reduce((total, event) => total + Number(event.hours), 0);
  },
  week: () => {
   if(weekDays){
   return events
   .filter(
     (event) =>
       event.startDate >= weekDays[0] &&
       event.endDate <= weekDays[6] &&
       event.title.toLowerCase() !== "vocation" &&
       event.title.toLowerCase() !== "sick leave"
   )
   .reduce((total, event) => total + Number(event.hours), 0);
  }
  }
 })

 export const calculateDailyHours = (events: EventType[], weekDays: Date[]): Record<string, string> => {
  return weekDays.reduce((acc, day) => {
    const dayISO = day.toISOString().split("T")[0]; // Format the day as YYYY-MM-DD
    const totalHours = events
      .filter(
        (event) =>
          new Date(event.startDate).toISOString().split("T")[0] === dayISO || // Event starts on this day
          new Date(event.endDate).toISOString().split("T")[0] === dayISO // Event ends on this day
      )
      .reduce((total, event) => total + Number(event.hours), 0);
    acc[dayISO] = totalHours.toString(); // Store the hours as a string for the day
    return acc;
  }, {} as Record<string, string>);
};

export const countUniqueEmployeesPerDay = (events: EventType[]): Record<string, number> => {
  const employeeCounts: Record<string, Set<string>> = {};

  events.forEach((event) => {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const current = new Date(start);

    while (current <= end) {
      const dayISO = current.toISOString().split("T")[0];
      if (!employeeCounts[dayISO]) {
        employeeCounts[dayISO] = new Set();
      }
      employeeCounts[dayISO].add(event.employeeId);
      current.setDate(current.getDate() + 1);
    }
  });

  // Convert Set sizes to numbers
  const result: Record<string, number> = {};
  Object.keys(employeeCounts).forEach((day) => {
    result[day] = employeeCounts[day].size;
  });

  return result;
};
