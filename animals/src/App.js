import AnimalShow from "./AnimalShow";
import { useState } from "react";
import "./animals.css";

export default function App() {
  const animalsType = ["bird", "cat", "horse", "gator", "dog", "cow"];

  const generateRandomNumber = () => Math.floor(Math.random() * animals.length);

  const getRandomAnimal = () => {
    return animalsType[generateRandomNumber()];
  };

  const [animals, setAnimals] = useState([]);

  const handleAddAnimalButton = () => {
    const newAnimal = getRandomAnimal();
    const newAnimals = [...animals, newAnimal];
    setAnimals(newAnimals);
  };

  return (
    <div className="animals-container">
      <button onClick={handleAddAnimalButton}>Add an animal</button>
      <div className="all-animals">
        {animals.map((animal, i) => (
          <AnimalShow type={animal} key={i} />
        ))}
      </div>
    </div>
  );
}
