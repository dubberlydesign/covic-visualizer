# COVIC Visualizer
# Steps to run project locally

From within the covic-visualizer/client folder run:

## Install Client Dependencies
```javascript
yarn
```
## Run App Locally
```javascript
yarn start
```
<br /><br />

# Deploying to Heroku
From within the covic-visualizer folder run:

```javascript
git push heroku main
```

### Live link

```javascript
https://covic-visualizer.herokuapp.com
```
<br /><br />

---

<br /><br />

# Airtable Information
<b>*Please do not edit the column names, param names for these views)</b>

Views used from Figures Table
```javascript
API [DO NOT EDIT]
API [DO NOT EDIT] old-new
Figures Grid
```

### Metadata table
Metadata table is used to populate filter categories
```javascript
API [DO NOT EDIT]
```
<br /><br />

---

<br /><br />

# Components Breakdown

## Articles.js
Contains the main part of the app that is responsible for making the calls to the API.

```javascript

requestData params:
  pagination (true/false), 
  queryType ('search/filter'), 
  filterType ('FIND/SEARCH'), 
  term (search/filter term), 
  fieldCol (field column to search), 
  inOrderDisplay (order of display), 
  searchValue (search value), 
  filterValue (filter value)
```
<br /><br />

## Header Main Nav
Main nav containing the Covic logo and jumplinks can be found in folder `CovicExternalNav`

To Edit the menu names, go to `CovicExternalNav.js`
```javascript
const MENU_ITEMS = ["COVIC Is", "COVIC Contains", "COVIC Visualizer", "logo", "COVIC Team"];
```
<br /><br />

## Filter Menu
Filter Menu can be found in folder `FilterMenu`<br />
This includes the Search Bar along with the Filter Categories<br />
Filters are broken down into:
#### ARTICLE ATTRIBUTES
- Source Type
- Country
- Language
- Publisher
- Subject
- Article Technique
- Date Range (To/From)
#### FIGURE ATTRIBUTES
- Visualization Type
- Visual Technique
- Interaction Technique

<br /><br />

## Modal
Modal for Figures/In Article/Page can be found in folder: `Modal`

To Edit the top menu, go to `ModalHeader.js`
```javascript
  <Button
    variant='contained'
    disabled={modalState === 'figures'}
    disableElevation
    className={classes.modalButton}
    onClick={() => setModalState('figures')}
  >
    Figure
  </Button>
```

To Edit the metadata being dispalyed, go to `ModalHeader.js`<br />
Example of Title Code
```javascript
  <Typography
    variant='body2'
    color='textSecondary'
    component='p'
    className={classes.modalTextHolderHeader}
  >
    {curItem?.fields["Title (from Article)"]}
  </Typography>
```
<br /><br />

## Toggle Menu
Toggle Menu can be found and edited in folder: `ToggleMenu`<br />
This will control the gallery display for `Published Date(New/Old)` and `Labels(On/Off)`
