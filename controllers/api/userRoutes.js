const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post('/register', async (req, res) => {
  try {
    const userEmail = await User.findOne({ where: {email: req.body.email }});
    const userName = await User.findOne({ where: {gamertag: req.body.gamertag }});
    if (!userEmail && !userName) {
      const newGamer = await User.create({
        name: req.body.name,
        gamertag: req.body.gamertag,
        email: req.body.email,
        password: req.body.password,
      });
      
      req.session.save(() => {
        req.session.user_id = newGamer.id;
        req.session.logged_in = true;

        //res.json({ user: newGamer, message: 'Welcome to Gamers Unite! You are now logged in!' },200);
        // res
        // .status(200)
        // .json({ message: 'Good', user: newGamer });
      // return;
      })
    res.json({ user: newGamer, message: 'Welcome to Gamers Unite! You are now logged in!' },200)
    return;

    } else {
      res
      .status(400)
      .json({ message: "User already exists!"})
      return;
    }
  }
  catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
