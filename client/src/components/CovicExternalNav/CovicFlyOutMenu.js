import React from 'react';

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";

import { createTheme } from "@material-ui/core/styles";
import { useStyles } from "./stylesCovicExternalNav";

const CovicFlyOutMenu = ({handleMenuClick}) => {
  const theme = createTheme();
  const classes = useStyles(theme);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.covicFlyOut}>
      <Button
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}><div onClick={handleMenuClick}>COVIC Is</div></MenuItem>
        <MenuItem onClick={handleClose}><div onClick={handleMenuClick}>COVIC Contains</div></MenuItem>
        <MenuItem onClick={handleClose}><div onClick={handleMenuClick}>COVIC Team</div></MenuItem>
      </Menu>
    </div>
  )
}

export default CovicFlyOutMenu;
