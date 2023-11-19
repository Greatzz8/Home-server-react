import { useApp } from "../AppContext";
import FolderItem from "./FolderItem";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { server_ip } from "./Constant";
import Delete from "./Delete";
import Rename from "./Rename";
import Move from "./Move";
import Copy from "./Copy";
const supportedTypes = [
  "mp4",
  "mp3",
  "ogg",
  "webm",
  "wav",
  "pdf",
  "jpg",
  "png",
  "mov",
  "webp",
  "gif",
  "bmp",
  "jpeg",
  "json",
  "html",
  "js",
  "css",
  "svg",
  "xml",
  "txt",
];
export default function FileItem({ file }) {
  function get_file_type(name) {
    let index = name.lastIndexOf(".");
    return name.substring(index + 1).toLowerCase();
  }
  const { currentPath } = useApp();
  let fullPath;
  if (currentPath.length === 0) {
    fullPath = server_ip + "/Movies/" + file.name;
  } else {
    fullPath = server_ip + "/Movies/" + currentPath.join("/") + "/" + file.name;
  }
  if (file.is_dir) {
    return <FolderItem folder={file} />;
  }

  function handlePreview() {
    if (!supportedTypes.includes(get_file_type(file.name))) {
      alert(
        "The file type is not supported by the browser. You can download and view it using other software"
      );
      return;
    }

    window.open(fullPath, "_blank");
  }

  let icon;
  switch (get_file_type(file.name)) {
    case "mp4":
      icon = "images/filetype-mp4.svg";
      break;
    default:
      icon = "images/file-earmark-binary.svg";
  }
  return (
    <tr>
      <td onClick={handlePreview} style={{ cursor: "pointer" }}>
        <img src={icon} width="20" height="20"></img>
      </td>
      <td onClick={handlePreview} style={{ cursor: "pointer" }}>
        {file.name}
      </td>
      <td onClick={handlePreview} style={{ cursor: "pointer" }}>
        {file.size}
      </td>
      <td>
        <Dropdown data-bs-theme="dark">
          <DropdownButton title="" variant="dark">
            <Delete filename={file.name} />
            <Move filename={file.name} />
            <Copy filename={file.name} />
            <Rename filename={file.name} />
            <a
              href={fullPath}
              download={file.name}
              style={{ textDecoration: "none", color: "white" }}
            >
              <Dropdown.Item as="button">
                <img
                  src="images/download.svg"
                  alt="download"
                  width="20"
                  height="20"
                ></img>
                &nbsp;Download
              </Dropdown.Item>
            </a>
          </DropdownButton>
        </Dropdown>
      </td>
    </tr>
  );
}
