import React, { useEffect, useState } from "react";

function DogSelect({ onSelect }) {
  const [breed, setBreed] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");

  useEffect(() => {
    async function fetchBreed() {
      try {
        const res = await fetch("https://dog.ceo/api/breeds/list/all");
        const data = await res.json();
        setBreed(Object.keys(data.message));
      } catch (error) {
        console.error("Failed to fetch breeds: ", error);
      }
    }
    fetchBreed();
  }, []);

 
  const handleChange = (e) => {
    const breed = e.target.value;
    setSelectedBreed(breed);
    onSelect(breed); 
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h3 className="gamja-flower-regular">강아지 종</h3>
      <select value={selectedBreed} onChange={handleChange}>
        <option value="" className="gamja-flower-regular">종료 후 보상 받을 강아지를 선택하세요</option>
        {breed.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

   
    </div>
  );
}

export default DogSelect;
