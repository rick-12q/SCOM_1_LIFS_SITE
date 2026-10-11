const { body } = require("express-validator");

const loginValidation = [
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email é obrigatório.")
        .bail()
        .isEmail()
        .withMessage("Email inválido.")
        .normalizeEmail(),

    body("password")
        .isString()
        .withMessage("Senha deve ser um texto.")
        .bail()
        .notEmpty()
        .withMessage("Senha é obrigatória.")
];

module.exports = {
    loginValidation
};