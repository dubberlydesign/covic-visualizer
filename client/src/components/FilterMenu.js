import React, { useLayoutEffect, useState, Fragment } from "react";
import clsx from "clsx";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import classNames from "classnames";

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
import CancelIcon from "@material-ui/icons/Cancel";
import _without from "lodash/without";

import FilterListIcon from "@material-ui/icons/FilterList";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { format } from "date-fns";
import isValid from "date-fns/isValid";
import { useStyles } from "./filterMenuStyles";
import { DEFAULT_MATERIAL_THEME } from "../utils/stylesHelper";
import SearchMenu from './SearchMenu';
import ToggleMenu from "./ToggleMenu/ToggleMenu";
import './GlobalCssSlider.css';

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

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
  const [visualizationName, setVisualizationName] = useState([]);
  const [visualTechName, setVisualTechName] = useState([]);
  const [interactionName, setInteractionName] = useState([]);
  const [articleTechName, setArticleTechName] = useState([]);
  const initialStartDate = "2020-01-01T21:11:54";
  const dateFormatting = "MM/dd/yyyy";
  const initialNewDate = new Date(initialStartDate);
  const [isDisableFilterApply, setIsDisableFilterApply] = useState(false);

  // toggleMenu states for order and label
  const [checkedOrder, setCheckedOrder] = useState(false);
  const [checkedLabel, setCheckedLabel] = useState(false);

  const [isFilterChange, setIsFilterChange] = useState(false);

  const FILTER_CATEGORIES_ARTICLE = [
    {
      filterLabel: "Source Type",
      filterName: sourceName,
      setFilter: setSourceName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Source Type"],
    },
    {
      filterLabel: "Country",
      filterName: countryName,
      setFilter: setCountryName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Country"],
    },
    {
      filterLabel: "Language",
      filterName: languageName,
      setFilter: setLanguageName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Language"],
    },
    {
      filterLabel: "Publisher",
      filterName: publisherName,
      setFilter: setPublisherName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Publisher"],
    },
    {
      filterLabel: "Subject",
      filterName: subjectName,
      setFilter: setSubjectName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Subject(s)"],
    },
    {
      filterLabel: "Article Technique",
      filterName: articleTechName,
      setFilter: setArticleTechName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Article Technique"],
    },
  ];

  const FILTER_CATEGORIES_FIGURE = [
    {
      filterLabel: "Visualization Type",
      filterName: visualizationName,
      setFilter: setVisualizationName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Visualization Type"],
    },
    {
      filterLabel: "Visual Technique",
      filterName: visualTechName,
      setFilter: setVisualTechName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Visual Technique"],
    },
    {
      filterLabel: "Interaction Technique",
      filterName: interactionName,
      setFilter: setInteractionName,
      filterData: isEmpty(props.filteringValues)
        ? []
        : props.filteringValues["Interaction Technique"],
    },
  ];

  const handleFilterChange = (event, setFilter, filterData) => {
    setIsFilterChange(true);
    if (event.target.value.includes("All")) {
      setFilter(filterData);
    } else {
      setFilter(event.target.value);
    }
  };

  const getFilterObject = () => {
    return {
      sourceType: sourceName,
      countryType: countryName,
      languageType: languageName,
      publisherType: publisherName,
      subjectType: subjectName,
      visualizationType: visualizationName,
      visualTechType: visualTechName,
      interactionType: interactionName,
      articleTechType: articleTechName,
      isDateFilter:
        format(selectedDateBefore, dateFormatting) !==
        format(initialNewDate, dateFormatting) || format(selectedDateAfter, dateFormatting) !== format(new Date(), dateFormatting),
      dateRange: [
        format(selectedDateBefore, dateFormatting),
        format(selectedDateAfter, dateFormatting),
      ],
    };
  }

  const handleApplySubmit = e => {
    props.handleSubmit(e, getFilterObject());
  }

  const handleSearchClear = () => {
    props.handleSearchClear(getFilterObject())
  }

  const handleApplyFilterClick = (anchor, open) => event => {
    setIsFilterChange(false);
    const filterObject = {
      sourceType: sourceName,
      countryType: countryName,
      languageType: languageName,
      publisherType: publisherName,
      subjectType: subjectName,
      visualizationType: visualizationName,
      visualTechType: visualTechName,
      interactionType: interactionName,
      articleTechType: articleTechName,
      isDateFilter:
        format(selectedDateBefore, dateFormatting) !==
        format(initialNewDate, dateFormatting) || format(selectedDateAfter, dateFormatting) !== format(new Date(), dateFormatting),
      dateRange: [
        format(selectedDateBefore, dateFormatting),
        format(selectedDateAfter, dateFormatting),
      ],
    };
    props.handleApplyFilter(filterObject);

    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleResetFilter = (anchor, open) => event => {
    setIsFilterChange(false);

    setSourceName([]);
    setCountryName([]);
    setLanguageName([]);
    setPublisherName([]);
    setPublisherName([]);
    setSubjectName([]);
    setVisualizationName([]);
    setVisualTechName([]);
    setInteractionName([]);
    setArticleTechName([]);
    setSelectedDateBefore(initialNewDate);
    setSelectedDateAfter(new Date());
    
    const filterObject = {
      sourceType: [],
      countryType: [],
      languageType: [],
      publisherType: [],
      subjectType: [],
      visualizationType: [],
      visualTechType: [],
      interactionType: [],
      articleTechType: [],
      isDateFilter:
        format(selectedDateBefore, dateFormatting) !==
        format(initialNewDate, dateFormatting),
      dateRange: [
        format(initialNewDate, dateFormatting),
        format(new Date(), dateFormatting),
      ],
    };

    props.resetToggles();
    setCheckedOrder(false);
    setCheckedLabel(false);
    props.setSearchVal('');
    
    props.handleApplyFilter(filterObject);
    setState({ ...state, [anchor]: open });
  };

  const [selectedDateBefore, setSelectedDateBefore] = useState(initialNewDate);
  const [selectedDateAfter, setSelectedDateAfter] = useState(new Date());

  const handleDateChangeBefore = date => {
    setIsFilterChange(true);
    setSelectedDateBefore(date);
    if (isValid(date)) {
      setIsDisableFilterApply(false);
    } else {
      setIsDisableFilterApply(true);
    }
  };

  const handleDateChangeAfter = date => {
    setIsFilterChange(true);
    setSelectedDateAfter(date);
    if (isValid(date)) {
      setIsDisableFilterApply(false);
    } else {
      setIsDisableFilterApply(true);
    }
  };

  const handleSearchEdit = e => {
    props.handleChange(e);
  }
 
  const handleDelete = (e, value) => {
    e.preventDefault();
    if (sourceName.includes(value)) {
      setSourceName(current => _without(current, value));
    }
    if (countryName.includes(value)) {
      setCountryName(current => _without(current, value));
    }
    if (languageName.includes(value)) {
      setLanguageName(current => _without(current, value));
    }
    if (publisherName.includes(value)) {
      setPublisherName(current => _without(current, value));
    }
    if (publisherName.includes(value)) {
      setPublisherName(current => _without(current, value));
    }
    if (subjectName.includes(value)) {
      setSubjectName(current => _without(current, value));
    }
    if (visualizationName.includes(value)) {
      setVisualizationName(current => _without(current, value));
    }
    if (visualTechName.includes(value)) {
      setVisualTechName(current => _without(current, value));
    }
    if (interactionName.includes(value)) {
      setInteractionName(current => _without(current, value));
    }
    if (articleTechName.includes(value)) {
      setArticleTechName(current => _without(current, value));
    }
    setIsFilterChange(true);
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

  const renderArticleFilterCategories = () => 
    FILTER_CATEGORIES_ARTICLE.map(
      ({ filterLabel, filterName, setFilter, filterData }, index) => (
        <div key={index}>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id='mutiple-chip-label' shrink={filterName.length === 0 ? false : true} focused={false} >{filterLabel} {filterData?.length > 0 ? `(${filterData?.length})` : ''}</InputLabel>
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
                        clickable
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={event => event.stopPropagation()}
                          />
                        }
                        onDelete={e => handleDelete(e, value)}
                        onClick={() => {}}
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
        </div>
      )
    );

  const renderFigureFilterCategories = () => 
    FILTER_CATEGORIES_FIGURE.map(
      ({ filterLabel, filterName, setFilter, filterData }, index) => (
        <div key={index} className={classes.figureFilterMenu}>
          <div>
            <FormControl className={classes.formControl}>
              <InputLabel id='mutiple-chip-label' shrink={filterName.length === 0 ? false : true} focused={false}>{filterLabel} {filterData?.length > 0 ? `(${filterData?.length})` : ''}</InputLabel>
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
                        clickable
                        deleteIcon={
                          <CancelIcon
                            onMouseDown={event => event.stopPropagation()}
                          />
                        }
                        onDelete={e => handleDelete(e, value)}
                        onClick={() => {}}
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
        </div>
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
              <ThemeProvider theme={DEFAULT_MATERIAL_THEME}>
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
                  className={classes.datePickerKeyboard}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </FormControl>
          <Divider />
        </div>
      </>
    );
  };

  const list = (anchor, handleSubmit, handleChange, toggleOrder, toggleLabel)  => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "bottom",
      })}
      role='presentation'
    >
      <div className={classes.filterHeaderContainer}>
          <IconButton
            className={classes.filterHeaderClose}
            onClick={toggleDrawer(anchor, false)}
          >
            <HighlightOffIcon className={classes.filterBtnIcon} />
          </IconButton>
        </div>
      <div className={classes.toggleMenu}>
        <ToggleMenu 
          toggleOrder={toggleOrder}
          toggleLabel={toggleLabel}
          checkedOrder={checkedOrder}
          checkedLabel={checkedLabel}
          setCheckedOrder={setCheckedOrder}
          setCheckedLabel={setCheckedLabel}
        />
      </div>
      <div className={classes.searchFilterHolder}>
        <SearchMenu 
          handleSubmit={handleApplySubmit}
          handleChange={handleSearchEdit}
          handleSearchClear={handleSearchClear}
          searchValue={props.searchValue}
          setSearchVal={props.setSearchVal}
        />
        <div className={classes.filterHeaders}>ARTICLE ATTRIBUTES</div>
        {renderArticleFilterCategories()}
        {renderDateFilter()}
        <div className={classes.filterHeaders}>FIGURE ATTRIBUTES</div>
        {renderFigureFilterCategories()}
        <div className={classes.filterButtonsHolder}>
          <div
            className={
              isDisableFilterApply
                ? classes.disableIconHolder
                : classes.infoIconHolder
            }
          >
            <Button
              variant='contained'
              disableElevation
              className={classNames(classes.links, isFilterChange ? '' : classes.disableFilterApply)}
              onClick={
                isDisableFilterApply
                  ? () => {}
                  : handleApplyFilterClick(anchor, false)
              }
            >
              Apply
            </Button>
          </div>
          <div className={classes.resetIconHolder}>
            <Button
              variant='contained'
              disableElevation
              className={classes.links}
              onClick={handleResetFilter(anchor, false)}
            >
              Reset
            </Button>
          </div>
        </div>
        <div className={classNames(classes.filterCTA, isFilterChange ? '' : classes.filterCTAHide)}>*Click Apply to update results</div>
      </div>
    </div>
  );
  const [width] = useWindowSize();

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
        anchor={width > 1280 ? "left" : anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        {...(width > 1280 ? {variant: "permanent"} : null)}
      >
        {list(anchor, props.handleSubmit, props.handleChange, props.toggleOrder, props.toggleLabel)}
      </Drawer>
    </Fragment>
  ));
};

export default FilterMenu;
