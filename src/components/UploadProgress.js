import ProgressBar from "react-bootstrap/ProgressBar";
import { useApp } from "../AppContext";
export default function UploadProgress() {
  const { showProgress } = useApp();
  if (!showProgress.show) {
    return null;
  }
  return (
    <div style={{ marginLeft: "10%", marginRight: "10%" }}>
      <ProgressBar
        now={showProgress.percent}
        label={`${showProgress.percent}%`}
        animated
      />
    </div>
  );
}
