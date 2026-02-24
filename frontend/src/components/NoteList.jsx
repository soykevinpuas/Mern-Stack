import { useEffect, useState } from "react";
import {
  Box, Text, VStack, Button, HStack,
  useDisclosure, useToast, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalBody, ModalFooter,
  ModalCloseButton, FormControl, FormLabel, Input, Textarea
} from "@chakra-ui/react";
import { getNotes, deleteNote, updateNote } from "../services/noteService";

const NoteList = ({ refreshKey, token }) => {
  const [notes, setNotes] = useState([]); // notas
  const [noteToDelete, setNoteToDelete] = useState(null); // nota a borrar
  const [noteToEdit, setNoteToEdit] = useState(null); // nota a editar
  const [editTitle, setEditTitle] = useState(""); // título edición
  const [editContent, setEditContent] = useState(""); // contenido edición

  const deleteModal = useDisclosure(); // modal borrar
  const editModal = useDisclosure(); // modal editar
  const toast = useToast(); // notificaciones

  // cargar notas al iniciar o refrescar
  useEffect(() => {
    getNotes(token)
      .then(setNotes) // guardar notas
      .catch(() => toast({ title: "Error cargando notas", status: "error", duration: 2500 }));
  }, [refreshKey, token]);

  // recargar lista de notas
  const refreshNotes = async () => {
    const updatedNotes = await getNotes(token);
    setNotes(updatedNotes);
  };

  // borrar nota
  const handleConfirmDelete = async () => {
    try {
      await deleteNote(noteToDelete._id, token); // borrar
      await refreshNotes(); // refrescar
      toast({ title: "Nota eliminada", status: "success", duration: 2500 });
    } catch {
      toast({ title: "Error al eliminar", status: "error", duration: 2500 });
    } finally {
      setNoteToDelete(null);
      deleteModal.onClose();
    }
  };

  // abrir modal de edición
  const openEditModal = (note) => {
    setNoteToEdit(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    editModal.onOpen();
  };

  // actualizar nota
  const handleConfirmEdit = async () => {
    try {
      await updateNote(noteToEdit._id, { title: editTitle, content: editContent }, token);
      await refreshNotes();
      toast({ title: "Nota actualizada", status: "success", duration: 2500 });
    } catch {
      toast({ title: "Error al actualizar", status: "error", duration: 2500 });
    } finally {
      setNoteToEdit(null);
      editModal.onClose();
    }
  };

  return (
    <>
      {/* lista de notas */}
      <VStack spacing={3} align="stretch">
        {notes.map((note) => (
          <Box key={note._id} p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">{note.title}</Text> {/* título */}
            <Text mb={2}>{note.content}</Text> {/* contenido */}
            <HStack spacing={2}>
              <Button size="sm" colorScheme="blue" onClick={() => openEditModal(note)}>Editar</Button> {/* abrir modal */}
              <Button size="sm" colorScheme="red" onClick={() => { setNoteToDelete(note); deleteModal.onOpen(); }}>Eliminar</Button> {/* abrir borrar */}
            </HStack>
          </Box>
        ))}
      </VStack>

      {/* modal borrar */}
      <Modal isOpen={deleteModal.isOpen} onClose={deleteModal.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar eliminación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {noteToDelete && <Text>¿Eliminar la nota <strong>{noteToDelete.title}</strong>?</Text>}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={deleteModal.onClose}>Cancelar</Button>
            <Button colorScheme="red" onClick={handleConfirmDelete}>Eliminar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* modal editar */}
      <Modal isOpen={editModal.isOpen} onClose={editModal.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar nota</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Título</FormLabel>
              <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} /> {/* título */}
            </FormControl>
            <FormControl>
              <FormLabel>Contenido</FormLabel>
              <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} /> {/* contenido */}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={editModal.onClose}>Cancelar</Button>
            <Button colorScheme="blue" onClick={handleConfirmEdit}>Guardar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NoteList;