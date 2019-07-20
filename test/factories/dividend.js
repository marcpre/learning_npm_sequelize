const faker = require('faker')

const models = require('../../src/models')

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
    announced: faker.date.recent(-1),
    period: faker.random.arrayElement(['quarterly', 'monthly', 'yearly']),
    amount: faker.random.number(),
    yield: faker.random.number(),
    exdividend_date: faker.date.recent(-1),
    record_date: faker.date.recent(-1),
    payable_date: faker.date.recent(-1),
    CompanyId: props.dataValues.id,
  }

  return Object.assign({}, defaultProps, props)
}

/**
 * Generates a user instance from the properties provided.
 *
 * @param  {Object} props Properties to use for the user.
 *
 * @return {Object} A user instance
 */
Object.defineProperty(exports, '__esModule', {
  value: true,
})
exports.default = void 0

let _default = async function _default() {
  const props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}
  return models.Dividend.create((await data(props)))
}

exports.default = _default
