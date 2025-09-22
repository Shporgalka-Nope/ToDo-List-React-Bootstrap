/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "@/components/NavBar";
import CreateNewNoteModal from "@/components/CreateNewNoteModal";
import EditNoteModal from "@/components/EditNoteModal";
import { useEffect, useState } from "react";
import ToastAlert from "@/components/Toast";
import { Spinner, ToastContainer } from "react-bootstrap";
import NotesList from "@/components/NotesList";
import ErrorModal from "@/components/ErrorModal";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL ?? API_Error();

function API_Error(): never {
  throw new Error("API_URL is null");
}

interface NoteProps {
  id: string;
  title: string;
  description?: string;
  completed?: boolean;
}

export default function Home() {
  const [connectingToAPI, setConnectingToAPI] = useState(true);
  const [APIerrorDisplayed, setAPIerrorDisplayed] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setEditModal] = useState(false);
  const [isToastOneOpen, setToastOne] = useState(false);
  const [pageError, setPageError] = useState<string>();
  const [notesList, setNotesList] = useState();
  const [noteToEdit, setNoteToEdit] = useState();

  useEffect(() => {
    GetNotes();
  }, []);

  async function CreateNewNote(title: string, description?: string) {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const timer = setTimeout(() => {
      abortController.abort();
    }, 5000);

    await fetch(API_URL + "tasks/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        description: description,
      }),
      signal: signal,
    })
      .then((value: Response) => {
        console.log(value);
        GetNotes();
        setOpenCreateModal(false);
      })
      .catch((reason: any) => {
        if (reason.name === "AbortError") {
          console.log("Timeout abort");
        }
        setToastOne(true);
        setOpenCreateModal(false);
      });
  }

  async function GetNotes() {
    setConnectingToAPI(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    const timer = setTimeout(() => {
      abortController.abort();
    }, 5000);

    console.log("Getting notes info from server");
    await fetch(API_URL + `tasks/?ts=${new Date().getTime()}`, {
      method: "GET",
      signal: signal,
    })
      .then(async (value: Response) => {
        console.log("Notes info recieved. Opening menu");
        const json = await value.json();
        setNotesList(json);
        setConnectingToAPI(false);
      })
      .catch((reason: Error) => {
        if (reason.name === "AbortError") {
          console.log("Timeout abort");
        }
        console.log(reason);
        setPageError(reason.message);
        setAPIerrorDisplayed(true);
      });
  }

  async function DeleteNote(id: string) {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const timer = setTimeout(() => {
      abortController.abort();
    }, 5000);

    console.log(`Deleting note ${id}`);
    await fetch(API_URL + `tasks/${id}?ts=${new Date().getTime()}`, {
      method: "DELETE",
      signal: signal,
    })
      .then(async (value: Response) => {
        console.log("Note deleted");
        GetNotes();
      })
      .catch((reason: Error) => {
        if (reason.name === "AbortError") {
          console.log("Timeout abort");
        }
        console.log(reason);
        setPageError(reason.message);
        setAPIerrorDisplayed(true);
      });
  }

  function EditNote(note: any) {
    setNoteToEdit(note);
    setEditModal(true);
  }

  async function EditNoteFetch(
    id: string,
    title: string,
    description?: string,
    completed?: boolean
  ) {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const timer = setTimeout(() => {
      abortController.abort();
    }, 5000);

    console.log(`Editing note ${id}`);
    await fetch(API_URL + `tasks/${id}?ts=${new Date().getTime()}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
        title: title,
        description: description,
        completed: completed,
      }),
      signal: signal,
    })
      .then(async (value: Response) => {
        console.log("Note edited");
        setEditModal(false);
        GetNotes();
      })
      .catch((reason: Error) => {
        if (reason.name === "AbortError") {
          console.log("Timeout abort");
        }
        console.log(reason);
        setPageError(reason.message);
        setAPIerrorDisplayed(true);
      });
  }

  return (
    <div style={{ height: "100vh" }}>
      {APIerrorDisplayed && (
        <ErrorModal
          title="Oops!"
          description={`It seems that something went wrong, this page will be reloaded\nError message:\n${pageError!}`}
          actionText="Reload now"
          show={APIerrorDisplayed}
          // setShow={setAPIerrorDisplayed}
          actionCallback={() => window.location.reload()}
        />
      )}

      {connectingToAPI ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Spinner animation="border" variant="primary"></Spinner>
        </div>
      ) : (
        <div>
          <ToastContainer
            position="bottom-end"
            style={{ zIndex: -1, padding: "25px" }}
          >
            {isToastOneOpen && (
              <ToastAlert
                title="Oops!"
                description="Something went wrong! Please try again later"
                show={isToastOneOpen}
                toggleShow={setToastOne}
              />
            )}
          </ToastContainer>
          <NavBar onClickCreate={setOpenCreateModal} />
          <NotesList
            NotesList={notesList}
            onDelete={DeleteNote}
            onEdit={EditNote}
          />
          {openCreateModal && (
            <CreateNewNoteModal
              showState={openCreateModal}
              onCancelClick={setOpenCreateModal}
              createNewNote={CreateNewNote}
            />
          )}

          {openEditModal && (
            <EditNoteModal
              show={openEditModal}
              onHide={setEditModal}
              onCancelClick={setEditModal}
              editNote={EditNoteFetch}
              note={noteToEdit}
            />
          )}
        </div>
      )}
    </div>
  );
}
