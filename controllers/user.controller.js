const querystring = require('querystring');
const uuid = require('uuid/v4');
const db = require('../models/index');

const User = db.user;
const userType = db.userType;

const {
  sendResponse,
} = require('../services/response');

const detail = (res, id) => {
  User.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ['password', 'type', 'createdAt', 'updatedAt'],
    },
    include: [{
      model: userType,
      attributes: ['id', 'description'],
    }],
  }).then((user) => {
    if (!user) return sendResponse(res, 'false', '404', {}, 'Usuario no encontrado', 'User not found');
    return sendResponse(res, 'true', '200', user);
  }).catch((err) => {
    return { res: false, data: 'Usuario no encontrado', devMessage: err.message };
  });
};

exports.create = async (req, res) => {
  const body = req.body;
  const u = await User.findOne({
    where: {
      email: body.email,
      status: 1,
    },
  });
  if (u) sendResponse(res, 'false', '400', {}, 'El correo ya se encuentra en uso', 'email already in use');
  let user = User.build(body);
  user.id = uuid();
  user.save()
    .then(() => user.generateAuthToken())
    .then(async (token) => {
      user = await user.toJS();
      const objRes = {
        user,
        token,
      };
      sendResponse(res, 'true', '200', objRes);
    }).catch((err) => {
      sendResponse(res, 'false', '400', {}, 'No se ha podido crear el usuario, intenta nuevamente', err.message + err);
    });
};

exports.login = (req, res) => {
  const body = req.body;
  let user = {};

  User.findByCredentials(body.code, body.password)
    .then((found) => {
      user = found;
      if (!user.status) return { resp: false, data: 'La cuenta fue eliminada, no pude usarse este correo' };
      return { resp: true, data: found.generateAuthToken() };
    }).then((obj) => {
      if (obj.resp) {
        const objRes = {
          user: user.toJS(),
          token: obj.data,
        };
        sendResponse(res, 'true', '200', objRes);
      } else {
        sendResponse(res, 'false', '200', {}, obj.data, obj.data);
      }
    }).catch((err) => {
      sendResponse(res, 'false', '200', {}, 'Error al iniciar sesión', err.message);
    });
};

exports.findAll = (req, res) => {
  const str = req.url.split('?')[1];
  let off = querystring.parse(str);
  let limit = 8;
  if (off.offset == undefined) {
    off = 0;
  } else {
    limit = parseInt(off.limit);
    off = off.offset * off.limit;
  }
  User.findAndCountAll({
    offset: off,
    limit,
    attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
  }).then((users) => {
    users.offset = off;
    users.limit = limit;
    sendResponse(res, 'true', '200', users);
  }).catch((err) => {
    sendResponse(res, 'false', '400', {}, 'No se pudieron obtener los usuarios', err.message);
  });
};

exports.findOne = (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: {
      exclude: ['password', 'type', 'createdAt', 'updatedAt'],
    },
    include: [{
      model: userType,
      attributes: ['id', 'description'],
    }],
  }).then((user) => {
    if (!user) return sendResponse(res, 'false', '404', {}, 'No se encontro al usuario', 'User not found');
    return sendResponse(res, 'true', '200', user);
  }).catch((err) => {
    return sendResponse(res, 'false', '404', {}, 'No se encontro al usuario', err.message);
  });
};

exports.updateOne = async (req, res) => {
  const body = req.body;
  const fieldsToExclude = ['password', 'id'];
  const myFields = Object.keys(User.rawAttributes).filter(s => !fieldsToExclude.includes(s));
  return User.update(body, {
    fields: myFields,
    where: { id: req.params.id } })
    .then(async (r) => {
      if (!r) return sendResponse(res, 'false', '404', {}, 'El usuario no fue encontrado, por favor vuelve a itentarlo', 'user not found');
      return detail(res, req.params.id);
    }).catch((err) => {
      return sendResponse(res, 'false', '400', {}, 'Usuario no encontrado', err.message);
    });
};

exports.delete = (req, res) => {
  return User.update(body, {
    fields: myFields,
    where: { id: req.params.id } })
    .then(async (r) => {
      if (!r) return sendResponse(res, 'false', '404', {}, 'El usuario no fue encontrado, por favor vuelve a itentarlo', 'user not found');
      return detail(res, req.params.id);
    }).catch((err) => {
      return sendResponse(res, 'false', '400', {}, 'Usuario no encontrado', err.message);
    });
};
