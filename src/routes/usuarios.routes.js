import { Router } from "express";
import {
  createUsers,
  findAll,
  findById,
} from "../controllers/usuario.controller.js";

const router = Router();

router.post("/usuario", createUsers);
router.get("/usuario", findAll);
router.get("/usuario/:id", findById);

export default router;
