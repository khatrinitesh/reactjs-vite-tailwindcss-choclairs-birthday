import React from "react";

export default function BigHeadTitle({ style, bigHeadTitle, bigHeadTitle2 }) {
  return (
    <div className="text-center sectionTitle mb-1">
      <h2 className={`${style} text-[2.766956vh] text-white`}>
        {bigHeadTitle}
      </h2>
      <h2 className={`${style} text-[2.766956vh] text-white`}>
        {bigHeadTitle2}
      </h2>
    </div>
  );
}
