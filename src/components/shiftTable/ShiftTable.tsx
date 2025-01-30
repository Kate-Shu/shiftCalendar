import { EmployeeType, EventType } from "@/types/AppType";
import { Box, Button, Grid2, Typography, useTheme } from "@mui/material"
import React, { useEffect, useState } from "react"
import { countUniqueEmployeesPerDay, generateAvatarBgColor, getInitials, getXsValue } from "@/utils/common";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import { eventDuration, formatDate, getEventRange, isSameOrBetweenDates, isToday } from "@/utils/dateUtils";
import { StyledAvatar, StyledDailyHoursWrapper, StyledDateCell, StyledDateCellDates, StyledDateCellMonthDates, StyledDateInfoWrapper, StyledEstemSummaryText, StyledEventCell, StyledEventTitleWrapper, StyledHoursSummaryText, StyledHoursText, StyledNameHourseWrapper, StyledNameWrapper, StyledNoteInput, StyledNoteTitleWrapper, StyledSummaryContainer, StyledSummaryInfo, StyledTitleGrid, StyledWeekHeader } from "./ShiftTable.styles";
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import { getDaysInMonth } from "date-fns";
import { EventPopper } from "../eventInfoPopper/EventInfoPopper";
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
type ShiftTableTypeProps = {
  calculateWeeklyHours: () => number,
  calculateEmployeeHours: (employeeId: string) => number,
  dates: Date[],
  onOpenEventDialog: (employee: EmployeeType, date: Date) => void,
  employees: EmployeeType[];
  events: EventType[];
  handleNoteChange: (date: Date, value: string) => void,
  openEmployeeModal: () => void;
  tableView: string;
  selectedDate: Date;
}
const noDescription = 'No description for this event'

export const ShiftTable: React.FC<ShiftTableTypeProps> = ({
  dates,
  employees,
  events,
  calculateWeeklyHours,
  calculateEmployeeHours,
  onOpenEventDialog,
  handleNoteChange,
  openEmployeeModal,
  tableView,
  selectedDate
}) => {
  const [popupAnchor, setPopupAnchor] = useState<null | HTMLElement>(null)
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<EmployeeType | null>(null)
  const theme = useTheme();

  const isPopupOpen = Boolean(popupAnchor);
  const week = tableView === 'week'
  const daysInMonth = getDaysInMonth(selectedDate)
  const xsValue = getXsValue((daysInMonth))
  const xsValueDayCells = week ? 1.28 : xsValue
  const isFirstEventDay = (date: Date, startDate: Date) => formatDate(date) === formatDate(startDate)

  const handleOpenEventPopperClick = (event: EventType, employee: EmployeeType, target: HTMLElement) => {
    setSelectedEvent(event)
    setPopupAnchor(target)
    setSelectedEmployee(employee)
  }
  useEffect(() => {
    const handleCloseEventPopperClick = () => {
      setPopupAnchor(null)
      setSelectedEvent(null)
      setSelectedEmployee(null)
    }
    document.addEventListener('mousedown', handleCloseEventPopperClick)
    return () => removeEventListener('mousedown', handleCloseEventPopperClick)
  })
  return (
    <Grid2 container spacing={0} className="calendar" sx={{ position: 'relative', color: theme.palette.secondary.contrastText }}>
      <StyledTitleGrid size={{ xs: week ? 3 : 2 }}>
        <StyledWeekHeader>
          <Typography
            variant={week ? 'body1' : 'body2'}
            fontWeight="600"
            align="left"
          >
            Week:
          </Typography>
          <StyledHoursText variant={week ? 'body1' : 'body2'}>{calculateWeeklyHours()} hrs</StyledHoursText>
        </StyledWeekHeader>
      </StyledTitleGrid>
      {
        dates.map((date) => {
          // TODO uncomment when details of dailyHours are clatified
          // const dailyHours = calculateDailyHours(events, dates)[formatDate(date)] || "0";
          const dailyEmployees = countUniqueEmployeesPerDay(events)[formatDate(date)] || 0;
          return (
            <StyledDateCellDates size={{ xs: xsValueDayCells }} key={date.toISOString()} >
              <StyledDateInfoWrapper
                padding={week ? '8px' : '4px'}
                border={`2px solid ${isToday(date) ? theme.palette.primary.main : 'transparent'}`}
              >
                <Typography
                  variant="subtitle1"
                  align="center"
                  fontWeight={600}
                  fontSize={week ? '15px' : '11px'}
                >
                  {date.toLocaleDateString("en-GB", { weekday: "short", day: "2-digit" })}
                </Typography>

                <StyledDailyHoursWrapper>
                  <Typography variant="subtitle1" align="center" fontWeight="500" fontSize="14px">
                    {/* {dailyHours} hrs */}
                    {week ? '0 hrs' : '0'}
                  </Typography>
                  {week &&
                    (<Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PeopleAltOutlinedIcon fontSize="small" />
                      <Typography variant="subtitle1" align="center" fontWeight="500" fontSize="14px" marginLeft='5px'>
                        {dailyEmployees}
                      </Typography>
                    </Box>)}
                </StyledDailyHoursWrapper>
              </StyledDateInfoWrapper>
            </StyledDateCellDates>
          )
        })
      }
      {
        !week && (
          <>
            <StyledTitleGrid size={{ xs: 2 }} sx={{ zIndex: 1 }}>
              <StyledWeekHeader>
                <Typography
                  variant={'body2'}
                  fontWeight="600"
                  align="left"
                >
                  People scheduled
                </Typography>
              </StyledWeekHeader>
            </StyledTitleGrid>
            {dates.map((date) => {
              // const dailyHours = calculateDailyHours(events, dates)[formatDate(date)] || "0";
              const dailyEmployees = countUniqueEmployeesPerDay(events)[formatDate(date)] || 0;
              return (
                <StyledDateCellMonthDates size={{ xs: xsValueDayCells }} key={date.toISOString()} >
                  <Typography variant="subtitle1" align="center" fontWeight="500" fontSize="14px" marginLeft='5px'>
                    {dailyEmployees}
                  </Typography>
                </StyledDateCellMonthDates>
              )
            })
            }
          </>
        )
      }
      <Grid2 size={{ xs: week ? 3 : 2 }} sx={{ zIndex: '2' }}>
        <StyledNoteTitleWrapper>
          <Typography
            variant={week ? 'body1' : 'body2'}
            fontWeight="600"
            align="left"
          >
            Day Notes
          </Typography>
        </StyledNoteTitleWrapper>
      </Grid2>
      {
        dates.map((date) => (
          <StyledDateCell
            size={{ xs: xsValueDayCells }}
            key={`${date.toISOString()}-notes`}
            sx={{ height: week ? '65px' : 'auto' }}>
            <StyledNoteInput
              fullWidth
              variant="standard"
              size="small"
              onChange={(e) => handleNoteChange(date, e.target.value)}
              InputProps={{
                disableUnderline: true,
                sx: {
                  border: 'none',
                  padding: '0 0 0 5px',
                  fontSize: week ? '14px' : '10px',
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

      <StyledTitleGrid size={{ xs: week ? 3 : 2 }} sx={{ zIndex: 1 }}>
        <StyledNameWrapper>
          <StyledAvatar sx={{ backgroundColor: 'grey' }}>
            <PendingActionsOutlinedIcon />
          </StyledAvatar>
          <StyledNameHourseWrapper>
            <Typography variant={week ? 'body1' : 'body2'} fontWeight="600">
              Open shifts
            </Typography>
            <Typography variant="body2">
              Shifts: 0
            </Typography>
          </StyledNameHourseWrapper>
        </StyledNameWrapper>
      </StyledTitleGrid>
      {dates.map((date) => {
        return (
          <StyledDateCellMonthDates size={{ xs: xsValueDayCells }} key={date.toISOString()} >
            {/* <Typography variant="subtitle1" align="center" fontWeight="500" fontSize="14px" marginLeft='5px'>
            </Typography> */}
          </StyledDateCellMonthDates>
        )
      })
      }
      {
        employees.map((employee) => {
          return (
            <React.Fragment key={employee.id}>
              <Grid2 size={{ xs: week ? 3 : 2 }}>
                <StyledNameWrapper>
                  <StyledAvatar sx={{ backgroundColor: generateAvatarBgColor(employee.name) }}>
                    {getInitials(employee.name)}
                  </StyledAvatar>
                  <StyledNameHourseWrapper>
                    <Typography variant={week ? 'body1' : 'body2'} fontWeight="600">
                      {employee.name}
                    </Typography>
                    <Typography variant="body2">
                      {calculateEmployeeHours(employee.id)} hrs
                    </Typography>
                  </StyledNameHourseWrapper>
                </StyledNameWrapper>
              </Grid2>
              {
                dates.map((date) => (
                  <StyledEventCell
                    size={{ xs: xsValueDayCells }}
                    key={`${employee.id}-${date.toISOString()}`}
                    onClick={() => onOpenEventDialog(employee, date)}
                  >
                    {events
                      .filter(
                        (event) =>
                          event.employeeId === employee.id &&
                          isSameOrBetweenDates(date, event.startDate, event.endDate)
                      )
                      .map((event) => {
                        const widthEventTitleAndDate = eventDuration(event.startDate, event.endDate) * xsValueDayCells * 100
                        return (
                          <StyledEventTitleWrapper
                            key={event.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEventPopperClick(event, employee, e.currentTarget)
                            }
                            }
                            sx={{
                              borderLeft: `${isFirstEventDay(date, event.startDate) ? '5px solid #fff' : 'none'}`,
                              borderTopLeftRadius: `${isFirstEventDay(date, event.startDate) ? '10px' : 'none'}`,
                              borderBottomLeftRadius: `${isFirstEventDay(date, event.startDate) ? '10px' : 'none'}`,
                            }}
                          >
                            <Typography fontSize='12px' textAlign='left' sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              zIndex: 10,
                              width: widthEventTitleAndDate,
                            }}>
                              {isFirstEventDay(date, event.startDate) ? event.title : ''}
                            </Typography>
                            <Typography fontSize='12px' sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              zIndex: 10,
                              width: widthEventTitleAndDate,
                            }}>
                              {isFirstEventDay(date, event.startDate) ?
                                getEventRange(event.startDate, event.endDate)
                                : ''}
                            </Typography>
                          </StyledEventTitleWrapper>
                        )
                      })}
                  </StyledEventCell>
                ))}
            </React.Fragment>
          )
        })
      }
      {
        selectedEvent && selectedEmployee && (
          <EventPopper
            title={selectedEvent.title}
            employeeName={selectedEmployee.name}
            open={isPopupOpen}
            anchorEl={popupAnchor}
            eventDescription={noDescription}
            eventPeriod={(getEventRange(selectedEvent.startDate, selectedEvent.endDate))}
          />
        )
      }
    </Grid2 >
  )
}
