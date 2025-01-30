import { styled } from '@mui/material';
import { Box, Grid2, Typography, TextField, Avatar } from '@mui/material';

type StyledDateTypographyProps = {
 week?: boolean;
 firstEventDay?: boolean;
 widthEventTitleAndDate?: number;
}

export const StyledWeekHeader = styled(Box)(({ theme }) => ({
 height: '100%',
 display: 'flex',
 alignItems: 'center',
 flexDirection: 'row',
 padding: '10px',
 border: '1px solid #ddd',
 backgroundColor: theme.palette.background.default
}));

export const StyledTitleGrid = styled(Grid2)(() => ({
 position: "sticky",
 top: 0,
 zIndex: 3,
}));

export const StyledDateCellDates = styled(Grid2)(({ theme }) => ({
 border: '1px solid #ddd',
 position: "sticky",
 top: 0,
 zIndex: 5,
 '&:hover': {
  backgroundColor: theme.palette.action.hover,
 },
 backgroundColor: theme.palette.background.default,
}));

export const StyledDateCellMonthDates = styled(Grid2)(({ theme }) => ({
 border: '1px solid #ddd',
 position: "sticky",
 top: 0,
 zIndex: 3,
 '&:hover': {
  backgroundColor: theme.palette.action.hover,
 },
 backgroundColor: theme.palette.background.default,
 display: "flex",
 justifyContent: 'center',
 alignItems: 'center'
}));

export const StyledDateCell = styled(Grid2)(({ theme }) => ({
 border: '1px solid #ddd',
 position: "sticky",
 top: 0,
 zIndex: 2,
 backgroundColor: theme.palette.background.default,
}));

export const StyledNoteTitleWrapper = styled(Box)(({ theme }) => ({
 height: '100%',
 display: 'flex',
 alignItems: 'center',
 flexDirection: 'row',
 padding: '10px',
 border: '1px solid #ddd',
 backgroundColor: theme.palette.background.default
}));

export const StyledNoteInput = styled(TextField)(({ theme }) => ({
 height: '100%',
 justifyContent: 'center',
 backgroundColor: 'transparent',
 border: 'none',
 transition: 'background-color 0.3s ease',
 '&:hover': {
  backgroundColor: theme.palette.action.hover,
 },
 '& .MuiInputBase-input': {
  padding: 0,
 },
}));

export const StyledSummaryContainer = styled(Box)(() => ({
 width: '100%',
 padding: '2rem 3rem',
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

export const StyledAvatar = styled(Avatar)(() => ({
 color: 'white',
 marginRight: '10px',
}));

export const StyledNameHourseWrapper = styled(Box)(() => ({
 display: "flex",
 flexDirection: "column",
}));

export const StyledEventCell = styled(Grid2)(({ theme }) => ({
 border: "1px solid #ddd",
 textAlign: "left",
 cursor: "pointer",
 padding: '5px 0',

 '&:hover': {
  backgroundColor: theme.palette.action.hover,
 },
}));

export const StyledEventTitleWrapper = styled(Box, {
 shouldForwardProp: (prop) => prop !== 'firstEventDay',
})<StyledDateTypographyProps>(({ theme, firstEventDay }) => ({
 backgroundColor: '#ddd',
 color: theme.palette.secondary.contrastText,
 fontSize: "12px",
 minHeight: '50%',
 height: '100%',
 display: 'flex',
 flexDirection: 'column',
 justifyContent: 'flex-start',
 alignItems: 'start',
 paddingLeft: '5px',
 borderLeft: firstEventDay ? '5px solid #fff' : 'none',
 borderTopLeftRadius: firstEventDay ? '10px' : 'none',
 borderBottomLeftRadius: firstEventDay ? '10px' : 'none'
}));

export const StyledDateInfoWrapper = styled(Box)(() => ({
 height: "100%",
 display: "flex",
 flexDirection: "column"
}));

export const StyledDailyHoursWrapper = styled(Box)(() => ({
 display: "flex",
 justifyContent: 'space-around',
 alignItems: 'center'
}))

export const StyledDateTypography = styled(Typography, {
 shouldForwardProp: (prop) => prop !== 'week',
})<StyledDateTypographyProps>(({ theme, week }) => ({
 fontSize: '15px',
 [theme.breakpoints.down('xl')]: {
  fontSize: !week && '13px'
 },
 [theme.breakpoints.down('md')]: {
  fontSize: !week && '11px'
 },
}))

export const StyledEventTitleAndDate = styled(Typography, {
 shouldForwardProp: (prop) => prop !== 'widthEventTitleAndDate',
})<StyledDateTypographyProps>(({ widthEventTitleAndDate }) => ({
 overflow: 'hidden',
 textOverflow: 'ellipsis',
 whiteSpace: 'nowrap',
 zIndex: 10,
 width: widthEventTitleAndDate,
 fontSize: '12px',
}));