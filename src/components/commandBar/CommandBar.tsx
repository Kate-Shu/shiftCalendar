import { Box, Button, FormControl, IconButton, MenuItem, Select, Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { StyledContainer } from "./CommandBar.styles";
import { useState } from "react";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';

type WeekSelectorTypeProps = {
 selectedDate: Date;
 setSelectedDate: (date: Date) => void;
 getWeekRange: (date: Date) => string;
 handleTodayButtonClick: () => void;
 handlePrevWeek: () => void;
 handleNextWeek: () => void;
}
export const CommandBar: React.FC<WeekSelectorTypeProps> = ({
 selectedDate,
 setSelectedDate,
 getWeekRange,
 handleTodayButtonClick,
 handlePrevWeek,
 handleNextWeek,
}) => {

 const [tableView, setTableView] = useState('week');
 const [printOption, setPrintOption] = useState('print');
 const [filter, setFilter] = useState('filter');
 const [view, setView] = useState('view');

 return (
  <>
   <LocalizationProvider dateAdapter={AdapterDateFns}>
    <StyledContainer>
     <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Button
       variant="contained"
       color="primary"
       onClick={handleTodayButtonClick}
       sx={{ marginRight: '20px', height: '36px', paddingRight: '40px', paddingLeft: '40px' }}
      >
       Today
      </Button>
      <Box sx={{ display: 'flex', marginRight: '20px' }}>
       <IconButton onClick={handlePrevWeek} aria-label="Next week">
        <ArrowBackIosIcon />
       </IconButton>
       <IconButton onClick={handleNextWeek} aria-label="Previous week">
        <ArrowForwardIosIcon />
       </IconButton>
      </Box>

      <DatePicker
       label={getWeekRange(selectedDate)}
       value={selectedDate}
       onChange={(newDate) => newDate && setSelectedDate(newDate)}
      />
     </Box>
     <Stack direction="row" spacing={2}>
      <FormControl
       variant="standard"
       size="small"
       sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100px',
        marginRight: '10px',
       }}
      >
       <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
        <LocalPrintshopOutlinedIcon fontSize="small" />
       </Box>
       <Select
        value={tableView}
        onChange={(e) => setTableView(e.target.value)}
        sx={{ flex: 1 }}
       >
        <MenuItem value="week">
         <Typography>Week</Typography>
        </MenuItem>
        <MenuItem value="month">
         <Typography>Month</Typography>
        </MenuItem>
       </Select>
      </FormControl>
      <FormControl
       variant="standard"
       size="small"
       sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100px',
        marginRight: '10px',
       }}
      >
       <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
        <CalendarMonthIcon fontSize="small" />
       </Box>
       <Select
        value={printOption}
        onChange={(e) => setPrintOption(e.target.value)}
        sx={{ flex: 1 }}
       >
        <MenuItem value="print">Print</MenuItem>
        <MenuItem value="scale">Scale</MenuItem>
        <MenuItem value="help">Help</MenuItem>
       </Select>
      </FormControl>
      <FormControl
       variant="standard"
       size="small"
       sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100px',
        marginRight: '10px',
       }}
      >
       <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
        <FilterAltOutlinedIcon fontSize="small" />
       </Box>
       <Select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        sx={{ flex: 1 }}
       >
        <MenuItem value="filter">Filter</MenuItem>
        <MenuItem value="shifts">Shifts</MenuItem>
        <MenuItem value="active">All active</MenuItem>
        <MenuItem value="conflicts">Conflicts</MenuItem>
       </Select>
      </FormControl>
      <FormControl
       variant="standard"
       size="small"
       sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100px',
        marginRight: '10px',
       }}
      >
       <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px' }}>
        <PreviewOutlinedIcon fontSize="small" />
       </Box>
       <Select
        value={view}
        onChange={(e) => setView(e.target.value)}
        sx={{ flex: 1 }}
       >
        <MenuItem value="view">View</MenuItem>
        <MenuItem value="ownShifts">Your shifts</MenuItem>
        <MenuItem value="teamShifts">Team shifts</MenuItem>
       </Select>
      </FormControl>
     </Stack>

    </StyledContainer>
   </LocalizationProvider>
  </>
 )
}
