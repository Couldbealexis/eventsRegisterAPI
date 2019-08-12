module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  events.associate = function(models) {
    // associations can be defined here
    events.belongsTo(models.eventTypes, { foreignKey: 'eventType', as: 'type' });
    events.belongsTo(models.user, { foreignKey: 'incharge' });
    events.belongsTo(models.user, { foreignKey: 'createdBy' });
  };
  return events;
};
