const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

// img
const multer = require('multer');
const uploads = multer({ dest: './uploads'});

// routes
router.get('/test', ctrl.User.test);
router.post('/register', uploads.single('inputFile'), ctrl.User.register);
router.post('/login', ctrl.User.login);
router.get('/profile', passport.authenticate('jwt', { session: false }), ctrl.User.profile);
router.post('/update', passport.authenticate('jwt', { session: false }), ctrl.User.updateUser);
router.get('/:id', ctrl.User.show)

// exports
module.exports = router;
