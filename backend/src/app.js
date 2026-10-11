const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

// Middlewares globais
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rota de teste da API
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            status: "ok",
            message: "API LIFS funcionando"
        }
    });
});

// Rota para endpoints inexistentes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: {
            code: "NOT_FOUND",
            message: "Rota não encontrada."
        }
    });
});

module.exports = app;