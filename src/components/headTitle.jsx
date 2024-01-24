import React from "react";

export default function HeadTitle({ style, headTitle }) {
  return (
    <>
      <h2 className={`${style} text-white text-[2.1668472372697725vh]`}>
        {headTitle}
      </h2>
    </>
  );
}
