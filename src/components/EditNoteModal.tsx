/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Form, Modal, Spinner, Stack } from "react-bootstrap";

interface Props {
  show: boolean;
  onHide: (state: boolean) => void;

  onCancelClick: (state: boolean) => void;
  editNote: (
    id: string,
    title: string,
    description?: string,
    completed?: boolean
  ) => Promise<void>;
  note: any;
}

export default function EditNoteModal({
  show,
  onHide,
  onCancelClick,
  editNote,
  note,
}: Props) {
  const [validated, setValidated] = useState<boolean>();
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState<string>(note.title);
  const [description, setDescription] = useState<string>(note.description);
  const [completed, setCompleted] = useState<boolean>(note.completed);

  function validationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setLoading(true);
    editNote(note.id, title!, description, completed);
  }

  return (
    <Modal show={show} onHide={() => onHide(false)}>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>Edit note</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="editNoteForm"
          noValidate
          validated={validated}
          onSubmit={validationHandler}
        >
          <Stack direction="vertical" gap={3}>
            <Form.Group controlId="fromControlEditId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                disabled
                placeholder="ID"
                required
                type="text"
                value={note.id}
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="fromControlEditTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                placeholder="Title"
                required
                type="text"
                value={title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setTitle(e.target.value)
                }
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="fromControlEditDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Description"
                type="text"
                value={description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target.value)
                }
              />
              <Form.Control.Feedback></Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="fromControlEditCompleted">
              <Form.Label>Completed</Form.Label>
              <Form.Check
                type="checkbox"
                checked={completed}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCompleted(e.target.checked)
                }
              />
            </Form.Group>
          </Stack>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            onCancelClick(false);
          }}
        >
          Close
        </Button>
        <Button form="editNoteForm" type="submit" disabled={loading}>
          {loading && (
            <Spinner
              animation="border"
              role="status"
              as="span"
              size="sm"
              aria-hidden="true"
              style={{ margin: "0 6px 0 0" }}
            />
          )}
          {!loading ? "Create" : "Creating..."}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
