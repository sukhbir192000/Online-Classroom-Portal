module.exports.login = (req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/');
    }
    return res.render('Login_page_final',{
        title:'Login'
    });
}

module.exports.createSession = function(req, res){
    // req.flash('success',"Logged in");
    return res.redirect('/');
}
module.exports.destroySession = function(req, res){
    // req.flash('success',"Logged Out");
    req.logout();
    return res.redirect('/');
}