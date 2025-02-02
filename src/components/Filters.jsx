import { useState } from "react";

const Filters = ({ breeds, onFilterChange }) => {
  const [selectedBreeds, setSelectedBreeds] = useState([]);

  const handleBreedChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setSelectedBreeds([]); // Reset selection
      onFilterChange("breeds", []); // Reset filter
    } else {
      const newSelectedBreeds = selectedBreeds.includes(value)
        ? selectedBreeds.filter((breed) => breed !== value) // Remove if already selected
        : [...selectedBreeds, value]; // Add if not selected

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
