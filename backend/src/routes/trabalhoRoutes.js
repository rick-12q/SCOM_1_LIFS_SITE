const express = require("express");

const trabalhoController = require("../controllers/trabalhoController");
const { authenticate } = require("../middleware/authMiddleware");
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
 * Rotas protegidas
 */
router.post(
    "/",
    authenticate,
    trabalhoValidation,
    validateRequest,
    trabalhoController.create
);

router.put(
    "/:id",
    authenticate,
    idValidation,
    trabalhoValidation,
    validateRequest,
    trabalhoController.update
);

router.delete(
    "/:id",
    authenticate,
    idValidation,
    validateRequest,
    trabalhoController.remove
);

module.exports = router;