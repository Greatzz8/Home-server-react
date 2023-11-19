import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export default function Guide() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button type="button" className="btn btn-dark" onClick={handleShow}>
        <img src="images/question-circle.svg" width="30" height="24"></img>
      </button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Guide</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Hi!👋 This project can be used as home server or personal cloud
            drive to store your media files.<br></br>
            Now let's take a look about how to use it: 👇<br></br>
            Let us start with the icons on the top right:<br></br>
            <ul>
              <li>
                <img src="images/question-circle-black.svg"></img>: Open the
                guidance.
              </li>
              <li>
                <img src="images/folder-plus-black.svg"></img>: Create a new
                folder.
              </li>
              <li>
                <img src="images/file-earmark-arrow-up-black.svg"></img>: Upload
                a file. Please note that you can't upload a file if there is
                already a file in the folder with same name.
              </li>
              <li>
                <img src="images/box-arrow-right-black.svg"></img>: Logout.
              </li>
              <li>
                <img src="images/clipboard-plus-black.svg"></img>: Paste the
                file in the clipboard into current folder.
              </li>
            </ul>
            Then you will see a list of files in the current folder. You can
            click the link to open a file or a folder. <br></br>
            <strong>
              Important: some file types are supported by web browser so you can
              open them and preview them directly. Like .mp4, .pdf, .png, .txt
              files. For those are not supported by browser, like .mkv files or
              .docx files, you can not preview them.
            </strong>
            <br></br>
            You can distinguish folders with other files by the icon or the font
            color.<br></br>
            You can do several types of actions to a file or a folder:
            <ul>
              <li>
                <img src="images/trash-black.svg"></img>: Deletion. If the file
                is a folder then it will recursively delete everything in the
                folder.
              </li>
              <li>
                <img src="images/folder-symlink-black.svg"></img>: Move the file
                into a folder. The selected folder must be located in the same
                folder with the selected file.
              </li>
              <li>
                <img src="images/download-black.svg"></img>: Download.
              </li>
              <li>
                <img src="images/clipboard-check-black.svg"></img>: Copy the
                file or the folder.
              </li>
              <li>
                <img src="images/cursor-text-black.svg"></img>: Rename.
              </li>
            </ul>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
