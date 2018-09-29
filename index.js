const ContentCtrl = require('./src/controller/ContentCtrl.js');

var TAG = "./index.js => ";

const fileUpload = require('express-fileupload');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const util = require('util');

console.log(util.format('%s:%s', 'foo', 'dddddddddddddd'));

// var corsOptions = {
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors());
app.use(bodyParser.json({
  limit: '50mb'
}));

// default options
app.use(fileUpload());

app.post('/service/elderly/listContent', (req, res, next) => {
  ContentCtrl.listContent().then((responeData) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.send(responeData);
  });
});

app.post('/service/elderly/findContentById', (req, res, next) => {
  ContentCtrl.findContentById(req).then((responeData) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
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