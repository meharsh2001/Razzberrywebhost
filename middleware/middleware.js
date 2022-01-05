var middlewareObj = {};
var found = require("../models/found")
middlewareObj.isLoggedIn= function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}

middlewareObj.isAdmin= function(req,res,next)
{
	if(req.user.isAdmin == true)
	{
        return next();
	}else{
        res.redirect("/myaccount");
	}
}

middlewareObj.paid= function(req,res,next)
{
	if(req.user.paid == true)
	{
        return next();
	}else{
        res.redirect("/checkout");
	}
}

module.exports=middlewareObj;