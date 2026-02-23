import { useState } from "react";
import { Box, Button, Input, Textarea, VStack } from "@chakra-ui/react";
import { createNote } from "../services/noteService";

const NoteForm = ({ onNoteCreated }) => {
  // Estado del formulario
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!title.trim() || !content.trim()) return;

    // Crear nota en API
    await createNote({ title, content });

    // Limpiar campos
    setTitle("");
    setContent("");

    // Notificar al padre
    onNoteCreated?.();
  };

  return (
    // Formulario
    <Box as="form" onSubmit={handleSubmit}>
      {/* Layout vertical del form */}
      <VStack spacing={3} align="stretch">
        {/* Input de título */}
        <Input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Input de contenido */}
        <Textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Botón de envío */}
        <Button type="submit" colorScheme="blue">
          Crear nota
        </Button>
      </VStack>
    </Box>
  );
};

export default NoteForm;
