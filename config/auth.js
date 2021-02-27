module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/login');
    },
    ensureNotAuthenticated: function(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        res.redirect("/users/home/alldetails");
    },
    ensureAdmin: function(req, res, next) {
        if (req.isAuthenticated() && req.user.admin) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/login');
    }
};