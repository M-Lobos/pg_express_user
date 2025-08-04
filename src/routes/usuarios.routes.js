import { Router } from "express";
import { createUsers } from "../controllers/usuario.controller.js";

const router = Router();

router.post("/usuario", createUsers);

export default router;  