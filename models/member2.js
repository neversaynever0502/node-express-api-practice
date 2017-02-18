var mongoose=require('mongoose');
var Schema=mongoose.Schema;



var memberSchema = new Schema({
	  email: String,
	  password: String
});

module.exports = mongoose.model('Member2', memberSchema);

