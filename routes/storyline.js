const router = require('express').Router();
const ctrl = require('../controllers');
const passport = require('passport');

//routes
router.post('/',ctrl.Storyline.create);
// shows all from logged in user
// shows all of db
router.get("/allfornone", ctrl.Storyline.notLoggedInFind);
router.post("/fromuser", ctrl.Storyline.findUser)
router.get('/index', ctrl.Storyline.index);
router.post("/createbranch", ctrl.Storyline.createBranch);
router.get("/:id", ctrl.Storyline.show);
router.post("/:id", ctrl.Storyline.update);
router.post("/:id", ctrl.Storyline.destroy);

// exports
module.exports = router;