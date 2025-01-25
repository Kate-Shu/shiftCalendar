import { Button, Dialog, styled } from "@mui/material";

export const StyledDialog = styled(Dialog)(() => ({
 '& .MuiDialog-paper': {
  width: '400px',
  padding: '10px 10px 20px'
 }
}));

export const StyledCancelButton = styled(Button)(() => ({
 marginRight: '15px'
}));

export const StyledAddButton = styled(Button)(() => ({
 marginRight: '15px'
}));