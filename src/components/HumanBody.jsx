import React, { useEffect, useRef, useState } from "react";
import ClickLoading from "./ClickLoading";
import error from "../assets/img/icons/error.svg";

const HumanBody = ({ hat, face, body, hatStyle, bodyStyle }) => {
  const [imageStatus, setImageStatus] = useState("loading");
  const faceImageRef = useRef(null);
  const [aspectRatio, setAspectRatio] = useState("loading");

  const handleImageError = () => {
    setImageStatus("error");
  };

  const handleImageLoad = () => {
    setImageStatus("success");
  };

  useEffect(() => {
    if (faceImageRef.current) {
      const height = faceImageRef.current.height;
      const width = faceImageRef.current.width;
      const aspectRatio = width / height;
      setAspectRatio(aspectRatio);
    }
  }, [faceImageRef.current]);

  return (
    <div className="h-[calc(100vh-150px-22px-100px-200px)]">
      <div className="h-full w-full avatarGrid items-center justify-center">
        <img
          src={hat}
          className={`h-full w-full flex items-center justify-center object-contain ${hatStyle} `}
        />
        {imageStatus === "success" ? (
          <img
            ref={faceImageRef}
            src={face}
            className="object-contain relative z-[-1] h-full max-h-[200px] w-full"
          />
        ) : imageStatus === "loading" ? (
          <ClickLoading />
        ) : imageStatus === "error" ? (
          <img src={error} className="object-contain h-[70%] w-[70%] m-auto" />
        ) : null}
        <img
          src={body}
          className={`h-full z-[-2] w-full object-contain flex items-center justify-center ${bodyStyle}`}
        />
      </div>
      <img
        onLoad={handleImageLoad}
        onError={handleImageError}
        src={face}
        className="hidden"
      />
    </div>
  );
};

export default HumanBody;
