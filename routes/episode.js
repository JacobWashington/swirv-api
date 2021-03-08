const router = require("express").Router();
const ctrl = require("../controllers");

router.post("/", ctrl.Eipsode.create);
router.get("/index", ctrl.Eipsode.index);
router.get("/:id", ctrl.Eipsode.show);
router.post("/:id", ctrl.Eipsode.update);
router.post("/:id", ctrl.Eipsode.destroy)

module.exports = router;