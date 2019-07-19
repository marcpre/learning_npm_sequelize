

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    marketBeatUrl: DataTypes.STRING,
    symbol: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {})
  Company.associate = function(models) {
    Company.hasMany(models.Rating)
  };
  return Company
};
