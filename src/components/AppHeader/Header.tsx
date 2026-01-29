import React, { useState } from "react";
import { Toolbar, IconButton, Typography, Tab, List, ListItem, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { StyledAppBar, StyledBox, StyledDrawer, StyledTabs, StyledTextEstem, StyledTextEstemWrapper } from "./Header.styles";
import CloseIcon from '@mui/icons-material/Close';
import theme from "@/themes/CssVariableTheme";

type HeaderProps = {
  currentTab: string;
  onTabChange: (value: string) => void;
};

export const Header: React.FC<HeaderProps> = ({ currentTab, onTabChange }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    onTabChange(newValue);
  };
  return (
    <>
      <StyledAppBar position="sticky" color="primary" elevation={2}>
        <Toolbar variant="regular">
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <StyledTextEstemWrapper>
            <StyledTextEstem variant="h5">SoftBridge</StyledTextEstem>
          </StyledTextEstemWrapper>
          <StyledTabs value={currentTab} onChange={handleTabChange}
            TabIndicatorProps={{
              style: {
                backgroundColor: theme.palette.text.secondary
              }
            }}
          >
            <Tab label="schedule" value="schedule" />
            <Tab label="request" value="request" />
            <Tab label="settings" value="settings" />
          </StyledTabs>
        </Toolbar>
      </StyledAppBar>

      {/* Drawer for Burger Menu */}
      <StyledDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <List>
          <StyledBox>
            <Typography>
              All Shifts
            </Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </StyledBox>
          <ListItem component={'button'}>
            <ListItemText primary="estem" />
          </ListItem>
        </List>
      </StyledDrawer>
    </>
  );
};
