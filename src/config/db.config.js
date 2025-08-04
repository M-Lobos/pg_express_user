import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); //permite leer las variables de entorno que tenga el projecto

/* console.log("DB Config =>", {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  pass: process.env.DB_PASS ? "myPass" : "NOT FOUND",
  db: process.env.DB_NAME,
});
 */
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

/**
 * Función que ejecuta la query en su parámetro text, ejecutando la petición en la DB, basado a los datos de params
 * @param {string} text         - Estrcutura en formato string de la query que se quiere mandar a la DB-
 * @param {array<any>} params   - Lista de datos a implementar en la query a la DB
 * @returns                     -
 */

export const query = (text, params) => pool.query(text, params);
