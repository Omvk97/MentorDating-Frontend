import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

import useStyles from './MentorBanner.styles';

function CategorySpecializations({ specializations, category, onChange, onDelete }) {
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [newSpecializationText, setNewSpecializationText] = useState('');
  const [specializationTextError, setSpecializationTextError] = useState('');
  const specializationTextErrorBool = Boolean(specializationTextError);
  const popoverOpen = Boolean(popoverAnchor);
  const classes = useStyles();

  function onChipDelete(specializationToDelete) {
    specializations = specializations.filter(
      spec => spec.toLowerCase() !== specializationToDelete.toLowerCase()
    );
    onChange({ [category]: specializations }, 'specializations');
  }

  function onChipAdd() {
    if (newSpecializationText.length === 0) {
      setSpecializationTextError('Min. et bogstav');
      return;
    }
    if (!specializations) specializations = [];

    const indexOfNewItem = specializations.findIndex(
      speci => speci.toLowerCase() === newSpecializationText.toLowerCase()
    );
    if (indexOfNewItem !== -1) {
      setSpecializationTextError('Allerede tilføjet');
      return;
    }
    specializations.push(newSpecializationText);
    onChange({ [category]: specializations }, 'specializations');
    setPopoverAnchor(null);
    setNewSpecializationText('');
  }

  return (
    <Grid container alignItems='center' justify='space-between'>
      <Grid item xs={4} md={2}>
        <Typography variant='subtitle2'>{category}</Typography>
      </Grid>
      <Grid item xs={7} md={9}>
        <div>
          {specializations
            ? specializations.map(spec => (
                <Chip
                  className={classes.specializationChip}
                  key={spec}
                  onDelete={() => onChipDelete(spec)}
                  label={spec}
                  color='primary'
                  size='small'
                  variant='outlined'
                />
              ))
            : null}
          <Tooltip title={'Tilføj specializering'}>
            <IconButton
              size='small'
              color='secondary'
              onClick={event => setPopoverAnchor(event.currentTarget)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Grid>
      <Popover
        id={popoverOpen ? 'simple-popover' : undefined}
        open={popoverOpen}
        anchorEl={popoverAnchor}
        onClose={() => setPopoverAnchor(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        <Paper className={classes.textField}>
          <Grid container item alignItems='flex-end' justify='flex-end'>
            <TextField
              id='standard-name'
              autoFocus
              helperText={specializationTextError}
              error={specializationTextErrorBool}
              label='Ny specialisering'
              value={newSpecializationText}
              onChange={event => setNewSpecializationText(event.target.value)}
            />
          </Grid>
          <Grid container item justify='center'>
            <Tooltip title={'Tilføj'}>
              <IconButton
                color='secondary'
                size='small'
                onClick={onChipAdd}
                className={classes.addSpecializationButton}>
                <CheckCircleOutlineIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Paper>
      </Popover>

      <Grid item xs={1} style={{ textAlign: 'end' }}>
        <Tooltip title={`Slet ${category}`}>
          <IconButton className={classes.deleteIcon} onClick={() => onDelete(category)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default CategorySpecializations;
