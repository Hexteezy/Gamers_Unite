const router = require('express').Router();
const { User } = require('../models');
const withAuth = require('../utils/auth');
// const steam = require('../utils/steamAuth');
const steam = require('steam-web');

const steamSess = new steam ({
    apiKey: 'process.env.STEAM_APIKEY',
    format: 'json'
});

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
    // const articles = steam();
    // console.log('ARTICLES', articles);
    steamSess.getNewsForApp({
      appid: 440,
      count: 200,
      maxlength: 300,
      callback: (err, data) => {
          let articles = [];
          for (let i = 0; i <= 3; i++) {
              let article = data.appnews.newsitems[Math.floor(Math.random() * 200)];
              articles.push(article);
          }
          console.log(articles);
          // return articles;
          res.render('profile', {
            users,
            logged_in: req.session.logged_in,
            articles
          });
      }
    });

   
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
