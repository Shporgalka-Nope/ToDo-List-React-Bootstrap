/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Stack,
} from "react-bootstrap";
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL ?? API_Error();

function API_Error(): never {
  throw new Error("API_URL is null");
}

interface Props {
  NotesList: any;
  onDelete: (id: string) => void;
  onEdit: (note: any) => void;
}

export default function NotesList({ NotesList, onDelete, onEdit }: Props) {
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log(`NotesList: ${NotesList}`);
  }, [NotesList]);

  return (
    <div
      style={{
        // display: "flex",
        // flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        padding: "25px 0px 0px 0px",
      }}
    >
      <Container>
        <Row xs={1} md={3} lg={5} className="g-2">
          {NotesList.map((note) => (
            <Col key={note.id}>
              <Card bg="secondary">
                <Card.Body>
                  <Card.Title>{note.title}</Card.Title>

                  <Card.Text>
                    {note.description}
                    <br />
                    {"Created at: "}
                    {note.createdAt}
                  </Card.Text>
                  <Form.Check
                    disabled
                    checked={note.completed}
                    aria-label={`completed-${note.id}`}
                  ></Form.Check>
                  <br />
                  <Stack direction="horizontal">
                    <Button variant="danger" onClick={() => onDelete(note)}>
                      <BsFillTrash3Fill />
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() => onEdit(note)}
                      className="ms-auto"
                    >
                      <BsFillPencilFill />
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* {isLoading 
      ? (<Spinner animation="border" role="status" variant="primary"></Spinner>)
      : 
      } */}
    </div>
  );
}
