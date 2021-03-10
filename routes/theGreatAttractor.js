const router = require('express').Router();
const ctrl = require('../controllers');


// routes
router.post("/", ctrl.TheGreatAttractor.consumeStoryline)
router.get("/", ctrl.TheGreatAttractor.show)

// exports
module.exports = router;
