import "./App.css";
import GetImage from "./components/GetImage";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <h1>MEMEFY YOUR THOUGHTS</h1>

      <p>
        <strong>
          Drag the text boxes where you want them and start typing!
        </strong>
      </p>
      <p>
        Pick an image from our database that catches you and create your own
        meme. Or upload your own file.
      </p>
      <GetImage />
      <Footer />
    </div>
  );
}

export default App;
