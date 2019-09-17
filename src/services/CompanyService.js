const Company = require('../models').Company

class CompanyService {

    constructor() {
        // this.Company = iss
    }

    /*     async getCompanyByID(id) {

    }
 */
    async transformPriceTargetToCompanyArr(priceTargetArr) {
        const res = []
        // flatten array
        priceTargetArr = [].concat.apply([], priceTargetArr)

        for (let i = 0; i < priceTargetArr.length; i++) {
            // if (!priceTargetArr[i].company_name.length) {
            res.push({
                company_name: priceTargetArr[i].company_name,
                company_link: priceTargetArr[i].company_link,
                ticker: priceTargetArr[i].ticker,
                description: '',
            })
            // }
        }
        return res
    }

    /**
     * Clears the records in the table
     */
    async clearCompanyTable() {
        try {
            const res = await Company.destroy({
                where: {},
                truncate: true,
            })
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async getAllCompanies() {
        try {
            const res = await Company.findAll()
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async getCompanysByName(name) {
        try {
            const res = await Company.findAll({
                attributes: [name],
            })
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async getCompanysByField(cond) {
        try {
            const res = await Company.findAll({
                attributes: [cond],
            })
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async getCompanyByTicker(ticker) {
        try {
            let res = await Company.findAll({
                where: {
                    ticker: ticker
                }
            })

            if (res) {
                return null
            }
            return res;

        } catch (error) {
            console.log(error)
        }
    }

    async getCompanysByFieldValue(cond) {
        try {
            const res = await Company.findAll({
                where: cond, // value should be: { authorId: 12, status: 'active' }
            })
            return res
        } catch (error) {
            console.log(error)
        }
    }

    async createOrUpdateCompany(dataArray) {

        if (dataArray === undefined || dataArray.length === 0) return ''

        let iss = []

        const allCompanies = await this.getAllCompanies()

        // flatten array
        dataArray = [].concat.apply([], dataArray)

        if (allCompanies !== undefined) {
            // 1. remove exact dedupes from dataArray
            dataArray = [...new Map(dataArray.map(obj => [JSON.stringify(obj), obj])).values()]

            // 2. compare dataArray to allCompanies and remove difference
            // dataArray = dataArray.filter(cv => !allCompanies.find(e => e.symbol === cv.symbol))
            dataArray = dataArray.filter(cv => !allCompanies.find(e => e.ticker === cv.ticker))

            // 3. Remove null values for link and "" values for name
            dataArray = dataArray.filter(cv => !(cv.company_name === '' || cv.company_link === null))
        }

        // console.log(JSON.stringify(dataArray, null, 2))

        try {
            iss = await Company.bulkCreate(dataArray, {
                fields: [
                    'company_name',
                    'company_link',
                    'ticker',
                    'description',
                ]
            })
        } catch (error) {
            console.log(error)
        }
        return iss
    }

}

module.exports = {
    CompanyService,
}