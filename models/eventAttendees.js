module.exports = (sequelize, DataTypes) => {
  const eventAttendees = sequelize.define('eventAttendees', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  eventAttendees.associate = function(models) {
    // associations can be defined here
    eventAttendees.belongsTo(models.events, { foreignKey: 'event', as: 'idEvent' });
    eventAttendees.belongsTo(models.attendeesTypes, { foreignKey: 'type' });
  };
  return eventAttendees;
};
