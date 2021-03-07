const router = require("express").Router();
const ctrl = require("../controllers");

router.post("comments", ctrl.Comment.create);
router.get("/comments/index", ctrl.Comment.index);
router.get("comments/:id", ctrl.Comment.show);
router.post("comments/:id", ctrl.Comment.update);
router.post("/comments/:id", ctrl.Comment.destroy)

module.exports = router;