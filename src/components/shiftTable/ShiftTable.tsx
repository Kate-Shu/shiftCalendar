import { EmployeeType, EventType } from "@/types/AppType";
import { Box, Grid, Typography, useTheme } from "@mui/material"
import React from "react"
import { getInitials } from "@/utils/common";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { isSameOrBetweenDates, isToday } from "@/utils/dateUtils";
import { StyledAvatar, StyledDateCell, StyledEstemSummaryText, StyledEventCell, StyledEventTitleWrapper, StyledHoursSummaryText, StyledNameHourseWrapper, StyledNameWrapper, StyledNoteInput, StyledNotesTitle, StyledSummaryContainer, StyledWeekHeader } from "./ShiftTable.styles";

type ShiftTableTypeProps = {
  calculateWeeklyHours: () => number,
  calculateEmployeeHours: (employeeId: string) => number,
  dates: Date[],
  onOpenEventDialog: (employee: EmployeeType, date: Date) => void,
  employees: EmployeeType[];
  events: EventType[];
  handleNoteChange: (date: Date, value: string) => void
}
export const ShiftTable: React.FC<ShiftTableTypeProps> = ({
  dates,
  employees,
  events,
  calculateWeeklyHours,
  calculateEmployeeHours,
  onOpenEventDialog,
  handleNoteChange,
}) => {
  const theme = useTheme();
  return (
    <Grid container spacing={0} className="calendar">
      <Grid item xs={2}>
        <StyledWeekHeader>
          <Typography
            variant="body1"
            align="left"
            sx={{ fontWeight: "bold" }}
          >
            Week: {calculateWeeklyHours()} hrs
          </Typography>
        </StyledWeekHeader>
      </Grid>
      {/* week days */}
      {dates.map((date) => (
        <StyledDateCell item xs={1.4} key={date.toISOString()}>
          <Box sx={{
            backgroundColor: isToday(date) ? theme.palette.secondary.main : "transparent",
            padding: "5px",
            borderRadius: isToday(date) ? "5px" : "0",
          }}>
            <Typography variant="subtitle1" align="center" fontWeight="bold"
              sx={{
                color: isToday(date) ? "white" : "black",
              }}>
              {date.toLocaleDateString("de-DE", { weekday: "short", day: "numeric" })}
            </Typography>
          </Box>
        </StyledDateCell>
      ))}

      {/* Notes */}
      <Grid item xs={2}>
        <StyledNotesTitle
          variant="body1"
          align="left">
          Day Notes
        </StyledNotesTitle>
      </Grid>
      {dates.map((date) => (
        <StyledDateCell item xs={1.4} key={`${date.toISOString()}-notes`}>
          <StyledNoteInput
            fullWidth
            variant="standard"
            size="small"
            onChange={(e) => handleNoteChange(date, e.target.value)}
            InputProps={{
              disableUnderline: true,
              sx: {
                border: 'none',
                padding: '0',
              },
            }}
          />
        </StyledDateCell>
      ))}

      {/* Estem summary*/}
      <StyledSummaryContainer>
        <StyledEstemSummaryText
          variant="body1"
          align="left">
          estem
        </StyledEstemSummaryText>
        <StyledHoursSummaryText
          variant="body1"
          align="left">
          {calculateWeeklyHours()} hrs
        </StyledHoursSummaryText>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <PeopleAltOutlinedIcon />
          <Typography
            variant="body1"
            align="left">
            {employees.length}
          </Typography>
        </Box>
      </StyledSummaryContainer>

      {/* Employee Rows */}
      {employees.map((employee) => (
        <React.Fragment key={employee.id}>
          <Grid item xs={2}>
            <StyledNameWrapper>
              <StyledAvatar>
                {getInitials(employee.name)}
              </StyledAvatar>
              <StyledNameHourseWrapper>
                <Typography variant="body1" fontWeight="bold">
                  {employee.name}
                </Typography>
                <Typography variant="body2">
                  {calculateEmployeeHours(employee.id)} hrs
                </Typography>
              </StyledNameHourseWrapper>
              {/* event cells */}
            </StyledNameWrapper>
          </Grid>
          {dates.map((date) => (
            <StyledEventCell
              item
              xs={1.4}
              key={`${employee.id}-${date.toISOString()}`}
              onClick={() => onOpenEventDialog(employee, date)}
            >
              {events
                .filter(
                  (event) =>
                    event.employeeId === employee.id &&
                    isSameOrBetweenDates(date, event.startDate, event.endDate)
                )
                .map((event) => (
                  <StyledEventTitleWrapper
                    key={event.id}>
                    {event.title}
                  </StyledEventTitleWrapper>
                ))}
            </StyledEventCell>
          ))}
        </React.Fragment>
      ))}
    </Grid >

  )
}