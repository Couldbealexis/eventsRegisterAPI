module.exports = (sequelize, DataTypes) => {
  const eventAttendees = sequelize.define('permissions', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
  }, {});
  eventAttendees.associate = function(models) {
    // associations can be defined here
    eventAttendees.belongsTo(models.menus, { foreignKey: 'menu', as: 'idMenu' });
    eventAttendees.belongsTo(models.user, { foreignKey: 'user', as: 'idUser' });
  };
  return eventAttendees;
};
