import { useApp } from "../AppContext";
import Table from "react-bootstrap/Table";
import FileItem from "./FileItem";
import Back from "./Back";
import Spinner from "react-bootstrap/Spinner";

export default function FileList() {
  const { currentPath, fileInfo, serverStillProcessing } = useApp();
  if (serverStillProcessing) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ marginTop: "20px" }}
      >
        <Spinner animation="border" variant="light" />
      </div>
    );
  }
  return (
    <>
      <Table responsive hover borderless variant="dark">
        <thead>
          <tr>
            <td>Type</td>
            <td>Name</td>
            <td>Size</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {fileInfo.map((file) => (
            <FileItem file={file} key={file.name} />
          ))}
          {currentPath.length > 0 ? <Back /> : null}
        </tbody>
      </Table>
    </>
  );
}
