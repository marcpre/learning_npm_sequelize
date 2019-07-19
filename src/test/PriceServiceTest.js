const chai = require('chai');
chai.use(require('chai-datetime'));
const assert = chai.assert;

const models = require('../models');

const factories = require('./factories');
const truncate = require('./truncate');
const { PriceService }  = require('../Services/PriceService')


describe('Price model', () => {
  let price;

  beforeEach(async () => {
    // setup db
    await models.sequelize.sync()

    await truncate();

    // add 1 factory to the db
    price = await factories.factories.price();
  });

  it('should generate a price from the factory', async () => {
    assert.isOk(price.id);
  });

  it('should truncate the price table with each test', async () => {
    const count = await models.Price.count();

    assert.equal(count, 1);
  });

  it('should add 11 prices to the price table', async () => {
    let numberOfPrices = 10

    for (let i = 0; i < numberOfPrices; i++) {
      await factories.factories.price();
    }

    const count = await models.Price.count();
    assert.equal(count, 11);
  });

  it('should add the test data with the Prices Service to the price table', async () => {
    let dataArr = [{'rating_date':'6/28/2019','issuer':'Wedbush','action':'Reiterated Rating','rating_from':'Outperform','rating_to':'Outperform','price_target_from':'$235.00 ➝ $235.00','price_target_to':'$235.00 ➝ $235.00','impact_on_price':'Low'},{'rating_date':'6/25/2019','issuer':'Deutsche Bank','action':'Set Price Target','rating_from':'Neutral','rating_to':'Neutral','price_target_from':'$205.00','price_target_to':'$205.00','impact_on_price':'Medium'},{'rating_date':'6/20/2019','issuer':'Cascend Securities','action':'Reiterated Rating','rating_from':'Buy','rating_to':'Buy','price_target_from':'$210.00 ➝ $240.00','price_target_to':'$210.00 ➝ $240.00','impact_on_price':'Low'},{'rating_date':'6/19/2019','issuer':'Deutsche Bank','action':'Initiated Coverage','rating_from':'Hold','rating_to':'Hold','price_target_from':'$205.00 ➝ $205.00','price_target_to':'$205.00 ➝ $205.00','impact_on_price':'Low'},{'rating_date':'6/17/2019','issuer':'Credit Suisse Group','action':'Set Price Target','rating_from':'Hold','rating_to':'Hold','price_target_from':'$209.00','price_target_to':'$209.00','impact_on_price':'Low'},{'rating_date':'6/17/2019','issuer':'JPMorgan Chase & Co.','action':'Upgrade','rating_from':'Overweight','rating_to':'Overweight','price_target_from':'$235.00 ➝ $233.00','price_target_to':'$235.00 ➝ $233.00','impact_on_price':'Low'},{'rating_date':'6/14/2019','issuer':'Wedbush','action':'Reiterated Rating','rating_from':'Outperform','rating_to':'InLine','price_target_from':'','price_target_to':'','impact_on_price':'Low'},{'rating_date':'6/12/2019','issuer':'UBS Group','action':'Set Price Target','rating_from':'Buy','rating_to':'Buy','price_target_from':'$225.00','price_target_to':'$225.00','impact_on_price':'Low'},{'rating_date':'6/6/2019','issuer':'Evercore ISI','action':'Initiated Coverage','rating_from':'Outperform','rating_to':'Outperform','price_target_from':'$205.00','price_target_to':'$205.00','impact_on_price':'Low'},{'rating_date':'6/6/2019','issuer':'Evercore ISI','action':'Initiated Coverage','rating_from':'Outperform','rating_to':'Outperform','price_target_from':'$205.00','price_target_to':'$205.00','impact_on_price':'Low'}]   
    // fix price service error: https://stackoverflow.com/questions/56921447/test-failed-productservice-is-not-a-constructor/56925145#56925145
    let priceServ = new PriceService()

    const res = await priceServ.createOrUpdatePrice(dataArr)
    
    const tableValues = await priceServ.getAllPrices()

    assert.isOk(tableValues.length, dataArr.length);
  });
  
  it('check if the added data is unique', async () => {
    // three obj with the same data
    let dataArr = [{'rating_date':'6/6/2019','issuer':'Evercore ISI','action':'Initiated Coverage','rating_from':'Outperform','rating_to':'Outperform','price_target_from':'$205.00','price_target_to':'$205.00','impact_on_price':'Low'}, {'rating_date':'6/6/2019','issuer':'Evercore ISI','action':'Initiated Coverage','rating_from':'Outperform','rating_to':'Outperform','price_target_from':'$205.00','price_target_to':'$205.00','impact_on_price':'Low'},{'rating_date':'6/6/2019','issuer':'Evercore ISI','action':'Initiated Coverage','rating_from':'Outperform','rating_to':'Outperform','price_target_from':'$205.00','price_target_to':'$205.00','impact_on_price':'Low'}]   
    // fix price service error: https://stackoverflow.com/questions/56921447/test-failed-productservice-is-not-a-constructor/56925145#56925145
    let priceServ = new PriceService()

    const res = await priceServ.createOrUpdatePrice(dataArr)
    
    const tableValues = await priceServ.getAllPrices()

    assert.isOk(tableValues.length, 1);
  });
  
  it('check if price exists correctly in the db', async () => {
    let dataArr = [{'rating_date':'6/6/2019','issuer':'Evercore ISI','action':'Initiated Coverage','rating_from':'Outperform','rating_to':'Outperform','price_target_from':'$205.00','price_target_to':'$205.00','impact_on_price':'Low'}]   
    // fix price service error: https://stackoverflow.com/questions/56921447/test-failed-productservice-is-not-a-constructor/56925145#56925145
    let priceServ = new PriceService()

    // clear all records
    priceServ.clearPriceTable()
    
    // add 1 record
    const res = await priceServ.createOrUpdatePrice(dataArr)
    
    // get "all" records from the table that have a certain action attribute
    const tableValues = await priceServ.getPricesByField('action')
    assert.equal(tableValues[0].action, 'Initiated Coverage');
  });
  
  it('check if dates are correctly added', async () => {
    let dataArr = [{'rating_date':'6/6/2019','issuer':'Evercore ISI','action':'Initiated Coverage','rating_from':'Outperform','rating_to':'Outperform','price_target_from':'$205.00','price_target_to':'$205.00','impact_on_price':'Low'}]   
    // fix price service error: https://stackoverflow.com/questions/56921447/test-failed-productservice-is-not-a-constructor/56925145#56925145
    let priceServ = new PriceService()

    // clear all records
    priceServ.clearPriceTable()
    
    // add 1 record
    const res = await priceServ.createOrUpdatePrice(dataArr)
    
    // get "all" records from the table that have a certain action attribute
    const tableValues = await priceServ.getPricesByField('rating_date')
    assert.equalTime(tableValues[0].rating_date, new Date(dataArr[0].rating_date));
  });


});
