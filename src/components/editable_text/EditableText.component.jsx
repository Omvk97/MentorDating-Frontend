import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

function EditableText({ onChange, variant, value, multiline, textColor }) {
  const [editable, setEditable] = useState(false);

  const styles = React.useMemo(() => {
    return makeStyles(theme => ({
      input: {
        ...theme.typography[variant],
        padding: 0,
      },
    }));
  }, [variant]);

  const classes = styles();
  return (
    <Grid container spacing={2} alignItems='center' justify='center'>
      <Grid item xs={8}>
        {editable ? (
          <TextField
            color={textColor}
            fullWidth
            multiline={multiline}
            component={variant}
            autoFocus
            onChange={onChange}
            value={value}
            className={classes.input}
            inputProps={{
              spellCheck: false,
            }}
          />
        ) : (
          <Typography color={textColor} variant={variant} component='div'>
            {value}
          </Typography>
        )}
      </Grid>
      <Grid item xs={4}>
        <IconButton color='secondary' onClick={() => setEditable(!editable)}>
          {editable ? <SaveIcon /> : <EditIcon />}
        </IconButton>
      </Grid>
    </Grid>
  );
}

EditableText.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default EditableText;
