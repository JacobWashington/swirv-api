const router = require('express').Router();
const ctrl = require('../controllers');


// routes
router.post("/", ctrl.TheGreatAttractor.consumeStoryline)

// exports
module.exports = router;
