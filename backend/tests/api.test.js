require("dotenv").config();

const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/config/database");

describe("API LIFS", () => {
    afterAll(async () => {
        await pool.end();
    });

    test("GET /api/health deve retornar API e banco funcionando", async () => {
        const response = await request(app).get("/api/health");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.status).toBe("ok");
        expect(response.body.data.databaseStatus).toBe("connected");
    });

    test("GET em rota inexistente deve retornar 404", async () => {
        const response = await request(app).get("/api/rota-inexistente");

        expect(response.statusCode).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.error.code).toBe("NOT_FOUND");
    });

    test("POST /api/auth/login com email inválido deve retornar 400", async () => {
        const response = await request(app)
            .post("/api/auth/login")
            .send({
                email: "email-invalido",
                password: "123456"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.error.code).toBe("VALIDATION_ERROR");
    });

    test("GET /api/auth/me sem token deve retornar 401", async () => {
        const response = await request(app).get("/api/auth/me");

        expect(response.statusCode).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.error.code).toBe("UNAUTHORIZED");
    });

    test("GET /api/trabalhos/abc deve retornar 400", async () => {
        const response = await request(app).get("/api/trabalhos/abc");

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.error.code).toBe("VALIDATION_ERROR");
    });
});