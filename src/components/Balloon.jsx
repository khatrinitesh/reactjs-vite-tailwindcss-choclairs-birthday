import React from "react";

const Balloon = ({ style, image }) => {
  return (
    <div className={`${style} absolute animation animate-bounce`}>
      <img src={image} alt="" className="img-fluid  imgBalloonPurple" />
    </div>
  );
};

export default Balloon;
