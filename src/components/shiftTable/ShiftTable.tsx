import { EmployeeType, EventType } from "@/types/AppType";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material"
import React from "react"
import { calculateDailyHours, countUniqueEmployeesPerDay, getInitials } from "@/utils/common";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { isSameOrBetweenDates, isToday } from "@/utils/dateUtils";
import { StyledAvatar, StyledDateCell, StyledDateCellDates, StyledEstemSummaryText, StyledEventCell, StyledEventTitleWrapper, StyledHoursSummaryText, StyledHoursText, StyledNameHourseWrapper, StyledNameWrapper, StyledNoteInput, StyledNotesTitle, StyledSummaryContainer, StyledSummaryInfo, StyledWeekHeader, StyledWeekTitleGrid } from "./ShiftTable.styles";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';

type ShiftTableTypeProps = {
  calculateWeeklyHours: () => number,
  calculateEmployeeHours: (employeeId: string) => number,
  dates: Date[],
  onOpenEventDialog: (employee: EmployeeType, date: Date) => void,
  employees: EmployeeType[];
  events: EventType[];
  handleNoteChange: (date: Date, value: string) => void,
  openEmployeeModal: () => void;

}
export const ShiftTable: React.FC<ShiftTableTypeProps> = ({
  dates,
  employees,
  events,
  calculateWeeklyHours,
  calculateEmployeeHours,
  onOpenEventDialog,
  handleNoteChange,
  openEmployeeModal,
}) => {
  const theme = useTheme();
  console.log('events sTab', events)
  return (
    <Grid container spacing={0} className="calendar" sx={{ position: 'relative', color: theme.palette.secondary.contrastText }}>
      <StyledWeekTitleGrid item xs={3}>
        <StyledWeekHeader sx={{
          height: '100%', display:
            'flex', alignItems: 'center'
        }}>
          <Typography
            variant="body1"
            align="left"
            sx={{
              fontWeight: "600",
            }}
          >
            Week:
          </Typography>
          <StyledHoursText>{calculateWeeklyHours()} hrs</StyledHoursText>
        </StyledWeekHeader>
      </StyledWeekTitleGrid>
      {/* week days */}
      {dates.map((date) => {
        const dayISO = date.toISOString().split("T")[0]; // Format the date to ISO
        const dailyHours = calculateDailyHours(events, dates)[dayISO] || "0";
        const uniqueEmployees = countUniqueEmployeesPerDay(events)[dayISO] || 0;
        return (
          <StyledDateCellDates item xs={1.28} key={date.toISOString()} >
            <Box sx={{
              backgroundColor: isToday(date) ? theme.palette.secondary.light : "transparent",
              padding: "8px",
              height: "100%",
              display: "flex",
              flexDirection: "column"
            }}>
              <Typography variant="subtitle1" align="center" fontWeight="500">
                {date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric" })}
              </Typography>
              <Box sx={{ display: "flex", justifyContent: 'space-around', alignItems: 'center' }}>
                <Typography variant="subtitle1" align="center" fontWeight="500" fontSize="14px">
                  {dailyHours} hrs
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PeopleAltOutlinedIcon fontSize="small" />
                  <Typography variant="subtitle1" align="center" fontWeight="500" fontSize="14px" marginLeft='5px'>
                    {uniqueEmployees}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </StyledDateCellDates>
        )
      })
      }
      {/* Notes */}
      <Grid item xs={3} sx={{ zIndex: '2' }}>
        <StyledNotesTitle
          variant="body1"
          align="left">
          Day Notes
        </StyledNotesTitle>
      </Grid>
      {
        dates.map((date) => (
          <StyledDateCell item xs={1.28} key={`${date.toISOString()}-notes`} >
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
        ))
      }

      {/* Estem summary*/}
      <StyledSummaryContainer>
        <StyledSummaryInfo>
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
        </StyledSummaryInfo>
        {/* <Box> */}
        <Button
          variant="contained"
          startIcon={<GroupAddOutlinedIcon />}
          color="primary"
          onClick={openEmployeeModal}
        >
          Add Employee
        </Button>
        {/* </Box> */}
      </StyledSummaryContainer>

      {/* Employee Rows */}
      {
        employees.map((employee) => (
          <React.Fragment key={employee.id}>
            <Grid item xs={3}>
              <StyledNameWrapper>
                <StyledAvatar>
                  {getInitials(employee.name)}
                </StyledAvatar>
                <StyledNameHourseWrapper>
                  <Typography variant="body1" fontWeight="600">
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
                xs={1.28}
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
        ))
      }
    </Grid >

  )
}