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

    console.log(req.body.bucket);

    var params = {
        file: req.file.destination + req.file.filename,
        wait: true,
        s3_store: {
            key: config.S3_KEY,
            secret: config.S3_SECRET,
            bucket: req.body.bucket,
            region: config.S3_REGION
        },
        resize: [{
            id: "1",
            strategy: "fit",
            width: 100,
            height: 100,
            storage_path: "images/100x100/" + req.file.originalname
        }, {
            id: "2",
            strategy: "crop",
            width: 300,
            height: 300,
            storage_path: "images/300x300/" + req.file.originalname
        }, {
            id: "3",
            strategy: "square",
            size: 400,
            storage_path: "images/400x400/" + req.file.originalname
        }],
        webp: true,
        lossy: true
    };

    kraken.upload(params, function (status) {
        if (status.success) {
            res.status(200).send('Image successfully uploaded :)!');
            console.log('Success. Optimized image URL: %s', status.kraked_url);
        } else {
            res.status(500).send('Sorry, your image could not be uploaded: ', status.message);
            console.log('Fail. Error message: %s', status.message);
        }
    });

});

module.exports = router;
