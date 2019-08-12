module.exports = (sequelize, DataTypes) => {
  const eventType = sequelize.define('eventTypes', {
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  eventType.associate = function(models) {
    // associations can be defined here
  };
  return eventType;
};
