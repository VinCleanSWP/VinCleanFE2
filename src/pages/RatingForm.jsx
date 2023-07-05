import React, { useState } from 'react';
import axios from 'axios';

const RatingForm = ({ serviceId, onClose, onRatingSubmit }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Gửi dữ liệu rating và comment lên backend
    try {
      const response = await axios.post('https://localhost:7013/api/Rating
      ', {
        serviceId,
        rating,
        comment,
      });

      // Gọi callback function để cập nhật dữ liệu rating và comment trên UI
      onRatingSubmit(response.data);
    } catch (error) {
      console.error('Error submitting rating:', error);
    }
  };

  const handleBackButtonClick = () => {
    // Gọi callback function để đóng form rating
    onClose();
  };

  return (
    <div className="rating-form">
      <h2>Rate the service</h2>
      <div className="stars">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index + 1}
            className={`star ${index + 1 <= rating ? 'active' : ''}`}
            onClick={() => handleStarClick(index + 1)}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        className="comment"
        placeholder="Enter your comment"
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <div className="buttons">
        <button className="submit-button" onClick={handleSubmit}>
          Submit
        </button>
        <button className="back-button" onClick={handleBackButtonClick}>
          Back
        </button>
      </div>
    </div>
  );
};

export default RatingForm;
