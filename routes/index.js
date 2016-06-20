var express = require('express');
var router = express.Router();
var multer = require('multer');
var config = require('../configs/config.json');

var Kraken = require("kraken");

var kraken = new Kraken({
    "api_key": config.KRAKEN_API_KEY,
    "api_secret": config.KRAKEN_API_SECRET
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'S3Piper'
    });
});


router.post('/upload', multer({
    dest: './uploads/'
}).single('upl'), function (req, res, next) {

    var body = req.body;
    var options = [];

    for (var i = 1; i <= 5; i++) {

      //JSON object which will contain specs for given image
      var json = {};

      //Check to see if width and height fields are set
      if(body['height'+i] && body['width'+i]){
        json.id = i;
        json.width = body['width'+i];
        json.height = body['height'+i];
        json.strategy = (body['fit'+i]) ? 'fit': 'crop'; //Set strategy to either fit or crop
        json.storage_path = body['path'+i] + req.file.originalname; //Set path for image
        options.push(json); //Push to options array
        console.log(json);
      }
    }

    var params = {
        file: req.file.destination + req.file.filename,
        wait: true,
        s3_store: {
            key: config.S3_KEY,
            secret: config.S3_SECRET,
            bucket: req.body.bucket,
            region: config.S3_REGION
        },
        resize: options
    };

    params.lossy = (body['lossless']) ? false : true; //Lossless compression turned on i.e lossy = false
    params.webp = (body['webp']) ? true: false;
    console.log(params);
    kraken.upload(params, function (status) {
        if (status.success) {
            res.render('status', {title: 'Success!', message: 'Your image was successfully uploaded to S3!'});
            console.log('Success. Optimized image URL: %s', status.kraked_url);
        } else {
            res.render('status', {title: 'Failed!', message: 'Could not upload your image to S3, sorry! ' + status.message});
            console.log('Fail. Error message: %s', status.message);
        }
    });

});

module.exports = router;
