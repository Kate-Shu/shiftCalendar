import { startOfWeek, addDays, format, startOfMonth, endOfMonth, eachDayOfInterval} from "date-fns";

export const generateWeekDates = (selectedDate: Date): Date[] => {
 const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start from Monday
 return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
};

 export const generateMonthDates = (date: Date) => {
  const start = startOfMonth(date); // First day of the month
  const end = endOfMonth(date); // Last day of the month
  return eachDayOfInterval({ start, end }); // Array of dates within the month
 };

// Calculate Monday and Sunday of the current week
export const getRange = (date: Date, tableView: string): string => {
 const monday = startOfWeek(date, { weekStartsOn: 1 });
 const sunday = addDays(monday, 6);
 const start = format(monday, "d MMMM yyyy");
 const end = format(sunday, "d MMMM yyyy");
 // If the months are the same, avoid repeating the month name
 if(tableView === 'week') {
 if (monday.getMonth() === sunday.getMonth()) {
   return `${monday.getDate()} - ${format(sunday, "d MMMM yyyy")}`;
 }
 return `${start} - ${end}`;
} else return format(date, "MMMM yyyy")
};

 export const getEventRange = (startDay: Date, endDay: Date): string => {
  const start = format(startDay, "d MMM yyyy");
  const end = format(endDay, "d MMM yyyy");

   if(start === end) {
    return format(startDay, "d MMM yyyy")
  } else if (startDay.getMonth() === endDay.getMonth() && startDay.getFullYear() === endDay.getFullYear()) {
    return `${startDay.getDate()} - ${format(endDay, "d MMM yyyy")}`;
  } 
  return `${start} - ${end}`;
};


export const isToday = (date: Date): boolean => {
 const today = new Date();
 return (
   date.getDate() === today.getDate() &&
   date.getMonth() === today.getMonth() &&
   date.getFullYear() === today.getFullYear()
 );
};

export const isSameOrBetweenDates = (currentDate: Date, startDate: Date, endDate: Date): boolean => {
 const normalizedCurrent = currentDate.toDateString();
 const normalizedStart = startDate.toDateString();
 const normalizedEnd = endDate.toDateString();
 return (
   new Date(normalizedCurrent) >= new Date(normalizedStart) &&
   new Date(normalizedCurrent) <= new Date(normalizedEnd)
 );
};

export const formatDate = (date: Date): string => {
 return format(date, 'yyyy-MM-dd');
};

export const eventDuration = (eventStart: Date, eventEnd: Date): number => 
  (new Date(eventEnd).getTime() - new Date(eventStart).getTime()) / (1000 * 60 * 60 * 24) + 1; 