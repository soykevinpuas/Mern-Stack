// Importamos StrictMode de React para detectar problemas en desarrollo
// Idea mental: "Traigo el modo estricto que me ayuda a encontrar errores"
import { StrictMode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

// Importamos createRoot para crear el punto de entrada de React
// Idea mental: "Traigo la función que conecta React con el HTML"
import { createRoot } from 'react-dom/client'

// Importamos los estilos globales de la aplicación
// Idea mental: "Traigo los estilos CSS que se aplican a toda la aplicación"
import './index.css'

// Importamos el componente principal App
// Idea mental: "Traigo el componente raíz que contiene toda mi aplicación"
import App from './App.jsx'

// Creamos la raíz de React en el elemento con id "root" del HTML
// Luego renderizamos la aplicación dentro de StrictMode
// Idea mental: "Conecto React con el div#root del HTML y muestro mi aplicación"
createRoot(document.getElementById('root')).render(
  // StrictMode envuelve la app para detectar problemas en desarrollo
  // Idea mental: "Activo el modo estricto que me ayuda a encontrar errores"
  <StrictMode>
    {/* Renderizamos el componente principal App */}
    {/* Idea mental: "Aquí se muestra toda mi aplicación de notas" */}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
