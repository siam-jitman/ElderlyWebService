const ContentModel = require('../model/ContentModel.js');

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
}