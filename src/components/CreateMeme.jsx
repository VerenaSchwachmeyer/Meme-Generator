export default function MemeGenerator({ memes }) {
  return (
    <div>
      Meme Generator
      <img src={memes.url} alt="meme image"></img>
    </div>
  );
}
