import { useState, useEffect } from "react";
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

  let primaryURL = "https://api.imgflip.com/get_memes";

  const getMemefromAPI = async (url) => {
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

    // domtoimage
    //   .toPng(node)
    //   .then(function ({ URL }) {
    //     var img = new Image();
    //     img.src = dataUrl;
    //     document.body.appendChild(img);
    //   })
    //   .catch(function (error) {
    //     console.error("oops, something went wrong!", error);
    //   });
  };

  useEffect(() => {
    getMemefromAPI(primaryURL);
  }, []);

  useEffect(() => {
    setText0("");
    setText1("");
  }, [indexNumber]);

  return (
    <div>
      <div className="overallContainer">
        <UploadFile setURL={setURL} setMemes={setMemes} />
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
        <div className="memeContainer">
          {URL && (
            <>
              <img src={URL} className="photo" alt=""></img>
            </>
          )}

          {memes && (
            <img
              className="photo"
              src={memes[indexNumber].url}
              alt="meme image"
            ></img>
          )}
        </div>

        <Draggable>
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
        <Draggable>
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

        <button
          id="submit"
          onClick={(e) => {
            postMeme(e);
          }}
        >
          Generate meme
        </button>
        <button
          id="submit"
          onClick={(e) => {
            setText0("");
            setText1("");
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}