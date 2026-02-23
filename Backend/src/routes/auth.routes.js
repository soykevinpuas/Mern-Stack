import { Router } from "express";
import { register,login} from "../controllers/auth.controllers.js";
import User from "../models/User.js";


const router = Router();

// Ruta para registro
router.post("/register", register);

// Ruta para login
router.post("/login", login);

export default router;
