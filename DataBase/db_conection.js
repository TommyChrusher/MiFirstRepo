import pg from "pg";

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "Pruebas API",
    password: "postgres",
    port: 5432
});