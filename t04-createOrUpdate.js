const models = require('./src/models');
const Company = require('./src/models').Company;

async function getAllCompanies() {
    try {
        let res = await Company.findAll()
        return res;
    } catch (error) {
        console.log(error)
    }
}

async function createOrUpdateCompany(dataArray) {

    if (dataArray === undefined || dataArray.length === 0) return ''

    let iss = []

    const allCompanies = await getAllCompanies()

    // flatten array
    dataArray = [].concat.apply([], dataArray)

    if (allCompanies !== undefined) {
        // 1. remove exact dedupes from dataArray
        dataArray = [...new Map(dataArray.map(obj => [JSON.stringify(obj), obj])).values()]

        // 2. compare dataArray to allCompanies and remove difference
        // dataArray = dataArray.filter(cv => !allCompanies.find(e => e.symbol === cv.symbol))
        dataArray = dataArray.filter(cv => !allCompanies.find(e => e.symbol === cv.symbol))

        // 3. Remove null values for link and "" values for name
        dataArray = dataArray.filter(cv => !(cv.name === '' || cv.url === null))
    }

    try {
        iss = await Company.bulkCreate(dataArray, {
            fields: [
                'name',
                'url',
                'symbol',
                'description',
            ]
        })
    } catch (error) {
        console.log(error)
    }
    return iss
}

let data = [{
    "date": "9/13/2019",
    "issuer": "Issuer1",
    "name": "Name1",
    "symbol": "Test2",
    "url": "www.url.com"
}, {
    "date": "9/13/2019",
    "issuer": "Issuer1",
    "name": "Name1",
    "symbol": "Test1",
    "url": "www.url.com"
}, {
    "date": "9/13/2019",
    "issuer": "Issuer1",
    "name": "Name1",
    "symbol": "Test1",
    "url": "www.url.com"
}]

async function main() {
    // setup db
    await models.sequelize.sync({
        force: true
    })

    await createOrUpdateCompany(data)
    await createOrUpdateCompany(data)
    await createOrUpdateCompany(data)
    await createOrUpdateCompany(data)

    console.log("##################### DONE #####################");
}

main()