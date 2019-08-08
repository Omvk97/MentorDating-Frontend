import React from "react";
import { withRouter } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MentorIcon from "@material-ui/icons/SupervisedUserCircle";
import WorkshopIcon from "@material-ui/icons/School";

import useStyles from "./Drawer.styles";

function SideDrawer({ open, onDrawerClose, history }) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="temporary"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper
      }}
      onClose={onDrawerClose}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onDrawerClose}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push("/mentors/categories")}>
          <ListItemIcon>
            <MentorIcon />
          </ListItemIcon>
          <ListItemText primary="Kategorier" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="specify category">
              <ChevronRightIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem button onClick={() => history.push("/mentors/workshops")}>
          <ListItemIcon>
            <WorkshopIcon />
          </ListItemIcon>
          <ListItemText primary="Workshops" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default withRouter(SideDrawer);
