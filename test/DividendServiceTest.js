const chai = require('chai')
chai.use(require('chai-datetime'))

const assert = chai.assert

const models = require('../src/models')

const factories = require('./factories')
const truncate = require('./truncate')

describe('Dividend model', () => {
  let dividend
  let company

  beforeEach(async () => {
    // setup db
    await models.sequelize.sync()

    await truncate()

    // add 1 factory to the db
    company = await factories.factories.company()
    dividend = await factories.factories.dividend(company)
  })

  it('should generate a dividend from the factory', async () => {
    assert.isOk(dividend.id)
  })
  
  it('company object should have the same id in the dividends table', async () => {
    assert.equal(dividend.CompanyId, company.id)
  })

  it('should truncate the dividend table with each test', async () => {
    const count = await models.Dividend.count()

    assert.equal(count, 1)
  })

  it('should add 11 dividends to the dividend table', async () => {
    const numberOfDividends = 10

    for (let i = 0; i < numberOfDividends; i++) {
      await factories.factories.dividend(company)
    }

    const count = await models.Dividend.count()
    assert.equal(count, 11)
  })

})
