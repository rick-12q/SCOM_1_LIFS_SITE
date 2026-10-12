const express = require("express");

const trabalhoController = require("../controllers/trabalhoController");
const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");
const { validateRequest } = require("../middleware/validationMiddleware");
const {
    idValidation,
    trabalhoValidation
} = require("../validators/trabalhoValidator");

const router = express.Router();

/*
 * Rotas públicas
 */
router.get(
    "/",
    trabalhoController.list
);

router.get(
    "/:id",
    idValidation,
    validateRequest,
    trabalhoController.getById
);

/*
 * Rotas protegidas - somente MEMBRO e ADMIN
 */
router.post(
    "/",
    authenticate,
    authorize("MEMBRO", "ADMIN"),
    trabalhoValidation,
    validateRequest,
    trabalhoController.create
);

router.put(
    "/:id",
    authenticate,
    authorize("MEMBRO", "ADMIN"),
    idValidation,
    trabalhoValidation,
    validateRequest,
    trabalhoController.update
);

router.delete(
    "/:id",
    authenticate,
    authorize("MEMBRO", "ADMIN"),
    idValidation,
    validateRequest,
    trabalhoController.remove
);

module.exports = router;