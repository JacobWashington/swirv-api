const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

//routes
router.get('/index', ctrl.Storyline.index)
router.post('/',ctrl.Storyline.create)
router.get("/:id", ctrl.Storyline.show);
router.post("/:id", ctrl.Storyline.update);
router.post("/:id", ctrl.Storyline.destroy)

// exports
module.exports = router;