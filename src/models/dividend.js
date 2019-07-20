

module.exports = (sequelize, DataTypes) => {
  const Dividend = sequelize.define('Dividend', {
    announced: DataTypes.DATE,
    period: DataTypes.STRING,
    amount: DataTypes.FLOAT,
    yield: DataTypes.FLOAT,
    exdividend_date: DataTypes.FLOAT,
    record_date: DataTypes.DATE,
    payable_date: DataTypes.DATE,
  }, {})
  Dividend.associate = function(models) {
    Dividend.belongsTo(models.Company)
  }
  return Dividend
}
