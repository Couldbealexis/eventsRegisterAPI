const querystring = require('querystring');
const uuid = require('uuid/v4');
const db = require('../models/index');

const User = db.user;
const UserType = db.userType;

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
      model: UserType,
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
  console.log(body);
  let user = {};
  let id;

  User.findByCredentials(body.code, body.password)
    .then((found) => {
      user = found;
      id = user.id;
      if (!user) return sendResponse(res, 'false', '404', {}, 'Usuario no encontrado', 'User not found');
      if (!user.status) return sendResponse(res, 'false', '404', {}, 'La cuenta fue eliminada, no pude usarse este correo', 'User deleted');
      return { resp: true, data: found.generateAuthToken() };
    }).then(async (obj) => {
      await User.findOne({
        where: {
          id,
        },
        attributes: {
          exclude: ['password', 'type', 'createdAt', 'updatedAt'],
        },
        include: [{
          model: UserType,
          attributes: ['id', 'description'],
        }],
      }).then((u) => {
        if (!u) return sendResponse(res, 'false', '404', {}, 'Usuario no encontrado', 'User not found');
        const objRes = {
          user: u,
          token: obj.data,
        };
        return sendResponse(res, 'true', '200', objRes);
      }).catch((err) => {
        return { res: false, data: 'Usuario no encontrado', devMessage: err.message };
      });
    }).catch((err) => {
      sendResponse(res, 'false', '400', {}, 'Error al iniciar sesión/revisa tus credenciales', err.message);
    });
};

exports.findAll = (req, res) => {
  // const str = req.url.split('?')[1];
  // let off = querystring.parse(str);
  // let limit = 8;
  // if (off.offset == undefined) {
  //   off = 0;
  // } else {
  //   limit = parseInt(off.limit);
  //   off = off.offset * off.limit;
  // }
  User.findAndCountAll({
    // offset: off,
    // limit,
    attributes: { exclude: ['password', 'type', 'createdAt', 'updatedAt'] },
    where: { status: 1 },
    include: [{
      model: UserType,
      attributes: ['id', 'description'],
    }],
  }).then((users) => {
    // users.offset = off;
    // users.limit = limit;
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
      model: UserType,
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
  const fieldsToExclude = ['password', 'id', 'status'];
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
  return User.update(
    { status: 0 },
    { where: { id: req.params.id, status: 1 } },
  )
    .then(async (r) => {
      if (!r) return sendResponse(res, 'false', '404', {}, 'El usuario no fue encontrado, por favor vuelve a itentarlo', 'user not found');
      return sendResponse(res, 'true', '200', { message: 'Usuario eliminado' });
    }).catch((err) => {
      return sendResponse(res, 'false', '400', {}, 'Usuario no encontrado', err.message);
    });
};

exports.changePassword = (req, res) => {
  const body = req.body;
  if (body.password != body.confirmPassword) return sendResponse(res, 'false', '400', {}, 'Las contraseñas no coinciden', 'password error')
  return User.update(
    { password: body.password },
    { where: { id: req.params.id, status: 1 } },
  )
    .then(async (r) => {
      if (!r) return sendResponse(res, 'false', '404', {}, 'El usuario no fue encontrado, por favor vuelve a itentarlo', 'user not found');
      return detail(res, req.params.id);
    }).catch((err) => {
      return sendResponse(res, 'false', '400', {}, 'Usuario no encontrado', err.message);
    });
};
