import { startOfWeek, addDays, format} from "date-fns";

export const generateWeekDates = (selectedDate: Date): Date[] => {
 const startDate = startOfWeek(selectedDate, { weekStartsOn: 1 }); // Start from Monday
 return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
};

// Calculate Monday and Sunday of the current week
export const getWeekRange = (date: Date): string => {
 const monday = startOfWeek(date, { weekStartsOn: 1 });
 const sunday = addDays(monday, 6);
 const start = format(monday, "d MMMM yyyy");
 const end = format(sunday, "d MMMM yyyy");
 // If the months are the same, avoid repeating the month name
 if (monday.getMonth() === sunday.getMonth()) {
   return `${monday.getDate()} - ${format(sunday, "d MMMM yyyy")}`;
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