const express = require("express");

const maquinaController = require("../controllers/maquinaController");
const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

// Públicas
router.get("/", maquinaController.list);
router.get("/:id", maquinaController.getById);

// Somente ADMIN
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    maquinaController.create
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    maquinaController.update
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    maquinaController.remove
);

module.exports = router;