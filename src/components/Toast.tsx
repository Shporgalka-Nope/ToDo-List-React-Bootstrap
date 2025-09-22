import { Toast } from "react-bootstrap";

interface Props {
  title: string;
  description: string;
  show: boolean;
  toggleShow: (state: boolean) => void;
}

export default function ToastAlert({
  title,
  description,
  show,
  toggleShow,
}: Props) {
  return (
    <Toast
      animation
      delay={5000}
      autohide
      show={show}
      onClose={() => toggleShow(false)}
    >
      <Toast.Header>
        <strong>{title}</strong>
      </Toast.Header>
      <Toast.Body>{description}</Toast.Body>
    </Toast>
  );
}
