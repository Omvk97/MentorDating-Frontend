import React, { useState } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';

import AddBoxIcon from '@material-ui/icons/AddBox';

import useStyles from './MentorBanner.styles';
import { selectCurrentUser } from '../../../redux/user/user.selectors';
import { selectCategoryOptions } from '../../../redux/mentor/mentor.selectors';
import CategorySpecializations from './CategorySpecializations.component';

function MentorBanner({
  currentUser,
  categories,
  specializations,
  onChange,
  categoryOptions,
}) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategoryErrorText, setSelectedCategoryErrorText] = useState('');
  const selectedCategoryErrorBool = Boolean(selectedCategoryErrorText);

  const classes = useStyles();

  function onCategoryDelete(categoryToDelete) {
    const newCategories = categories.filter(
      category => category.toLowerCase() !== categoryToDelete.toLowerCase()
    );
    onChange(newCategories, 'categories', categoryToDelete);
  }

  function onCategoryAdd() {
    if (!selectedCategory) {
      setSelectedCategoryErrorText('Vælg en kategori');
      return;
    }
    if (categories.includes(selectedCategory)) {
      setSelectedCategoryErrorText('Denne kategori er allerede valgt');
      return;
    }
    setSelectedCategory('');
    setSelectedCategoryErrorText('');
    onChange([...categories, selectedCategory], 'categories');
  }

  function handleChange(event) {
    console.log(event.target.value);

    setSelectedCategory(event.target.value);
  }

  return (
    <div className={classes.banner}>
      <Grid container alignItems='center' justify='center' spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h3'>{currentUser.displayName}</Typography>
        </Grid>
        <Grid item xs={12}>
          {categories.map(category => (
            <React.Fragment key={category}>
              <CategorySpecializations
                category={category}
                specializations={specializations[category]}
                onDelete={onCategoryDelete}
                onChange={onChange}
              />
              <hr />
            </React.Fragment>
          ))}
        </Grid>
        <Grid container alignItems='center'>
          <Grid item xs={4}>
            <Select
              error={selectedCategoryErrorBool}
              fullWidth
              value={selectedCategory}
              onChange={handleChange}
              inputProps={{
                name: 'category',
                id: 'category',
              }}>
              {categoryOptions.map(category => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText
              hidden={!selectedCategoryErrorBool}
              className={classes.categoryError}>
              {selectedCategoryErrorText}
            </FormHelperText>
          </Grid>
          <Grid item xs={8}>
            <Tooltip title={'Tilføj kategori'}>
              <IconButton color='secondary' onClick={onCategoryAdd}>
                <AddBoxIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  categoryOptions: selectCategoryOptions,
});

export default connect(mapStateToProps)(MentorBanner);
