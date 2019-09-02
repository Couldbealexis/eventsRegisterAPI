const db = require('../models/index');

const Menus = db.menus;

const {
  sendResponse,
} = require('../services/response');

exports.create = (req, res) => {
  const body = req.body;
  const menu = Menus.build(body);
  menu.save().then(() => {
    sendResponse(res, 'true', '200', menu);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'No se ha podido crear el menu', err.message);
  });
};

exports.findAll = (req, res) => {
  Menus.findAndCountAll({
    where: { status: 1 },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'status'],
    },
  }).then((menus) => {
    sendResponse(res, 'true', '200', menus);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'No se pudieron obtener los menus', err.message);
  });
};

const detail = (res, id) => {
  Menus.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
  }).then((menu) => {
    if (!menu) return sendResponse(res, 'false', '404', {}, 'No se encontró el menu', 'Menu not found');
    return sendResponse(res, 'true', '200', menu);
  }).catch((err) => {
    return sendResponse(res, 'false', '404', {}, 'No se encontro el menu', err.message);
  });
};

exports.findOne = (req, res) => {
  return detail(res, req.params.id);
};

exports.updateOne = (req, res) => {
  const body = req.body;
  Menus.update(body, {
    where: { id: req.params.id },
  }).then((menu) => {
    if (!menu) return sendResponse(res, '404', {}, 'No se pudo actualizar', 'Menu error at update');
    return detail(res, req.params.id);
  }).catch((err) => {
    return sendResponse(res, 'false', '400', {}, 'menu no encontrado', err.message);
  });
};
