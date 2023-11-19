import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useApp } from "../AppContext";
import { myHeaders, server_ip } from "./Constant";
export default function CreateFolder() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setFolderName("");
    setShow(true);
  };
  const [folderName, setFolderName] = useState("");
  const { currentPath, fileInfo, setRemoteChange } = useApp();

  async function mkdir_remote(name) {
    let query_path = currentPath.join("/");
    let response;
    const { my_header } = myHeaders();
    try {
      response = await fetch(
        server_ip + "/mkdir?path=" + query_path + "&folder=" + name,
        { headers: my_header }
      );
      response = await response.json();
    } catch (e) {
      alert("Token expired. Please login again.");
      window.location.reload();
    }
    if (response["result"] === "done") {
      setRemoteChange((c) => (c + 1) % 20);
      return;
    } else {
      alert("Folder creation failed");
    }
  }
  async function handleCreate() {
    setShow(false);
    if (
      folderName === "" ||
      check_for_same_name(folderName) ||
      check_special_case(folderName)
    ) {
      alert(
        "Invalid foldername. Folder name can't be empty, or be same as one of the files in current folder, or contains special characters"
      );
      return;
    } else {
      await mkdir_remote(folderName);
    }
  }

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
  return (
    <>
      <button type="button" className="btn btn-dark" onClick={handleShow}>
        <img src="images/folder-plus.svg" width="30" height="24"></img>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div>
              <label htmlFor="folder-name" className="col-form-label">
                Folder name:
              </label>
              <input
                id="folder-name"
                required
                className="form-control"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              ></input>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
