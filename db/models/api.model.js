const db = require("../connection.js");
const fs = require("fs")

exports.fetchApi = () => {
    return new Promise((res, rej) => {
        fs.readFile(`${__dirname}/../../endpoints.json`, 'utf-8', (err, endpoint) => {
            if (err) rej(err)
            else 
            res(JSON.parse(endpoint))
        })
    })
}