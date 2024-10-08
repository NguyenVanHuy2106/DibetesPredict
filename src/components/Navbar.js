import React from "react";
import "./Navbar.css";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu"; // Biểu tượng 3 gạch
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import TouchAppIcon from "@material-ui/icons/TouchApp";
import { Link } from "react-router-dom";

import { Avatar, Menu, MenuItem, Typography } from "@material-ui/core"; // Nhập các thành phần cần thiết cho dropdown
import ArrowDropDown from "@material-ui/icons/ArrowDropDown"; // Nhập icon mũi tên xuống
import logo from "../image/LogoUIT.png";

function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null); // State cho dropdown
  const username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const menuItems = [
    { text: "Import Data", icon: <InboxIcon />, link: "/import-data" },
    { text: "Train Data", icon: <TouchAppIcon />, link: "/train-data" },
  ];
  const handleReload = () => {
    if (role === "admin") {
      window.location.href = "/";
    } else {
      window.location.href = "/predict";
    }
  };

  const toggleDrawer = () => {
    if (role === "admin") {
      setOpen(!open);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");

    window.location.href = "/login"; // Điều hướng về
  };

  // Hàm xử lý nhấp vào mục menu
  const handleMenuItemClick = () => {
    setOpen(false); // Đóng Drawer
  };

  return (
    <>
      <AppBar position="fixed" className="customAppBar">
        <Toolbar className="toolbar">
          <div className="leftSection">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className="menuButton"
              onClick={toggleDrawer}
            >
              <MenuIcon style={{ color: "#3333CC" }} />
            </IconButton>

            <Link
              to="#"
              style={{ textDecoration: "none" }}
              onClick={handleReload}
            >
              <img className="titleImg" src={logo} alt="Logo" />
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center" }}>
            <Avatar alt="User Avatar" src="/path/to/avatar.jpg" />

            <Typography
              variant="body1"
              style={{ marginLeft: 8, color: "black" }}
            >
              {username}
            </Typography>
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              color="inherit"
            >
              <ArrowDropDown style={{ marginLeft: 8, color: "black" }} />
            </IconButton>
          </div>

          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Toolbar />

      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        PaperProps={{
          style: { top: 64, width: "240px" },
        }}
      >
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              component={Link}
              to={item.link}
              key={item.text}
              onClick={handleMenuItemClick}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
