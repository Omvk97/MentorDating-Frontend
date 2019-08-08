import React from "react";

import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import useStyles from "./PersonalInformation.styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from "@date-io/date-fns";
import daLocale from "date-fns/locale/da";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";

function PersonalInformation({
  onChange,
  values: { address, city, zipCode, educationBackground, birthDate }
}) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personlige Oplysninger
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="address"
            name="address"
            label="Adresse"
            value={address}
            fullWidth
            autoComplete="address-line1"
            onChange={event => onChange("address", event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={city}
            id="city"
            name="city"
            label="By"
            fullWidth
            autoComplete="address-level2"
            onChange={event => onChange("city", event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            value={zipCode}
            id="zip"
            name="zip"
            label="Postnummer"
            fullWidth
            autoComplete="postal-code"
            onChange={event => onChange("zipCode", event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl className={classes.educationBackground}>
            <InputLabel htmlFor="age-simple">Uddannelsesbaggrund</InputLabel>
            <Select
              value={educationBackground}
              required
              onChange={event =>
                onChange("educationBackground", event.target.value)
              }
              inputProps={{
                name: "age",
                id: "age-simple"
              }}
            >
              <MenuItem value={"Grundskole"}>Grundskole</MenuItem>
              <MenuItem value={"Gymnasiel uddannelse"}>
                Gymnasiel uddannelse
              </MenuItem>
              <MenuItem value={"Erhvervs uddannelse"}>
                Erhvervs uddannelse
              </MenuItem>
              <MenuItem value={"Erhvervsakademi uddannelse"}>
                Erhvervsakademi uddannelse
              </MenuItem>
              <MenuItem value={"Bachelor/diplom uddannelse"}>
                Bachelor/diplom uddannelse
              </MenuItem>
              <MenuItem value={"Kandidat/master uddannelse"}>
                Kandidat/master uddannelse
              </MenuItem>
              <MenuItem value={"Ph.d. uddannelse"}>Ph.d. uddannelse</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className={classes.educationBackground}>
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={daLocale}>
              <DatePicker
                fullWidth
                disableFuture
                openTo="year"
                format="dd/MM/yyyy"
                label="Fødselsdato"
                views={["year", "month", "date"]}
                value={birthDate}
                onChange={date => onChange("birthDate", date)}
              />
            </MuiPickersUtilsProvider>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PersonalInformation;
