const DatabaseUtil = require('../common/db/DatabaseUtil.js');
const DataResponse = require('../common/data/DataResponse.js');

var TAG = "./src/model/ContentModel.js => ";

module.exports = class ContentModel {
    static listContent() {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM content";
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }

    static findContentById(id) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM content WHERE idContent=" + id;
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponseOneRecode(result);
                resolve(responeData);
            });
        });
    }
}