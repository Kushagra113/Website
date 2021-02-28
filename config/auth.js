module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated() && req.user.admin==0) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/login');
    },
    ensureNotAuthenticated: function(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        else if(req.user.admin==0){
            res.redirect("/users/home/alldetails");
        }
        else if(req.user.admin==1){
            res.redirect("/admin/home/alldetails");
        }
    },
    ensureAdmin: function(req, res, next) {
        if (req.isAuthenticated() && req.user.admin) {
            return next();
        }
        req.flash('error_msg', 'Please log in to view that resource');
        res.redirect('/login');
    }
};