// Router de Express
import { Router } from "express";

// Middleware de autenticación
import { authMiddlware } from "../middlewares/auth.middlewares.js";

// Controladores de notas
import { getNotes, getNoteById, createNote, updateNote, deleteNote } from "../controllers/notes.controllers.js";

// Instancia del router
const router = Router();

// GET /notes - listar notas
router.get("/", authMiddlware, getNotes);

// GET /notes/:id - obtener por ID
router.get("/:id", authMiddlware, getNoteById);

// POST /notes - crear nota
router.post("/", authMiddlware, createNote);

// PUT /notes/:id - actualizar nota
router.put("/:id", authMiddlware, updateNote);

// DELETE /notes/:id - eliminar nota
router.delete("/:id", authMiddlware, deleteNote);

// Exportar router
export default router;
