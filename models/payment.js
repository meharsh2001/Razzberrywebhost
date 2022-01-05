var mongoose=require("mongoose");

var paymentSchema=new mongoose.Schema({
    username:String,
    tsnnid:String,
    amount:{type:String,default:"100"},
    currency:{type:String,default:"INR"},
    infavor:{type:String,default:"acupg"},
    status:{type:Boolean,default:true}}); 
var payment = mongoose.model("payment",paymentSchema);
module.exports =mongoose.model("payment",paymentSchema);


