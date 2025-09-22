/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";

interface Props {
  showState: boolean;
  onCancelClick: (state: boolean) => void;
  createNewNote: (title: string, description?: string) => void;
}

export default function CreateNewNoteModal({
  onCancelClick,
  showState,
  createNewNote,
}: Props) {
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function validationHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setLoading(true);
    createNewNote(title!, description);
  }

  return (
    <Modal show={showState} onHide={() => onCancelClick(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Create new note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form
          id="createNewForm"
          noValidate
          validated={validated}
          onSubmit={validationHandler}
        >
          <Form.Group controlId="fromControlTitle">
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

          <Form.Group controlId="fromControlDescription">
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
        <Button form="createNewForm" type="submit" disabled={loading}>
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
