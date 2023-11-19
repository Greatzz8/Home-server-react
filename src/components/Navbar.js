import { useEffect, useRef, useState } from "react";
import HugeUploader from "huge-uploader";
import Guide from "./Guide";
import CreateFolder from "./CreateFolder";
import { myHeaders, server_ip } from "./Constant";
import { useApp } from "../AppContext";
import Uploader from "./Uploader";
export default function Navbar() {
  const [size, setSize] = useState(0);
  const {
    remoteChange,
    clipboard,
    clipPath,
    currentPath,
    setRemoteChange,
    setCurrentPath,
  } = useApp();
  const { my_header, my_token } = myHeaders();

  useEffect(() => {
    async function get_disk_usage() {
      try {
        let result = await fetch(server_ip + "/disk", { headers: my_header });
        result = await result.json();
        result = result["result"];
        setSize(result);
      } catch (e) {
        console.error(e.message);
        console.error(e.stack);
        alert("Token expired. Please login again.");

        window.location.reload();
      }
    }

    get_disk_usage();
  }, [remoteChange]);

  function remove_cookie(name) {
    document.cookie =
      encodeURIComponent(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
  async function paste() {
    if (clipboard === "") {
      return;
    }
    try {
      await fetch(server_ip + "/copy", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${my_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clipboard: clipboard,
          cliPath: clipPath,
          cPath: currentPath.join("/"),
        }),
      });
      setRemoteChange((c) => (c + 1) % 20);
    } catch (e) {
      alert("Token expired. Please login again.");
      window.location.reload();
    }
  }

  return (
    <nav className="navbar bg-dark">
      <div className="container-fluid">
        <div
          className="navbar-brand text-white clickable"
          style={{ cursor: "pointer" }}
          onClick={() => setCurrentPath([])}
        >
          <img
            src="images/house-lock.svg"
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          ></img>
          Home Server
        </div>
        <span className="text-white">Total Usage: {size}</span>
        <div>
          <Guide />
          <CreateFolder />
          <Uploader />
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => {
              remove_cookie("token");
              window.location.reload();
            }}
          >
            <img src="images/box-arrow-right.svg" width="30" height="24"></img>
          </button>
          <button type="button" className="btn btn-dark" onClick={paste}>
            <img src="images/clipboard-plus.svg" width="30" height="24"></img>
          </button>
        </div>
      </div>
    </nav>
  );
}
