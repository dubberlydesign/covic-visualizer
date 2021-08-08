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

import { SUBJECTS } from "./utils/FilterValues";
import { useStyles } from "./filterMenuStyles";

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

const isEmpty = obj => {
  return Object.keys(obj).length === 0;
};

const FilterMenu = props => {
  const theme = createTheme();
  const classes = useStyles(theme);
  const [state, setState] = useState({
    bottom: false,
  });

  const [sourceName, setSourceName] = useState([]);
  const [countryName, setCountryName] = useState([]);
  const [languageName, setLanguageName] = useState([]);
  const [publisherName, setPublisherName] = useState([]);
  const [subjectName, setSubjectName] = useState([]);

  const FILTER_CATEGORIES = [
    {
      filterLabel: "Source Type",
      filterName: sourceName,
      setFilter: setSourceName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues?.sourceType,
    },
    {
      filterLabel: "Country Type",
      filterName: countryName,
      setFilter: setCountryName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues?.country,
    },
    {
      filterLabel: "Language Type",
      filterName: languageName,
      setFilter: setLanguageName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues?.language,
    },
    {
      filterLabel: "Publisher Type",
      filterName: publisherName,
      setFilter: setPublisherName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues?.publisher,
    },
    {
      filterLabel: "Subject Type",
      filterName: subjectName,
      setFilter: setSubjectName,
      filterData: SUBJECTS,
    },
  ];

  const handleFilterChange = (event, setFilter, filterData) => {
    if (event.target.value.includes("All")) {
      setFilter(filterData);
    } else {
      setFilter(event.target.value);
    }
  };

  const handleApplyFilterClick = () => {
    const filterObject = {
      sourceType: sourceName,
      // chartType: chartName,
    };

    console.log("handle filter apply", filterObject);
    props.handleApplyFilter(filterObject);
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

  const renderFilterCategories = () =>
    FILTER_CATEGORIES.map(
      ({ filterLabel, filterName, setFilter, filterData }) => (
        <>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id='demo-mutiple-chip-label'>
                {filterLabel}
              </InputLabel>
              <Select
                labelId='demo-mutiple-chip-label'
                id='demo-mutiple-chip'
                multiple
                value={filterName}
                onChange={e => handleFilterChange(e, setFilter, filterData)}
                input={<Input id='select-multiple-chip' />}
                renderValue={selected => (
                  <div className={classes.chips}>
                    {selected.map(value => (
                      <Chip
                        key={value}
                        label={value}
                        className={classes.chip}
                      />
                    ))}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {filterData.map(name => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, filterName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Divider />
        </>
      )
    );

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
      {renderFilterCategories()}

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
