import React, { useEffect } from "react";
import Lottie from "lottie-react";
import Loading_Anim from "../assets/Loading-Anim.json";

const LoadingAnimation = () => {
  return (
    <div className="loading-animation absolute top-0 right-0 h-full w-full flex items-center justify-center z-[9999999999999]">
      <Lottie
        loop={false}
        animationData={Loading_Anim}
        style={{
          width: "75%",
        }}
      />
    </div>
  );
};

export default LoadingAnimation;
