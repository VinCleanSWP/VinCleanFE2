import React, { useState } from 'react';
import '../../styles/rating-list.css';

const StarRating = ({ totalStars, rate, onStarClick }) => {
  const [hoveredStars, setHoveredStars] = useState(0);

  const handleStarHover = (hoveredStars) => {
    setHoveredStars(hoveredStars);
  };

  const handleStarClick = (selectedStars) => {
    onStarClick(selectedStars);
  };

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className={`star ${index + 1 <= (hoveredStars || rate) ? 'selected' : ''}`}
          onMouseEnter={() => handleStarHover(index + 1)}
          onMouseLeave={() => handleStarHover(0)}
          onClick={() => handleStarClick(index + 1)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;