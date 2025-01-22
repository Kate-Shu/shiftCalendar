import { Box, Button, IconButton } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { StyledContainer } from "./CommandBar.styles";

type WeekSelectorTypeProps = {
 selectedDate: Date;
 setSelectedDate: (date: Date) => void;
 getWeekRange: (date: Date) => string;
 handleTodayButtonClick: () => void;
 handlePrevWeek: () => void;
 handleNextWeek: () => void;
 openEmployeeModal: () => void;
}
export const CommandBar: React.FC<WeekSelectorTypeProps> = ({
 selectedDate,
 setSelectedDate,
 getWeekRange,
 handleTodayButtonClick,
 handlePrevWeek,
 handleNextWeek,
 openEmployeeModal,
}) => {
 return (
  <>
   <LocalizationProvider dateAdapter={AdapterDateFns}>
    <StyledContainer>
     <Box>
      <Button
       variant="contained"
       color="primary"
       onClick={handleTodayButtonClick}
       sx={{ marginLeft: "10px" }}
      >
       Today
      </Button>
      <IconButton onClick={handlePrevWeek} aria-label="Next week">
       <ArrowBackIosIcon />
      </IconButton>
      <IconButton onClick={handleNextWeek} aria-label="Previous week">
       <ArrowForwardIosIcon />
      </IconButton>
      <DatePicker
       label={getWeekRange(selectedDate)}
       value={selectedDate}
       onChange={(newDate) => newDate && setSelectedDate(newDate)}
      />
     </Box>
     <Box>
      <Button
       variant="contained"
       color="primary"
       onClick={openEmployeeModal}
       sx={{ marginLeft: "10px" }}
      >
       Add Employee
      </Button>
     </Box>
    </StyledContainer>
   </LocalizationProvider>
  </>
 )
}