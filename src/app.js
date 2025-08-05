import express, { urlencoded } from "express";
import { serverInit } from "./services/serverInit.js";
import UserRouter from "./routes/usuarios.routes.js";

const app = express();

const PORT = process.env.PORT || 3000; // si no encuentra la var PORT en las variables de entorno, usará el 3000

//middleware para...
app.use(express.json()); // parsear lo que venga dedes el body de una req
app.use(urlencoded({ extended: true })); // parsear multidata

app.use("/api/v1", UserRouter);

serverInit(app, PORT);
