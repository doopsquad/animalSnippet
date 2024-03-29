import React, { useState } from "react";
import AnimalProfile from "./AnimalProfile";
import "./Style.css";

function App() {

  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(1);
  const [animalCount, setAnimalCount] = useState(0);

  const animalData = [
    {
      name: "basking shark",
      img: "https://th.bing.com/th/id/R.db6acb92804f7d7e0a645ca7d3dddbc2?rik=zOVzXpWAq6HNHg&riu=http%3a%2f%2fanimalsadda.com%2fwp-content%2fuploads%2f2013%2f11%2fBasking-Shark-3.jpg&ehk=UJTo17LUZLuEINcA23wi7Qrfn%2bEv%2bDC9NpghytAD33U%3d&risl=&pid=ImgRaw&r=0",
    },
    {
      name: "whale shark",
      img: "https://www.thoughtco.com/thmb/o3_yk19FVHEzfbNlIroah5ZqZjs=/4632x3088/filters:no_upscale():max_bytes(150000):strip_icc()/whale-shark-514475851-e56169bf49fb41a49f3b30068f806789.jpg",
    },
    {
      name: "rhino",
      img: "https://th.bing.com/th/id/OIP.Kw6EzySU7iAc6sue1y0DKgHaEK?rs=1&pid=ImgDetMain",
    },
    {
      name: "asian elephant",
      img: "https://www.thoughtco.com/thmb/q4t3OQkJIwiyTHnV4Pve34f4Ygo%3D/2250x1500/filters:fill(auto%2C1)/167003501-56a0089e5f9b58eba4ae8f93.jpg",
    },
  ];

  const changeTop = () => {
    setTopIndex((prevTopIndex) => {
      let newTopIndex = (prevTopIndex + 1) % animalData.length;
      while (newTopIndex === bottomIndex) {
        newTopIndex = (newTopIndex + 1) % animalData.length;
      }
      return newTopIndex;
    });
    setAnimalCount((prevCount) => prevCount + 1);
  };
  
  const changeBottom = () => {
    setBottomIndex((prevBottomIndex) => {
      let newBottomIndex = (prevBottomIndex + 1) % animalData.length;
      while (newBottomIndex === topIndex) {
        newBottomIndex = (newBottomIndex + 1) % animalData.length;
      }
      return newBottomIndex;
    });
    setAnimalCount((prevCount) => prevCount + 1);
  };


  return (
    <div className="App">
      <AnimalProfile img={animalData[topIndex].img} name={animalData[topIndex].name} />
      <AnimalProfile img={animalData[bottomIndex].img} name={animalData[bottomIndex].name} />
      <h1 id="animalCounter">{animalCount}</h1>
      <div id="buttonHolder">
        <button id="btnLeft" className="button" onClick={changeTop}>
          Change Top
        </button>
        <button id="btnRight" className="button" onClick={changeBottom}>
          Change Bottom
        </button>
      </div>
    </div>
  );
}
export default App;
