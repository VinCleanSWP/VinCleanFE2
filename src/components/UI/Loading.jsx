import GridLoader from "react-spinners/GridLoader";
import "../../styles/loading.css";
import { useEffect, useState } from "react";

const Loading = () => {
  const quotes = [
    "Dọn dẹp không chỉ là vấn đề của ngôi nhà, mà còn là vấn đề của tâm hồn - Marie Kondo",
    "Vệ sinh là sự tôn trọng bản thân và sự chăm sóc cho sức khỏe của chúng ta.",
    "Vệ sinh là sự tôn trọng bản thân và sự chăm sóc cho sức khỏe của chúng ta.",
    "Vệ sinh là một thói quen tốt, nó không chỉ đảm bảo sự tươi mới cho không gian xung quanh, mà còn giúp ta tạo ra một tâm trạng thoải mái và sự sáng sủa cho bản thân.",
    // Thêm các câu trích dẫn khác vào đây
  ];

  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className="loading">
      <div className="loader">
        <GridLoader color="#004fbc" loading={true} size={30} />
      </div>
      <div className="quote">"{randomQuote}"</div>
    </div>
  );
};

export default Loading;