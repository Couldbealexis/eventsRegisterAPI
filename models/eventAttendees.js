module.exports = (sequelize, DataTypes) => {
  const eventAttendees = sequelize.define('eventAttendees', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  eventAttendees.associate = function(models) {
    // associations can be defined here
    eventAttendees.belongsTo(models.event, { foreignKey:'event' });
    eventAttendees.belongsTo(models.attendeesType, { foreignKey:'type' });
  };
  return eventAttendees;
};
