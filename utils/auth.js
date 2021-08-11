// Called from Step 1 in home-routes to redirect if not logged in
const withAuth = (req, res, next) => {
  // If the user isn't logged in, redirect them to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
}; // end of Step 1.

module.exports = withAuth;
