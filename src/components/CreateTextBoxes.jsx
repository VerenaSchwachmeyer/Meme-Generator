import Draggable from "react-draggable";
import { useEffect } from "react";

export default function CreateTextBoxes({
  text0,
  text1,
  setText0,
  setText1,
  indexNumber,
}) {
  const typeUpperMemeText = (e) => {
    e.preventDefault();
    setText0(e.target.value);
  };

  const typeLowerMemeText = (e) => {
    e.preventDefault();
    setText1(e.target.value);
  };

  useEffect(() => {
    setText0("");
    setText1("");
  }, [indexNumber, setText0, setText1]);

  return (
    <>
      <Draggable bounds="parent">
        <input
          id="input1"
          className="inputtext"
          type="text"
          value={text0}
          placeholder="upper text-drag me"
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
          placeholder="lower text-drag me"
          rows="2"
          onChange={(e) => {
            typeLowerMemeText(e);
          }}
        ></input>
      </Draggable>
    </>
  );
}
