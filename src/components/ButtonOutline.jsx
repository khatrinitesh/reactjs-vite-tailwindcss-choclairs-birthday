import React from "react";

export default function BtnOutline({ data, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className="btnOutline flex items-center justify-center mx-auto h-[40px] cursor-pointer mb-3 text-[2.1668472372697725vh] text-white !rounded-[30px] h-[40px] text-center px-[50px] bg-transparent border-1 border-solid border-lightpurplecolor"
      >
        {data}
      </button>
    </>
  );
}
