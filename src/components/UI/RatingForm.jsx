import React, { useState } from 'react';
import axios from 'axios';
import StarRating from './StarRating';
import "../../styles/contact.css";

const RatingForm = ({ onClose, onRatingSubmit, serviceId, customerId }) => {
  const [rate, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleStarHover = (hoveredStars) => {
    setRating(hoveredStars);
  };

  const handleStarClick = (selectedStars) => {
    setRating(selectedStars);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmit = () => {
    const formData = {
      rate: rate,
      comment: comment,
      serviceId: serviceId,
      customerId: customerId
    };
    console.log(formData)

    axios
      .post('https://vinclean.azurewebsites.net/api/Rating', formData)
      .then((response) => {
        console.log('Đánh giá dịch vụ thành công', response.data);
        onRatingSubmit(formData); // Gọi callback function để cập nhật dữ liệu rating và comment trên UI
        onClose(); // Đóng modal
      })
      .catch((error) => {
        console.error('Lỗi khi đánh giá dịch vụ', error);
      });
  };


  return (
    <div className="rating-form">
      <h3>Đánh giá dịch vụ</h3>
      Điểm đánh giá:
      <StarRating
        totalStars={5}
        rate={rate}
        onStarHover={handleStarHover}
        onStarClick={handleStarClick}
      />
      <div className='rating-subtitle'>Nhận xét</div>
      <textarea
        className="comment-input"
        placeholder="Nhận xét của bạn..."
        value={comment}
        onChange={handleCommentChange}
      ></textarea>
      <button className="submit-button" onClick={handleSubmit}>
        Gửi đánh giá
      </button>
    </div>
  );
};

export default RatingForm;