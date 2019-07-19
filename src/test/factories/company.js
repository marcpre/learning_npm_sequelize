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
    name: faker.company.companyName(),
    marketBeatUrl: faker.internet.domainName(),
    symbol: faker.random.alphaNumeric(3),
    description: faker.lorem.sentences(3,3)
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
  return models.Company.create((await data(props)));
};

exports.default = _default;
