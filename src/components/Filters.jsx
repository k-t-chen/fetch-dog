import { useState } from "react";

const Filters = ({ breeds, onFilterChange }) => {
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  const handleBreedChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSelectedBreeds([]);
      onFilterChange("breeds", []);
    } else {
      const newSelectedBreeds = selectedBreeds.includes(value)
        ? selectedBreeds.filter((breed) => breed !== value)
        : [...selectedBreeds, value];

      setSelectedBreeds(newSelectedBreeds);
      onFilterChange("breeds", newSelectedBreeds);
    }
  };

  return (
    <div className="filters">
      <select onChange={handleBreedChange}>
        <option value="">Select Breed</option>
        {breeds.map((breed) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Min Age"
        onChange={(e) => onFilterChange("ageMin", Number(e.target.value))}
      />
      <input
        type="number"
        placeholder="Max Age"
        onChange={(e) => onFilterChange("ageMax", Number(e.target.value))}
      />

      {/* Show selected breeds */}
      <div>
        <p>Selected Breeds: {selectedBreeds.join(", ") || "None"}</p>
      </div>
    </div>
  );
};

export default Filters;
