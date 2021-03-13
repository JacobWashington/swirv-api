const router = require('express').Router();
const ctrl = require('../controllers');


// routes
router.get("/del", ctrl.TheGreatAttractor.destroy);
router.post("/", ctrl.TheGreatAttractor.consumeStoryline)
router.get("/", ctrl.TheGreatAttractor.show)
router.get("/:id", ctrl.TheGreatAttractor.findEpisodes);

// exports
module.exports = router;
