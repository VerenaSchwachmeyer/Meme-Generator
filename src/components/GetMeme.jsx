import { useState, useEffect, useRef } from "react";
import Draggable, { DraggableCore } from "react-draggable";
import UploadFile from "./UploadFile";
import domtoimage from "dom-to-image";

// import MemeGenerator from "./MemeGenerator";

export default function GetMeme() {
  const [memes, setMemes] = useState();
  const [indexNumber, setIndexNumber] = useState(0);
  const [text0, setText0] = useState();
  const [text1, setText1] = useState();
  const [URL, setURL] = useState();
  const [reset, setReset] = useState(true);

  let primaryURL = "https://api.imgflip.com/get_memes";

  const getMemefromAPI = async (url) => {
    setURL();
    try {
      const response = await fetch(url);
      const data = await response.json();
      setMemes(data.data.memes);
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseIndexNumber = () => {
    if (indexNumber >= 1) {
      setIndexNumber((indexNumber) => indexNumber - 1);
    }
  };

  const increaseIndexNumber = () => {
    console.log(indexNumber);
    console.log(memes.length);
    if (indexNumber <= memes.length) {
      setIndexNumber((indexNumber) => indexNumber + 1);
    }
  };

  const typeUpperMemeText = (e) => {
    e.preventDefault();
    setText0(e.target.value);
  };

  const typeLowerMemeText = (e) => {
    e.preventDefault();
    setText1(e.target.value);
  };

  const postMeme = (e) => {
    e.preventDefault();

    const part2Bsaved = document.getElementById("memeContainer");

    // domtoimage
    //   .toPng(part2Bsaved)
    //   .then(function ({ URL }) {
    //     var img = new Image();
    //     img.src = { URL };
    //     document.body.appendChild(img);
    //   })
    //   .catch(function (error) {
    //     console.error("oops, something went wrong!", error);
    //   });
    // console.log("here debug");

    // domtoimage
    //   .toBlob(document.getElementById("memeContainer"))
    //   .then(function (blob) {
    //     Window.saveAs(blob, "my-Meme.png");
    //   });

    domtoimage
      .toJpeg(document.getElementById("memeContainer"), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = "my-meme.jpeg";
        link.href = dataUrl;
        link.click();
      });
  };

  useEffect(() => {
    getMemefromAPI(primaryURL);
    setReset(false);
  }, [reset === true]);

  useEffect(() => {
    setText0("");
    setText1("");
  }, [indexNumber]);

  return (
    <div>
      <div className="overallContainer">
        <UploadFile setURL={setURL} setMemes={setMemes} />
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
              <img id="photo" src={URL} className="photo" alt=""></img>
            </>
          )}

          {memes && (
            <img
              id="photo"
              className="photo"
              src={memes[indexNumber].url}
              alt="meme image"
            ></img>
          )}
          <Draggable bounds="parent">
            <input
              id="input1"
              className="inputtext"
              type="text"
              value={text0}
              placeholder="upper text - drag me!"
              onChange={(e) => {
                typeUpperMemeText(e);
              }}
            ></input>
          </Draggable>
          <Draggable bounds="parent">
            <input
              id="input2"
              className="inputtext"
              type="text"
              value={text1}
              placeholder="lower text - drag me!"
              rows="2"
              onChange={(e) => {
                typeLowerMemeText(e);
              }}
            ></input>
          </Draggable>
        </div>

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
            setReset(true);
            setText0("");
            setText1("");
            setIndexNumber(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
