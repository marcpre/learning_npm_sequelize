/* eslint-disable func-names */


module.exports = (sequelize, DataTypes) => {
  const Rating = sequelize.define('Rating', {
    action: DataTypes.STRING,
    rating_from: DataTypes.STRING,
    rating_to: DataTypes.STRING,
    price_target_from: DataTypes.STRING,
    price_target_to: DataTypes.STRING,
    impact_on_price: DataTypes.STRING,
    rating_date: DataTypes.STRING,
  }, {})
  Rating.associate = function(models) {
    Rating.belongsTo(models.Company)
  };
  return Rating
};
