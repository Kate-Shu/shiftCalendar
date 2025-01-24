import { styled, Container } from '@mui/material'

export const StyledContainer = styled(Container)(() => ({
 marginTop: "2rem",
 backgroundColor: '#f4f1f0',
 zIndex: 2,
 position: "relative",

 '& .MuiContainer-root': {
  paddingLeft: '5px',
  paddingRight: '0',
 },


}))