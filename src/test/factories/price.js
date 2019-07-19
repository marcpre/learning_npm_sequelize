const faker = require('faker');

const models = require('../../models');

/**
 * Generate an object which contains attributes needed
 * to successfully create a user instance.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object}  An object to build the user from.
 */
const data = async (props = {}) => {
  const defaultProps = {   
    rating_date: faker.date.recent(-1),
    issuer: faker.company.companyName(),
    action: faker.random.arrayElement(['Reiterated Rating', 'Set Price Target', 'Upgrade', 'Initiated Coverage', 'Lower Price Target']),
    rating_from: faker.random.arrayElement(['Outperform', 'Neutral', 'Buy', 'Overweight', 'Sell', 'Neutral', 'Hold', 'Positive']),
    rating_to: faker.random.arrayElement(['Outperform', 'Neutral', 'Buy', 'Overweight', 'Sell', 'Neutral', 'Hold', 'Positive']),
    price_target_from: faker.random.number(),
    price_target_to: faker.random.number(),
    impact_on_price: faker.random.arrayElement(['Low', 'Medium', 'High']),
  };

  return Object.assign({}, defaultProps, props);
};

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object} A user instance
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = async function _default() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return models.Price.create((await data(props)));
};

exports.default = _default;
