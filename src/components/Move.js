import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { useApp } from "../AppContext";
import { server_ip, myHeaders } from "./Constant";
export default function Move({ filename }) {
  const [show, setShow] = useState(false);
  const { fileInfo, currentPath, setRemoteChange } = useApp();
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setDest("Which folder do you want to move the file into?");
    setShow(true);
  };

  const dirs = fileInfo.filter((f) => f["is_dir"] && f["name"] !== filename);
  const [dest, setDest] = useState(
    "Which folder do you want to move the file into?"
  );
  const { my_header } = myHeaders();
  async function handleMove() {
    setShow(false);
    if (dest === "Which folder do you want to move the file into?") {
      return;
    }
    try {
      await fetch(
        server_ip +
          "/moveinto?path=" +
          currentPath.join("/") +
          "&filename=" +
          filename +
          "&target=" +
          dest,
        { headers: my_header }
      );
      setRemoteChange((c) => (c + 1) % 20);
    } catch (e) {
      alert("Token expired. Please login again.");
      window.location.reload();
    }
  }
  return (
    <>
      <Dropdown.Item as="button" onClick={handleShow}>
        <img
          src="images/folder-symlink.svg"
          alt="move"
          width="20"
          height="20"
        ></img>{" "}
        &nbsp;Move
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Move to a folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="move-form">
            <div className="mb-3">
              <select
                className="form-select form-select-lg mb-3"
                aria-label=".form-select-lg example"
                id="which-folder"
                value={dest}
                onChange={(e) => setDest(e.target.value)}
              >
                <option selected>
                  Which folder do you want to move the file into?
                </option>
                {dirs.map((d) => (
                  <option value={d.name} key={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleMove}>
            Move
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
