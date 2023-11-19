import { myHeaders, server_ip } from "./Constant";
import Dropdown from "react-bootstrap/Dropdown";
import { useApp } from "../AppContext";
export default function Delete({ filename }) {
  const { currentPath, setRemoteChange } = useApp();

  async function handleDelete() {
    let query_path = currentPath.join("/");
    const { my_header } = myHeaders();
    try {
      await fetch(
        server_ip + "/?path=" + query_path + "&filename=" + filename,
        { method: "DELETE", headers: my_header }
      );
      setRemoteChange((c) => (c + 1) % 100);
    } catch (e) {
      alert("Token expired. Please login again.");
      console.error(e);
      window.location.reload();
    }
  }
  return (
    <Dropdown.Item as="button" onClick={handleDelete}>
      <img src="images/trash.svg" alt="delete" width="20" height="20"></img>
      &nbsp;Delete
    </Dropdown.Item>
  );
}
