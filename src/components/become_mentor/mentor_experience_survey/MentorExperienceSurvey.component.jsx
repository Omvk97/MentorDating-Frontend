import React from 'react';

import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '@material-ui/core/RadioGroup';

import useStyles from './MentorExperienceSurvey.styles';
import { TextField } from '@material-ui/core';

function MentorExperienceSurvey({ onChange, values: { previousExperience, reasons } }) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<Typography variant='h6' gutterBottom>
				Erfaring
			</Typography>
			<FormLabel component='legend' className={classes.label}>
				Har du undervist før?
			</FormLabel>
			<RadioGroup
				aria-label='undervist før?'
				name='previousExperience'
				className={classes.group}
				value={previousExperience}
				onChange={event => onChange('previousExperience', event.target.value)}>
				<FormControlLabel
					value='Ja, på professionelt niveau'
					control={<Radio />}
					label='Ja, på professionelt niveau'
				/>
				<FormControlLabel value='Ja, men ikke meget' control={<Radio />} label='Ja, men ikke meget' />
				<FormControlLabel value='Nej' control={<Radio />} label='Nej' />
			</RadioGroup>
			<FormLabel component='h3' className={classes.label}>
				Hvorfor vil du gerne være mentor og hvad kan du tilbyde mentees?
			</FormLabel>
			<TextField
				className={classes.reasonsInput}
				name='reasons'
				variant='outlined'
				value={reasons}
				required
				fullWidth
				multiline
				rows={5}
				id='firstName'
				onChange={event => onChange('reasons', event.target.value)}
			/>
		</React.Fragment>
	);
}

export default MentorExperienceSurvey;
