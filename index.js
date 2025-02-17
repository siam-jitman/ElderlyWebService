const ContentCtrl = require('./src/controller/ContentCtrl.js');
const AuthenCtrl = require('./src/controller/AuthenCtrl.js');
const UploadCtrl = require('./src/controller/UploadCtrl.js');

var TAG = "./index.js => ";

const fileUpload = require('express-fileupload');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require("path")
const app = express();
const util = require('util');

console.log(util.format('%s:%s', 'foo', 'dddddddddddddd'));

// var corsOptions = {
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

// app.use(express.static('/scr/webpage/image'));
// app.use('/image', express.static("/scr/webpage/image"));


app.use('/', express.static(__dirname + "/public/webpage/"));
app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname) + '/public/webpage/'));
});

app.use('/admin', express.static(__dirname + "/public/webpage/admin"));
app.get("/admin", (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname) + '/public/webpage/admin'));
});

app.use('/public/image', express.static(__dirname + "/public/image"));
app.use('/public/ebook', express.static(__dirname + "/public/ebook"));
app.use('/public/video', express.static(__dirname + "/public/video"));

app.use(cors());
app.use(bodyParser.json({
  limit: '50mb'
}));

// default options
app.use(fileUpload());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200;
  next();
});

// app.use('/image', express.static('/scr/webpage/image'))
// app.use('/image', express.static(path.join(__dirname, '/scr/webpage/image')))
// app.get("/image", (req, res) => {
//   res.sendFile(path.join(path.resolve(PROJECT_DIR) + '/webpage/index.html'));
// });

//----------------------system API----------------------//
//====================== auth ==========================//
app.post('/service/system/auth/login', (req, res, next) => {
  AuthenCtrl.login(req).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/system/auth/register', (req, res, next) => {
  console.log("/service/system/auth/register => " , req.body);
  AuthenCtrl.register(req).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/system/auth/uploadImageProfile', (req, res, next) => {
  UploadCtrl.uploadImageProfileMember(req.files.imageMember, __dirname).then((responeData) => {
    console.log("/service/system/auth/uploadImageProfile => " , responeData);
    res.send(responeData);
  });
});


//====================== member ==========================//
app.post('/service/member/findMemberById', (req, res, next) => {
  AuthenCtrl.findMemberById(req).then((responeData) => {
    res.send(responeData);
  });
});


//====================== content ==========================//
app.post('/service/content/addContentByIdMember', (req, res, next) => {
  ContentCtrl.addContentByIdMember(req, __dirname).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/content/editContentByIdContent', (req, res, next) => {
  ContentCtrl.editContentByIdContent(req, __dirname).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/content/updateStatusContent', (req, res, next) => {
  ContentCtrl.updateStatusContent(req, __dirname).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/content/findContentInActive', (req, res, next) => {
  ContentCtrl.findContentInActive(req).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/content/findContentByIdMember', (req, res, next) => {
  ContentCtrl.findContentByIdMember(req).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/content/findContentByIdMember', (req, res, next) => {
  ContentCtrl.findContentByIdMember(req).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/content/listContent', (req, res, next) => {
  ContentCtrl.listContent(req).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/content/findContentById', (req, res, next) => {
  ContentCtrl.findContentById(req).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/content/findContentVideo', (req, res, next) => {
  ContentCtrl.findContentVideo(req).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/content/findContentImage', (req, res, next) => {
  ContentCtrl.findContentImage(req).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/content/findContentEBook', (req, res, next) => {
  ContentCtrl.findContentEBook(req).then((responeData) => {
    res.send(responeData);
  });
});

app.post('/service/content/uploadImageDetail', function (req, res) {
  UploadCtrl.uploadImageDetail(req, __dirname).then((responeData) => {
    console.log(responeData);
    res.send(responeData);
  });
});

app.post('/service/content/uploadEBookContent', function (req, res) {
  UploadCtrl.uploadFileEBook(req.files.fileEBookContent, __dirname).then((responeData) => {
    console.log("/service/content/uploadEBookContent => " , responeData);
    res.send(responeData);
  });
});

app.post('/service/content/uploadVideoContent', function (req, res) {
  UploadCtrl.uploadVideoContent(req.files.urlContent, __dirname).then((responeData) => {
    console.log("/service/content/uploadVideoContent => " , responeData);
    res.send(responeData);
  });
});

// app.post('/ims/apis/file/UploadPermanent', function (req, res) {
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');

//   console.log(req.files);

//   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
//   let sampleFile = req.files.files;
//   console.log(sampleFile);

//   res.send(uploadImgApi);

//   //   // Use the mv() method to place the file somewhere on your server
//   //   sampleFile.mv('./temp/' + sampleFile.name+ '.jpg', function(err) {
//   //     if (err)
//   //       return res.status(500).send(err);

//   //     res.send('File uploaded!');
//   //   });
// });

app.listen(3000, () => console.log('Started server listening on port 3000!'))