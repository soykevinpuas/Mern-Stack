// URL base de la API de notas
const API_URL = "http://localhost:3000/api/notes";

// Obtener token guardado tras login
const getToken = () => localStorage.getItem("token");

// Crear una nueva nota (POST /notes)
export async function createNote(note) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      // Indicamos que enviamos JSON
      "Content-Type": "application/json",
      // Token para rutas protegidas
      Authorization: `Bearer ${getToken()}`
    },
    // Convertimos objeto JS a JSON
    body: JSON.stringify(note),
  });

  if (!res.ok) throw new Error("Error creando nota");
  return res.json();
}

// Obtener todas las notas del usuario autenticado (GET /notes)
export async function getNotes() {
  const res = await fetch(API_URL, {
    headers: {
      // Identifica al usuario mediante JWT
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!res.ok) throw new Error("Error obteniendo notas");
  return res.json();
}

// Eliminar una nota por id (DELETE /notes/:id)
export async function deleteNote(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      // Verifica que la nota pertenece al usuario
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (!res.ok) throw new Error("Error al eliminar nota");
  return res.json();
}

// Actualizar una nota por id (PUT /notes/:id)
export async function updateNote(id, updatedNote) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      // Enviamos JSON y autenticación
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    // Datos nuevos de la nota
    body: JSON.stringify(updatedNote),
  });

  if (!res.ok) throw new Error("Error al actualizar la nota");
  return res.json();
}
