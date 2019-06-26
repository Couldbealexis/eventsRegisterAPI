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
  return user;
};
