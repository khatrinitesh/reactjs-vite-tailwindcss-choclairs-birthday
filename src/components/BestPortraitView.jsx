import React from "react";
import Logo from "../assets/img/logo.png";
import "../index.css";

export default function BestPortraitView() {
  return (
    <>
      <div className="messagewapper w-full h-full fixed inset-[0] m-auto text-center flex flex-col items-center gap-[12px] justify-center bg-primarycolor">
        <div className="logo1 w-[250px] h-auto mb-5px]">
          <img
            src={Logo}
            alt="Cal Scan"
            title="Cal Scan"
            className="w-[220px]"
          />
        </div>
        <h2 className="text-white text-[28px] text-center pt-[24px]">
          Best View in Portrait Mobile Mode
        </h2>
      </div>
    </>
  );
}
