import { query } from "../config/db.config.js";

export const checkDBConection = async () => {
  try {
    const thisDate = await query("SELECT NOW()");
    const currentDate = thisDate.rows[0];
    /* console.log(currentDate); */
    return currentDate;
    
  } catch (error) {
    /* Reemplazar por un error personalizado del manejador de errores, por un error específico */
    throw new Error(`No se pudo conectar a la base de datos: Error ${error}`);
  }
};
