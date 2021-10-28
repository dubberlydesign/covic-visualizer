import React, {useState} from 'react';
import { createTheme } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useStyles } from "./stylesToggleMenu";

const ToggleMenu = ({toggleOrder, toggleLabel, checkedOrder, setCheckedOrder, checkedLabel, setCheckedLabel}) => {
  const theme = createTheme();

  const classes = useStyles(theme);

  const handleSwitchChangeOrder = event => {
    toggleOrder(event.target.checked);
    setCheckedOrder(event.target.checked);
  };

  const handleSwitchChangeLabel = event => {
    toggleLabel(event.target.checked);
    setCheckedLabel(event.target.checked);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>New</Grid>
              <Grid item>
                <Switch 
                  className={classes.toggleSwitchOrder} 
                  checked={checkedOrder} 
                  onChange={handleSwitchChangeOrder} 
                  name="checkedOrder" 
                  color="default"
                />
              </Grid>
            <Grid item>Old</Grid>
          </Grid>
        }
        label="Published Date"
        className={classes.toggleSwitchOrderLabel}
        labelPlacement="top"
      />
      <FormControlLabel
        control={
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>On</Grid>
              <Grid item>
                <Switch 
                  className={classes.toggleSwitchOrder} 
                  checked={checkedLabel} 
                  onChange={handleSwitchChangeLabel} 
                  name="checkedLabel"
                  color="default" 
                />
              </Grid>
            <Grid item>Off</Grid>
          </Grid> 
        }
        label="Labels"
        className={classes.toggleSwitchOrderLabel}
        labelPlacement="top"
      />
    </div>
  )
}

export default ToggleMenu;
