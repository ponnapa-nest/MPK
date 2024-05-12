import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  IconButton,
} from "@mui/material";
import { Notifications, ExpandLess, ExpandMore } from "@mui/icons-material";

const Header: React.FC = () => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <AppBar position="sticky" style={{ backgroundColor: "#134B8A" }}>
      <Toolbar>
        <Grid container spacing={2} justifyContent="right" alignItems="center">
          <Grid item>
            <Notifications />
          </Grid>
          <Grid item>
            <Avatar alt="Remy Sharp" src="/image/profilePic.png" />
          </Grid>
          <Grid item>
            <Typography>Akkarapol</Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="Expand" style={{ color: "#FFFFFF" }}>
              <ExpandMore />
            </IconButton>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
