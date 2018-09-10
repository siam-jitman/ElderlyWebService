const dbUtil = require('./common/databaseUtil/index.js');

var TAG = "./index.js => ";

//import config 
const config = require('./config/config.json');

const fileUpload = require('express-fileupload');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();
const util = require('util');

const connection = dbUtil.connect();

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

app.post('/service/elderly/getContent', (req, res, next) => {
  console.log('/service/elderly/getContent > req => ' + JSON.stringify(req.body, null, 3));
  res.setHeader('Content-Type', 'application/json');
  new Promise((resolve, reject) => {
    var responeData = dbUtil.query(connection, "SELECT * FROM content");
    resolve(responeData);
  }).then((responeData) => {
    console.log(TAG + 'app.post() => /service/elderly/getContent => responeData => ', responeData);
    res.statusCode = 200;
    res.send(JSON.stringify(responeData, null, 3));
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

app.listen(3001, () => console.log('Started server listening on port 3001!'))