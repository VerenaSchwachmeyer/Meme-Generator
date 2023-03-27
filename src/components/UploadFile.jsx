import { useState } from "react";

export default function UploadFile({ setURL, setMemes }) {
  const [file, setFile] = useState();

  return (
    <div>
      <input
        className="pickFile"
        type="file"
        accept="image/*"
        onChange={(event) => {
          setFile(event.target.files[0]);
          setURL(URL.createObjectURL(file));
          setMemes();
        }}
      ></input>
    </div>
  );
}
