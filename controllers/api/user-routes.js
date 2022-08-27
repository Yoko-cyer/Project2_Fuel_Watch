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
      req.session.logged_in = true;

      res.render('loggedIn');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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

module.exports = router;
