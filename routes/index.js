var express=require("express");
const { isAdmin } = require("../middleware/middleware.js");
const claim = require("../models/claim.js");
var message = {
    type: '',
    intro: '',
    message: ''};
var router=express.Router();
found   =require("../models/found.js"),
alluser            =require("../models/user.js"),
middleware = require("../middleware/middleware.js");
const feedback = require("../models/feedback.js");
const search = require("../models/search.js");
a    =require("../models/user.js"),

router.use(require('flash')());

//HOME
router.get("/",function(req,res)
{
    res.render("home");
});

//admin
router.get("/admin", middleware.isLoggedIn, middleware.isAdmin,function(req,res)
{     
        alluser.find({},function(err,alluser){
        res.render("admin",{alluserlist: alluser})});
});

//tour
router.get("/tour",function(req,res)
{
    res.render("tour");
});

//message
router.get("/message",function(req,res)
{
    res.render("message");
});

//back
router.get("/back",function(req,res)
{
    res.redirect("back")
});

//MAPW
router.get("/map",function(req,res)
{
    res.render("landing");
});

//CONTACTUS
router.get("/contactus", middleware.isLoggedIn,function(req,res)
{
    res.render("contact");
});

// THANKS
router.get("/thanks",function(req,res)
{
    res.render("reqsend");
});

//FOUNDITEMLIST
router.get("/founditemlist", middleware.isLoggedIn,function(req,res)
{
    found.find({},function(err,found){
    res.render("founditemlist",{foundslist: found})});
});

//Checkout
router.get("/Checkout", middleware.isLoggedIn,function(req,res)
{
            res.render("checkout");
});


//FEEDBACKLIST
router.get("/feedbacktable", middleware.isLoggedIn,function(req,res)
{
    feedback.find({},function(err,feedback){
    res.render("feedbacktable",{feedbacktable: feedback})});
});


//FOUNDFORM
router.get("/foundform", middleware.isLoggedIn, middleware.isAdmin,function(req,res)
{
    res.render("found");
});

//ITEMS
router.get("/items",function(req,res)
{
    res.render("tour");
});

//FEEDBACK
router.get("/contactus/feedback", middleware.isLoggedIn,function(req,res)
{
    res.render("feedback");
});

//us
router.get("/us", middleware.isLoggedIn,function(req,res)
{
    res.render("us");
});

//me
router.get("/me", middleware.isLoggedIn,function(req,res)
{
    res.render("me");
    redirect
});

//feedbacktable
router.get("/feedbacktable", middleware.isLoggedIn,function(req,res)
{
    res.render("feedbacktable");
});


//MYACCOUNT    
router.get("/myaccount", middleware.isLoggedIn,function(req,res)
{
    res.render("myaccount",message);
});

//DEL USER    
router.get("/myaccount/deleteuser/id86594949684511491494694549648", middleware.isLoggedIn,function(req,res)
{
    console.log(req.user.id);
    a.findByIdAndRemove(req.user.id,(err) => {
        if(err)
        {
            console.log("error","Following error encountered : " +err);
       
        }
        else{
          console.log("<==ID","Success! User Deleted");
          
        } });
        res.redirect("/thanks");

});

//LOGINFAILED
router.get("/loginfailed",function(req,res)
{
    message = {
        type: 'danger',
        intro: 'LOGIN FAILED! ',
        message: 'The details you entered is not connected to any account. Contact Customer Care Or Register Below!'};
    res.redirect("/login");
});
//REGISTERFAILED
router.get("/registerfailed",function(req,res)
{
    res.render("registerfailed");
});

//CLAIM
router.get("/claim", middleware.isLoggedIn, middleware.paid,function(req,res)
{   
    search.find({},function(err,search){
        res.render("claim",{searchlist: search})});
});

//REgISTER
router.get("/register",function(req,res)
{
    res.render("register");
});

// login
router.get("/login",function(req,res)
{
    res.render("login",message);
});


//signout
router.get("/logout",function(req,res)
{
    req.logout();
    res.redirect("/thanks");
});

module.exports = router;



// login
router.get("*",function(req,res)
{
    res.render("404");
});
