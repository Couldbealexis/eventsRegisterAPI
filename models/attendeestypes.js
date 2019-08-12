module.exports = (sequelize, DataTypes) => {
  const attendeesTypes = sequelize.define('attendeesTypes', {
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  attendeesTypes.associate = function(models) {
    // associations can be defined here
  };
  return attendeesTypes;
};
