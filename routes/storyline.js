const router = require('express').Router();
const ctrl = require('../controllers');

//routes
router.get('/', ctrl.Storyline.index)

// exports
module.exports = router;