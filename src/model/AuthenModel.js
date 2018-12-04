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

    static findMemberById(idMember) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM `member` WHERE `idMember` = " + idMember;
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponseOneRecode(result);
                resolve(responeData);
            });
        });
    }

    static registerMember(usernameMember, passwordMember, nameMember, addressMember, genderMember, birthdayMember, telMember, emailMember, imageMember) {
        return new Promise((resolve, reject) => {

            var sql = "INSERT INTO `member` (`idMember`, `usernameMember`, `passwordMember`, `nameMember`, `addressMember`, `genderMember`, `birthdayMember`, `telMember`, `emailMember`, `roleMember`, `imageMember`) VALUES (null, '" + usernameMember + "', '" + passwordMember + "', '" + nameMember + "', '" + addressMember + "', " + genderMember + ", '" + birthdayMember + "', '" + telMember + "', '" + emailMember + "', 'member',' " + imageMember + "')"
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }

}