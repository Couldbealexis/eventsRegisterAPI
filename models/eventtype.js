module.exports = (sequelize, DataTypes) => {
  const eventType = sequelize.define('eventType', {
    description: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  eventType.associate = function(models) {
    // associations can be defined here
  };
  return eventType;
};
