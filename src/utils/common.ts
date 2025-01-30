import { EventType } from "@/types/AppType";
import { formatDate } from "./dateUtils";

export const getInitials = (name: string): string => {
 const nameParts = name.split(" ");
 const initials = nameParts.map((part) => part.charAt(0).toUpperCase()).join("");
 return initials;
};

 export const calculateDailyHours = (events: EventType[], weekDays: Date[]): Record<string, string> => {
  return weekDays.reduce((acc, day) => {
    const totalHours = events
      .filter(
        (event) =>
          formatDate(new Date(event.startDate)) === formatDate(day) || 
          formatDate(new Date(event.endDate)) === formatDate(day)
      )
      .reduce((total, event) => total + Number(event.hours), 0);
    acc[formatDate(day)] = totalHours.toString(); 
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
      if (!employeeCounts[formatDate(current)]) {
        employeeCounts[formatDate(current)] = new Set();
      }
      employeeCounts[formatDate(current)].add(event.employeeId);
      current.setDate(current.getDate() + 1);
    }
  });
  const result: Record<string, number> = {};
  Object.keys(employeeCounts).forEach((day) => {
    result[day] = employeeCounts[day].size;
  });
  return result;
};

export const generateAvatarBgColor = (string: string): string => {
  const hash = Array.from(string).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `hsl(${hash % 360}, 70%, 60%)`;
};

export const getXsValue = (daysInMonth: number) => { 
  if (daysInMonth === 28) {
    return 0.35
  } else if (daysInMonth === 29) {
    return 0.34
  } else if (daysInMonth === 30) {
    return 0.33
  } else return 0.32
}

export const isFirstEventDay = (date: Date, startDate: Date) => formatDate(date) === formatDate(startDate)
