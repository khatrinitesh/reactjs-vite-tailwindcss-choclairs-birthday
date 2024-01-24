import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// BELOW COMPONENTS
import Balloon from "../components/Balloon";
import Footer from "../components/Footer";
import Cartoon from "../components/Cartoon.jsx";
import BtnPrimary from "../components/ButtonPrimary.jsx";
import BigHeadTitle from "../components/BigHeadTitle.jsx";
// BELOW IMAGE FILES
import BImgStripe from "../assets/img/icons/iconballoonstripe.svg";
import BImgPurple from "../assets/img/icons/iconballoonpurple.svg";
import BImgDot from "../assets/img/icons/iconballoondot.svg";
import BImgStar from "../assets/img/icons/iconstar.svg";
import BImgConfetiPL from "../assets/img/icons/iconcoonfettipurpleleft.svg";
import BImgConfetiBR from "../assets/img/icons/iconconfettibrownright.svg";
import BImgFooter from "../assets/img/bg-footer.png";
import Cartoon1 from "../assets/img/cartoon.png";
import Cookies from "js-cookie";
import axios from "axios";

export default function WelcomeBack() {
  const navigate = useNavigate();
  const username = Cookies.get("name");

  //API KEY

  const handleNavigate = () => {
    navigate("/dashboard");
  };

  const handleNewSignUp = () => {
    navigate("/");
    Cookies.remove("uid");
  };

  return (
    <>
      <div className="overflow-x-hidden mainContent relative flex justify-center items-center flex-col h-[calc(100vh-157px)]">
        <div className="mt-[-100px] mb-[150px] cartoonWelcome">
          <Cartoon image={Cartoon1} style="scale-[1.5]" />
        </div>
      </div>
      {/* START FOOTER */}
      <div className="text-center fixed bottom-0 welcomeFoot">
        <div className="headTitleBlock mb-3">
          <BigHeadTitle style="bigHeadTitle mb-2" bigHeadTitle="Welcome back" />
          <BigHeadTitle
            style="bigHeadTitle"
            bigHeadTitle={username !== undefined && `${username}!`}
          />
        </div>
        <BtnPrimary data="Continue" onClick={handleNavigate} />
        <button
          onClick={handleNewSignUp}
          className="linkUrl text-decoration-underline text-center text-[1.733477789815818vh] text-white"
        >
          New Sign Up?
        </button>
        <Footer image={BImgFooter} />
      </div>
      {/* END FOOTER */}

      <Balloon style="balloonStripe top-[20%] left-[-10%]" image={BImgStripe} />
      <Balloon style="balloonPurple top-[30%] left-[30%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[20%] right-[15%]" image={BImgPurple} />
      <Balloon style="balloonDot top-[25%] right-[20%]" image={BImgDot} />
      <Balloon style="starBotRig top-[50%] left-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[30%] right-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[80%] right-[5%]" image={BImgStar} />
      <Balloon style="confeti top-[10%] left-[15%]" image={BImgConfetiBR} />
      <Balloon style="confeti top-[32%] left-[20%]" image={BImgConfetiBR} />
      <Balloon style="confeti top-[70%] left-[15%]" image={BImgConfetiBR} />
      <Balloon style="confeti top-[50%] left-[15%]" image={BImgConfetiPL} />
      <Balloon style="confeti top-[50%] right-[15%]" image={BImgConfetiPL} />
    </>
  );
}
