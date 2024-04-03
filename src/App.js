import React, { useState, useEffect } from "react";
import Collection from "./Collection";
import AnimalProfile from "./AnimalProfile";
import { useNavigate } from 'react-router-dom';
import "./Style.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANjqQtZm7hPqmHl1ilgApWDRkRRqf5S-0",
  authDomain: "animal-snipet.firebaseapp.com",
  projectId: "animal-snipet",
  storageBucket: "animal-snipet.appspot.com",
  messagingSenderId: "137804291186",
  appId: "1:137804291186:web:f98ace37b6415e271c36eb",
  measurementId: "G-69WQ6RGC1L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const TIME_REMAINING = 3;
function App() {

  const [topIndex, setTopIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(1);
  const [animalCount, setAnimalCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(TIME_REMAINING);
  const navigate = useNavigate();

  const animalData = [
    {
      name: "basking shark",
      img: "https://th.bing.com/th/id/R.db6acb92804f7d7e0a645ca7d3dddbc2?rik=zOVzXpWAq6HNHg&riu=http%3a%2f%2fanimalsadda.com%2fwp-content%2fuploads%2f2013%2f11%2fBasking-Shark-3.jpg&ehk=UJTo17LUZLuEINcA23wi7Qrfn%2bEv%2bDC9NpghytAD33U%3d&risl=&pid=ImgRaw&r=0",
      result: 0
    },
    {
      name: "whale shark",
      img: "https://www.thoughtco.com/thmb/o3_yk19FVHEzfbNlIroah5ZqZjs=/4632x3088/filters:no_upscale():max_bytes(150000):strip_icc()/whale-shark-514475851-e56169bf49fb41a49f3b30068f806789.jpg",
      result: 0
    },
    {
      name: "rhino",
      img: "https://th.bing.com/th/id/OIP.Kw6EzySU7iAc6sue1y0DKgHaEK?rs=1&pid=ImgDetMain",
      result: 0
    },
    {
      name: "asian elephant",
      img: "https://www.thoughtco.com/thmb/q4t3OQkJIwiyTHnV4Pve34f4Ygo%3D/2250x1500/filters:fill(auto%2C1)/167003501-56a0089e5f9b58eba4ae8f93.jpg",
      result: 0
    },
  ];

  useEffect(() => {
    let timer;
  
    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } else {
      // Navigate to the '/collection' route and pass the animalData as state
      navigate('/collection', { state: { animalData } });
    }
  
    // Clean up the interval when the component unmounts or when timeRemaining reaches 0
    return () => clearInterval(timer);
  }, [timeRemaining, navigate, animalData]);
  
  const topAnimal = animalData[topIndex] || {};
  const bottomAnimal = animalData[bottomIndex] || {};

  const voteTop = () => {
    setBottomIndex((prevBottomIndex) => {
      let newBottomIndex = (prevBottomIndex + 1) % animalData.length;
      while (newBottomIndex === topIndex) {
        newBottomIndex = (newBottomIndex + 1) % animalData.length;
      }
      return newBottomIndex;
    });
    setAnimalCount((prevCount) => prevCount + 1);
    animalData[topIndex].result += 1;
  };
  
  const voteBottom = () => {
    setTopIndex((prevTopIndex) => {
      let newTopIndex = (prevTopIndex + 1) % animalData.length;
      while (newTopIndex === bottomIndex) {
        newTopIndex = (newTopIndex + 1) % animalData.length;
      }
      return newTopIndex;
    });
    setAnimalCount((prevCount) => prevCount + 1);
    animalData[bottomIndex].result += 1;
  };

  return (
    <div className="App">
      <AnimalProfile img={topAnimal.img} name={topAnimal.name} />
      <AnimalProfile img={bottomAnimal.img} name={bottomAnimal.name} /> 
      <h1 id="animalCounter">{animalCount}</h1>
      <div id="buttonHolder">
        <button id="btnLeft" className="button" onClick={voteTop}>
          Change Bottom
        </button>
        <button id="btnRight" className="button" onClick={voteBottom}>
          Change Top
        </button>
      </div>
      <h1 id="time-limit">Time Remaining: {timeRemaining}</h1>
    </div>
  );
}

export default App;
