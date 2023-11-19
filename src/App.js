import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { AppProvider } from "./AppContext";
import FileList from "./components/FileList";
import UploadProgress from "./components/UploadProgress";

function App() {
  return (
    <AppProvider>
      <Navbar />
      <UploadProgress />
      <FileList />
    </AppProvider>
  );
}

export default App;
