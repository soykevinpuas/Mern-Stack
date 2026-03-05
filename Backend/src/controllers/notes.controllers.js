// Modelo de notas
import Note from "../models/Note.js";

// GET /notes - listar todas las notas
export const getNotes = async (req, res) => {
    try {
        // Obtener todas las notas
        const notes = await Note.find({user: req.userId});

        // Responder con JSON
        res.json(notes);
    } catch (error) {
        // Error del servidor
        res.status(500).json({ message: error.message });
    }
};

// GET /notes/:id - obtener una nota por ID
export const getNoteById = async (req, res) => {
    try {
        // Buscar por ID
        const note = await Note.findById(req.params.id);

        // No encontrada
        if (!note) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }

        // Verificar propiedad
        if (note.user.toString() !== req.userId) {
            return res.status(403).json({ message: "No tienes permiso para ver esta nota" });
        }

        // Responder con la nota
        res.json(note);
    } catch (error) {
        // Error del servidor
        res.status(500).json({ message: error.message });
    }
};

// POST /notes - crear una nota
export const createNote = async (req, res) => {
    try {
        // Datos del body
        const { title, content } = req.body;

        // Nueva nota
        const newNote = new Note({
            title, content,
            user: req.userId
        });

        // Guardar en BD
        const saveNote = await newNote.save();

        // Creada
        res.status(201).json(saveNote);
    } catch (error) {
        // Error del servidor
        res.status(500).json({ message: error.message });
    }
};

// PUT /notes/:id - actualizar una nota
export const updateNote = async (req, res) => {
    try {

         // Buscar la nota primero
        const note = await Note.findById(req.params.id);
        
          // No encontrada
        if (!note) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }


        // Verificar que el usuario sea el dueño
        if (note.user.toString() !== req.userId) {
            return res.status(403).json({ message: "No tienes permiso para editar esta nota" });
        }
        
        // Actualizar por ID
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

       // Verificar que la nota fue actualizada
       if (!updatedNote) {
           return res.status(404).json({ message: "Nota no encontrada" });
       }

        // Responder con la nota actualizada
        res.json(updatedNote);
    } catch (error) {
        // Error del servidor
        res.status(500).json({ message: error.message });
    }
};

// DELETE /notes/:id - eliminar una nota
export const deleteNote = async (req, res) => {
    try {
        // Eliminar por ID
        const deletedNote = await Note.findById(req.params.id);

        // No encontrada
        if (!deletedNote) {
            return res.status(404).json({ message: "Nota no encontrada" });
        }

        // Verificar propiedad
        if (deletedNote.user.toString() !== req.userId) {
            return res.status(403).json({ message: "No tienes permiso para eliminar esta nota" });
        }
        // Eliminada
        await Note.findByIdAndDelete(req.params.id);

       
        res.json({ message: "Nota eliminada correctamente" });
    } catch (error) {
        // Error del servidor
        res.status(500).json({ message: error.message });
    }
};
