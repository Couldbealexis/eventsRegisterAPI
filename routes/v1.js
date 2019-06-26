const express = require('express');
const bodyParser = require('body-parser');

const users = require('./user/user.routes');
const userController = require('../controllers/user.controller');

const app = express();

app.use(bodyParser.json());

app.use('/users', users);

// login
app.post('/login', userController.login);

module.exports = app;
