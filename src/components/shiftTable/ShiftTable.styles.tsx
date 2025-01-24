import { styled } from '@mui/material';
import { Box, Grid, Typography, TextField, Avatar } from '@mui/material';

export const StyledWeekHeader = styled(Box)(({ theme }) => ({
 display: 'flex',
 flexDirection: 'row',
 padding: '10px',
 border: '1px solid #ddd',
 backgroundColor: theme.palette.background.default
}));

export const StyledWeekTitleGrid = styled(Grid)(() => ({
 position: "sticky",
 top: 0,
 zIndex: 3,
}));

export const StyledDateCellDates = styled(Grid)(({ theme }) => ({
 border: '1px solid #ddd',
 position: "sticky",
 top: 0,
 zIndex: 3,
 '&:hover': {
  backgroundColor: theme.palette.action.hover,
 },
 backgroundColor: theme.palette.background.default,
}));

export const StyledDateCell = styled(Grid)(({ theme }) => ({
 border: '1px solid #ddd',
 position: "sticky",
 top: 0,
 zIndex: 2,
 backgroundColor: theme.palette.background.default,
}));

export const StyledNotesTitle = styled(Typography)(() => ({
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
 '& .MuiInputBase-input': {
  padding: 0,
 },
}));

export const StyledSummaryContainer = styled(Box)(() => ({
 width: '100%',
 padding: '30px 16px 30px 0px',
 display: 'flex',
 justifyContent: 'space-between',
 alignItems: 'center',

}));

export const StyledSummaryInfo = styled(Box)(() => ({
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

export const StyledHoursText = styled(Typography)(() => ({
 fontWeight: 'light',
 fontSize: '16px',
 lineHeight: '24px',
 marginLeft: '5px'
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

export const StyledEventCell = styled(Grid)(({ theme }) => ({
 border: "1px solid #ddd",
 textAlign: "center",
 cursor: "pointer",
 padding: "10px",
 '&:hover': {
  backgroundColor: theme.palette.action.hover,
 },
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