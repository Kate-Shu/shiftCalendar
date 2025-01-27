import { DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { useState } from "react";
import { StyledAddButton, StyledCancelButton, StyledDialog } from "./EmployeeDialog.styles";

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
  <StyledDialog
   open={openDialog}
   onClose={onCloseDialog}
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
    <StyledCancelButton
     onClick={onCloseDialog}
     color="secondary"
    >
     Cancel
    </StyledCancelButton>
    <StyledAddButton
     onClick={handleAddEmployee}
     color="primary" variant="contained"
    >
     Add Employee
    </StyledAddButton>
   </DialogActions>
  </StyledDialog>
 )
}