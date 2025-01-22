import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react";

type EmployeeDialogProps = {
 openDialog: boolean;
 onCloseDialog: () => void;
 onAddEmployee: (name: string) => void;
}

export const EmployeeDialog: React.FC<EmployeeDialogProps> = ({
 openDialog, onCloseDialog, onAddEmployee
}) => {
 const [employeeName, setEmployeeName] = useState("");

 const handleAddEmployee = () => {
  if (employeeName.trim()) {
   onAddEmployee(employeeName.trim());
   setEmployeeName(""); // Clear input after adding name
   onCloseDialog();
  }
 };

 return (
  <Dialog
   open={openDialog}
   onClose={onCloseDialog}
  // disableEnforceFocus
  // disableAutoFocus
  >
   <DialogTitle>Add Employee</DialogTitle>
   <DialogContent>
    <TextField
     fullWidth
     label="Employee Name"
     value={employeeName}
     onChange={(e) => setEmployeeName(e.target.value)}
     margin="dense"
    />
   </DialogContent>
   <DialogActions>
    <Button onClick={onCloseDialog}
     color="secondary">
     Cancel
    </Button>
    <Button
     onClick={handleAddEmployee}
     color="primary" variant="contained">
     Add Employee
    </Button>
   </DialogActions>
  </Dialog>
 )
}