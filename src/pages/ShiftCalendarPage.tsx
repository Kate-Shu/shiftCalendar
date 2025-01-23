import { Header } from '@/components/AppHeader/Header'
import ShiftCalendar from '@/components/shiftCalendar/ShiftCalendar'
import { ShiftRequest } from '@/components/shiftRequests/RequestPage'
import { useState } from 'react'
import { StyledContainer } from './ShiftCalendarPage.styles'

const ShiftCalendarPage = () => {
  const [currentTab, setCurrentTab] = useState<string>("schedule");

  return (
    <>
      <Header currentTab={currentTab} onTabChange={setCurrentTab} />
      <StyledContainer>
        {currentTab === 'schedule' && <ShiftCalendar />}
        {currentTab === 'request' && <ShiftRequest />}
      </StyledContainer>
    </>

  )
}

export default ShiftCalendarPage
