var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
	name: String,
	ordernum: Number,
	index: Number
});

module.exports = mongoose.model('order',orderSchema);
