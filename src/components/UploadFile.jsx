export default function UploadFile({ setURL, setMemes }) {
  return (
    <div>
      <label for="pickFile" class="file-upload">
        Upload your own file
        <input
          className="pickFile"
          type="file"
          accept="image/*"
          onChange={(event) => {
            setURL(URL.createObjectURL(event.target.files[0]));
            setMemes();
          }}
        ></input>
      </label>
    </div>
  );
}
