import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuIcon from "@material-ui/icons/Menu";
import Editicon from "@material-ui/icons/Edit";
import LogoutIcon from "@material-ui/icons/ExitToApp";

import useStyles from "./Header.styles";
import SideDrawer from "./drawer/Drawer.component";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const classes = useStyles();

  const accountMenuOpen = Boolean(anchorEl);

  function handleMenuClose() {
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setSideDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component={RouterLink}
            to="/"
            variant="h6"
            className={classes.title}
          >
            MentorDating
          </Typography>
          {false === true ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={event => setAnchorEl(event.currentTarget)}
                color="inherit"
              >
                <Avatar className={classes.avatar}>O</Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center"
                }}
                open={accountMenuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <Editicon />
                  </ListItemIcon>
                  <ListItemText primary="Rediger profil" />
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMenuClose}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary="Log ud" />
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              color="inherit"
              className={classes.logInButton}
            >
              LOG IND
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <SideDrawer
        open={sideDrawerOpen}
        onDrawerClose={() => setSideDrawerOpen(false)}
      />
    </div>
  );
}

export default Header;
