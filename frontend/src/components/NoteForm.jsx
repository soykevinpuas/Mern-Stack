// NoteForm.jsx
import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { createNote } from "../services/noteService";

export default function NoteForm({ onNoteCreated, token }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNote({ title, content }, token); // ⚡ pasa token aquí
      setTitle("");
      setContent("");
      onNoteCreated(); // refresca la lista
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button type="submit" colorScheme="blue">
        Crear Nota
      </Button>
    </form>
  );
}