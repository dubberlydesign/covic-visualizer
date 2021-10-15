import React from 'react';
import { createTheme } from "@material-ui/core/styles";

import { useStyles } from "./stylesCovicExternalNav";

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

  return (
    <div className={classes.covicExternalNavMenuHolder}>
      <ul className={classes.covicExternalNavList}>
        <li className={classes.covicExternalNavListItem}><div className={classes.covicMenuLabel} onClick={handleMenuClick}>COVIC Is</div></li>
        <li className={classes.covicExternalNavListItem}><div className={classes.covicMenuLabel} onClick={handleMenuClick}>COVIC Contains</div></li>
        <li className={classes.covicExternalNavListItem}><img className={classes.covicLogo} src="./assets/logo.svg" alt="" /></li>
        <li className={classes.covicExternalNavListItem}><div className={classes.covicMenuLabel} onClick={handleMenuClick}>COVIC Team</div></li>
      </ul>
    </div>
  )
}

export default CovicExternalNav;
