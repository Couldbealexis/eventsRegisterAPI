const db = require('../models/index');

const EventDetails = db.eventDetail;

const {
  sendResponse,
} = require('../services/response');

exports.create = (req, res) => {
  const body = req.body;
  const detail = EventDetails.build(body);
  detail.save().then(() => {
    sendResponse(res, 'true', '200', detail);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'No se ha podido crear el detalle de evento', err.message);
  });
};

const detail = (res, id) => {
  EventDetails.findOne({
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

exports.updateOne = (req, res) => {
  const body = req.body;
  EventDetails.update(body, {
    where: { id: req.params.id },
  }).then((type) => {
    if (!type) return sendResponse(res, '404', {}, 'No se pudo actualizar', 'EventType error at update');
    return detail(res, req.params.id);
  }).catch((err) => {
    return sendResponse(res, 'false', '400', {}, 'tipo de evento no encontrado', err.message);
  });
};
