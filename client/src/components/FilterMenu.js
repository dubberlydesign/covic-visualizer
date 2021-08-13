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
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";

import { SOURCE_NAMES, SUBJECTS } from "./utils/FilterValues";
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
  const initialStartDate = "2020-02-01T21:11:54";
  const dateFormatting = "MM/dd/yyyy";
  const initialNewDate = new Date(initialStartDate);

  const FILTER_CATEGORIES = [
    {
      filterLabel: "Source Type",
      filterName: sourceName,
      setFilter: setSourceName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Source Type"],
    },
    {
      filterLabel: "Country Type",
      filterName: countryName,
      setFilter: setCountryName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Country"],
    },
    {
      filterLabel: "Language Type",
      filterName: languageName,
      setFilter: setLanguageName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Language"],
    },
    {
      filterLabel: "Publisher Type",
      filterName: publisherName,
      setFilter: setPublisherName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Publisher"],
    },
    {
      filterLabel: "Subject Type",
      filterName: subjectName,
      setFilter: setSubjectName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Subject(s)"],
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
      countryType: countryName,
      languageType: languageName,
      publisherType: publisherName,
      subjectType: subjectName,
      isDateFilter:
        format(selectedDateBefore, dateFormatting) !==
        format(initialNewDate, dateFormatting),
      dateRange: [
        format(selectedDateBefore, dateFormatting),
        format(selectedDateAfter, dateFormatting),
      ],
    };

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

  const [selectedDateBefore, setSelectedDateBefore] = useState(initialNewDate);
  const [selectedDateAfter, setSelectedDateAfter] = useState(new Date());

  const handleDateChangeBefore = date => {
    setSelectedDateBefore(date);
  };

  const handleDateChangeAfter = date => {
    setSelectedDateAfter(date);
  };

  const renderFilterCategories = () =>
    FILTER_CATEGORIES.map(
      ({ filterLabel, filterName, setFilter, filterData }) => (
        <>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id='mutiple-chip-label'>{filterLabel}</InputLabel>
              <Select
                labelId='mutiple-chip-label'
                id='mutiple-chip'
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

  const renderDateFilter = () => {
    return (
      <>
        <div>
          <InputLabel id='mutiple-chip-label' className={classes.dateRange}>
            Date Range
          </InputLabel>
          <FormControl className={classes.datePickers}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                label='From'
                value={selectedDateBefore}
                onChange={handleDateChangeBefore}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/dd/yyyy'
                margin='normal'
                id='date-picker-inline'
                label='To'
                value={selectedDateAfter}
                onChange={handleDateChangeAfter}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
          <Divider />
        </div>
      </>
    );
  };

  const list = anchor => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "bottom",
      })}
      role='presentation'
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
      {renderDateFilter()}
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