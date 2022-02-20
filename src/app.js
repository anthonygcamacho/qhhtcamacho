'use strict';

const path = require('path');
const express = require('express');
const secure = require('express-force-https');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const routes = require('./routes');
const { DIST_DIR_PATH, VIEW_PATH, PARTIALS_PATH } = require('./helpers/constants');
// const { homedir } = require('os');
// const mongodb = require('./mongodb/mongodb.utils')

let app = express();

if(process.env.NODE_ENV === 'production'){
    app.use(secure);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', VIEW_PATH);
hbs.registerPartials(PARTIALS_PATH);

app.use(express.static(DIST_DIR_PATH));

// const publicDirectoryPath = path.join(__dirname, '../public');
// const viewsPath = path.join(__dirname, '../templates/views');
// const partialsPath = path.join(__dirname, '../templates/partials');

// -------------------------------------------------------------------------------

app.use('/', routes);

module.exports = app;