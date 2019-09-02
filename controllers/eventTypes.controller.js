const db = require('../models/index');

const EventType = db.eventTypes;

const {
  sendResponse,
} = require('../services/response');

exports.create = (req, res) => {
  const body = req.body;
  let type = EventType.build(body);
  type.save().then(() => {
    sendResponse(res, 'true', '200', type);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'No se ha podido crear el tipo de evento', err.message);
  });
};

exports.findAll = (req, res) => {
  EventType.findAndCountAll({
    where: { status: 1 },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'status'],
    }}).then((types) => {
      sendResponse(res, 'true', '200', types);
  }).catch((err) => {
      sendResponse(res, 'false', '400', {}, 'No se pudieron obtener los tipos de eventos', err.message);
  });
};

const detail = (res, id) => {
  EventType.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  }).then((type) => {
    if (!type) return sendResponse(res, 'false', '404', {}, 'No se encontro el tipo de evento', 'Type not found');
    return sendResponse(res, 'true', '200', type);
  }).catch((err) => {
    return sendResponse(res, 'false', '404', {}, 'No se encontro el tipo de evento', err.message);
  });
};

exports.findOne = (req, res) => {
  return detail(res, req.params.id);
};

exports.updateOne = (req, res) => {
  const body = req.body;
  EventType.update(body, {
    where: { id: req.params.id },
  }).then((type) => {
    if (!type) return sendResponse(res, '404', {}, 'No se pudo actualizar', 'EventType error at update');
    return detail(res, req.params.id);
  }).catch((err) => {
    return sendResponse(res, 'false', '400', {}, 'tipo de evento no encontrado', err.message);
  });
};
