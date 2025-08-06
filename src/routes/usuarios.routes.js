import { Router } from "express";
import { createUsers, findAll } from "../controllers/usuario.controller.js";

const router = Router();

router.post("/usuario", createUsers);
router.get("/usuario", findAll);

export default router;
