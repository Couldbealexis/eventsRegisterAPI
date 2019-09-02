const db = require('../models/index');

const AttendeesTypes = db.attendeesTypes;

const {
  sendResponse,
} = require('../services/response');

exports.create = (req, res) => {
  const body = req.body;
  const type = AttendeesTypes.build(body);
  type.save().then(() => {
    sendResponse(res, 'true', '200', type);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'No se ha podido crear el tipo de evento', err.message);
  });
};

exports.findAll = (req, res) => {
  AttendeesTypes.findAndCountAll({
    where: { status: 1 },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'status'],
    },
  }).then((types) => {
    sendResponse(res, 'true', '200', types);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'No se pudieron obtener los tipos de eventos', err.message);
  });
};

const detail = (res, id) => {
  AttendeesTypes.findOne({
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
  AttendeesTypes.update(body, {
    where: { id: req.params.id },
  }).then((type) => {
    if (!type) return sendResponse(res, '404', {}, 'No se pudo actualizar', 'AttendeesTypes error at update');
    return detail(res, req.params.id);
  }).catch((err) => {
    return sendResponse(res, 'false', '400', {}, 'tipo de evento no encontrado', err.message);
  });
};
