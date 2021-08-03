import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { createTheme } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";

import FilterListIcon from "@material-ui/icons/FilterList";
import InfoIcon from "@material-ui/icons/Info";

import { SOURCE_NAMES, CHART_NAMES } from "./utils/FilterValues";
import { useStyles } from "./filterMenuStyles";

const FilterMenu = () => {
  const theme = createTheme();
  const classes = useStyles(theme);
  const [state, setState] = useState({
    bottom: false,
  });

  const [sourceName, setSourceName] = useState([]);
  const [chartName, setChartName] = useState([]);

  const handleSourceChange = event => {
    setSourceName(event.target.value);
  };

  const handleChartChange = event => {
    setChartName(event.target.value);
  };

  const handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setSourceName(value);
  };

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const getStyles = (name, nameType, theme) => {
    return {
      fontWeight:
        nameType.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "bottom",
      })}
      role='presentation'
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.filterHeader}>Filter Visualizations By...</div>
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-chip-label'>Source Type</InputLabel>
          <Select
            labelId='demo-mutiple-chip-label'
            id='demo-mutiple-chip'
            multiple
            value={sourceName}
            onChange={handleSourceChange}
            input={<Input id='select-multiple-chip' />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {SOURCE_NAMES.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, sourceName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Divider />
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-chip-label'>Chart Type</InputLabel>
          <Select
            labelId='demo-mutiple-chip-label'
            id='demo-mutiple-chip'
            multiple
            value={chartName}
            onChange={handleChartChange}
            input={<Input id='select-multiple-chip' />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(value => (
                  <Chip key={value} label={value} className={classes.chip} />
                ))}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {CHART_NAMES.map(name => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, chartName, theme)}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={classes.infoIconHolder}>
        <InfoIcon className={classes.filterInfoIcon} />
      </div>
    </div>
  );

  return ["bottom"].map(anchor => (
    <Fragment key={anchor}>
      <Button
        className={classes.filterButton}
        onClick={toggleDrawer(anchor, true)}
      >
        <FilterListIcon className={classes.filterIcon} />
        FILTER
      </Button>
      <Drawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
      >
        {list(anchor)}
      </Drawer>
    </Fragment>
  ));
};

export default FilterMenu;
