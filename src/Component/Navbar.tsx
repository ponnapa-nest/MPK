// Navbar.tsx

import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from "@mui/material";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

const Navbar: React.FC = () => {
  return (
    <Drawer variant="permanent">
      <img src="/image/logo.png" alt="Logo" style={{ margin: "20px" }} />
      <Divider  />

      <List>
        <ListItem
          button
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ListItemIcon
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center", // Center horizontally
              borderRadius: "15px",
              background: "#0F1E56",
              border: "2px solid #FFFFFF",
              padding: "10px",
              height: "56px",
            }}
          >
            <FormatListBulletedIcon
              sx={{ color: "#FFFFFF", border: "1px solid #FFFFFF" }}
            />
          </ListItemIcon>
          <ListItemText primary="Place" />
        </ListItem>
        <Divider />

        {/* Add more menu items as needed */}
      </List>
    </Drawer>
  );
};

export default Navbar;
