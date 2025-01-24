import { Header } from '@/components/AppHeader/Header'
import ShiftCalendar from '@/components/shiftCalendar/ShiftCalendar'
import { ShiftRequest } from '@/components/shiftRequests/RequestPage'
import { useState } from 'react'
import { StyledContainer } from './ShiftCalendarPage.styles'
import { CalendarSettings } from '@/components/calendarSettings/CalendarSettings.tsx'

const ShiftCalendarPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("schedule");

  return (
    <>
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />
      <StyledContainer>
        {currentTab === 'schedule' && <ShiftCalendar />}
        {currentTab === 'request' && <ShiftRequest />}
        {currentTab === 'settings' && <CalendarSettings />}
      </StyledContainer>
    </>

  )
}

export default ShiftCalendarPage
