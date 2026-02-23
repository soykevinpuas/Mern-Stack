// Mongoose
import mongoose from "mongoose";

// Esquema de Nota
const NoteSchema = new mongoose.Schema(
    {
        // Título de la nota
        title: {
            type: String,
            required: true,
            trim: true
        },

        // Usuario de la nota
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Contenido de la nota
        content: {
            type: String,
            required: true
        },

        // Fecha de creación
        date: {
            type: Date,
            default: Date.now
        }
    },
    {
        // createdAt / updatedAt automáticos
        timestamps: true
    }
);

// Modelo Note
export default mongoose.model("Note", NoteSchema);
