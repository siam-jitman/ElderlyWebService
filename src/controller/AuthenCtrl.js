const AuthenModel = require('../model/AuthenModel.js');
const DataRequest = require('../common/data/DataRequest.js');
const Message = require('../common/constants/Message.js');
var _ = require('lodash');

//import config 
const config = require('../config/config.json');

var TAG = "./src/controller/AuthenCtrl.js => ";

module.exports = class ContentCtrl {
    static login(request) {
        return new Promise((resolve, reject) => {
            if (!DataRequest.ValidateRequest(request.body.requestBody, ["username", "password"])) {
                var responeData = { ...config.responeData,
                    resultMessage: Message.MSG_PLEASE_INPUT_USERNAME_AND_PASSWORD,
                    resultSuccess: false
                }
                resolve(responeData);
            } else {
                var username = request.body.requestBody.username;
                var password = request.body.requestBody.password;
                AuthenModel.login(username, password).then(result => {
                    if (_.isEmpty(result.resultData)) {
                        var responeData = { ...config.responeData,
                            resultMessage: Message.MSG_USERNAME_OR_PASSWORD_IS_WRONG,
                            resultSuccess: false
                        }
                        resolve(responeData);
                    } else {
                        resolve(result);
                    }
                });
                // resolve(responeData);
            }
        });
    }
}