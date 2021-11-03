import React from 'react';
import { createTheme } from "@material-ui/core/styles";
import _uniqueId from "lodash/uniqueId";
import classNames from "classnames";

import { useStyles } from "./stylesCovicExternalNav";

const MENU_ITEMS = ["COVIC Is", "COVIC Contains", "COVIC Visualizer", "logo", "COVIC Team"];

const CovicExternalNav = () => {
  const theme = createTheme();
  const classes = useStyles(theme);

  const handleMenuClick = e => {
    let link = '';
    switch(e?.currentTarget?.textContent) {
      case 'COVIC Is':
        link = 'http://covic-archive.org/covic-is.html';
        break;
      case 'COVIC Contains':
        link = 'http://covic-archive.org/covic-contains.html';
        break;
      case 'COVIC Team':
        link = 'http://covic-archive.org/team.html';
        break;
      case 'COVIC Visualizer':
        return;
      default:
        break;
    }

    window.open(link, "_blank");
  }

  const renderNavItems = () => MENU_ITEMS.map(item => (
      <li className={classes.covicExternalNavListItem} key={_uniqueId()}>
        {item === "logo" 
          ? <img className={classes.covicLogo} src="./assets/logo.svg" alt="" />
          : <div className={classNames(classes.covicMenuLabel, item === 'COVIC Visualizer' ? classes.covicMenuSelected : '')} onClick={handleMenuClick}>{item}</div>
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
