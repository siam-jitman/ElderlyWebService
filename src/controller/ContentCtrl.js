const ContentModel = require('../model/ContentModel.js');

const UploadCtrl = require('./UploadCtrl.js');

//import config 
const config = require('../config/config.json');

var TAG = "./src/controller/ContentCtrl.js => ";

module.exports = class ContentCtrl {
    static listContent() {
        return new Promise((resolve, reject) => {
            var responeData = ContentModel.listContent().then(result => result);
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
                    var fileEBookContent = requestBody.fileEBookContent;
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
                        var video = requestBody.urlContent;
                        var idCategory = parseInt(requestBody.idCategory);
                        var idMember = parseInt(requestBody.idMember);

                        let responeData = ContentModel.addContentByIdMemberVideoContent(
                            imageContent,
                            nameContent,
                            scriptContent,
                            detailContent,
                            video,
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
}