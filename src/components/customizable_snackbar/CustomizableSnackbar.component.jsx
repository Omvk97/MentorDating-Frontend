import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

import useStyles from './CustomizableSnackbar.styles';
import {
  selectSnackbarMessage,
  selectSnackbarOpen,
  selectSnackbarVariant,
} from '../../redux/layout/layout.selectors';
import { closeSnackbar } from '../../redux/layout/layout.actions';

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

function CustomizableSnackbar({ open, variant, message, closeSnackbar }) {
  const classes = useStyles();

  const Icon = variantIcon[variant];

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    closeSnackbar();
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={5500}
      onClose={handleClose}>
      <SnackbarContent
        className={clsx(classes[variant])}
        message={
          <span className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key='close'
            aria-label='close'
            color='inherit'
            onClick={handleClose}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  );
}

const mapStateToProps = createStructuredSelector({
  open: selectSnackbarOpen,
  message: selectSnackbarMessage,
  variant: selectSnackbarVariant,
});

const mapDispatchToProps = dispatch => ({
  closeSnackbar: () => dispatch(closeSnackbar()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizableSnackbar);

CustomizableSnackbar.propTypes = {
  message: PropTypes.string,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
};
