# COVIC Visualizer Server

# COVIC Visualizer Client
For information about running visualizer client reference:
[a link](https://github.com/dubberlydesign/covic-visualizer/blob/main/client/README.md)
# Steps to run project locally

From within the covic-visualizer folder run:

## Install Server Dependencies

```javascript
npm install
```
## Start up Local Server

```javascript
npm run dev
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

# API Breakdown

## covic-data.js
Contains the main part of the app that is responsible handling interaction between the Airtable Data

### BaseURL:
```javascript

https://api.airtable.com/v0/...
```
<br /><br />

## AirTable Routes

```javascript
base: '/'
figures: '/figures'
meta: '/metadata'
```
<br /><br />
