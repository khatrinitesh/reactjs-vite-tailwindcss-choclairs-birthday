import React, { useState } from "react";

export default function HorizontalTimeline({ currentIndex }) {
  const txtNum = [1, 2];

  return (
    <div className="timelineContent w-100 d-flex align-items-center justify-content-center">
      <ul className="list-unstyled listTimeline d-flex align-items-center justify-content-center mx-auto mb-[20px] max-w-[500px] w-full relative">
        {txtNum.map((val, index) => {
          return (
            <li
              key={index}
              className="w-[calc(100%/3)] flex items-center justify-center relative"
            >
              <span
                className={`linkNum rounded-full text-white border-solod border-1 border-lightpurplecolor flex items-center justify-center text-[1.733477789815818vh] block w-[30px] h-[30px] leading-[30px] text-center ${
                  index < currentIndex &&
                  "linkActive bg-tertiarycolor border-tertiarycolor"
                }`}
              >
                {val}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
