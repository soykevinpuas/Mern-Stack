// noteService.js
const API_URL = "http://localhost:3000/api/notes";

// ⚡ Ahora la función recibe token como parámetro
export async function createNote(note, token) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` // ⚡ token viene del props
    },
    body: JSON.stringify(note),
  });

  if (!res.ok) throw new Error("Error creando nota");
  return res.json();
}

// GET todas las notas
export async function getNotes(token) {
  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) throw new Error("Error obteniendo notas");
  return res.json();
}

// DELETE nota
export async function deleteNote(id, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) throw new Error("Error al eliminar nota");
  return res.json();
}

// PUT nota
export async function updateNote(id, updatedNote, token) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updatedNote),
  });

  if (!res.ok) throw new Error("Error al actualizar la nota");
  return res.json();
}