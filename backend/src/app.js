const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const pool = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const trabalhoRoutes = require("./routes/trabalhoRoutes");
const maquinaRoutes = require("./routes/maquinaRoutes");
const membroRoutes = require("./routes/membroRoutes");
const agendamentoRoutes = require("./routes/agendamentoRoutes");
const notificacaoRoutes = require("./routes/notificacaoRoutes");

const app = express();

// Middlewares globais
app.use(helmet());
const allowedOrigins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:3000",
    "https://rick-12q.github.io"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origem não permitida pelo CORS."));
    }
}));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/trabalhos", trabalhoRoutes);
app.use("/api/maquinas", maquinaRoutes);
app.use("/api/membros", membroRoutes);
app.use("/api/agendamentos", agendamentoRoutes);
app.use("/api/notificacoes", notificacaoRoutes);


// Verifica se a API e o banco de dados estão funcionando
app.get("/api/health", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT current_database() AS database, NOW() AS timestamp"
        );

        res.status(200).json({
            success: true,
            data: {
                status: "ok",
                message: "API LIFS funcionando",
                database: result.rows[0].database,
                databaseStatus: "connected",
                timestamp: result.rows[0].timestamp
            }
        });
    } catch (error) {
        console.error("Erro de conexão com o banco:", error.message);

        res.status(500).json({
            success: false,
            error: {
                code: "DATABASE_ERROR",
                message: "Não foi possível conectar ao banco de dados."
            }
        });
    }
});

// Rota inexistente
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