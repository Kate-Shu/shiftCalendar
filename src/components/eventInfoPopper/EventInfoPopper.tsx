import { Fade, Stack, Typography } from "@mui/material"
import { StyledPoper } from "./EventInfoPopper.styles"
import React from "react"

type EventPoperPropsType = {
 employeeName: string,
 eventPeriod: string,
 eventDescription: string,
 open: boolean,
 anchorEl: null | HTMLElement,
 title: string,
}
export const EventPopper: React.FC<EventPoperPropsType> = ({
 title,
 employeeName,
 eventPeriod,
 eventDescription,
 open,
 anchorEl,
}) => {
 return (
  <StyledPoper
   open={open}
   anchorEl={anchorEl}
   transition
   placement='auto-end'
  >
   {({ TransitionProps }) => (
    <Fade {...TransitionProps} timeout={350}>
     <Stack direction='column'>
      <Typography variant='caption' sx={{ marginBottom: '5px' }}>Shift details</Typography>
      <Typography variant='body2' sx={{ marginBottom: '5px' }}>{title}</Typography>
      <Typography variant='body2' fontWeight={600}>{eventPeriod}</Typography>
      <Typography variant='body2' sx={{ marginBottom: '10px' }}>{employeeName}</Typography>
      <Typography variant='body2'>{eventDescription}</Typography>
     </Stack>
    </Fade>
   )}
  </StyledPoper>

 )
}