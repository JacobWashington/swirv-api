const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

// img
const multer = require('multer');
const uploads = multer({ dest: './uploads'});

// routes
router.get('/test', ctrl.user.test);
router.post('/register', uploads.single('inputFile'), ctrl.user.register);
router.post('/login', ctrl.user.login);
router.get('/profile', passport.authenticate('jwt', { session: false }), ctrl.user.profile);

// exports
module.exports = router;
