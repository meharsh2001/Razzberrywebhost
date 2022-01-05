var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var pasportLocal=require("passport-local");

var UserSchema=new mongoose.Schema({
   profilepic:String,
   firstname:String,
   lastname:String,
   number:String,
   dob:String,
    gender:String,
    username:String,
    password:String,
    paid:{type:Boolean,default:false},
    isAdmin:{type:Boolean,default:false}
});
UserSchema.plugin(passportLocalMongoose);
module.exports= mongoose.model("User",UserSchema);
