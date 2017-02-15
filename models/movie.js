var mongoose=require('mongoose');
var Schema=mongoose.Schema;



var movieSchema = new Schema({
	  email: String,
	  password: String,
	
});

module.exports = mongoose.model('Movie', movieSchema);