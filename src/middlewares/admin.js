module.exports = function(req,res,next){
    if(user.rol=){
        res.locals.user = req.session.user
    }
    next()
}