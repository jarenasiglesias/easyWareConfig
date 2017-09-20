module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    
    app.get("/", function (req, res) {
        res.render("layouts/index.html", {
            user: req.user
        });
    })

    //Página de posts

    app.get("/posts/:id", function (req, res) {
        res.render("layouts/topics.html", {id:req.params.id, user: req.user});
    })

    //Página de componentes independientes

    app.get("/component/:id", function (req, res) {
        res.render("layouts/topics.html", {id:req.params.id, user: req.user});
    })

    //Página por si falla el login

    app.get("/log-failure", function (req, res) {
        res.render("layouts/log-failure.html", null);
    })

    //Página por si falla el registro

    app.get("/reg-failure", function (req, res) {
        res.render("layouts/reg-failure.html", null);
    })

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.post("/login", passport.authenticate("local-login",{
        successRedirect: '/',
        failureRedirect: '/log-failure',
        failureFlash: true
    }))

    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.post("/signup", passport.authenticate("local-signup",{
        successRedirect: '/',
        failureRedirect: '/reg-failure',
        failureFlash: true
    }))

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    /*app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });
    */
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.post('/login', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the login page if there is an error
        failureFlash : true // allow flash messages
    }));

};
/*
module.exports = function (app){
    app.post('/insert', function(req,res,next){
        console.log(req.body
        )});
}
*/
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


