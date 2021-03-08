const router = require("express").Router();
const ctrl = require("../controllers");

router.post("/", ctrl.Episode.create);
router.get("/index", ctrl.Episode.index);
router.get("/:id", ctrl.Episode.show);
router.post("/:id", ctrl.Episode.update);
router.post("/:id", ctrl.Episode.destroy)

module.exports = router;