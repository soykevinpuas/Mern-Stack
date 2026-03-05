import { Box, HStack, Button, Text } from "@chakra-ui/react";

export default function Navbar({ user, onLogout }) {
  return (
    <Box bg="blue.600" p={4} color="white">
      <HStack justify="space-between">
        <Text fontSize="xl" fontWeight="bold">
          📝 MiNotas
        </Text>
        
        <HStack spacing={4}>
          {/* ✅ Proteger con && */}
          <Text>{user?.email || "Usuario"}</Text>
          <Button colorScheme="red" size="sm" onClick={onLogout}>
            Cerrar sesión
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
}