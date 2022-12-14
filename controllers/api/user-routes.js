const router = require('express').Router();
const { User } = require('../../models');
const path = require('path');

// This is the 'get' route
router.get('/', async (req, res) => {
  // Here, index.html is rendered
  res.render('landing');
});

module.exports = router;
// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
      suburb: req.body.suburb,
      surrounding_suburbs: req.body.surroundingSuburbs,
      fuel_type: req.body.fuelType,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.logged_in = true;
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  res.send
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.suburb = dbUserData.suburb;
      req.session.surrounding_suburbs = dbUserData.surrounding_suburbs;
      req.session.fuel_type = dbUserData.fuel_type;
      req.session.username = dbUserData.username;
      console.log(
        '🚀 ~ file: user-routes.js ~ line 59 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      res.redirect('/loggedIn');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post('/edit', async (req, res) => {
  try {
    const dbUserData = await User.update(
      { suburb: req.body.suburb, 
        surrounding_suburbs: req.body.surrounding,
        fuel_type: req.body.fuel, 
      },
      {
        where: {
          username: req.session.username 
        },
    });
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.suburb = dbUserData.suburb;
      req.session.surrounding_suburbs = dbUserData.surrounding_suburbs;
      req.session.fuel_type = dbUserData.fuel_type;
      console.log(
        '🚀 ~ file: user-routes.js ~ line 89 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );
      
      res.redirect('/loggedIn');

    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.get('/logout', function (req, res, next) {
  if (req.session.loggedin) {
    req.session.loggedin = false;
    res.redirect('/');
  }else{
  // Not logged in
  res.redirect('/');
}
});

module.exports = router;
