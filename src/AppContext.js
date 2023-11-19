import { createContext, useContext, useEffect, useState } from "react";
import { myHeaders, server_ip } from "./components/Constant";
const AppContext = createContext();

function AppProvider({ children }) {
  const [currentPath, setCurrentPath] = useState([]);
  const [fileInfo, setFileInfo] = useState([]);
  const query_path = currentPath.join("/");
  const [remoteChange, setRemoteChange] = useState(0); // Simply for re-fetching data.
  const [clipboard, setClipboard] = useState("");
  const [clipPath, setClipPath] = useState("");
  const [showProgress, setShowProgress] = useState({ show: false, percent: 0 });
  const [serverStillProcessing, setServerStillProcessing] = useState(false);
  useEffect(() => {
    async function fetchFiles() {
      try {
        const { my_header } = myHeaders();
        let movies = await fetch(server_ip + "/movies?path=" + query_path, {
          headers: my_header,
        });
        let result = await movies.json();
        if (result["result"] === "nothing") {
          throw new Error("Can not fetch files");
        }
        setFileInfo(result["result"]);
      } catch (e) {
        console.error(e.message);
        console.error(e.stack);
        alert("Token expired. Please login again.");

        window.location.reload();
      }
    }
    fetchFiles();
  }, [query_path, remoteChange]);
  return (
    <AppContext.Provider
      value={{
        currentPath,
        fileInfo,
        setCurrentPath,
        setRemoteChange,
        remoteChange,
        clipboard,
        setClipboard,
        clipPath,
        setClipPath,
        showProgress,
        setShowProgress,
        serverStillProcessing,
        setServerStillProcessing,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

function useApp() {
  let value = useContext(AppContext);
  if (value === undefined) {
    throw new Error("App Context out of scope");
  }
  return value;
}
export { AppProvider, useApp };
