import { Button, FormControl, Stack, styled } from '@mui/material'
import { Box } from '@mui/material'

export const StyledContainer = styled(Box)(({ theme }) => ({
 display: "flex",
 justifyContent: "space-between",
 marginBottom: "20px",
 color: theme.palette.secondary.contrastText,
 [theme.breakpoints.down('md')]: {
  flexDirection: "column",
 },
}))

export const StyledStackRight = styled(Stack)(({ theme }) => ({
 [theme.breakpoints.down('md')]: {
  marginTop: "1.5rem",
  marginBottom: "1rem",
  justifyContent: "flex-start",
 },
}))

export const StyledStackLeft = styled(Stack)(({ theme }) => ({
 alignItems: 'center',
 [theme.breakpoints.down('md')]: {
  justifyContent: "flex-start",
 },
}))

export const StyledFormControl = styled(FormControl)(() => ({
 display: 'flex',
 flexDirection: 'row',
 alignItems: 'center',
 width: '100px',
 marginRight: '10px',
}))

export const StyledIconWrapper = styled(Box)(() => ({
 display: 'flex',
 alignItems: 'center',
 marginRight: '8px'
}))

export const StyledTodayButton = styled(Button)(() => ({
 marginRight: '20px',
 height: '36px',
 paddingRight: '40px',
 paddingLeft: '40px'
}))