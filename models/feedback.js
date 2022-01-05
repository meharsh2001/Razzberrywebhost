var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var pasportLocal=require("passport-local");

var feedbackSchema=new mongoose.Schema({
    name:String,
    username:String,
    message:String,
});
feedbackSchema.plugin(passportLocalMongoose);
module.exports= mongoose.model("feedback",feedbackSchema);