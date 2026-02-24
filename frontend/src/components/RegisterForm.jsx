import { useState } from "react";
import { VStack, Input, Button, Text } from "@chakra-ui/react";

// Componente de Registro
// setToken → función del componente padre para guardar el token después del registro
export default function RegisterForm({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault(); // evitar recarga
    setError(""); // limpiar errores previos

    try {
      // Petición POST al backend para registrar usuario
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Error en registro");

      // Guardar token
      setToken(data.token);
      localStorage.setItem("token",data.token);

      // Optional: mostrar info del usuario
      console.log("Usuario registrado:", data.user);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <VStack as="form" spacing={4} onSubmit={handleRegister}>
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" colorScheme="green">Register</Button>
      {error && <Text color="red.500">{error}</Text>}
    </VStack>
  );
}