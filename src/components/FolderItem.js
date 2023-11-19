import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/esm/DropdownButton";
import { useApp } from "../AppContext";
import Copy from "./Copy";
import Delete from "./Delete";
import Move from "./Move";
import Rename from "./Rename";
export default function FolderItem({ folder }) {
  const { currentPath, setCurrentPath } = useApp();
  return (
    <tr style={{}}>
      <td
        style={{ cursor: "pointer" }}
        onClick={() => setCurrentPath([...currentPath, folder.name])}
      >
        <img src="images/folder.svg" width="20" height="20"></img>
      </td>
      <td
        style={{ cursor: "pointer" }}
        onClick={() => setCurrentPath([...currentPath, folder.name])}
      >
        {folder.name}
      </td>
      <td
        style={{ cursor: "pointer" }}
        onClick={() => setCurrentPath([...currentPath, folder.name])}
      >
        {" "}
      </td>
      <td>
        <Dropdown data-bs-theme="dark">
          <DropdownButton title="" variant="dark">
            <Delete filename={folder.name} />
            <Move filename={folder.name} />
            <Copy filename={folder.name} />
            <Rename filename={folder.name} />
          </DropdownButton>
        </Dropdown>
      </td>
    </tr>
  );
}
