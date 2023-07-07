import { Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/rating-form.css';

// import { FaStar, FaStarHalfAlt } from "react-icons/fa";
// import { AiOutlineStar } from "react-icons/ai";
// import styled from "styled-component"


// const Star = ({stars, reviews}) => {
//     console.log("~ file: Star.js ~ line 4 ~ Star ~ star", reviews);
//     const ratingStar = Array.from({length: 5}, (elem, index) => {
//         2.4;
//         let number = index + 0.5;
//         return (
//             <span key={index}>
//                 { stars >= index + 1
//                     ? (< FaStar className="icon" />)
//                     : stars >= number
//                     ? (< FaStarHalfAlt className="icon" />)
//                     : (< AiOutlineStar className="icon" />)
//                     }
//             </span>
//         ) 
//     });

//     return (
//         <Wrapper>
//             <div className="icon-style">
//                 {ratingStar}
//                 <p>({reviews} customer reviews)</p>
//             </div>
//         </Wrapper>
//     )

//     const Wrapper = styled.section
//     .icon-style {
//         disp
//     }
// };


const Star = () => {
  const typeId = useParams();
  const id = parseInt(typeId.id);
  console.log(id);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    axios.get(`https://localhost:7013/api/Service/Type/${id}`)
      .then(response => {
        // Xử lý dữ liệu từ phản hồi backend (nếu cần)
        const initialRating = response.data.rating;
        setRating(initialRating);
      })
      .catch(error => {
        console.error(error); // Xử lý lỗi (nếu có)
      });
  }, []);

  const handleStarClick = (starIndex) => {
    setRating(starIndex);
    axios.post('https://localhost:7013/api/Rating', { rating: starIndex })
      .then(response => {
        console.log(response.data); // Xử lý phản hồi từ backend (nếu cần)
      })
      .catch(error => {
        console.error(error); // Xử lý lỗi (nếu có)
      });
  };

  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClass = i <= (hoverRating || rating) ? 'filled' : '';
    stars.push(
      <span
        key={i}
        className={`star ${starClass}`}
        onClick={() => handleStarClick(i)}
        onMouseEnter={() => handleStarHover(i)}
        onMouseLeave={handleStarLeave}
      >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div>
      <h3>Đánh giá dịch vụ:</h3>
      <div className="stars">{renderStars()}</div>
      <p>Bạn đã chọn: {rating} sao</p>
    </div>
  );
};

export default Star