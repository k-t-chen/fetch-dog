import React, { useEffect, useState } from "react";
import axios from "axios";
import DogCard from "../components/DogCard";

const Favorites = () => {
  const [favoriteDogs, setFavoriteDogs] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      if (favorites.length > 0) {
        try {
          const response = await axios.post(
            "https://frontend-take-home-service.fetch.com/dogs",
            favorites,
            { withCredentials: true }
          );
          setFavoriteDogs(response.data);
        } catch (error) {
          console.error("Error fetching favorite dogs:", error);
        }
      }
    };
    fetchFavorites();
  }, []);

  const removeFavorite = (dogId) => {
    const updatedFavorites = favoriteDogs.filter((dog) => dog.id !== dogId);
    setFavoriteDogs(updatedFavorites);

    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const newFavorites = storedFavorites.filter((id) => id !== dogId);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <div>
      <h1>Your Favorite Dogs</h1>
      {favoriteDogs.length === 0 ? (
        <p>No dogs added to favorites yet.</p>
      ) : (
        <div className="dog-container">
          {favoriteDogs.map((dog) => (
            <DogCard
              key={dog.id}
              dog={dog}
              isFavorite={true}
              onToggleFavorite={() => removeFavorite(dog.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
