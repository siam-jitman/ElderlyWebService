const DatabaseUtil = require('../common/db/DatabaseUtil.js');
const DataResponse = require('../common/data/DataResponse.js');

var TAG = "./src/model/ContentModel.js => ";

module.exports = class ContentModel {
    static listContent(limit) {
        return new Promise((resolve, reject) => {
            if (limit != '') {
                var sql = "SELECT * FROM content WHERE activeStatus = 1 ORDER BY idContent DESC LIMIT " + limit;
            } else {
                var sql = "SELECT * FROM content WHERE activeStatus = 1 ORDER BY idContent DESC";
            }
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

    static findContentVideo(limit) {
        return new Promise((resolve, reject) => {
            if (limit != '') {
                var sql = "SELECT * FROM content WHERE contentType LIKE 'video' AND activeStatus = 1 ORDER BY idContent DESC LIMIT " + limit;
            } else {
                var sql = "SELECT * FROM content WHERE contentType LIKE 'video' AND activeStatus = 1 ORDER BY idContent DESC";
            }
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponseOneRecode(result);
                resolve(responeData);
            });
        });
    }

    static findContentImage(limit) {
        return new Promise((resolve, reject) => {
            if (limit != '') {
                var sql = "SELECT * FROM content WHERE contentType LIKE 'image' AND activeStatus = 1 ORDER BY idContent DESC LIMIT " + limit;
            } else {
                var sql = "SELECT * FROM content WHERE contentType LIKE 'image' AND activeStatus = 1 ORDER BY idContent DESC";
            }
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponseOneRecode(result);
                resolve(responeData);
            });
        });
    }

    static findContentEBook(limit) {
        return new Promise((resolve, reject) => {
            if (limit != '') {
                var sql = "SELECT * FROM content WHERE contentType LIKE 'EBook' AND activeStatus = 1 ORDER BY idContent DESC LIMIT " + limit;
            } else {
                var sql = "SELECT * FROM content WHERE contentType LIKE 'EBook' AND activeStatus = 1 ORDER BY idContent DESC";
            }
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponseOneRecode(result);
                resolve(responeData);
            });
        });
    }

    static findContentByInActive() {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM content WHERE activeStatus = 0 ORDER BY idContent DESC";
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }

    static findContentByIdMember(id) {
        return new Promise((resolve, reject) => {
            var sql = "SELECT * FROM content WHERE idMember=" + id + " ORDER BY idContent DESC";
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }

    static addContentByIdMemberVideoContent(imageContent, nameContent, scriptContent, detailContent, video, idCategory, idMember) {
        return new Promise((resolve, reject) => {

            let date = new Date();

            var sql = "INSERT INTO `content` (`idContent`, `imageContent`, `nameContent`, `scriptContent`, `detailContent`, `urlContent`, `fileEBookContent`, `contentType`, `idCategory`, `idMember`, `activeStatus`, `createTime`, `updateTime`) VALUES (null, '" + imageContent + "', '" + nameContent + "', '" + scriptContent + "', '" + detailContent + "', '" + video + "', '', 'video', " + idCategory + ", " + idMember + ", 0, '" + date + "', '" + date + "')";
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }

    static addContentByIdMemberEBookContent(imageContent, nameContent, scriptContent, detailContent, fileEBookContent, idCategory, idMember) {
        return new Promise((resolve, reject) => {

            let date = new Date();

            var sql = "INSERT INTO `content` (`idContent`, `imageContent`, `nameContent`, `scriptContent`, `detailContent`, `urlContent`, `fileEBookContent`, `contentType`, `idCategory`, `idMember`, `activeStatus`, `createTime`, `updateTime`) VALUES (null, '" + imageContent + "', '" + nameContent + "', '" + scriptContent + "', '" + detailContent + "', '', '" + fileEBookContent + "', 'EBook', " + idCategory + ", " + idMember + ", 0, '" + date + "', '" + date + "')";
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }

    static addContentByIdMemberImageContent(imageContent, nameContent, scriptContent, detailContent, idCategory, idMember) {
        return new Promise((resolve, reject) => {

            let date = new Date();

            var sql = "INSERT INTO `content` (`idContent`, `imageContent`, `nameContent`, `scriptContent`, `detailContent`, `urlContent`, `fileEBookContent`, `contentType`, `idCategory`, `idMember`, `activeStatus`, `createTime`, `updateTime`) VALUES (null, '" + imageContent + "', '" + nameContent + "', '" + scriptContent + "', '" + detailContent + "', '', '', 'image', " + idCategory + ", " + idMember + ", 0, '" + date + "', '" + date + "')";
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }

    static editContentByIdContent(idContent, imageContent, nameContent, scriptContent, detailContent, urlContent, fileEBookContent, idCategory, idMember) {
        return new Promise((resolve, reject) => {

            let date = new Date();

            // var sql = "UPDATE content SET imageContent = '" + imageContent + "', nameContent = '" + nameContent + "', scriptContent = '" + scriptContent + "', detailContent = '" + detailContent + "', urlContent = '" + urlContent + "', fileEBookContent = '"+ fileEBookContent +"', idCategory = "+ idCategory + ", idMember = " + idMember + "WHERE idContent LIKE " + idContent;
            var sql = "UPDATE content SET imageContent = ? , nameContent = ? , scriptContent = ? , detailContent = ? , urlContent = ? , fileEBookContent = ? , idCategory = ? , idMember = ? , updateTime = ? WHERE idContent LIKE ? ";
            var param = [imageContent, nameContent, scriptContent, detailContent, urlContent, fileEBookContent, idCategory, idMember, date, idContent];
            DatabaseUtil.queryWithParam(sql, param).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }

    static updateStatusContent(idContent, activeStatus) {
        return new Promise((resolve, reject) => {

            let date = new Date();

            // var sql = "UPDATE content SET activeStatus = " + activeStatus + ", updateTime = '" + date + "' WHERE idContent = " + idContent + " ;";
            var sql = "UPDATE content SET activeStatus = " + activeStatus + " WHERE idContent = " + idContent + " ;";
            DatabaseUtil.query(sql).then((result) => {
                var responeData = DataResponse.validateResponse(result);
                resolve(responeData);
            });
        });
    }
}