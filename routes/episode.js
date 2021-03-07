const router = require("express").Router();
const ctrl = require("../controllers");

router.post("episodes", ctrl.Eipsode.create);
router.get("/episodes/index", ctrl.Eipsode.index);
router.get("episodes/:id", ctrl.Eipsode.show);
router.post("episodes/:id", ctrl.Eipsode.update);
router.post("/episodes/:id", ctrl.Eipsode.destroy)

module.exports = router;