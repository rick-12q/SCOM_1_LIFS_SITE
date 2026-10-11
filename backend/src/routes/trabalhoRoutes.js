const express = require("express");

const trabalhoController = require("../controllers/trabalhoController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

/*
 * Rotas públicas
 */
router.get("/", trabalhoController.list);
router.get("/:id", trabalhoController.getById);

/*
 * Rotas protegidas
 */
router.post(
    "/",
    authenticate,
    trabalhoController.create
);

router.put(
    "/:id",
    authenticate,
    trabalhoController.update
);

router.delete(
    "/:id",
    authenticate,
    trabalhoController.remove
);

module.exports = router;