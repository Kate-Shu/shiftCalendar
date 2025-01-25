import { styled } from '@mui/material'
import { Box } from '@mui/material'

export const StyledContainer = styled(Box)(({ theme }) => ({
 display: "flex",
 justifyContent: "space-between",
 marginBottom: "20px",
 color: theme.palette.secondary.contrastText
}))
