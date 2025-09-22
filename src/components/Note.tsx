import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { BsFillPencilFill } from "react-icons/bs";

interface Props {
  title: string;
  description: string;
}

export default function Note({ title, description }: Props) {
  return;
  <Card>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
      <Button variant="primary">
        <BsFillPencilFill></BsFillPencilFill>
      </Button>
    </Card.Body>
  </Card>;
}
