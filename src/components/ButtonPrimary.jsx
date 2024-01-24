import React from "react";

export default function BtnPrimary({ style, data, onClick }) {
  return (
    <>
      <button
        onClick={onClick}
        className={`${style} btnPrimary flex border border-white items-center justify-center mx-auto !rounded-[30px] mb-3 text-white text-[2.1668472372697725vh] bg-secondarycolor h-[40px] text-center px-[50px] cursor-pointer`}
      >
        {data}
      </button>
    </>
  );
}
