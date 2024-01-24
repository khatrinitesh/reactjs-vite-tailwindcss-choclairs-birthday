import React from "react";

export default function Cartoon({ style, image }) {
  return <img src={image} alt="" loading="lazy" className={style} />;
}
