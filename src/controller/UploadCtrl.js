// const path = require("path")
const fs = require('fs');
const uniqid = require('uniqid');
const UploadModel = require('../model/UploadModel.js');

//import config 
const config = require('../config/config.json');

var TAG = "./src/controller/UploadCtrl.js => ";

module.exports = class UploadCtrl {

    static uploadVideoContent(files, path) {
        return new Promise((resolve, reject) => {
            var responeData = { ...config.responeData
            };
            if (files) {
                var file = files,
                    name = file.name,
                    type = file.mimetype;
                var uploadpath = path + '/public/video/';
                file.mv(uploadpath + name, function (err) {
                    if (err) {
                        responeData.resultSuccess = false;
                        resolve(responeData);
                    } else {

                        let oldName = uploadpath + name;
                        let newName = (new Date().getTime()) + "_" + uniqid() + "." + name.split(".")[name.split(".").length - 1];

                        fs.rename(oldName, uploadpath + newName, function (err) {
                            if (err) {
                                console.log('ERROR: ' + err);
                                responeData.resultSuccess = false;
                                resolve(responeData);
                            } else {
                                responeData.resultData = newName;
                                responeData.resultSuccess = true;
                                resolve(responeData);
                            }
                        });
                    }
                });
            } else {
                responeData.resultSuccess = false;
                resolve(responeData);
            };
        });
    }

    static uploadFileEBook(files, path) {
        return new Promise((resolve, reject) => {
            var responeData = { ...config.responeData
            };
            if (files) {
                var file = files,
                    name = file.name,
                    type = file.mimetype;
                var uploadpath = path + '/public/ebook/';
                file.mv(uploadpath + name, function (err) {
                    if (err) {
                        responeData.resultSuccess = false;
                        resolve(responeData);
                    } else {

                        let oldName = uploadpath + name;
                        let newName = (new Date().getTime()) + "_" + uniqid() + "." + name.split(".")[name.split(".").length - 1];

                        fs.rename(oldName, uploadpath + newName, function (err) {
                            if (err) {
                                console.log('ERROR: ' + err);
                                responeData.resultSuccess = false;
                                resolve(responeData);
                            } else {
                                responeData.resultData = newName;
                                responeData.resultSuccess = true;
                                resolve(responeData);
                            }
                        });
                    }
                });
            } else {
                responeData.resultSuccess = false;
                resolve(responeData);
            };
        });
    }

    static uploadImageProfileContent(files, path) {
        return new Promise((resolve, reject) => {

            if (files) {
                if (typeof files == "string") {
                    resolve(files);
                } else {
                    var file = files,
                        name = file.name,
                        type = file.mimetype;
                    // console.log("file.mimetype => ", type);
                    var uploadpath = path + '/public/image/profile/content/';
                    file.mv(uploadpath + name, function (err) {
                        if (err) {
                            reject(err);
                        } else {

                            let oldName = uploadpath + name;
                            let newName = (new Date().getTime()) + "_" + uniqid() + "." + name.split(".")[name.split(".").length - 1];

                            fs.rename(oldName, uploadpath + newName, function (err) {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(newName);
                                }
                            });
                        }
                    });
                }
            } else {

                reject("(err) !req.files.uploadImage");
            };
        });
    }

    static uploadImageDetail(req, path) {
        return new Promise((resolve, reject) => {

            var responeData = { ...config.responeData
            };

            if (req.files.uploadImage) {
                var file = req.files.uploadImage,
                    name = file.name,
                    type = file.mimetype;
                console.log("file.mimetype => ", type);
                var uploadpath = path + '/public/image/' + name;
                file.mv(uploadpath, function (err) {
                    if (err) {
                        console.log("(err) file.mv", err);
                        responeData.resultSuccess = false;
                        resolve(responeData);
                    } else {

                        let oldName = path + '/public/image/' + name;
                        let newName = (new Date().getTime()) + "_" + uniqid() + "." + name.split(".")[name.split(".").length - 1];

                        fs.rename(oldName, path + '/public/image/' + newName, function (err) {
                            if (err) {
                                console.log('ERROR: ' + err);
                                responeData.resultSuccess = false;
                                resolve(responeData);
                            } else {
                                responeData.resultData = newName;
                                responeData.resultSuccess = true;
                                resolve(responeData);
                            }
                        });
                    }
                });
            } else {
                console.log("(err) !req.files.uploadImage", err);
                responeData.resultSuccess = false;
                resolve(responeData);
            };
        });
    }

    static uploadImageProfileMember(files, path) {
        return new Promise((resolve, reject) => {
            var responeData = { ...config.responeData
            };
            if (files) {
                var file = files,
                    name = file.name,
                    type = file.mimetype;
                var uploadpath = path + '/public/image/profile/member/';
                file.mv(uploadpath + name, function (err) {
                    if (err) {
                        responeData.resultSuccess = false;
                        resolve(responeData);
                    } else {

                        let oldName = uploadpath + name;
                        let newName = (new Date().getTime()) + "_" + uniqid() + "." + name.split(".")[name.split(".").length - 1];

                        fs.rename(oldName, uploadpath + newName, function (err) {
                            if (err) {
                                console.log('ERROR: ' + err);
                                responeData.resultSuccess = false;
                                resolve(responeData);
                            } else {
                                responeData.resultData = newName;
                                responeData.resultSuccess = true;
                                resolve(responeData);
                            }
                        });
                    }
                });
            } else {
                responeData.resultSuccess = false;
                resolve(responeData);
            };
        });
    }


}