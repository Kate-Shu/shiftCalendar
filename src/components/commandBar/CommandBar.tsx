import { Box, IconButton, MenuItem, Select, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { StyledContainer, StyledFormControl, StyledIconWrapper, StyledStackLeft, StyledStackRight, StyledTodayButton } from "./CommandBar.styles";
import { useState } from "react";
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';

type CommandBarTypeProps = {
 selectedDate: Date;
 setSelectedDate: (date: Date) => void;
 getRange: (date: Date, tableView: string) => string;
 handleTodayButtonClick: () => void;
 handlePrev: () => void;
 handleNext: () => void;
 tableView: string;
 setTableView: React.Dispatch<React.SetStateAction<string>>;
}
export const CommandBar: React.FC<CommandBarTypeProps> = ({
 selectedDate,
 setSelectedDate,
 getRange,
 handleTodayButtonClick,
 handlePrev,
 handleNext,
 tableView,
 setTableView,
}) => {

 const [printOption, setPrintOption] = useState('print');
 const [filter, setFilter] = useState('filter');
 const [view, setView] = useState('view');

 return (
  <>
   <LocalizationProvider dateAdapter={AdapterDateFns}>
    <StyledContainer>
     <StyledStackLeft direction="row" spacing={2}>
      <StyledTodayButton
       variant="contained"
       color="primary"
       onClick={handleTodayButtonClick}
      >
       Today
      </StyledTodayButton>
      <Box sx={{ display: 'flex', marginRight: '20px' }}>
       <IconButton onClick={handlePrev} aria-label="Next week">
        <ArrowBackIosIcon />
       </IconButton>
       <IconButton onClick={handleNext} aria-label="Previous week">
        <ArrowForwardIosIcon />
       </IconButton>
      </Box>

      <DatePicker
       label={getRange(selectedDate, tableView)}
       value={selectedDate}
       onChange={(newDate) => newDate && setSelectedDate(newDate)}
      />
     </StyledStackLeft>

     <StyledStackRight direction="row" spacing={2}>
      <StyledFormControl variant="standard" size="small">
       <StyledIconWrapper>
        <CalendarMonthIcon fontSize="small" />
       </StyledIconWrapper>

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

      </StyledFormControl>

      <StyledFormControl
       variant="standard"
       size="small"
      >
       <StyledIconWrapper>
        <LocalPrintshopOutlinedIcon fontSize="small" />
       </StyledIconWrapper>
       <Select
        value={printOption}
        onChange={(e) => setPrintOption(e.target.value)}
        sx={{ flex: 1 }}
       >
        <MenuItem value="print">Print</MenuItem>
        <MenuItem value="scale">Scale</MenuItem>
        <MenuItem value="help">Help</MenuItem>
       </Select>
      </StyledFormControl>
      <StyledFormControl
       variant="standard"
       size="small"
      >
       <StyledIconWrapper>
        <FilterAltOutlinedIcon fontSize="small" />
       </StyledIconWrapper>
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
      </StyledFormControl>
      <StyledFormControl
       variant="standard"
       size="small" >
       <StyledIconWrapper>
        <PreviewOutlinedIcon fontSize="small" />
       </StyledIconWrapper>
       <Select
        value={view}
        onChange={(e) => setView(e.target.value)}
        sx={{ flex: 1 }}
       >
        <MenuItem value="view">View</MenuItem>
        <MenuItem value="ownShifts">Your shifts</MenuItem>
        <MenuItem value="teamShifts">Team shifts</MenuItem>
       </Select>
      </StyledFormControl>
     </StyledStackRight>

    </StyledContainer>
   </LocalizationProvider>
  </>
 )
}
