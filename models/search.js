var mongoose=require("mongoose");

var searchSchema=new mongoose.Schema({
    name:String,
    item:String, 
    location:String,
    specifications:String,
    care:String,    
    Owner:String,
    date:String,
    time:String,
    message:String,
    Proof:String}); 
var search = mongoose.model("search",searchSchema);
module.exports =mongoose.model("search",searchSchema);