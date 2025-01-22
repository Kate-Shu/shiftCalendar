import { styled } from '@mui/material';
import { Box, Grid, Typography, TextField, Avatar } from '@mui/material';

export const StyledWeekHeader = styled(Box)(() => ({
 padding: '10px',
 border: '1px solid #ddd',
 backgroundColor: '#f0f0f0',
}));

export const StyledDateCell = styled(Grid)(() => ({
 border: '1px solid #ddd',
}));

export const StyledNotesTitle = styled(Typography)(() => ({
 backgroundColor: '#f0f0f0',
 fontWeight: 'bold',
 padding: '10px',
 border: '1px solid #ddd',
}));

export const StyledNoteInput = styled(TextField)(() => ({
 height: '100%',
 justifyContent: 'center',
 backgroundColor: 'transparent',
 border: 'none',
 transition: 'background-color 0.3s ease',
 '&:hover': {
  backgroundColor: '#f0f0f0',
 },
 '& .MuiInputBase-input': {
  padding: 0,
 },
}));

export const StyledSummaryContainer = styled(Box)(() => ({
 width: '100%',
 padding: '20px 0 20px 10px',
 display: 'flex',
 flexDirection: 'row',
}));

export const StyledEstemSummaryText = styled(Typography)(() => ({
 fontWeight: '700',
 fontSize: '18px',
 lineHeight: '24px',
 marginRight: '10px',
}));

export const StyledHoursSummaryText = styled(Typography)(() => ({
 fontWeight: 'light',
 fontSize: '18px',
 lineHeight: '24px',
 marginRight: '10px',
}));

export const StyledEmployeesSummaryText = styled(Typography)(() => ({
 fontWeight: 'light',
 fontSize: '18px',
 lineHeight: '24px',
}));

export const StyledNameWrapper = styled(Box)(() => ({
 display: "flex",
 alignItems: "center",
 padding: "10px",
 border: "1px solid #ddd",
 backgroundColor: "#f7f7f7",
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
 backgroundColor: theme.palette.primary.main,
 color: 'white',
 marginRight: '7px',
}));

export const StyledNameHourseWrapper = styled(Box)(() => ({
 display: "flex",
 flexDirection: "column",
}));

export const StyledEventCell = styled(Grid)(() => ({
 border: "1px solid #ddd",
 textAlign: "center",
 cursor: "pointer",
 padding: "10px",
}));

export const StyledEventTitleWrapper = styled(Box)(({ theme }) => ({
 backgroundColor: theme.palette.secondary.light,
 color: "black",
 fontSize: "12px",
 minHeight: '50%',
 height: '100%',
 display: 'flex',
 justifyContent: 'center',
 alignItems: 'center',
}));