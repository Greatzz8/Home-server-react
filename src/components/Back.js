import { useApp } from "../AppContext";

export default function Back() {
  const { currentPath, setCurrentPath } = useApp();
  function goBack() {
    setCurrentPath(
      currentPath.filter((file, index) => index !== currentPath.length - 1)
    );
  }
  return (
    <tr style={{ height: "54px", cursor: "pointer" }} onClick={goBack}>
      <td>
        <img src="images/arrow-return-left.svg"></img>
      </td>
      <td>Back</td>
      <td></td>
      <td></td>
    </tr>
  );
}
