import React from "react";
import Logo from "../assets/img/logo.png";
import SideBar from "./sideBar.jsx";
import { Link, useLocation } from "react-router-dom";
import { IconChevronLeft } from "@tabler/icons-react";

export default function Header({ visibleLeftBackButton }) {
  const location = useLocation();

  const goBack = () => {
    window.history.back();
  };

  return (
    <header className="header z-[99999] py-[30px] px-[10px] relative">
      <div className="relative w-full">
        {visibleLeftBackButton && (
          <button onClick={goBack} className="absolute left-0 top-0">
            <IconChevronLeft size={44} color="white" />
          </button>
        )}

        <div className="innerHeader z-[99999] d-flex  justify-content-between">
          <Link to="/" className="linkLogo max-w-[200px] block mx-auto">
            <img src={Logo} className="object-cover img-fluid imgLogo" />
          </Link>
          <SideBar />
        </div>
      </div>
    </header>
  );
}
