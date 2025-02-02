import React from "react";
import "../styles/DogCard.css";

const DogCard = ({ dog, isFavorite, onToggleFavorite, loading }) => {
  return (
    <div className="dog-card">
      <img src={dog.img} alt={dog.name} className="dog-image" />
      <div className="dog-info">
        <h3 className="dog-name">{dog.name}</h3>
        <p className="dog-breed">Breed: {dog.breed}</p>
        <p className="dog-age">Age: {dog.age} years</p>
        <p className="dog-location">Location: {dog.zip_code}</p>
      </div>
      <button
        className={`favorite-button ${isFavorite ? "favorited" : ""}`}
        onClick={onToggleFavorite}
        disabled={loading}
      >
        {loading
          ? "Loading..."
          : isFavorite
          ? "❤️ Remove from Favorites"
          : "🤍 Add to Favorites"}
      </button>
    </div>
  );
};

export default DogCard;
