const express = require("express");
const { loginValidation } = require("../validators/authValidator");
const { validateRequest } = require("../middleware/validationMiddleware");
const authController = require("../controllers/authController");
const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
    "/login",
    loginValidation,
    validateRequest,
    authController.login
);

router.get("/me", authenticate, authController.me);

router.post("/logout", authenticate, authController.logout);

router.get(
    "/admin-check",
    authenticate,
    authorize("ADMIN"),
    (req, res) => {
        return res.status(200).json({
            success: true,
            data: {
                message: "Acesso de administrador autorizado."
            }
        });
    }
);

module.exports = router;