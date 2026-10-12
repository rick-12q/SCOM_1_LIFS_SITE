const express = require("express");

const notificacaoController =
    require("../controllers/notificacaoController");

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
    "/config",
    authenticate,
    authorize("ADMIN"),
    notificacaoController.getConfig
);

router.put(
    "/config",
    authenticate,
    authorize("ADMIN"),
    notificacaoController.updateConfig
);

module.exports = router;