import { useState, useEffect } from "react";
import UploadFile from "./UploadFile";
import domtoimage from "dom-to-image";
import CreateTextBoxes from "./CreateTextBoxes";

export default function GetImage() {
  const [memes, setMemes] = useState();
  const [indexNumber, setIndexNumber] = useState(0);
  const [text0, setText0] = useState();
  const [text1, setText1] = useState();
  const [URL, setURL] = useState();
  // const [reset, setReset] = useState(true);

  const getMemefromAPI = async () => {
    // const randomNumber = Math.floor(Math.random() * 99);
    // setIndexNumber(randomNumber);
    try {
      const response = await fetch("https://api.imgflip.com/get_memes");
      const data = await response.json();
      setMemes(data.data.memes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMemefromAPI();
  }, [reset]);

  const decreaseIndexNumber = () => {
    if (indexNumber >= 1) {
      setIndexNumber((indexNumber) => indexNumber - 1);
    } else {
      setIndexNumber(99);
    }
  };

  const increaseIndexNumber = () => {
    console.log(indexNumber);
    console.log(memes.length);
    if (indexNumber <= memes.length) {
      setIndexNumber((indexNumber) => indexNumber + 1);
    } else {
      setIndexNumber(0);
    }
  };

  const postMeme = (e) => {
    e.preventDefault();

    domtoimage
      .toJpeg(document.getElementById("memeContainer"), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-meme.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  return (
    <main>
      <div className="colContainer1">
        {memes && (
          <div className="buttonContainer">
            <button
              onClick={() => {
                decreaseIndexNumber();
              }}
            >
              Previous
            </button>
            <button
              onClick={() => {
                const randomNumber = Math.floor(Math.random() * 99);
                setIndexNumber(randomNumber);
              }}
            >
              Surprise me
            </button>
            <button
              onClick={() => {
                increaseIndexNumber();
              }}
            >
              Next
            </button>
          </div>
        )}
        <div id="memeContainer" className="memeContainer">
          {URL && (
            <>
              <img id="photo" src={URL} className="photo" alt="meme"></img>
            </>
          )}

          {memes && (
            <img
              id="photo"
              className="photo"
              src={memes[indexNumber].url}
              alt="meme"
            ></img>
          )}

          <CreateTextBoxes
            text0={text0}
            text1={text1}
            setText0={setText0}
            setText1={setText1}
            indexNumber={indexNumber}
          />
        </div>
      </div>
      <div className="colContainer2">
        <UploadFile setURL={setURL} setMemes={setMemes} />
        <button
          id="submit"
          onClick={(e) => {
            postMeme(e);
          }}
        >
          Download meme
        </button>

        <button
          id="submit"
          onClick={(e) => {
            // setReset(!reset);
            setText0("");
            setText1("");
            // setURL();
            // setIndexNumber(0);
          }}
        >
          Reset Text
        </button>
      </div>
    </main>
  );
}
