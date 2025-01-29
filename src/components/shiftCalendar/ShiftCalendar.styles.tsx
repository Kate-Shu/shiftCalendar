import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)(() => ({
 '&.MuiContainer-root': {
  maxWidth: '100%'
 },
 width: '100%',
 paddingLeft: 0,
 paddingRight: 0,
}));