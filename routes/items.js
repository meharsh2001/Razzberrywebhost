var express=require("express");
var searchinput;
var searchoutput;
var router=express.Router();
a    =require("../models/user.js"),
found   =require("../models/found.js"),
alluser            =require("../models/user.js"),
claim            =require("../models/claim.js"),
middleware = require("../middleware/middleware.js");
const payment = require("../models/payment.js");
const feedback = require("../models/feedback.js");
const search = require("../models/search.js");
const http = require("http");
const fs = require("fs");
var requests = require("requests");

  
//Checkout
router.post("/Checkout",function(req,res)
{ 
  if (req.body.tsnnid !== "Transaction Pending"){ 
  const newpayment=new payment({ 
  tsnnid:req.body.tsnnid,
  username:req.user.username});
  newpayment.save();
  //console.log(req.body.tsnnid);
a.findOneAndUpdate({username: req.user.username},{paid:true}, function(err, data) {
if(err){console.log("failed to update data"+err);} else {res.redirect("/thanks"); }
});


}else{console.log(req.body.tsnnid);
       res.redirect("/");}

});

//foundform
router.post("/foundform",function(req,res) { 
  const newfound=new found({ 
    item:req.body.item,
    name:req.body.name,
     location:req.body.location,
    specifications:req.body.specifications,
    care:req.body.gender,
    submit:req.body.gender,});
             newfound.save();
              res.redirect("/thanks");
  });
//feedback
router.post("/contactus/feedback",function(req,res) { 
  const newfeedback=new feedback({ 
             name:req.body.name,
             username:req.body.username,
             message:req.body.message, });
             newfeedback.save();
             res.redirect("/contactus");
  });

  //adminpost/admin#account
router.post("/adminaccount",function(req,res)
{     
        var userNap = req.body.outputtag ;
        var status = req.body.outputtagg;
        var active = req.user.username ;
          User.find({}, function(err, users) {
            var userMap = {};
        
            users.forEach(function(user) {
              userMap[user.username] = user;
if(user.username == userNap){
  if (status == "true" || status == "false"){
a.findOneAndUpdate({username: user.username},{paid : status}, function(err, data) {
    if(err){console.log("failed to update data"+err);} else {
              console.log(user.username+": user is not paid now updated by"+active);
              
              res.redirect("/admin"); } }); }else{
                console.log(status+" |not updated| "+active);
                res.redirect("/admin"); }    }else{} });      
           // res.send(userMap);     
          });
  
});


//adminpost/admin#makeadmin
router.post("/adminmakeadmin",function(req,res)
{     
        var userNap = req.body.inputtag ;
        var status = req.body.inputtagg;
        var active = req.user.username ;
          User.find({}, function(err, users) {
            var userMap = {};
        
            users.forEach(function(user) {
              userMap[user.username] = user;
if(user.username == userNap){
  if (status == "true" || status == "false"){
a.findOneAndUpdate({username: user.username},{isAdmin : status}, function(err, data) {
    if(err){console.log("failed to update data"+err);} else {
              console.log(user.username+": user is admin now updated by"+active);
              
              res.redirect("/admin"); } }); }else{
                console.log(status+" |not updated| "+active);
                res.redirect("/admin"); }    }else{} });      
           // res.send(userMap);     
          });
  
});

 //founditemlist
router.post("/founditemlist",function(req,res) { 
  var user_id = '619077365d80a7ea38de0b17';
  search.findByIdAndUpdate(user_id,{item:req.body.item}, function(err, data) {
if(err){
  res.redirect("/tour");  
} else {console.log(""); }
             searchoutput =req.body.item;
             res.redirect("/foundsearchbar");
  }); 
});  
//foundserchbar
router.get("/foundsearchbar",function(req,res)
{     
   search.findOne({searchoutput},function(err) {
     if(err){
     console.log(""+err);
     res.redirect("/founditemlist");
      } else {
       console.log(searchoutput);
        found.findOne({item: searchoutput},function(err,data) {
          if(data == null){
            console.log("");
          res.redirect("/founditemlist");
           } else { 
            searchoutput = data.item;
            var user_id = '619077365d80a7ea38de0b17';
            search.findByIdAndUpdate(user_id,{item:data.item,name:data.name,location:data.location,specifications:data.specifications,care:data.care,submit:data.submit},function(err, data) {
          if(err){
          console.log(""+err);
          } else {
            //            res.status(200).json(data); 
              search.find({},function(err,search){
              res.render("foundsearchbar",{searchlist: search})}); }
          });
                    
            }     }); }       });      });


// REGISTER
router.post("/register",function(req,res)
{ 
  var newUser=new User({      firstname:req.body.firstname,
                              lastname:req.body.lastname,
                              number:req.body.number,
                              dob:req.body.dob,
                              gender:req.body.gender,
                              username:req.body.username    });
                              console.log(req.body.firstname);
  console.log(req.body.password);
  User.register(newUser,req.body.password,function(err,user){
      if(err)
      {
          console.log("unable to register user");
          console.log(err);
          res.redirect("back")
      }
      else{
          passport.authenticate("local")(req,res,function()
          {
              console.log("registered new user",req.user);
              res.locals.currentUser=req.user;
              res.redirect("/myaccount");
          });
      }
  });
});
 
//myaccount
router.post("/myaccount",function(req,res)
{     

  a.findOneAndUpdate({username: req.user.username},{dob:req.body.dob, 
                                                    fistname:req.body.firstname,
                                                    lastname:req.body.lastname, 
                                                    number:req.body.number, 
                                                    gender:req.body.gender}, function(err, data) {
    if(err){
              console.log("failed to update data"+err);      
              res.redirect("/myaccount");
            } else {            
              console.log(req.user.username+": user updated data :"+data);
              res.redirect("/tour"); }
            });
});

//LOGIN
router.post("/login",passport.authenticate('local',{
  successRedirect:'/tour',
  failureRedirect:"/loginfailed"
}
)
);

//claim
router.post("/claim",function(req,res) { 
  const newclaim=new claim({ 
    name:req.body.name,
    username:req.user.username,
    founder:req.body.founder,
    date:req.body.date,
    location:req.body.location,
    verify:req.body.specifications});
             newclaim.save();
              res.redirect("/thanks");
  });

//Matched ItemsList
router.get("/contactus/matcheditems",function(req,res)  
{ if(searchinput !== searchoutput){
  console.log("notfound");  
}else{ if(searchinput == undefined){
  console.log("notfound"+searchoutput+searchinput);
}else{
  console.log("matchfound"+searchoutput);
}}
});

  //REQUEST STATUS
  router.get("/contactus/reportstatus", middleware.isLoggedIn, middleware.isAdmin, function(req,res)
  {
      var availableuser = req.user.username;  
      claim.find({availableuser},function(err){
        if(err){
          console.log("data point 2 no entry found"+err);
          res.redirect("/contactus");
           } else {
          claim.findOne({username: availableuser},function(err,data) {
            if(err){
            console.log("data point 4 no entry found"+err);
            res.redirect("/contactus");
             } else { if (data == null){
               res.status(200).json(data);}else{  
              claim.find({},function(err,claim){
                res.render("reportstatus",{claimslist: claim})});
              }
  
              router.get("/contactus/reportstatus/api",middleware.isLoggedIn,function(req,res)
              {
                  res.status(200).json(data);});  
  
              ;}});}
      
      });
      
  });

  //REQUEST STATUS
router.get("/contactus/reportstatus/api", middleware.isLoggedIn, function(req,res)
{
    var availableuser = req.user.username;  
    claim.find({availableuser},function(err){
      if(err){
        console.log("data point 2 no entry found"+err);
        res.redirect("/contactus");
         } else {
        claim.findOne({username: availableuser},function(err,data) {
          if(err){
          console.log("data point 4 no entry found"+err);
          res.redirect("/contactus");
           } else { if (data == null){
             res.status(200).json(data);}else{  
            claim.find({},function(err,claim){
              res.render("reportstatus",{claimslist: claim})});
            }
            res.status(200).json(data);  
            router.get("/contactus/reportstatus/api",middleware.isLoggedIn,function(req,res)
            {
                res.status(200).json(data);});  

            ;}});}
    
    });
    
});


module.exports = router;