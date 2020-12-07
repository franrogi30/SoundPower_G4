module.exports = function(req,res,next){
    if(req.cookies.userSP){
        req.session.usuario = req.cookies.userSP;
        res.locals.usuario = req.session.usuario
    }
    next()
}