var express = require("express");
var router = express.Router();
var eventService = require("../services/eventService");
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
var multer = require("multer");

router.get("/events", function (req, res){
    eventService.getEvents()
        .then(events => res.json(events));
});

router.get("/events/:id", function (req, res) {
    var id = req.params.id;
    eventService.getEvent(+id)
        .then(event => res.json(event));
});

router.post("/events", jsonParser, function (req, res) {
    eventService.addEvent(req.body)
        .then(function (event) {
            res.json(event);
        }, function (error) {
            res.status(400).send("Event name already exists");
        });
});

router.post("/events/register", jsonParser, function (req, res) {
    eventService.registerEvent(req.body)
        .then(function (order) {
            res.json(order);
        }, function (error) {
            res.status(400).send(error);
        });
});




///upload images


var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "/upload");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

var upload = multer({
    storage: Storage
}).array("imgUploader", 3); //Field name and max count


router.post("/upload", function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfullyffff!.");
    });
});

module.exports = router;