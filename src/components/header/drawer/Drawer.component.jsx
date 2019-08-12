import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import MentorIcon from '@material-ui/icons/SupervisedUserCircle';
import WorkshopIcon from '@material-ui/icons/School';

import useStyles from './Drawer.styles';
import { selectCategoryOptions } from '../../../redux/mentor/mentor.selectors';

function SideDrawer({ open, onDrawerClose, history, categoryOptions }) {
  const classes = useStyles();
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);

  function onCategoriesClick(category) {
    onDrawerClose();
    history.push(`/mentorer/kategorier/${category}`);
  }

  return (
    <Drawer
      className={classes.drawer}
      variant='temporary'
      anchor='left'
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
      onClose={onDrawerClose}>
      <div className={classes.drawerHeader}>
        <IconButton onClick={onDrawerClose}>
          <ArrowBackIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => setCategoriesOpen(!categoriesOpen)}>
          <ListItemIcon>
            <MentorIcon />
          </ListItemIcon>
          <ListItemText primary='Kategorier' />
          {categoriesOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={categoriesOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {categoryOptions.map(category => (
              <ListItem
                key={category}
                button
                className={classes.nestedListItem}
                onClick={() => onCategoriesClick(category)}>
                <ListItemText primary={category} />
              </ListItem>
            ))}
          </List>
        </Collapse>
        <ListItem button onClick={() => history.push('/mentors/workshops')}>
          <ListItemIcon>
            <WorkshopIcon />
          </ListItemIcon>
          <ListItemText primary='Workshops' />
        </ListItem>
      </List>
    </Drawer>
  );
}

const mapStateToProps = createStructuredSelector({
  categoryOptions: selectCategoryOptions,
});

export default withRouter(connect(mapStateToProps)(SideDrawer));
