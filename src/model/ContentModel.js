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

    static findContentByIdMember(id) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM content WHERE idMember=" + id;
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }

    static addContentByIdMemberVideoContent(imageContent, nameContent, scriptContent, detailContent, video, idCategory, idMember) {
        return new Promise((resolve, reject) => {

            let date = new Date();

            var sql = "INSERT INTO `content` (`idContent`, `imageContent`, `nameContent`, `scriptContent`, `detailContent`, `urlContent`, `fileEBookContent`, `contentType`, `idCategory`, `idMember`, `activeStatus`, `createTime`, `updateTime`) VALUES ('', '" + imageContent + "', '" + nameContent + "', '" + scriptContent + "', '" + detailContent + "', '" + video + "', '', 'video', " + idCategory + ", " + idMember + ", 0, '" + date + "', '" + date + "')";
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }

    static addContentByIdMemberEBookContent(imageContent, nameContent, scriptContent, detailContent, fileEBookContent, idCategory, idMember) {
        return new Promise((resolve, reject) => {

            let date = new Date();

            var sql = "INSERT INTO `content` (`idContent`, `imageContent`, `nameContent`, `scriptContent`, `detailContent`, `urlContent`, `fileEBookContent`, `contentType`, `idCategory`, `idMember`, `activeStatus`, `createTime`, `updateTime`) VALUES ('', '" + imageContent + "', '" + nameContent + "', '" + scriptContent + "', '" + detailContent + "', '', '" + fileEBookContent + "', 'EBook', " + idCategory + ", " + idMember + ", 0, '" + date + "', '" + date + "')";
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }

    static addContentByIdMemberImageContent(imageContent, nameContent, scriptContent, detailContent, idCategory, idMember) {
        return new Promise((resolve, reject) => {

            let date = new Date();

            var sql = "INSERT INTO `content` (`idContent`, `imageContent`, `nameContent`, `scriptContent`, `detailContent`, `urlContent`, `fileEBookContent`, `contentType`, `idCategory`, `idMember`, `activeStatus`, `createTime`, `updateTime`) VALUES ('', '" + imageContent + "', '" + nameContent + "', '" + scriptContent + "', '" + detailContent + "', '', '', 'image', " + idCategory + ", " + idMember + ", 0, '" + date + "', '" + date + "')";
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }
}