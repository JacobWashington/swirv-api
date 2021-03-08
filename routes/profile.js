const router = require('express').Router();
const ctrl = require('../controllers');

//routes
router.get('/', ctrl.Profile.index)

// exports
module.exports = router;