import { Router } from "express";
import { register,login} from "../controllers/auth.controllers.js";
import User from "../models/User.js";
import { authMiddlware } from "../middlewares/auth.middlewares.js";

const router = Router();

// Ruta para registro
router.post("/register", register);

// Ruta para login
router.post("/login", login);

// ruta de prueba, ruta protegida
router.get("/profile",authMiddlware,async (req,res) => {
    const user = await User.findById(req.userId).select("-password");
    return res.json(user);
})
export default router;
