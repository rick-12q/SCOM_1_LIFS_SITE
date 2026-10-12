const express = require("express");

const agendamentoController = require("../controllers/agendamentoController");

const {
    authenticate,
    authorize
} = require("../middleware/authMiddleware");

const router = express.Router();

/*
 * Qualquer usuário autenticado pode criar um agendamento.
 */
router.post(
    "/",
    authenticate,
    agendamentoController.create
);

router.get(
    "/me",
    authenticate,
    agendamentoController.listMine
);
/*
 * Somente ADMIN pode visualizar todos os agendamentos.
 */
router.get(
    "/",
    authenticate,
    authorize("ADMIN"),
    agendamentoController.list
);

/*
 * Somente ADMIN pode aprovar/cancelar.
 */
router.patch(
    "/:id/status",
    authenticate,
    authorize("ADMIN"),
    agendamentoController.updateStatus
);

module.exports = router;