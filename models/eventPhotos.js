module.exports = (sequelize, DataTypes) => {
  const eventPhotos = sequelize.define('eventPhotos', {
    path: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  eventPhotos.associate = function(models) {
    // associations can be defined here
    eventPhotos.belongsTo(models.events, { foreignKey:'event', as: 'idEvent' });
  };
  return eventPhotos;
};
