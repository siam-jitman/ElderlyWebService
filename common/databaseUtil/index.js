var TAG = "./common/databaseUtil/index.js => ";

//import config 
const config = require('../../config/config.json');

const mysql = require('mysql');

function connect() {
    const dbCon = mysql.createConnection(config.dbConfig);

    dbCon.connect(function (err) {
        if (err) throw err;
        console.log(TAG + "Database Connected!");
    });

    return dbCon;
}

function query(dbCon, sql) {
    console.log(TAG + 'query() => sql => ', sql);

    new Promise((resolve, reject) => {
        var responeData = { ...config.responeData
        };
        dbCon.query(sql, function (error, results, fields) {
            if (error) {
                responeData.resultSuccess = false;
                responeData.resultMessage = JSON.parse(JSON.stringify(error)).code;
                // return;
            } else {
                console.log(TAG + 'query() => /service/elderly/getContent => JSON.stringify(results) => ', JSON.stringify(results));
                responeData.resultData = results;
                responeData.resultSuccess = true;
            }
        });
        resolve(responeData);
    }).then((responeData) => {
        console.log(TAG + "query() success => responeData", responeData);
        return responeData;
    }).catch(err => {
        var responeDataError = { ...config.responeData
        };
        responeDataError.resultMessage = "Service Error. E0001";

        console.log(TAG + "query() => on catch", err);
        return responeDataError;
    });
}

module.exports = {
    connect: connect,
    query: query
}