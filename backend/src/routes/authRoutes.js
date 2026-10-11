const express = require("express");

const authController = require("../controllers/authController");
const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", authController.login);

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