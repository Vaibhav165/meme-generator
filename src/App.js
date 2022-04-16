import react,{useState,useEffect} from 'react';
import './App.css';
import logo from './Troll Face.svg';

function App() {
  const [meme,setMeme]=useState({
    topText:"",
    bottomText:"",
    randomImage:"http://i.imgflip.com/1bij.jpg",
  })
  const [allMemes,setAllMemes]=useState([])

  useEffect(() =>{
    fetch('https://api.imgflip.com/get_memes')
    .then(res => res.json())
    .then(data => setAllMemes(data.data.memes))
  },[]) 
  console.log(allMemes);

  function handleChange(e) {
    setMeme(prevMeme=>{
      return {
        ...prevMeme,
        [e.target.name]: e.target.value
      }
    })
  }
  function handleClick(){
    const random = Math.floor(Math.random()*allMemes.length);
    const url = allMemes[random].url;
    setMeme(prevMeme=>{
      return {
        ...prevMeme,
        randomImage:url
      }
    });
  }

  return (
    <div className="App">
      <div className="header">
        <div className="logo">
          <img src={logo}/>
          <h2>Meme Generator</h2>
        </div>
        <h4>React Course</h4>
      </div>
      <div className="form">
        <div className="textInput">
        <input type="text" placeholder="Top text" className="" name="topText" value={meme.topText} onChange={handleChange}/>
        <input type="text" placeholder="Bottom text" className="" name="bottomText" value={meme.bottomText} onChange={handleChange}/>
        </div>
        <button onClick={handleClick} className="">Get new meme image</button>
        </div>
      <div className="meme">
        <img src={meme.randomImage}/>
        <h2 className="meme-text top">{meme.topText}</h2>
        <h2 className="meme-text bottom" >{meme.bottomText}</h2>
      </div>
    </div>
  );
}

export default App;
