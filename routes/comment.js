const router = require("express").Router();
const ctrl = require("../controllers");

router.post("/", ctrl.Comment.create);
router.get("/index", ctrl.Comment.index);
router.get("/:id", ctrl.Comment.show);
router.post("/:id", ctrl.Comment.update);
router.post("/:id", ctrl.Comment.destroy)

module.exports = router;