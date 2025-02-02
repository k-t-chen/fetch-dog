import React, { useEffect, useState } from "react";
import axios from "axios";
import Filters from "../components/Filters";
import DogCard from "../components/DogCard";
import Pagination from "../components/Pagination";

const Search = () => {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [filters, setFilters] = useState({ breeds: [], ageMin: 0, ageMax: 20 });
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc"); // Track sorting order

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          { withCredentials: true }
        );
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    const fetchDogs = async () => {
      try {
        const response = await axios.get(
          "https://frontend-take-home-service.fetch.com/dogs/search",
          {
            params: {
              ...filters,
              size: 25,
              from: (currentPage - 1) * 25,
              sort: `breed:${sortOrder}`,
            },
            withCredentials: true,
          }
        );

        const dogDetails = await axios.post(
          "https://frontend-take-home-service.fetch.com/dogs",
          response.data.resultIds,
          { withCredentials: true }
        );

        setDogs(dogDetails.data);
        setTotalResults(response.data.total);
        setTotalPages(Math.ceil(response.data.total / 25));
      } catch (error) {
        console.error("Error fetching dogs:", error);
      }
    };
    fetchDogs();
  }, [filters, currentPage, sortOrder]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
    setCurrentPage(1);
  };

  const toggleFavorite = (dogId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(dogId)
        ? prevFavorites.filter((id) => id !== dogId)
        : [...prevFavorites, dogId]
    );
  };

  const generateMatch = async () => {
    if (favorites.length === 0) {
      alert("Please add at least one dog to your favorites!");
      return;
    }

    try {
      const response = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs/match",
        favorites,
        { withCredentials: true }
      );
      const matchedDogId = response.data.match;
      const matchedDogDetails = await axios.post(
        "https://frontend-take-home-service.fetch.com/dogs",
        [matchedDogId],
        { withCredentials: true }
      );
      alert(`You matched with ${matchedDogDetails.data[0].name}!`);
    } catch (error) {
      console.error("Error generating match:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  return (
    <div>
      <Filters breeds={breeds} onFilterChange={handleFilterChange} />
      <p>Total Dogs Found: {totalResults}</p>
      <p>Favorites: {favorites.length}</p>

      {/* Sorting Button */}
      <button onClick={toggleSortOrder}>
        Sort by Breed ({sortOrder === "asc" ? "Ascending" : "Descending"})
      </button>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <button onClick={generateMatch}>Generate Match</button>

      <div className="dog-container">
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={favorites.includes(dog.id)}
            onToggleFavorite={() => toggleFavorite(dog.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
