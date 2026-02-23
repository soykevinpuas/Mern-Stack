// App de Express configurada
import app from "./app.js";

// Conexión a MongoDB
import { connectDB } from "./app.js";

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Arranque principal
async function main() {
    // Conectar a la BD
    await connectDB();

    // Iniciar servidor
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en el puerto ${PORT}`);
    });
}

// Ejecutar arranque
main();
