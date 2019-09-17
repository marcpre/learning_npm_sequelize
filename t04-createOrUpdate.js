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

        // 1.1 remove dedupes if the same symbol exists
        // see https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
        dataArray = dataArray.filter((v,i,a)=>a.findIndex(t=>(t.symbol === v.symbol))===i)

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
            ],
            updateOnDuplicate: ['symbol']
        })
    } catch (error) {
        console.log(error)
    }
    return iss
}

let data = [{
    "date": "9/14/2019",
    "issuer": "Issuer6",
    "name": "Name1",
    "symbol": "Symbol2",
    "url": "www.url.com"
}, {
    "date": "9/11/2029",
    "issuer": "Issuer3",
    "name": "Name1",
    "symbol": "Symbol1",
    "url": "www.url.com"
}, {
    "date": "8/13/2019",
    "issuer": "Issuer1",
    "name": "Name1",
    "symbol": "Symbol1",
    "url": "www.url.com"
}, {
    "date": "8/13/2019",
    "issuer": "Issuer1",
    "name": "Name1",
    "symbol": "Symbol2",
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