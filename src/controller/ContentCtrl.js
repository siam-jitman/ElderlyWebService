const ContentModel = require('../model/ContentModel.js');

const UploadCtrl = require('./UploadCtrl.js');

//import config 
const config = require('../config/config.json');

var TAG = "./src/controller/ContentCtrl.js => ";

module.exports = class ContentCtrl {
    static listContent(request) {
        return new Promise((resolve, reject) => {
            var limit = request.body.requestBody.limit;
            if (limit == null || limit == undefined) {
                limit = '';
            } else {
                if (typeof limit == "string") {
                    limit = parseInt(limit.trim());
                }
            }
            var responeData = ContentModel.listContent(limit).then(result => result);
            resolve(responeData);
        });
    }

    static findContentById(request) {
        return new Promise((resolve, reject) => {
            var idContent = request.body.requestBody.idContent;
            if (typeof idContent == "string") {
                idContent = parseInt(idContent.trim());
            }
            var responeData = ContentModel.findContentById(idContent).then(result => result);
            resolve(responeData);
        });
    }

    static findContentVideo(request) {
        return new Promise((resolve, reject) => {
            var limit = request.body.requestBody.limit;
            if (limit == null || limit == undefined) {
                limit = '';
            } else {
                if (typeof limit == "string") {
                    limit = parseInt(limit.trim());
                }
            }
            var responeData = ContentModel.findContentVideo(limit).then(result => result);
            resolve(responeData);
        });
    }

    static findContentImage(request) {
        return new Promise((resolve, reject) => {
            var limit = request.body.requestBody.limit;
            if (limit == null || limit == undefined) {
                limit = '';
            } else {
                if (typeof limit == "string") {
                    limit = parseInt(limit.trim());
                }
            }
            var responeData = ContentModel.findContentImage(limit).then(result => result);
            resolve(responeData);
        });
    }

    static findContentEBook(request) {
        return new Promise((resolve, reject) => {
            var limit = request.body.requestBody.limit;
            if (limit == null || limit == undefined) {
                limit = '';
            } else {
                if (typeof limit == "string") {
                    limit = parseInt(limit.trim());
                }
            }
            var responeData = ContentModel.findContentEBook(limit).then(result => result);
            resolve(responeData);
        });
    }

    static findContentInActive(request) {
        return new Promise((resolve, reject) => {
            if (typeof idMember == "string") {
                idMember = parseInt(idMember.trim());
            }
            var responeData = ContentModel.findContentByInActive().then(result => result);
            resolve(responeData);
        });
    }

    static findContentByIdMember(request) {
        return new Promise((resolve, reject) => {
            console.log(request.body);
            var idMember = request.body.requestBody.idMember;
            if (typeof idMember == "string") {
                idMember = parseInt(idMember.trim());
            }
            var responeData = ContentModel.findContentByIdMember(idMember).then(result => result);
            resolve(responeData);
        });
    }

    static addContentByIdMember(request, path) {
        return new Promise((resolve, reject) => {
            let responeData = (UploadCtrl.uploadImageProfileContent(request.files.imageContent, path).then((fileProfileConter) => {
                console.log(TAG + "addContentByIdMember => request.body => ", request.body);
                let requestBody = JSON.parse(request.body.requestBody);
                if (requestBody.idCategory == "4") {

                    var imageContent = fileProfileConter;
                    var nameContent = requestBody.nameContent;
                    var scriptContent = requestBody.scriptContent;
                    var detailContent = requestBody.detailContent;
                    var fileEBookContent = requestBody.fileEbookContent;
                    var idCategory = parseInt(requestBody.idCategory);
                    var idMember = parseInt(requestBody.idMember);

                    let responeData = ContentModel.addContentByIdMemberEBookContent(
                        imageContent,
                        nameContent,
                        scriptContent,
                        detailContent,
                        fileEBookContent,
                        idCategory,
                        idMember).then(result => result);

                    return responeData;

                } else {

                    if (requestBody.idCategory == "1" || requestBody.idCategory == "7" || requestBody.idCategory == "8") {

                        var imageContent = fileProfileConter;
                        var nameContent = requestBody.nameContent;
                        var scriptContent = requestBody.scriptContent;
                        var detailContent = requestBody.detailContent;
                        var urlContent = requestBody.urlContent;
                        var idCategory = parseInt(requestBody.idCategory);
                        var idMember = parseInt(requestBody.idMember);

                        let responeData = ContentModel.addContentByIdMemberVideoContent(
                            imageContent,
                            nameContent,
                            scriptContent,
                            detailContent,
                            urlContent,
                            idCategory,
                            idMember).then(result => result);

                        return responeData;
                    } else {
                        var imageContent = fileProfileConter;
                        var nameContent = requestBody.nameContent;
                        var scriptContent = requestBody.scriptContent;
                        var detailContent = requestBody.detailContent;
                        var idCategory = parseInt(requestBody.idCategory);
                        var idMember = parseInt(requestBody.idMember);

                        let responeData = ContentModel.addContentByIdMemberImageContent(
                            imageContent,
                            nameContent,
                            scriptContent,
                            detailContent,
                            idCategory,
                            idMember).then(result => result);

                        return responeData;
                    }
                }
            }).catch((err) => {
                console.log(err);
            }));

            resolve(responeData);
        });
    }

    static editContentByIdContent(request, path) {
        return new Promise((resolve, reject) => {
            let requestBody = JSON.parse(request.body.requestBody);
            console.log(TAG , request.files);
            let responeData = (UploadCtrl.uploadImageProfileContent(request.files == null ? requestBody.imageContent : request.files.imageContent, path).then((fileProfileConter) => {
                console.log(TAG + "addContentByIdMember => request.body => ", request.body);

                var idContent = requestBody.idContent;
                var imageContent = fileProfileConter;
                var nameContent = requestBody.nameContent;
                var scriptContent = requestBody.scriptContent;
                var detailContent = requestBody.detailContent;
                var urlContent = requestBody.urlContent;
                var fileEBookContent = requestBody.fileEbookContent;
                var idCategory = parseInt(requestBody.idCategory);
                var idMember = parseInt(requestBody.idMember);

                let responeData = ContentModel.editContentByIdContent(
                    idContent,
                    imageContent,
                    nameContent,
                    scriptContent,
                    detailContent,
                    urlContent,
                    fileEBookContent,
                    idCategory,
                    idMember).then(result => result);

                return responeData;


            }).catch((err) => {
                console.log(err);
            }));

            resolve(responeData);
        });
    }

    static updateStatusContent(request) {
        return new Promise((resolve, reject) => {
            console.log(request.body);
            var idContent = request.body.requestBody.idContent;
            var activeStatus = request.body.requestBody.activeStatus;
            if (typeof idContent == "string") {
                idContent = parseInt(idContent.trim());
            }
            if (typeof activeStatus == "string") {
                activeStatus = parseInt(activeStatus.trim());
            }
            var responeData = ContentModel.updateStatusContent(idContent, activeStatus).then(result => result);
            resolve(responeData);
        });
    }
}