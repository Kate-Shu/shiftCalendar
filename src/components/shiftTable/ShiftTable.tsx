import { EmployeeType, EventType } from "@/types/AppType";
import { Box, Grid, Typography, useTheme } from "@mui/material"
import React from "react"
import { getInitials } from "@/utils/common";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { isSameOrBetweenDates, isToday } from "@/utils/dateUtils";
import { StyledAvatar, StyledDateCell, StyledDateCellDates, StyledEstemSummaryText, StyledEventCell, StyledEventTitleWrapper, StyledHoursSummaryText, StyledHoursText, StyledNameHourseWrapper, StyledNameWrapper, StyledNoteInput, StyledNotesTitle, StyledSummaryContainer, StyledWeekHeader, StyledWeekTitleGrid } from "./ShiftTable.styles";

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
    <Grid container spacing={0} className="calendar" sx={{ position: 'relative' }}>
      <StyledWeekTitleGrid item xs={2} >
        <StyledWeekHeader>
          <Typography
            variant="body1"
            align="left"
            sx={{
              fontWeight: "bold",
            }}
          >
            Week:
          </Typography>
          <StyledHoursText>{calculateWeeklyHours()} hrs</StyledHoursText>
        </StyledWeekHeader>
      </StyledWeekTitleGrid>
      {/* week days */}
      {dates.map((date) => (
        <StyledDateCellDates item xs={1.4} key={date.toISOString()}>
          <Box sx={{
            backgroundColor: isToday(date) ? theme.palette.secondary.light : "transparent",
            padding: "8px",
            height: "100%",
          }}>
            <Typography variant="subtitle1" align="center" fontWeight="bold"
              sx={{ height: "100%" }}>
              {date.toLocaleDateString("en-CA", { weekday: "short", day: "numeric" })}
            </Typography>
          </Box>
        </StyledDateCellDates>
      ))}


      {/* Notes */}
      <Grid item xs={2} sx={{ zIndex: '2' }}>
        <StyledNotesTitle
          variant="body1"
          align="left">
          Day Notes
        </StyledNotesTitle>
      </Grid>
      {dates.map((date) => (
        <StyledDateCell item xs={1.4} key={`${date.toISOString()}-notes`} >
          <StyledNoteInput
            fullWidth
            variant="standard"
            size="small"
            onChange={(e) => handleNoteChange(date, e.target.value)}
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
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