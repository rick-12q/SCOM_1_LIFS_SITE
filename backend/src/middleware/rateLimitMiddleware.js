const { rateLimit } = require("express-rate-limit");

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,

    standardHeaders: "draft-8",
    legacyHeaders: false,

    message: {
        success: false,
        error: {
            code: "TOO_MANY_REQUESTS",
            message: "Muitas tentativas de login. Tente novamente em 15 minutos."
        }
    }
});

module.exports = {
    loginLimiter
};