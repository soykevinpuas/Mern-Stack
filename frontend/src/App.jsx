import { useState } from "react";
import { Box, Heading, VStack, HStack, Button } from "@chakra-ui/react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
  // ⚡ Estado del token
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // ⚡ Fuerza recarga de la lista de notas
  const [refreshKey, setRefreshKey] = useState(0);

  // Callback al crear nota
  const handleNoteCreated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Estado para cambiar entre login y register
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Box p={6}>
      {/* Título */}
      <Heading mb={4}>Mi App de Notas</Heading>

      {!token ? (
        // Si no hay token, mostrar login/register
        <VStack spacing={4} align="stretch">
          {/* Switch entre login y registro */}
          <HStack spacing={4}>
            <Button
              colorScheme={showLogin ? "blue" : "gray"}
              onClick={() => setShowLogin(true)}
            >
              Login
            </Button>
            <Button
              colorScheme={!showLogin ? "green" : "gray"}
              onClick={() => setShowLogin(false)}
            >
              Register
            </Button>
          </HStack>

          {/* Mostrar formulario según showLogin */}
          {showLogin ? (
            <LoginForm setToken={setToken} />
          ) : (
            <RegisterForm setToken={setToken} />
          )}
        </VStack>
      ) : (
        // Si hay token, mostrar NoteForm, NoteList y Logout
        <VStack spacing={4} align="stretch">
          {/* Botón Logout */}
          <Button
            colorScheme="red"
            onClick={() => {
              localStorage.removeItem("token"); // limpiar token
              setToken(""); // volver a login/register
            }}
          >
            Logout
          </Button>

          {/* Formulario para crear notas */}
          <NoteForm onNoteCreated={handleNoteCreated} token={token} />

          {/* Lista de notas */}
          <NoteList refreshKey={refreshKey} token={token} />
        </VStack>
      )}
    </Box>
  );
}

export default App;