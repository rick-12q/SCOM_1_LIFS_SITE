const { body, param } = require("express-validator");

function containsHtml(value) {
    if (typeof value !== "string") {
        return false;
    }

    return /<[^>]*>/g.test(value);
}

function rejectHtml(fieldName) {
    return (value) => {
        if (containsHtml(value)) {
            throw new Error(
                `${fieldName} não pode conter tags HTML.`
            );
        }

        return true;
    };
}

const idValidation = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("ID deve ser um número inteiro positivo.")
        .toInt()
];

const trabalhoValidation = [
    body("titulo")
        .trim()
        .notEmpty()
        .withMessage("Título é obrigatório.")
        .bail()
        .isLength({ max: 300 })
        .withMessage("Título deve possuir no máximo 300 caracteres.")
        .bail()
        .custom(rejectHtml("Título")),

    body("autores")
        .trim()
        .notEmpty()
        .withMessage("Autores são obrigatórios.")
        .bail()
        .custom(rejectHtml("Autores")),

    body("ano")
        .isInt({
            min: 1900,
            max: 2100
        })
        .withMessage("Ano deve ser um número inteiro entre 1900 e 2100.")
        .toInt(),

    body("tipo")
        .trim()
        .notEmpty()
        .withMessage("Tipo é obrigatório.")
        .bail()
        .isLength({ max: 100 })
        .withMessage("Tipo deve possuir no máximo 100 caracteres.")
        .bail()
        .custom(rejectHtml("Tipo")),

    body("arquivo")
        .optional({ values: "null" })
        .trim()
        .isLength({ max: 500 })
        .withMessage("Arquivo deve possuir no máximo 500 caracteres.")
        .bail()
        .custom(rejectHtml("Arquivo"))
];

module.exports = {
    idValidation,
    trabalhoValidation
};