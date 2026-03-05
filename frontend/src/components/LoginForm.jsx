import { useState } from "react";
import { VStack, Input, Button, Text } from "@chakra-ui/react";

// Componente de Login
// setToken → función del componente padre para guardar el token una vez logueado
export default function LoginForm({ setToken,setUser }) {
  // Estados para los inputs y errores
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Función que se ejecuta al enviar el formulario
  const handleLogin = async (e) => {
    e.preventDefault(); // evitar recargar la página
    setError(""); // limpiar errores previos

    try {
      // Petición POST al backend
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // enviar email y password
      });

      const data = await res.json(); // respuesta del backend

      console.log("Data completa:", data);
      console.log("User:", data.user);
      console.log("Email:", data.user?.email);
      console.log("Name:", data.user?.name);

      if (!res.ok) throw new Error(data.message || "Error en login");

      // Guardar token en el estado del componente padre
      setToken(data.token);

      // Guardar el usuario en el estado del componente padre
      setUser(data.user);

      // Guardar token y usuario en el localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));


      // Optional: mostrar info del usuario
      console.log("Usuario logueado:", data.user);

    } catch (err) {
      setError(err.message); // mostrar error
    }
  };

  // JSX usando Chakra UI
  return (
    <VStack as="form" spacing={4} onSubmit={handleLogin}>
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
      <Button type="submit" colorScheme="blue">Login</Button>
      {error && <Text color="red.500">{error}</Text>}
    </VStack>
  );
}