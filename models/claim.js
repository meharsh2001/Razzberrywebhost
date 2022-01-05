var mongoose=require("mongoose");
     
var claimSchema=new mongoose.Schema({
    username:String,
    name:String,
    founder:String,
    date:String,
    location:String,
    status:{type:String,default:"active"},
    verify:String
    }); 
var claim = mongoose.model("claim",claimSchema);
module.exports =mongoose.model("claim",claimSchema);