import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AppBar from '@material-ui/core/AppBar';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import Editicon from '@material-ui/icons/Edit';
import MessageIcon from '@material-ui/icons/Message';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import useStyles from './Header.styles';
import SideDrawer from './drawer/Drawer.component';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOutStart } from '../../redux/user/user.actions';
import { fetchConversationsStart } from '../../redux/conversation/conversation.actions';
import { selectNumberOfUnreadMessages } from '../../redux/conversation/conversation.selectors';

function Header({
  currentUser,
  signOutStart,
  history,
  fetchConversations,
  unreadMessages,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const classes = useStyles();

  const accountMenuOpen = Boolean(anchorEl);

  useEffect(() => {
    if (currentUser) fetchConversations(currentUser.id);
  }, [currentUser, fetchConversations]);

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function onLogOut() {
    history.push('/logind');
    handleMenuClose();
    signOutStart();
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.bar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={() => setSideDrawerOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography
            component={RouterLink}
            to='/'
            variant='h6'
            className={classes.title}>
            MentorDating
          </Typography>
          {currentUser ? (
            <div>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={event => setAnchorEl(event.currentTarget)}
                color='inherit'>
                <Badge badgeContent={unreadMessages} color='error'>
                  <Avatar className={classes.avatar}>
                    {currentUser.displayName.charAt(0)}
                  </Avatar>
                </Badge>
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                open={accountMenuOpen}
                onClose={handleMenuClose}>
                <MenuItem component={RouterLink} to='/profil' onClick={handleMenuClose}>
                  <ListItemIcon>
                    <Editicon />
                  </ListItemIcon>
                  <ListItemText primary='Rediger profil' />
                </MenuItem>
                <MenuItem
                  component={RouterLink}
                  to='/beskeder'
                  onClick={handleMenuClose}>
                  <ListItemIcon>
                    <Badge badgeContent={unreadMessages} color='error'>
                      <MessageIcon />
                    </Badge>
                  </ListItemIcon>
                  <ListItemText primary='Beskeder' />
                </MenuItem>
                <Divider />
                <MenuItem onClick={onLogOut}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText primary='Log ud' />
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <Button
              component={RouterLink}
              to='/logind'
              color='inherit'
              className={classes.logInButton}>
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

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  unreadMessages: selectNumberOfUnreadMessages,
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart()),
  fetchConversations: userId => dispatch(fetchConversationsStart(userId)),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
