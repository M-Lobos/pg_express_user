import { query } from "../config/db.config.js";

export const checkDBConection = async () => {
  try {
    await query("SELECT NOW()");
  } catch (error) {
    /* Reemplazar por un error personalizado del manejador de errores, por un error específico */
    throw new Error(`No se pudo conectar a la base de datos: Error ${error}`);
  }
};
  