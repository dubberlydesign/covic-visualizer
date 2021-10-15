import React from 'react';
import { createTheme } from "@material-ui/core/styles";

import { useStyles } from "./stylesCovicExternalNav";

const MENU_ITEMS = ["COVIC Is", "COVIC Contains", "logo", "COVIC Team"];

const CovicExternalNav = () => {
  const theme = createTheme();
  const classes = useStyles(theme);

  const handleMenuClick = e => {
    switch(e?.currentTarget?.textContent) {
      case 'COVIC Is':
        break;
      case 'COVIC Contains':
        break;
      case 'COVIC Team':
        break;
      default:
        break;
    }
  }

  const renderNavItems = () => MENU_ITEMS.map(item => (
      <li className={classes.covicExternalNavListItem}>
        {item === "logo" 
          ? <img className={classes.covicLogo} src="./assets/logo.svg" alt="" />
          : <div className={classes.covicMenuLabel} onClick={handleMenuClick}>{item}</div>
        }
      </li>
    )
  )

  return (
    <div className={classes.covicExternalNavMenuHolder}>
      <ul className={classes.covicExternalNavList}>{renderNavItems()}</ul>
    </div>
  )
}

export default CovicExternalNav;
