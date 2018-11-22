const DatabaseUtil = require('../common/db/DatabaseUtil.js');
const DataResponse = require('../common/data/DataResponse.js');

var TAG = "./src/model/ContentModel.js => ";

module.exports = class ContentModel {
    static login(username, password) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM `member` WHERE `usernameMember` = '" + username + "' AND `passwordMember` = '" + password + "'";
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponseOneRecode(result);
                resolve(responeData);
            });
        });
    }

}