const db = require('../models/index');

const EventAttendees = db.eventAttendees;

const {
  sendResponse,
} = require('../services/response');

exports.create = (req, res) => {
  const body = req.body;
  const attendees = JSON.parse(
    body.attendees,
  );
  (Object.keys(attendees)).forEach((key) => {
    const attendee = EventAttendees.build(attendees[key]);
    attendee.event = body.event;
    attendee.save();
  });
  sendResponse(res, 'true', '200', {});
};

const detail = (res, id) => {
  EventAttendees.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  }).then((attendee) => {
    if (!attendee) return sendResponse(res, 'false', '404', {}, 'No se encontro el asistente', 'Attendee not found');
    return sendResponse(res, 'true', '200', attendee);
  }).catch((err) => {
    return sendResponse(res, 'false', '400', {}, 'No se encontro el asistente', err.message);
  });
};

exports.findAll = (req, res) => {
  EventAttendees.findAndCountAll({
    where: { event: req.params.event },
  }).then((attendees) => {
    if (!attendees) return sendResponse(res, 'false', '404', {}, 'No se encontraron asistentes', 'Not found');
    return sendResponse(res, 'true', '200', attendees);
  }).catch((err) => {
    return sendResponse(res, 'false', '400', {}, 'Error al traer los asistentes', err.message);
  });
};

exports.updateOne = (req, res) => {
  const body = req.body;
  EventAttendees.update(body, {
    where: { id: req.params.id },
  }).then((attendee) => {
    if (!attendee) return sendResponse(res, '404', {}, 'No se pudo actualizar', 'EventAttendee error at update');
    return detail(res, req.params.id);
  }).catch((err) => {
    return sendResponse(res, 'false', '400', {}, 'tipo de evento no encontrado', err.message);
  });
};
