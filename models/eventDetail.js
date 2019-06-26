module.exports = (sequelize, DataTypes) => {
  const eventDetail = sequelize.define('eventDetail', {
    place: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  eventDetail.associate = function(models) {
    // associations can be defined here
    eventDetail.belongsTo(models.event, { foreignKey:'event', as: 'idEvent' });
  };
  return eventDetail;
};
