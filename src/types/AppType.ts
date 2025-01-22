export type EmployeeType = {
  id: string;
  name: string;
}

export type EventType = {
  id: string;
  employeeId: string;
  startDate: Date;
  endDate: Date;
  title: string;
  hours: number;
}