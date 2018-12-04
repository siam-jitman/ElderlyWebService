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

    static findMemberById(request) {
        return new Promise((resolve, reject) => {
            if (!DataRequest.ValidateRequest(request.body.requestBody, ["idMember"])) {
                var responeData = { ...config.responeData,
                    resultMessage: Message.MSG_NOT_SEND_ID_MEMBER,
                    resultSuccess: false
                }
                resolve(responeData);
            } else {
                var idMember = request.body.requestBody.idMember;
                AuthenModel.findMemberById(idMember).then(result => {
                    if (!_.isEmpty(result.resultData)) {
                        resolve(result);
                    } else {
                        var responeData = { ...config.responeData,
                            resultMessage: Message.MSG_SOMTING_WANT_WRONG,
                            resultSuccess: false
                        }
                        resolve(responeData);
                    }
                });
                // resolve(responeData);
            }
        });
    }

    static register(request) {
        return new Promise((resolve, reject) => {
            var username = request.body.requestBody.usernameMember;
            var password = request.body.requestBody.passwordMember;
            AuthenModel.login(username, password).then(result => {
                if (_.isEmpty(result.resultData)) {
                    //username is not duplicate
                    let usernameMember = request.body.requestBody.usernameMember;
                    let passwordMember = request.body.requestBody.passwordMember;
                    let nameMember = request.body.requestBody.nameMember;
                    let addressMember = request.body.requestBody.addressMember;
                    let genderMember = request.body.requestBody.genderMember;
                    let birthdayMember = request.body.requestBody.birthdayMember;
                    let telMember = request.body.requestBody.telMember;
                    let emailMember = request.body.requestBody.emailMember;
                    let imageMember = request.body.requestBody.emailMember;
                    let responeData = AuthenModel.registerMember(usernameMember, passwordMember, nameMember, addressMember, genderMember, birthdayMember, telMember, emailMember, imageMember).then((result) => {
                        return result;
                    });
                    resolve(responeData);
                } else {
                    //username is duplicate
                    var responeData = { ...config.responeData,
                        resultMessage: Message.MSG_USERNAME_DUPLICATE,
                        resultSuccess: false
                    }
                    resolve(responeData);
                }
            });
            // resolve(responeData);
        });
    }
}