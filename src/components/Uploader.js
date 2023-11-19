import { useRef } from "react";
import { useApp } from "../AppContext";
import { myHeaders, server_ip } from "./Constant";
import HugeUploader from "huge-uploader";
export default function Uploader() {
  const {
    currentPath,
    fileInfo,
    setRemoteChange,
    setShowProgress,
    setServerStillProcessing,
  } = useApp();
  const { my_header } = myHeaders();
  const fileUpload = useRef(null);
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

  function handleUpload() {
    let file = fileUpload.current.files[0];
    if (check_for_same_name(file.name) || check_special_case(file.name)) {
      alert(
        "Invalid foldername. Uploaded file can not be same as one of the files in current folder, or contains special characters"
      );
      return;
    }
    let movePath = currentPath.join("/");
    console.log(server_ip + "/upload");
    let uploader = new HugeUploader({
      endpoint: server_ip + "/upload",
      file: file,
      postParams: { move_to: movePath, filename: file.name },
      chunkSize: 5,
      headers: my_header,
    });
    uploader.on("error", (err) => {
      console.error("Something bad happened", err.detail);
    });
    uploader.on("progress", async (progress) => {
      setShowProgress({ show: true, percent: progress.detail });
      if (progress.detail === 100) {
        setServerStillProcessing(true);
        const file_id = uploader.headers["uploader-file-id"];
        let finished = false;
        const max_retry = 50; // The server side may not finish copying. The files may still be in temp folder.
        let i = 0;
        while (!finished && i < max_retry) {
          await sleep(400);
          let query = await fetch(server_ip + "/checkAssemble?id=" + file_id, {
            headers: my_header,
          });
          finished = await query.json();
          finished = finished.result;
          i++;
        }
        if (i === max_retry) {
          window.location.reload();
        }
        setShowProgress({ show: false, percent: 0 });
        setRemoteChange((c) => (c + 1) % 20);
        setServerStillProcessing(false);
      }
    });
  }

  return (
    <>
      <input
        type="file"
        style={{ display: "none" }}
        ref={fileUpload}
        onChange={handleUpload}
      />
      <button
        type="button"
        className="btn btn-dark"
        onClick={() => {
          fileUpload.current.click();
        }}
      >
        <img
          src="images/file-earmark-arrow-up.svg"
          width="30"
          height="24"
        ></img>
      </button>
    </>
  );
}
