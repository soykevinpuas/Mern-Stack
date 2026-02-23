import { useState } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
  // Fuerza recarga de la lista
  const [refreshKey, setRefreshKey] = useState(0);

  // Callback al crear nota
  const handleNoteCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    // Contenedor principal (padding general)
    <Box p={6}>
      {/* Título de la app */}
      <Heading mb={4}>Mi App de Notas</Heading>

      {/* Layout vertical con espaciado */}
      <VStack spacing={4} align="stretch">
        {/* Formulario para crear notas */}
        <NoteForm onNoteCreated={handleNoteCreated} />

        {/* Lista de notas (se refresca con refreshKey) */}
        <NoteList refreshKey={refreshKey} />
      </VStack>
    </Box>
  );
}

export default App;

