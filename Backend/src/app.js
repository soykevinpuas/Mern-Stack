// Express (servidor)
import express from "express";

// Mongoose (MongoDB)
import mongoose from "mongoose";

// Variables de entorno (.env)
import dotenv from "dotenv";

// CORS (acceso desde frontend)
import cors from "cors";

// Rutas de notas
import notesRoutes from "./routes/notes.routes.js";

import authRoutes from "./routes/auth.routes.js";


// Cargar variables de entorno
dotenv.config();

// App de Express
const app = express();

// Habilitar CORS
app.use(cors());

// Middleware: parsear JSON en el body de las requests
app.use(express.json());

// Monta las rutas de autenticación /api/auth
app.use("/api/auth", authRoutes);

// Montar rutas bajo /api
app.use("/api/notes", notesRoutes);

// Conectar a MongoDB
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado");
  } catch (error) {
    console.error("Error Mongo:", error);
    process.exit(1);
  }
};

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// Exportar app
export default app;
