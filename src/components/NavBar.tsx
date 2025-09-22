"use client";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

interface Props {
  onClickCreate: (state: boolean) => void;
}

export default function NavbarVertical({ onClickCreate }: Props) {
  return (
    <Navbar style={{ width: "100%", backgroundColor: "gray", padding: "10px" }}>
      <Button
        variant="primary"
        onClick={() => {
          onClickCreate(true);
        }}
      >
        Create
      </Button>
    </Navbar>
  );
}
