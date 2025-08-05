import { checkDBConection } from "../utils/checkDBConection.js";

export const serverInit = async (app, PORT) => {
  try {
    console.log("Verificando conexión a la Base de datos");

    await checkDBConection;

    console.log("Conexión exitosa con postgreSQL");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
    throw new Error(
      "Error al conectarse a la base de datos y al servidor",
      error
    );
  }
};
