export default function UploadFile({ setURL, setMemes }) {
  return (
    <div>
      <input
        className="pickFile"
        type="file"
        accept="image/*"
        onChange={(event) => {
          setURL(URL.createObjectURL(event.target.files[0]));
          setMemes();
        }}
      ></input>
    </div>
  );
}
