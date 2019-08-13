const uuid = require('uuid/v4');
const db = require('../models/index');

const User = db.user;
const Event = db.events;
const EventType = db.eventTypes;
const EventDetails = db.eventDetail;
const EventAttendees = db.eventAttendees;
const AttendeesTypes = db.attendeesTypes;

const {
  sendResponse,
} = require('../services/response');

exports.create = (req, res) => {
  const body = req.body;
  let event = Event.build(body);
  event.id = uuid();
  event.save().then(() => {
    sendResponse(res, 'true', '200', event);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'No se ha podido crear el evento', err.message);
  });
};

exports.findAll = (req, res) => {
  Event.findAndCountAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    }}).then((types) => {
      sendResponse(res, 'true', '200', types);
  }).catch((err) => {
      sendResponse(res, 'false', '400', {}, 'No se pudieron obtener los tipos de eventos', err.message);
  });
};

const detail = (res, id) => {
  Event.findOne({
    where: {
      id,
    },
    attributes: ['id', 'startDate', 'endDate'],
    include: [{
      model: User,
      as: 'userInCharge',
      attributes: ['id', 'code', 'name'],
    },{
      model: User,
      as: 'userCreate',
      attributes: ['id', 'code', 'name'],
    },{
      model: EventType,
      as: 'type',
      attributes: ['id', 'description'],
    },{
      model: EventDetails,
      as: 'detail',
      attributes: ['place', 'description'],
      where: {status: 1},
    },{
      model: EventAttendees,
      as: 'attendees',
      attributes: ['code', 'name'],
      where: {status: 1},
      include: [{
        model: AttendeesTypes,
        attributes: ['id', 'description'],
      }],
    }]
  }).then((event) => {
    if (!event) return sendResponse(res, 'false', '404', {}, 'No se encontro el evento', 'Event not found');
    return sendResponse(res, 'true', '200', event);
  }).catch((err) => {
    return sendResponse(res, 'false', '404', {}, 'No se encontro el evento', err.message);
  });
};

exports.findOne = (req, res) => {
  return detail(res, req.params.id);
};

exports.updateOne = (req, res) => {
  const body = req.body;
  Event.update(body, {
    where: { id: req.params.id },
  }).then((type) => {
    if (!type) return sendResponse(res, '404', {}, 'No se pudo actualizar', 'Event error at update');
    return detail(res, req.params.id);
  }).catch((err) => {
    return sendResponse(res, 'false', '400', {}, 'Evento no encontrado', err.message);
  });
};