import { EmployeeType, EventType } from "@/types/AppType";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material"
import React from "react"
import { countUniqueEmployeesPerDay, generateAvatarBgColor, getInitials } from "@/utils/common";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { formatDate, getEventRange, isSameOrBetweenDates, isToday } from "@/utils/dateUtils";
import { StyledAvatar, StyledDailyHoursWrapper, StyledDateCell, StyledDateCellDates, StyledDateInfoWrapper, StyledEstemSummaryText, StyledEventCell, StyledEventTitleWrapper, StyledHoursSummaryText, StyledHoursText, StyledNameHourseWrapper, StyledNameWrapper, StyledNoteInput, StyledNoteTitleWrapper, StyledSummaryContainer, StyledSummaryInfo, StyledWeekHeader, StyledWeekTitleGrid } from "./ShiftTable.styles";
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
  return (
    <Grid container spacing={0} className="calendar" sx={{ position: 'relative', color: theme.palette.secondary.contrastText }}>
      <StyledWeekTitleGrid item xs={3}>
        <StyledWeekHeader>
          <Typography
            variant="body1"
            align="left"
            sx={{ fontWeight: "600", }}
          >
            Week:
          </Typography>
          <StyledHoursText>{calculateWeeklyHours()} hrs</StyledHoursText>
        </StyledWeekHeader>
      </StyledWeekTitleGrid>
      {/* week days */}
      {dates.map((date) => {
        // const dailyHours = calculateDailyHours(events, dates)[formatDate(date)] || "0";
        const dailyEmployees = countUniqueEmployeesPerDay(events)[formatDate(date)] || 0;
        return (
          <StyledDateCellDates item xs={1.28} key={date.toISOString()} >
            <StyledDateInfoWrapper sx={{
              border: ` 2px solid ${isToday(date) ? theme.palette.primary.main : 'transparent'}`
            }}>
              <Typography variant="subtitle1" align="center" fontWeight="600">
                {date.toLocaleDateString("en-GB", { weekday: "short", day: "numeric" })}
              </Typography>
              <StyledDailyHoursWrapper>
                <Typography variant="subtitle1" align="center" fontWeight="500" fontSize="14px">
                  {/* {dailyHours} hrs */}
                  0 hrs
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PeopleAltOutlinedIcon fontSize="small" />
                  <Typography variant="subtitle1" align="center" fontWeight="500" fontSize="14px" marginLeft='5px'>
                    {dailyEmployees}
                  </Typography>
                </Box>
              </StyledDailyHoursWrapper>
            </StyledDateInfoWrapper>
          </StyledDateCellDates>
        )
      })
      }
      <Grid item xs={3} sx={{ zIndex: '2' }}>
        <StyledNoteTitleWrapper>
          <Typography
            variant="body1"
            align="left"
            sx={{ fontWeight: "600", }}
          >
            Day Notes
          </Typography>
        </StyledNoteTitleWrapper>
      </Grid>
      {
        dates.map((date) => (
          <StyledDateCell item xs={1.28} key={`${date.toISOString()}-notes`} sx={{ height: '65px' }}>
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
                  padding: '0 0 0 5px',
                },
              }}
            />
          </StyledDateCell>
        ))
      }
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
        <Button
          variant="contained"
          startIcon={<GroupAddOutlinedIcon />}
          color="primary"
          onClick={openEmployeeModal}
        >
          Add Employee
        </Button>
      </StyledSummaryContainer>
      {employees.map((employee) => (
        <React.Fragment key={employee.id}>
          <Grid item xs={3}>
            <StyledNameWrapper>
              <StyledAvatar sx={{ backgroundColor: generateAvatarBgColor(employee.name) }}>
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
          {
            dates.map((date) => (
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
                      sx={{
                        borderLeft: `${formatDate(date) === formatDate(event.startDate) ? '5px solid #fff' : 'none'}`,
                        borderTopLeftRadius: `${formatDate(date) === formatDate(event.startDate) ? '10px' : 'none'}`,
                        borderBottomLeftRadius: `${formatDate(date) === formatDate(event.startDate) ? '10px' : 'none'}`,
                      }}
                      key={event.id}>
                      <Typography fontSize='12px' textAlign='left'>
                        {formatDate(date) === formatDate(event.startDate) ? event.title : ''}
                      </Typography>
                      <Typography fontSize='12px'>
                        {formatDate(date) === formatDate(event.startDate) ?
                          getEventRange(event.startDate, event.endDate)
                          : ''}
                      </Typography>
                    </StyledEventTitleWrapper>
                  ))}
              </StyledEventCell>
            ))}
        </React.Fragment>
      ))}
    </Grid >

  )
}