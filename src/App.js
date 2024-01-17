import React, { useState } from 'react';
import './App.css';

function App() {
  const [animalType, setAnimalType] = useState('cat');
  const [animalImage, setAnimalImage] = useState('');
  const [animalFact, setAnimalFact] = useState('');

  const fetchAnimalData = async () => {
    try {
      let apiUrl, responseData;

      if (animalType === 'cat') {
        apiUrl = 'https://catfact.ninja/fact';
        responseData = await fetch(apiUrl);
        const factData = await responseData.json();
        setAnimalFact(factData.fact);
      } else {
        apiUrl = 'https://dog.ceo/api/breeds/image/random';
        responseData = await fetch(apiUrl);
        const imageData = await responseData.json();
        setAnimalImage(imageData.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Cat/Dog App</h1>
      <form>
        <label>
          Select an animal:
          <select value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
        </label>
        <button type="button" onClick={fetchAnimalData}>
          Get Data
        </button>
      </form>

      {animalType === 'cat' && animalFact && (
        <div>
          <h2>Cat Fact:</h2>
          <p>{animalFact}</p>
        </div>
      )}

      {animalType === 'dog' && animalImage && (
        <div>
          <h2>Dog Image:</h2>
          <img src={animalImage} alt="Dog" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default App;
