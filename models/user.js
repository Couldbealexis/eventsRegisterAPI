const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('../services/JWT');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    code: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  user.associate = function(models) {
    // associations can be defined here
    user.belongsTo(models.userType, { foreignKey:'type' });
  };

  // Class method
  user.findByCredentials = function findByCredentials(code, password) {
    const User = this;
    return User.findOne({
      where: { code },
    }).then((u) => {
      if (!u) {
        return Promise.reject( {message: 'Verify user'} );
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, u.password, (err, res) => {
          if (res) {
            resolve(u);
          } else {
            reject( {message: 'wrong user/password'} );
          }
        });
      });
    });
  };

  // Instance Method
  user.prototype.toJS = function toJS() {
    const User = this;
    return _.pick(User, ['id', 'name', 'email',
      'code', 'phoneNumber', 'status']);
  };

  user.prototype.generateAuthToken = function generateAuthToken() {
    const User = this;
    const token = jwt.sign({ data: { _id: User.id } });
    return token;
  };

  // Hooks
  user.beforeSave((User) => {
    User.password = User.password && User.password != '' ? bcrypt.hashSync(User.password, 10) : '';
  });

  return user;
};
