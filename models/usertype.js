module.exports = (sequelize, DataTypes) => {
  const userType = sequelize.define('userType', {
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  userType.associate = function(models) {
    // associations can be defined here
  };
  return userType;
};
