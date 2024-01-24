import React from "react";
import bgFooterL from "../assets/img/bg-footer-landscape.png";

export default function FooterLandscape() {
  return (
    <footer className="fixed bottom-[0px] w-full">
      <img src={bgFooterL} alt="" className="w-full max-w-full block mx-auto" />
    </footer>
  );
}
