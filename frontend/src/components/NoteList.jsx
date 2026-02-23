import { useEffect, useState } from "react";
import {
  Box,
  Text,
  VStack,
  Button,
  HStack,
  Input,
  Textarea,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { getNotes, deleteNote, updateNote } from "../services/noteService";

const NoteList = ({ refreshKey }) => {
  // Estado de notas
  const [notes, setNotes] = useState([]);

  // Nota seleccionada para borrar
  const [noteToDelete, setNoteToDelete] = useState(null);

  // Estado de edición
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Control de modales (Chakra)
  const deleteModal = useDisclosure();
  const editModal = useDisclosure();

  // Notificaciones (Chakra)
  const toast = useToast();

  // Cargar notas al montar / refrescar
  useEffect(() => {
    getNotes()
      .then(setNotes)
      .catch((err) => console.error("Error cargando notas:", err));
  }, [refreshKey]);

  // Recargar lista desde API
  const refreshNotes = async () => {
    const updatedNotes = await getNotes();
    setNotes(updatedNotes);
  };

  // Confirmar eliminación
  const handleConfirmDelete = async () => {
    try {
      await deleteNote(noteToDelete._id);
      await refreshNotes();
      toast({
        title: "Nota eliminada",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error al eliminar",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } finally {
      setNoteToDelete(null);
      deleteModal.onClose();
    }
  };

  // Abrir modal de edición
  const openEditModal = (note) => {
    setNoteToEdit(note);
    setEditTitle(note.title);
    setEditContent(note.content);
    editModal.onOpen();
  };

  // Confirmar edición
  const handleConfirmEdit = async () => {
    try {
      await updateNote(noteToEdit._id, {
        title: editTitle,
        content: editContent,
      });
      await refreshNotes();
      toast({
        title: "Nota actualizada",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error al actualizar",
        status: "error",
        duration: 2500,
        isClosable: true,
      });
    } finally {
      setNoteToEdit(null);
      editModal.onClose();
    }
  };

  return (
    <>
      {/* Lista vertical de notas */}
      <VStack spacing={3} align="stretch">
        {notes.map((note) => (
          <Box key={note._id} p={3} borderWidth="1px" borderRadius="md">
            {/* Título */}
            <Text fontWeight="bold">{note.title}</Text>

            {/* Contenido */}
            <Text mb={2}>{note.content}</Text>

            {/* Acciones */}
            <HStack spacing={2}>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() => openEditModal(note)}
              >
                Editar
              </Button>

              <Button
                size="sm"
                colorScheme="red"
                onClick={() => {
                  setNoteToDelete(note);
                  deleteModal.onOpen();
                }}
              >
                Eliminar
              </Button>
            </HStack>
          </Box>
        ))}
      </VStack>

      {/* Modal de confirmación de eliminación */}
      <Modal isOpen={deleteModal.isOpen} onClose={deleteModal.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmar eliminación</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {noteToDelete && (
              <Text>
                ¿Eliminar la nota <strong>{noteToDelete.title}</strong>?
              </Text>
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={deleteModal.onClose}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de edición */}
      <Modal isOpen={editModal.isOpen} onClose={editModal.onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar nota</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Título</FormLabel>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Contenido</FormLabel>
              <Textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={editModal.onClose}>
              Cancelar
            </Button>
            <Button colorScheme="blue" onClick={handleConfirmEdit}>
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NoteList;
