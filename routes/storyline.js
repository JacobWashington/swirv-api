const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

//routes
router.get("/all/:id", ctrl.Storyline.findAll);
router.get('/index', ctrl.Storyline.index);
router.post('/',ctrl.Storyline.create);
router.post("/createbranch", ctrl.Storyline.createBranch);
router.get("/:id", ctrl.Storyline.show);
router.post("/:id", ctrl.Storyline.update);
router.post("/del/:id", ctrl.Storyline.destroy);

// exports
module.exports = router;