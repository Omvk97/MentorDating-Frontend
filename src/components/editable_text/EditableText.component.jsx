import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

function EditableText({
  onChange,
  variant,
  value,
  multiline,
  textColor,
  onSave,
  id,
  editSize,
  tooltipTitle,
}) {
  const [editable, setEditable] = useState(false);

  const styles = React.useMemo(() => {
    return makeStyles(theme => ({
      input: {
        ...theme.typography[variant],
        padding: 0,
      },
      container: {
        display: 'inline-block',
      },
    }));
  }, [variant]);

  const classes = styles();

  function onEditOrSave() {
    if (editable) {
      if (onSave) onSave(value, id);
    }
    setEditable(!editable);
  }
  return (
    <div>
      <Grid item xs={12}>
        {editable ? (
          <TextField
            color={textColor}
            fullWidth
            multiline={multiline}
            component={variant}
            autoFocus
            onChange={onChange}
            value={value}
            inputProps={{
              spellCheck: false,
              className: classes.input,
            }}
          />
        ) : (
          <Typography color={textColor} variant={variant} component='div'>
            {value}
          </Typography>
        )}
      </Grid>
      <Grid container justify='flex-end'>
        <Tooltip title={`${editable ? 'Gem' : 'Rediger'} ${tooltipTitle}`}>
          <IconButton
            style={{ textAlign: 'end' }}
            color='secondary'
            onClick={onEditOrSave}
            size={editSize ? editSize : 'medium'}>
            {editable ? <SaveIcon /> : <EditIcon />}
          </IconButton>
        </Tooltip>
      </Grid>
    </div>
  );
}

EditableText.propTypes = {
  variant: PropTypes.oneOf([
    'h1',
    'h2',
    'h3',
    'h4',
    'h6',
    'body1',
    'body2',
    'subtitle1',
    'subtitle2',
  ]),
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  tooltipTitle: PropTypes.string.isRequired,
};

export default EditableText;
