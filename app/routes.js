const Pizza = require('./models/Pizza');

module.exports = function (app, passport, db) {

  // normal routes ===============================================================

  app.get('/', function (req, res) {
    res.render('index.ejs');
  });

  // PROFILE SECTION =========================
  app.get('/profile', isLoggedIn, function (req, res) {
    Pizza.find((err, recipes) => {
      if (err) return console.log(err)
      res.render('profile.ejs', {
        user: req.user,
        recipes: recipes
      })
    })
  });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout(() => {
      console.log('User has logged out!')
    });
    res.redirect('/');
  });

  // Recipe board routes ===============================================================

  app.post('/recipes', (req, res) => {
    const newRecipe = new Pizza({
      type: req.body.title,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      image: req.body.imageUrl,
      price: 0
    });

    newRecipe.save((err, result) => {
      if (err) return console.log(err)
      console.log('Recipe saved to database')
      res.redirect('/profile')
    })
  })



  // DELETE recipe route
  app.delete('/recipes/:id', isLoggedIn, (req, res) => {
    Pizza.findByIdAndDelete(req.params.id, (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ message: 'Recipe deleted' });
    });
  });

  // UPDATE recipe route
  app.put('/recipes/:id', isLoggedIn, (req, res) => {
    Pizza.findByIdAndUpdate(
      req.params.id,
      {
        type: req.body.title,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        image: req.body.imageUrl
      },
      { new: true }, // Return the updated document
      (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Recipe updated' });
      }
    );
  });


  // AUTHENTICATE (FIRST LOGIN) ==================================================

  // LOGIN ===============================
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  }));

  // SIGNUP =================================
  app.get('/signup', function (req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
  }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}
