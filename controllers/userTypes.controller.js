const db = require('../models/index');

const UserType = db.userType;

const {
  sendResponse,
} = require('../services/response');

exports.create = (req, res) => {
  const body = req.body;
  console.log(body);
  let type = UserType.build(body);
  type.save().then(() => {
    sendResponse(res, 'true', '200', type);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'No se ha podido crear el tipo de usuario', err.message);
  });
};

exports.findAll = (req, res) => {
  UserType.findAndCountAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    }}).then((types) => {
      sendResponse(res, 'true', '200', types);
  }).catch((err) => {
      sendResponse(res, 'false', '400', {}, 'No se pudieron obtener los tipos de usuario', err.message);
  });
};

const detail = (res, id) => {
  UserType.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  }).then((type) => {
    if (!type) return sendResponse(res, 'false', '404', {}, 'No se encontro el tipo de usuario', 'Type not found');
    return sendResponse(res, 'true', '200', type);
  }).catch((err) => {
    return sendResponse(res, 'false', '404', {}, 'No se encontro el tipo de usuario', err.message);
  });
};

exports.findOne = (req, res) => {
  return detail(res, req.params.id);
};

exports.updateOne = (req, res) => {
  const body = req.body;
  UserType.update(body, {
    where: { id: req.params.id },
  }).then((type) => {
    if (!type) return sendResponse(res, '404', {}, 'No se pudo actualizar', 'UserType error at update');
    return detail(res, req.params.id);
  }).catch((err) => {
    return sendResponse(res, 'false', '400', {}, 'tipo de usuario no encontrado', err.message);
  });
};
