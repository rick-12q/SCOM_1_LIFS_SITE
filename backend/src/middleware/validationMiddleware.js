const { validationResult } = require("express-validator");

function validateRequest(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            error: {
                code: "VALIDATION_ERROR",
                message: "Dados inválidos.",
                details: errors.array().map((error) => ({
                    field: error.path,
                    message: error.msg
                }))
            }
        });
    }

    next();
}

module.exports = {
    validateRequest
};