const chai = require('chai');
chai.use(require('chai-datetime'));
const assert = chai.assert;

const models = require('../models');

const factories = require('./factories');
const truncate = require('./truncate');
// const { DividendService }  = require('../Services/DividendService')


describe('Dividend model', () => {
  let dividend;

  beforeEach(async () => {
    // setup db
    await models.sequelize.sync()

    await truncate();

    // add 1 factory to the db
    dividend = await factories.factories.dividend();
  });

  it('should generate a dividend from the factory', async () => {
    assert.isOk(dividend.id);
  });

  it('should truncate the dividend table with each test', async () => {
    const count = await models.Dividend.count();

    assert.equal(count, 1);
  });

  it('should add 11 dividends to the dividend table', async () => {
    let numberOfDividends = 10

    for (let i = 0; i < numberOfDividends; i++) {
      await factories.factories.dividend();
    }

    const count = await models.Dividend.count();
    assert.equal(count, 11);
  });

});
