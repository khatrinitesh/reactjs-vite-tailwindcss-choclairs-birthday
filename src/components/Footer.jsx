import React from "react";

export default function Footer({ style, image, text1, text2 }) {
  return (
    <>
      <footer className={`${style} z-[-9] bottom-[0] left-[0] w-full`}>
        <img src={image} alt="" className="img-fluid imgBgFoot" />
      </footer>
    </>
  );
}
