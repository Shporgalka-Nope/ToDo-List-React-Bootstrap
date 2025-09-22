import { Modal, Button } from "react-bootstrap";

interface Props {
  /** Title that is displayed in header of modal */
  title: string;
  /** Description that is displayed in the body of modal */
  description: string;
  /** Text that is displayed on button */
  actionText: string;
  /** Callback function that is called when button is pressed or whitespace clicked */
  actionCallback: () => void;
  show: boolean;
  //   setShow: (state: boolean) => void;
}

export default function ErrorModal({
  title,
  description,
  actionText,
  actionCallback,
  show,
}: //   setShow,
Props) {
  return (
    <Modal centered show={show} onHide={actionCallback}>
      <Modal.Header closeButton>
        <Modal.Title>
          <strong>{title}</strong>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>{description}</Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={actionCallback}>
          {actionText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
