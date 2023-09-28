const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
const steam = require('../public/js/steamAuth');

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));

    res.render('homepage', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/profile', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    const users = userData.map((project) => project.get({ plain: true }));
    const articles = steam
    console.log(articles)

    res.render('profile', {
      users,
      logged_in: req.session.logged_in,
      articles
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
