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
import IconButton from "@material-ui/core/IconButton";

import FilterListIcon from "@material-ui/icons/FilterList";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import {
  SOURCE_NAMES,
  CHART_NAMES,
  INTENDED_MESSAGE,
  ARTICLE_TECHNIQUE,
  FIGURE_TECHNIQUES,
} from "./utils/FilterValues";
import { useStyles } from "./filterMenuStyles";

const FilterMenu = props => {
  const theme = createTheme();
  const classes = useStyles(theme);
  const [state, setState] = useState({
    bottom: false,
  });

  const [sourceName, setSourceName] = useState([]);
  const [chartName, setChartName] = useState([]);
  const [intendedName, setIntendedName] = useState([]);
  const [articleTechName, setArticleTechName] = useState([]);
  const [figureTechName, setFigureTechName] = useState([]);

  const handleSourceChange = event => {
    if (event.target.value.includes("All")) {
      setSourceName(SOURCE_NAMES);
    } else {
      setSourceName(event.target.value);
    }
  };

  const handleChartChange = event => {
    if (event.target.value.includes("All")) {
      setChartName(CHART_NAMES);
    } else {
      setChartName(event.target.value);
    }
  };

  const handleIntendedChange = event => {
    if (event.target.value.includes("All")) {
      setIntendedName(INTENDED_MESSAGE);
    } else {
      setIntendedName(event.target.value);
    }
  };

  const handleArticleTechChange = event => {
    if (event.target.value.includes("All")) {
      setArticleTechName(ARTICLE_TECHNIQUE);
    } else {
      setArticleTechName(event.target.value);
    }
  };

  const handleFigureTechChange = event => {
    if (event.target.value.includes("All")) {
      setFigureTechName(FIGURE_TECHNIQUES);
    } else {
      setFigureTechName(event.target.value);
    }
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

  const handleApplyFilterClick = () => {
    const filterObject = {
      sourceType: sourceName,
      // chartType: chartName,
    };

    console.log("handle filter apply", filterObject);
    props.handleApplyFilter(filterObject);
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
      <div className={classes.filterHeaderContainer}>
        <div className={classes.filterHeader}>Filter Visualizations By...</div>
        <IconButton
          className={classes.filterHeaderClose}
          onClick={toggleDrawer(anchor, false)}
        >
          <HighlightOffIcon className={classes.filterBtnIcon} />
        </IconButton>
      </div>

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
      <Divider />
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-chip-label'>Intended Message</InputLabel>
          <Select
            labelId='demo-mutiple-chip-label'
            id='demo-mutiple-chip'
            multiple
            value={intendedName}
            onChange={handleIntendedChange}
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
            {INTENDED_MESSAGE.map(name => (
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
      <Divider />
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-chip-label'>
            Article Technique
          </InputLabel>
          <Select
            labelId='demo-mutiple-chip-label'
            id='demo-mutiple-chip'
            multiple
            value={articleTechName}
            onChange={handleArticleTechChange}
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
            {ARTICLE_TECHNIQUE.map(name => (
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
      <Divider />
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel id='demo-mutiple-chip-label'>
            Figure Techniques
          </InputLabel>
          <Select
            labelId='demo-mutiple-chip-label'
            id='demo-mutiple-chip'
            multiple
            value={figureTechName}
            onChange={handleFigureTechChange}
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
            {FIGURE_TECHNIQUES.map(name => (
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
      <Divider />
      <div className={classes.infoIconHolder}>
        <Button
          variant='contained'
          disableElevation
          className={classes.links}
          onClick={handleApplyFilterClick}
          target='_blank'
        >
          Apply Filters
        </Button>
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
