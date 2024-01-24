import React, { useState } from "react";
import ClickLoading from "./ClickLoading";
import ButtonPrimary from "./ButtonPrimary";
import error from "../assets/img/icons/error.svg";

const AreYouSatified = ({
  image,
  handleUserSatisfied,
  handleNotUserSatisfied,
  setAreYouSatisfiedModal,
  areYouSatisfiedModal,
}) => {
  const [imageStatus, setImageStatus] = useState("loading");

  const handleImageError = () => {
    setImageStatus("error");
  };

  const handleImageLoad = () => {
    setImageStatus("success");
  };

  const modalClass = areYouSatisfiedModal ? "animatedModal" : "modalHidden";

  return (
    <div className="bg-[#00000090] fixed top-0 left-0 w-full h-full z-[999999] flex items-center justify-center ">
      <div
        className={`w-[80%] aspect-[1/0.5] max-h-[450px] max-w-[400px] bg-[#28195b] rounded-[24px] flex flex-col items-center justify-center px-4 pt-4 ${modalClass}`}
      >
        {image !== "" && (
          <>
            {imageStatus === "success" && (
              <>
                <div>
                  <p className="text-[18px] text-white text-center">
                    Are you satisfied with this image?
                  </p>
                </div>
                <div className="flex items-center justify-center w-full">
                  <img
                    src={image}
                    className="h-[250px] my-4 object-contain w-full"
                    alt="face"
                    loading="lazy"
                  />
                </div>
                <div className="grid grid-cols-2 w-full gap-[12px]">
                  <ButtonPrimary onClick={handleNotUserSatisfied} data="No" />

                  <ButtonPrimary onClick={handleUserSatisfied} data="Yes" />
                </div>
              </>
            )}
            {imageStatus === "error" && (
              <div className="flex flex-col items-center justify-between h-full">
                <p className="text-white text-[16px] text-center">
                  No face detected or something went wrong, please re-click the
                  image
                </p>
                <ButtonPrimary
                  onClick={() => setAreYouSatisfiedModal(false)}
                  data="Re-click"
                />
              </div>
            )}
          </>
        )}
        {imageStatus === "loading" && (
          <ClickLoading text="Image is being generated..." />
        )}
      </div>
      {image !== "" && (
        <img
          src={image}
          className="hidden"
          onError={handleImageError}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
};

export default AreYouSatified;
