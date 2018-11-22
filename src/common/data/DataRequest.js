//import config
const config = require('../../config/config.json');

var TAG = "./src/data/ValidateRequest.js => ";

module.exports = class ContentModel {
    static ValidateRequest(requestBody, arrayCheck) {
        let error = true;
        for (let i = 0; i < arrayCheck.length; i++) {
            if (requestBody[arrayCheck[i]] == undefined || requestBody[arrayCheck[i]] == null) {
                error = false;
            }
        }
        return error;
    }
}