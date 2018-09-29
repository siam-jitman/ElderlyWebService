//import config
const config = require('../../config/config.json');

var TAG = "./src/data/DataResponse.js => ";

module.exports = class ContentModel {
    static validateResponse(result) {
        console.log(TAG + "validateResponse => result => ", result);
        if (!result.success) {
            console.log(TAG + "is error");
            var sqlMessage = result.error.sqlMessage == undefined || result.error.sqlMessage == "" ? "" : " : " + result.error.sqlMessage;
            var responeData = {
                resultMessage: result.error.code + sqlMessage,
                resultSuccess: false
            }
            return responeData;
        } else {
            console.log(TAG + "is success");
            var responeData = { ...config.responeData,
                resultData: result.results,
                resultSuccess: true
            }
            return responeData;
        }
    }

    static validateResponseOneRecode(result) {
        console.log(TAG + "validateResponse => result => ", result);
        if (!result.success) {
            console.log(TAG + "is error");
            var sqlMessage = result.error.sqlMessage == undefined || result.error.sqlMessage == "" ? "" : " : " + result.error.sqlMessage;
            var responeData = {
                resultMessage: result.error.code + sqlMessage,
                resultSuccess: false
            }
            return responeData;
        } else {
            console.log(TAG + "is success");
            var responeData = { ...config.responeData,
                resultData: result.results[0],
                resultSuccess: true
            }
            return responeData;
        }
    }
}