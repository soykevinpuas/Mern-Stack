const API_URL = "http://localhost:3000/api/auth";

// Login de usuario
export async function loginUser(credentials) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(credentials),
    });

    if (!res.ok) throw new Error("Credenciales inválidas");

    const data = await res.json();

    // Guardar token en localStorage para usarlo en NoteService
    localStorage.setItem("token", data.token);

    return data.user; // devolvemos solo el usuario
}