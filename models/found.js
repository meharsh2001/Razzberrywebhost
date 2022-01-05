var mongoose=require("mongoose");

var foundSchema=new mongoose.Schema({
    item:String,
    name:String,
    location: String,
    specifications:String,
    care:String,
    submit:String,
}); 
var found= mongoose.model("found",foundSchema);
module.exports =mongoose.model("found",foundSchema);