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
const registerValidation = [
    body("nome")
        .trim()
        .notEmpty()
        .withMessage("Nome é obrigatório.")
        .bail()
        .isLength({ min: 3, max: 150 })
        .withMessage("Nome deve possuir entre 3 e 150 caracteres."),

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
        .isLength({ min: 8 })
        .withMessage("Senha deve possuir pelo menos 8 caracteres.")
];
module.exports = {
    loginValidation,
    registerValidation
};