// eslint-disable-next-line import/no-extraneous-dependencies
const chai = require('chai')
chai.use(require('chai-datetime'))
const assert = chai.assert

const models = require('../src/models')

const factories = require('./factories')
const truncate = require('./truncate')

describe('Company model', () => {
  let company

  beforeEach(async () => {
    // setup db
    await models.sequelize.sync()

    await truncate()

    // add 1 factory to the db
    company = await factories.factories.company()
  })

  it('should generate a company from the factory', async () => {
    assert.isOk(company.id)
  })

  it('should truncate the company table with each test', async () => {
    const count = await models.Company.count()

    assert.equal(count, 1)
  })

  it('should add 11 companys to the company table', async () => {
    const numberOfCompanys = 10

    for (let i = 0; i < numberOfCompanys; i++) {
      await factories.factories.company()
    }

    const count = await models.Company.count()
    assert.equal(count, 11)
  })

})
