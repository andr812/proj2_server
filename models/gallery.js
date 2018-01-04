var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fs= require('fs');

var gallerySchema = new Schema({
  img: String,
  content: String
});

module.exports = mongoose.model('gallery', gallerySchema);
