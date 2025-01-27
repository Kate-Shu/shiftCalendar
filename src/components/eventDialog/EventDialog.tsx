import { EmployeeType } from "@/types/AppType";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"

type EventDetailsTypes = {
 title: string;
 startDate: string;
 endDate: string;
 hours: string;
 selectedEmployee: EmployeeType | null;
}

type EventDialogPropsType = {
 openEventDialog: boolean;
 onClose: () => void;
 eventDetails: EventDetailsTypes
 onChange: (key: string, value: string | number) => void;
 onAddEvent: () => void;
}

export const EventDialog: React.FC<EventDialogPropsType> = ({
 openEventDialog,
 onClose,
 eventDetails,
 onChange,
 onAddEvent,
}) => {
 const { title, startDate, endDate, hours } = eventDetails;

 return (
  <Dialog open={openEventDialog} onClose={onClose}>
   <DialogTitle>Add Event</DialogTitle>
   <DialogContent>
    <TextField
     fullWidth
     label="Event Title"
     value={title}
     onChange={(e) => onChange('title', e.target.value)}
     margin="dense"
    />
    <TextField
     fullWidth
     label="Start Date"
     type="date"
     value={startDate}
     onChange={(e) => onChange('startDate', e.target.value)}
     margin="dense"
    />
    <TextField
     fullWidth
     label="End Date"
     type="date"
     value={endDate}
     onChange={(e) => onChange('endDate', e.target.value)}
     margin="dense"
    />
    <TextField
     fullWidth
     label="Hours"
     type="number"
     value={hours}
     onChange={(e) => onChange('hours', e.target.value ? Number(e.target.value) : '')}
     margin="dense"
    />
   </DialogContent>
   <DialogActions>
    <Button onClick={onClose} color="secondary">
     Cancel
    </Button>
    <Button onClick={onAddEvent} color="primary" variant="contained">
     Add Event
    </Button>
   </DialogActions>
  </Dialog>

 )
}