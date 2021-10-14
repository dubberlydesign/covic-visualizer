import React, {useState} from 'react';
import { createTheme } from "@material-ui/core/styles";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from "@material-ui/core/FormControlLabel";

import { useStyles } from "./stylesToggleMenu";

const ToggleMenu = ({toggleOrder, toggleLabel}) => {
  const theme = createTheme();

  const classes = useStyles(theme);

  const [checkedOrder, setCheckedOrder] = useState(false);
  const [checkedLabel, setCheckedLabel] = useState(false);
  
  const handleSwitchChangeOrder = event => {
    toggleOrder(event.target.checked);
    setCheckedOrder(event.target.checked);
  };

  const handleSwitchChangeLabel = event => {
    toggleLabel(event.target.checked);
    setCheckedLabel(event.target.checked);
  };

  return (
    <div className={classes.ToggleMenuHolder}>
      <FormControlLabel
        control={
          <Switch 
            className={classes.ToggleSwitchOrder} 
            checked={checkedOrder} 
            onChange={handleSwitchChangeOrder} 
            name="checkedOrder" 
            color="default"
          /> 
        }
        label="Published Date"
        className={classes.ToggleSwitchOrderLabel}
        labelPlacement="top"
      />
      <FormControlLabel
        control={
          <Switch 
            className={classes.ToggleSwitchOrder} 
            checked={checkedLabel} 
            onChange={handleSwitchChangeLabel} 
            name="checkedLabel"
            color="default" 
          /> 
        }
        label="Labels"
        className={classes.ToggleSwitchOrderLabel}
        labelPlacement="top"
      />
    </div>
  )
}

export default ToggleMenu;
