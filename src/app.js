import express, { urlencoded } from "express";
import dotenv from "dotenv";

dotenv.config(); //permite leer las variables de entorno que tenga el projecto

const app = express();
const PORT = process.env.PORT || 3000; // si no encuentra la var PORT en las variables de entorno, usará el 3000

//middleware para...
app.use(express.json()); // parsear lo que venga dedes el body de una req
app.use(urlencoded({ extended: true })); // parsear multidata

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
