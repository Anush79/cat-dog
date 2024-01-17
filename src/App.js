import { useState } from 'react';
import './App.css';

function App() {
  const [animalType, setAnimalType] = useState('cat');
  const [animalImage, setAnimalImage] = useState('');
  const [animalFact, setAnimalFact] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAnimalData = async () => {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Cat/Dog App</h1>
      <main>
      <form>
        <label>
          Select an animal:
          <select value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
          </select>
        </label>
        <button type="button" onClick={fetchAnimalData} disabled={loading}>
          {loading ? 'Fetching...' : 'Get Data'}
        </button>
      </form>

      {loading && (
        <div className="loader-container">
          <svg className="loader" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
          </svg>
        </div>
      )}

      {animalType === 'cat' && animalFact && (
        <div>
          <h2>Cat Fact:</h2>
          <p>{animalFact}</p>
        </div>
      )}

      {animalType === 'dog' && animalImage && (
        <div>
          <h2>Dog Image: {animalImage.split('/')[4].toUpperCase()}</h2>
          <img src={animalImage} alt="Dog" style={{ maxWidth: '100%' }} />
        </div>
      )}
      </main>
    </div>
  );
}

export default App;
