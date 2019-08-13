const express = require('express');
const bodyParser = require('body-parser');

const users = require('./user/user.routes');
const userTypes = require('./user/userTypes.routes');
const userController = require('../controllers/user.controller');
const eventTypes = require('./events/eventTypes.routes');
const attendeesTypes = require('./events/attendeesTypes.routes');
const events = require('./events/event.routes');

const app = express();

app.use(bodyParser.json());

app.use('/users', users);
app.use('/userTypes', userTypes);
app.use('/eventTypes', eventTypes);
app.use('/attendeesTypes', attendeesTypes);
app.use('/events', events);

// login
app.post('/login', userController.login);

module.exports = app;
