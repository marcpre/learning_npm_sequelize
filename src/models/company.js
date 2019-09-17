

module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    symbol: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {})
  Company.associate = function(models) {
    Company.hasMany(models.Rating)
  };
  return Company
};
