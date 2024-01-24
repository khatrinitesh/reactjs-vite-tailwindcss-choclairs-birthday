import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import Cookies from "js-cookie";

const SlideshowAnimation = ({
  slidesShow,
  lottieAnimation,
  updateLottieAnimation,
  removeLottieAnimation,
  removeFaceExp,
  removeFaceAnimation,
  userData,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timerIds, setTimerIds] = useState([]);
  const currentUid = Cookies.get("uid");
  const [buttonIdx, setButtonIdx] = useState(null);
  const { animationName } = lottieAnimation;

  const { uid } = userData;

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

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
    beforeChange: () => setCurrentSlide(currentSlide === 0 ? 1 : 0),
  };

  const handleClick = (
    animationTemp,
    faceAnimation,
    faceImage,
    bodyAnimation,
    animationDelay,
    animationName
  ) => {
    removeLottieAnimation();
    removeFaceExp();
    removeFaceAnimation();

    clearAllTimeouts();

    updateLottieAnimation((draft) => {
      draft.animation = animationTemp;
      draft.animationName = animationName;
      draft.faceAnimation = faceAnimation;
    });

    const faceImageTimeoutId = setTimeout(() => {
      updateLottieAnimation((draft) => {
        draft.faceImage = faceImage;
      });
    }, animationDelay);

    const bodyAnimationTimeoutId = setTimeout(() => {
      updateLottieAnimation((draft) => {
        draft.bodyAnimation = bodyAnimation;
      });
    }, animationDelay);

    // Save the timeout identifiers in the state
    setTimerIds([faceImageTimeoutId, bodyAnimationTimeoutId]);
  };

  const clearAllTimeouts = () => {
    timerIds.forEach((id) => clearTimeout(id));
    setTimerIds([]);
  };

  const handleSendInteraction = async (value) => {
    await axios
      .post(`${serverUrl}/add-bash`, {
        apikey,
        uid: currentUid,
        friendUID: uid,
        action: value,
      })
      .then((res) => {})
      .catch((err) => {});
  };

  return (
    <>
      <div className="w-full px-8">
        <Slider
          {...settings}
          className="relative w-full flex items-center justify-center"
        >
          {slidesShow.map((item, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-[10px] text-white txtDescription text-center">
                  {item.title}
                </p>
                <button
                  onTouchStart={() => setButtonIdx(idx)}
                  onTouchEnd={() => setButtonIdx(null)}
                  disabled={
                    animationName !== item.title &&
                    animationName !== "" &&
                    animationName !== undefined
                  }
                  className={`rounded-full disabled:opacity-50 duration-100 ${
                    buttonIdx === idx ? "scale-[0.9]" : "scale-[1]"
                  } m-auto overflow-hidden outline-none flex items-center justify-center bg-white h-[80px] w-[80px] casm:h-[100px] casm:w-[100px]`}
                  onClick={() => {
                    handleSendInteraction(item.title);
                    handleClick(
                      item.lottie,
                      item.faceAnimation,
                      item.faceImage,
                      item.bodyAnimation,
                      item.animationDelay,
                      item.title
                    );
                  }}
                >
                  <img
                    src={item.image}
                    className="h-full w-full object-cover scale-[1.3]"
                    alt={`Slide ${idx + 1}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default SlideshowAnimation;
