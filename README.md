# COVIC Visualizer Server

### COVIC Visualizer Client
For information about running the client app reference:
[COVIC Visualizer Client](client/README.md)
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

# Deploying to a different server
Covic Visualizer server is built off of Node.js, so your deployment environment must be capable running Node.js

On your deployment environment please add the following environment variables(*contact admin for airtable keys)

```javascript
AIRTABLE_API_KEY
AIRTABLE_BASE
```

* Please never place these Airtable Environment variables in the projects .env file as this is sensitive access data.

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
