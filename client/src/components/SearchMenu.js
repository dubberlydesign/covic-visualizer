import React from 'react';
import { createTheme } from "@material-ui/core/styles";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

import { useStyles } from "./styles";

const SearchMenu = ({handleSubmit, handleChange}) => {
  const theme = createTheme();

  const classes = useStyles(theme);

  return (
    <form className={classes.formHolderSide}>
      <TextField
        id='standard-full-width'
        style={{ margin: "8px 18px 8px 0" }}
        placeholder='Search Visualizations...'
        helperText='Search'
        fullWidth
        margin='normal'
        FormHelperTextProps={{
          className: classes.helperText,
        }}
        InputProps={{
          className: classes.inputText,
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                style={{
                  padding: "0",
                }}
                onClick={handleSubmit}
                type='submit'
              >
                <SearchOutlinedIcon
                  style={{
                    fontSize: 30,
                    color: "#C6AD8F",
                    letterSpacing: "-2.5px",
                    opacity: ".5",
                  }}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
        onChange={handleChange}
      />
    </form>
  )
}

export default SearchMenu;
