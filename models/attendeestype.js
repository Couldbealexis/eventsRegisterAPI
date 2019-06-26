module.exports = (sequelize, DataTypes) => {
  const attendeesType = sequelize.define('attendeesType', {
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  attendeesType.associate = function(models) {
    // associations can be defined here
  };
  return attendeesType;
};
