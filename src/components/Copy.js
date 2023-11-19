import Dropdown from "react-bootstrap/Dropdown";
import { useApp } from "../AppContext";
export default function Copy({ filename }) {
  const { setClipboard, setClipPath, currentPath } = useApp();
  return (
    <Dropdown.Item
      as="button"
      onClick={() => {
        setClipboard(filename);
        setClipPath(currentPath.join("/"));
      }}
    >
      <img
        src="images/clipboard-check.svg"
        alt="copy"
        width="20"
        height="20"
      ></img>
      &nbsp;Copy
    </Dropdown.Item>
  );
}
