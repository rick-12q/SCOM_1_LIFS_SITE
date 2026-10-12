const express = require("express");

const membroController = require("../controllers/membroController");
const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

// Públicas
router.get("/", membroController.list);
router.get("/:id", membroController.getById);

// Somente ADMIN
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    membroController.create
);

router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    membroController.update
);

router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    membroController.remove
);

module.exports = router;