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
import BImgConfeti5 from "../assets/img/icons/iconconfetti5.svg";
import BImgConfeti6 from "../assets/img/icons/iconconfetti6.svg";
import BImgConfeti7 from "../assets/img/icons/iconconfetti7.svg";

import { clickHowToPlayState } from "../features/howToPlay.js";
import { useDispatch } from "react-redux";

export default function SideBar() {
  const [btnHamburger, setBtnhamburger] = useState(false);
  const dispatch = useDispatch();

  const btnToggle = () => {
    setBtnhamburger(!btnHamburger);
  };
  const btnClose = () => {
    setBtnhamburger(false);
  };

  return (
    <>
      <button
        className="btnHamburger absolute top-[40%] right-[20px] translate-y-[-50%]"
        onClick={btnToggle}
      >
        <img
          src={iconBurger}
          alt=""
          className="iconHamburger w-[30px] h-[30px]"
        />
      </button>

      <div
        className={`overlaySidebar fixed inset-[0] h-[100vh] w-full  z-[999999999] bg-[#240d5c] ${btnHamburger ? "overlaySidebarOpen" : ""
          }`}
      >
        <div
          className={`sidebar fixed top-[0] left-[0] w-full h-full flex items-center justify-center flex-col  z-[999] text-center p-[30px] ${btnHamburger ? "sidebaropen" : ""
            }`}
        >
          <button
            className="btnClose absolute top-[60px] right-[36px] z-[999]"
            onClick={btnClose}
          >
            <img src={iconClose} alt="" className="img-fluid imgClose" />
          </button>
          <div className="balloonAnimationSidebar w-full h-[300px] absolute left-[50%] top-[0] max-w-[700px] mx-auto block translate-x-[-50%]">
            <Balloon
              style="balloonStripe top-[25%] left-[10%]"
              image={BImgStripe}
            />
            <Balloon
              style="balloonPurple top-[20%] left-[20%]"
              image={BImgPurple}
            />
            <Balloon
              style="balloonPurple top-[30%] right-[15%]"
              image={BImgPurple}
            />
            <Balloon style="balloonDot top-[15%] right-[30%]" image={BImgDot} />
            <Balloon style="starBotRig top-[20%] left-[10%]" image={BImgStar} />
            <Balloon
              style="starBotRig top-[10%] right-[20%]"
              image={BImgStar}
            />
            <Balloon
              style="starBotRig top-[50%] right-[25%]"
              image={BImgStar}
            />
            <Balloon
              style="confeti top-[20%] right-[15%]"
              image={BImgConfeti1}
            />
            <Balloon style="confeti top-[35%] left-[5%]" image={BImgConfeti2} />
            <Balloon
              style="confeti top-[20%] left-[15%]"
              image={BImgConfeti3}
            />
            <Balloon style="festoon top-[55%] left-[3%]" image={BImgConfeti5} />
            <Balloon
              style="festoon top-[50%] right-[15%]"
              image={BImgConfeti6}
            />
            <Balloon
              style="festoon top-[30%] left-[10%]"
              image={BImgConfeti7}
            />
          </div>
          <ul className="list-none listNav z-[9999] relative">
            <li>
              <button
                className="no-underline text-white txtDescription text-[1.9501625135427951vh]"
                onClick={() => {
                  dispatch(clickHowToPlayState(true));
                }}
              >
                How to play
              </button>
            </li>
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
