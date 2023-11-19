import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { useApp } from "../AppContext";
import { server_ip, myHeaders } from "./Constant";
export default function Rename({ filename }) {
  const [show, setShow] = useState(false);
  const [newName, setNewName] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setNewName("");
    setShow(true);
  };
  const { fileInfo, currentPath, setRemoteChange } = useApp();
  async function handleRename() {
    setShow(false);
    function check_for_same_name(name) {
      for (let f of fileInfo) {
        if (name === f["name"]) {
          return true;
        }
      }
      return false;
    }

    function check_special_case(name) {
      if (name.includes("/") || name.includes("&")) {
        return true;
      } else {
        return false;
      }
    }
    if (
      newName.length === 0 ||
      check_for_same_name(newName) ||
      check_special_case(newName)
    ) {
      alert(
        "Invalid new name. New name can't be empty, or be same as one of the files in current folder, or contains special characters"
      );
      return;
    }
    try {
      const { my_token } = myHeaders();
      await fetch(server_ip + "/rename", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${my_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          path: currentPath.join("/"),
          old: filename,
          new: newName,
        }),
      });
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
          src="images/cursor-text.svg"
          alt="rename"
          width="20"
          height="20"
        ></img>
        &nbsp;Rename
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form id="rename-form">
            <div className="mb-3">
              <label htmlFor="folder-name" className="col-form-label">
                Rename to:
              </label>
              <input
                className="form-control"
                id="rename-name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              ></input>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRename}>
            Rename
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
