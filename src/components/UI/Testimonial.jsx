import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import axios from 'axios';

const Testimonial = () => {
  const [rating, setRating] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3, // Hiển thị 3 bình luận trên mỗi trang
    slidesToScroll: 1, // Di chuyển 1 trang mỗi lần cuộn
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    axios
      .get('https://localhost:7013/api/Rating')
      .then((response) => {
        const data = response.data.data;
        const uniqueRatings = getUniqueRatings(data);
        const limitedRatings = uniqueRatings.slice(0, 12); // Hiển thị tối đa 12 bình luận (4 trang x 3 bình luận)
        setRating(limitedRatings);
      })
      .catch((error) => {
        console.error('Error fetching rating data:', error);
      });
  }, []);

  const getUniqueRatings = (ratings) => {
    const uniqueRatings = [];
    const commentSet = new Set();

    for (let i = 0; i < ratings.length; i++) {
      const rating = ratings[i];

      if (!commentSet.has(rating.comment)) {
        uniqueRatings.push(rating);
        commentSet.add(rating.comment);
      }
    }

    return uniqueRatings;
  };

  if (rating.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <Slider {...settings}>
      {rating.map((rating) => (
        <div key={rating.id} className="testimonial py-4 px-3">
          <p className="section__description">{rating.comment}</p>
          <div className="mt-3 d-flex align-items-center gap-4">
            <img src={rating.img} alt="" className="w-25 h-25 rounded-2" />
            <div>
              <h6 className="mb-0 mt-3">
                Tên: {rating.customerLastName} {rating.customerFirstName}
              </h6>
              <p className="section__description">Dịch vụ: {rating.serviceName}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonial;