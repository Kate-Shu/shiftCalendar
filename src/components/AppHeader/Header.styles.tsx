import { AppBar, Box, styled, Tabs, Typography } from '@mui/material'
import { Drawer } from '@mui/material'

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
 padding: '10px 0',
 backgroundColor: 'inherit',
 color: theme.palette.text.secondary,
 zIndex: 1
}))

export const StyledDrawer = styled(Drawer)(() => ({
 '& .MuiPaper-root': {
  width: '30%',
 },
}))

export const StyledBox = styled(Box)(() => ({
 width: '100%',
 padding: '10px',
 display: 'flex',
 justifyContent: 'space-between',
 alignItems: 'center',
}))

export const StyledTextEstem = styled(Typography)(({ theme }) => ({
 flexGrow: 1,
 fontWeight: 'bold',
 color: theme.palette.primary.main
}))

export const StyledTextEstemWrapper = styled(Box)(() => ({
 margin: '0 30px 0 15px'
}))

export const StyledTabs = styled(Tabs)(({ theme }) => ({
 paddingTop: "5px",

 ".MuiTab-root": {
  fontFamily: "Arial, sans-serif",
  fontSize: "16px",
  fontWeight: "600",
  color: theme.palette.text.secondary,

  "&.Mui-selected": {
   color: theme.palette.text.secondary,
  },
 },
}))