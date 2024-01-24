import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideshowAvatar = ({
  slidesShow,
  selectedAvatar,
  updateSelectedAvatar,
  updateAvatar,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeBody, setActiveBody] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    customPaging: (i) => (
      <div
        style={{
          width: 8,
          height: 8,
          backgroundColor: i === currentSlide ? "#c08617" : "transparent",
          borderRadius: "50%",
          cursor: "pointer",
          border: `1px solid ${i === currentSlide ? "transparent" : "#ce9eff"}`,
        }}
      />
    ),
    beforeChange: (next) => setCurrentSlide(currentSlide === 0 ? 1 : 0),
  };

  const handleClick = (body, bodyStyle, stick) => {
    updateSelectedAvatar((draft) => {
      draft.body = body;
      draft.bodyStyle = bodyStyle;
    });

    updateAvatar((draft) => {
      draft.stick = stick;
    });
  };

  return (
    <div className="h-full w-full mb-4 px-8">
      <Slider {...settings} className="h-full relative w-full pb-4">
        {slidesShow.map((item, idx) => (
          <div key={idx}>
            <button
              onTouchStart={(e) => setButtonClicked(true)}
              onTouchEnd={(e) => setButtonClicked(false)}
              className={`rounded-full duration-100 active:scale-[0.9] m-auto overflow-hidden outline-none flex items-center justify-center bg-white h-[80px] w-[80px] casm:h-[100px] casm:w-[100px]  ${
                activeBody === idx ? "border-[2px] border-[#c08829]" : ""
              } ${
                buttonClicked && activeBody === idx
                  ? "scale-[0.9]"
                  : "scale-[1]"
              }`}
              onClick={() => {
                window.dataLayer = window.dataLayer || [];
                dataLayer.push({
                  event: "Stick Figure",
                  Design: item.name,
                });

                handleClick(item.image, item.style, item.name);
                setActiveBody(idx);
              }}
            >
              <img
                src={item.image}
                className="h-[60px] w-[60px] aspect-auto object-contain"
                alt={`Slide ${idx + 1}`}
              />
            </button>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideshowAvatar;
