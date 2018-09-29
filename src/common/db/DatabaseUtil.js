const mysql = require('mysql');

//import config
const config = require('../../config/config.json');

var TAG = "./src/common/db/DatabaseUtil.js => ";

module.exports = class DatabaseUtil {
    static query(sql) {
        return new Promise((resolve, reject) => {
            const dbCon = mysql.createConnection(config.dbConfig);
            dbCon.connect(function (err) {
                if (err) reject(err);
                resolve(dbCon);
            });
        }).then((dbCon) => {
            return new Promise((resolve, reject) => {
                dbCon.query(sql, function (error, results, fields) {
                    dbCon.end();
                    dbCon = null;
                    var resultsData = {
                        success: error ? false : true,
                        error: error,
                        results: results
                    };
                    resolve(resultsData);
                });
            });
        }).catch(err => {
            // console.log(err);
            // var responeData = { ...config.responeData
            // };
            // responeData.resultMessage = "Service Error. E0001";
            return {
                success: false,
                error: err
            };
        });
    }
}