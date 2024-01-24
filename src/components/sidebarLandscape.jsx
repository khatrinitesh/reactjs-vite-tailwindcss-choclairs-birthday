import React, { useState } from "react";

// BELOW COMPONENTS
import Balloon from "../components/Balloon.jsx";
// BELOW IMAGE FILES
import iconBurger from "../assets/img/icons/iconhamburger.svg";
import iconClose from "../assets/img/iconClose.webp";
import Chocolate from "../assets/img/chocolate.png";
import MondelezLogo from "../assets/img/mondelez-logo.png";
import BImgStripe from "../assets/img/icons/iconballoonstripe.svg";
import BImgPurple from "../assets/img/icons/iconballoonpurple.svg";
import BImgDot from "../assets/img/icons/iconballoondot.svg";
import BImgStar from "../assets/img/icons/iconstar.svg";
import BImgConfeti1 from "../assets/img/icons/iconconfetti1.svg";
import BImgConfeti2 from "../assets/img/icons/iconconfetti2.svg";
import BImgConfeti3 from "../assets/img/icons/iconconfetti3.svg";
import BImgConfeti4 from "../assets/img/icons/iconconfetti4.svg";
import BImgConfeti5 from "../assets/img/icons/iconconfetti5.svg";
import BImgConfeti6 from "../assets/img/icons/iconconfetti6.svg";
import BImgConfeti7 from "../assets/img/icons/iconconfetti7.svg";
import { Link } from "react-router-dom";

export default function SidebarLandscape() {
  const [btnHamburger, setBtnhamburger] = useState(false);

  const btnToggle = () => {
    setBtnhamburger(!btnHamburger);
  };
  const btnClose = () => {
    setBtnhamburger(false);
  };
  return (
    <>
      <button
        className="z-[9999] btnHamburger absolute top-[5%] right-[5%] translate-y-[-50%]"
        onClick={btnToggle}
      >
        <img
          src={iconBurger}
          alt=""
          className="iconHamburger w-[30px] h-[30px]"
        />
      </button>

      <div
        className={`overlaySidebarL w-[50%] fixed top-[0] h-[100vh] z-[9999] ${
          btnHamburger ? "overlaySidebarOpenL" : ""
        }`}
      >
        <div className="balloonAnimationSidebar w-full h-[300px] absolute left-[50%] top-[0] max-w-[700px] mx-auto block translate-x-[-50%]">
          <Balloon
            style="balloonStripe top-[20%] left-[10%]"
            image={BImgStripe}
          />
          <Balloon
            style="balloonPurple top-[50%] left-[30%]"
            image={BImgPurple}
          />
          <Balloon
            style="balloonPurple top-[30%] right-[20%]"
            image={BImgPurple}
          />
          <Balloon style="balloonDot top-[40%] right-[30%]" image={BImgDot} />
          <Balloon style="starBotRig top-[20%] left-[10%]" image={BImgStar} />
          <Balloon style="starBotRig top-[10%] right-[20%]" image={BImgStar} />
          <Balloon style="starBotRig top-[50%] right-[25%]" image={BImgStar} />
          <Balloon style="confeti top-[20%] right-[15%]" image={BImgConfeti1} />
          <Balloon style="confeti top-[35%] left-[5%]" image={BImgConfeti2} />
          <Balloon style="confeti top-[15%] left-[5%]" image={BImgConfeti2} />
          <Balloon style="confeti top-[20%] left-[15%]" image={BImgConfeti3} />
          <Balloon style="confeti top-[15%] right-[10%]" image={BImgConfeti4} />
          <Balloon style="festoon top-[55%] left-[3%]" image={BImgConfeti5} />
          <Balloon style="festoon top-[50%] right-[15%]" image={BImgConfeti6} />
          <Balloon style="festoon top-[30%] left-[-3%]" image={BImgConfeti7} />
        </div>
        <div
          className={`sidebar w-full relative h-[100vh] flex items-center justify-center flex-col z-[99] text-center p-[30px] ${
            btnHamburger ? "sidebaropen" : ""
          }`}
        >
          <button
            className="btnClose absolute top-[4%] right-[10%]"
            onClick={btnClose}
          >
            <img src={iconClose} alt="" className="img-fluid imgClose" />
          </button>
          <ul className="list-none listNav">
            {/* <li>
              <a className=" no-underline">How to play</a>
            </li> */}
            <li>
              <a
                href="https://privacy.mondelezinternational.com/in/en-IN/privacy-policy/"
                className=" no-underline "
                target="_blank"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="https://choclairs.com/terms.html"
                className=" no-underline "
                target="_blank"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="https://contactus.mdlzapps.com/dessertscorner/contact/en-US/"
                className=" no-underline "
                target="_blank"
              >
                Contact Us
              </a>
            </li>
          </ul>
          <div className="chocolateBlock mt-[50px]">
            <img
              src={Chocolate}
              alt=""
              className="img-fluid imgChocolate max-w-[200px] mb-[20px]"
            />
            <br />
            <img
              src={MondelezLogo}
              alt=""
              className="img-fluid imgMond max-w-[200px] mb-[20px]"
            />
          </div>
          <span className="txtCopy text-white text-[1.3001083423618636vh]">
            &copy; Mondelez International. All rights reserved.
          </span>
          <span className="txtApply absolute bottom-[30px] left-[50%] translate-x-[-50%] text-white text-[1.3001083423618636vh]">
            T&C apply.
          </span>
        </div>
      </div>
    </>
  );
}
