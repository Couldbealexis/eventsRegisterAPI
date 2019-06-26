module.exports = (sequelize, DataTypes) => {
  const event = sequelize.define('event', {
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  event.associate = function(models) {
    // associations can be defined here
    event.belongsTo(models.eventType, { foreignKey: 'eventType', as: 'type' });
    event.belongsTo(models.user, { foreignKey: 'incharge' });
    event.belongsTo(models.user, { foreignKey: 'createdBy' });
  };
  return event;
};
