module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
        return next();
      }
    //   req.flash('error_msg', 'Please log in to view that resource');
    console.log('Please log in to view that resource');
    res.status(401).end();      
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
        res.redirect('/');
    }
  };