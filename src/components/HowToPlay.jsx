import React from "react";
import { Link } from "react-router-dom";

import Balloon from "./Balloon";
import { clickHowToPlayState } from "../features/howToPlay.js";

// BELOW IMAGE FILES
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
import Logo from "../assets/img/logo.png";
import iconClose from "../assets/img/iconClose.webp";
import Icon1 from "../assets/img/icons/bash/new1.svg";
import Icon2 from "../assets/img/icons/bash/new2.svg";
import Icon3 from "../assets/img/icons/bash/new3.svg";
import Icon4 from "../assets/img/icons/bash/new4.svg";
import Icon5 from "../assets/img/icons/bash/new5.svg";
import Icon6 from "../assets/img/icons/bash/new6.svg";
import Icon7 from "../assets/img/icons/bash/new7.svg";
import DividerLine from "../assets/img/icons/bash/new8.svg";
import { useDispatch } from "react-redux";

const HowToPlay = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="fullScreenOverlayHTP z-[99999999] purpleBackgroundColor h-full fixed inset-[0]">
        <div className="topheader h-[117px] fixed top-[0] left-[0] w-full">
          <Balloon
            style="balloonStripe top-[100%] left-[10%]"
            image={BImgStripe}
          />
          <Balloon
            style="balloonPurple top-[110%] left-[20%]"
            image={BImgPurple}
          />
          <Balloon
            style="balloonPurple top-[100%] right-[25%]"
            image={BImgPurple}
          />
          <Balloon style="balloonDot top-[100%] right-[30%]" image={BImgDot} />
          <Balloon style="starBotRig top-[20%] left-[20%]" image={BImgStar} />
          <Balloon style="starBotRig top-[10%] right-[20%]" image={BImgStar} />
          <Balloon style="starBotRig top-[150%] right-[25%]" image={BImgStar} />
          <Balloon style="confeti top-[20%] right-[15%]" image={BImgConfeti1} />
          <Balloon style="confeti top-[35%] left-[5%]" image={BImgConfeti2} />
          <Balloon style="confeti top-[20%] left-[15%]" image={BImgConfeti3} />
          <Balloon style="festoon top-[55%] left-[3%]" image={BImgConfeti5} />
          <Balloon style="festoon top-[50%] right-[15%]" image={BImgConfeti6} />
          <Balloon style="festoon top-[30%] left-[10%]" image={BImgConfeti7} />
          <Link
            to="/"
            className="linkLogo mx-auto max-w-[200px] mt-[20px] block"
          >
            <img src={Logo} className="object-cover img-fluid imgLogo" />
          </Link>
          <button
            onClick={() => {
              dispatch(clickHowToPlayState(false));
            }}
            className="btnClose absolute top-[50px] right-[25px]"
          >
            <img src={iconClose} className="object-cover img-fluid imgClose" />
          </button>
        </div>
        <div className="mainContent !overflow-y-auto !h-[calc(100vh-117px)] mt-[117px] pt-[100px] flex items-center justify-center flex-col">
          <div className=" h-full">
            {/* START BOX PLAY */}
            <div className="boxPlay h-auto px-[30px] mb-[30px]  ">
              <h2 className="headTitle text-center text-white text-[2.1668472372697725vh] mb-[20px]">
                Throwing your own Birthday Bash?
              </h2>
              <ul className="listunstyled listBullet w-full gap-[20px] grid px-[20px] max-w-[300px] mx-auto">
                <li className="flex items-center gap-[15px]">
                  <span className="icon w-[15%] block">
                    <img src={Icon1} alt="" className="w-8" />
                  </span>
                  <span className="textPlay text-[#d6b8ff] w-[calc(100%-15%)] text-[14px]">
                    Create your birthday avatar
                  </span>
                </li>
                <li className="flex items-center gap-[15px]">
                  <span className="icon w-[15%] block">
                    <img src={Icon2} alt="" className="w-8" />
                  </span>
                  <span className="textPlay text-[#d6b8ff] w-[calc(100%-15%)] text-[14px]">
                    Invite Friends
                  </span>
                </li>
                <li className="flex items-center gap-[15px]">
                  <span className="icon w-[15%] block">
                    <img src={Icon3} alt="" className="w-8" />
                  </span>
                  <span className="textPlay text-[#d6b8ff] w-[calc(100%-15%)] text-[14px]">
                    Track your Bash-O-Meter
                  </span>
                </li>
                <li className="flex items-center gap-[15px]">
                  <span className="icon w-[15%] block">
                    <img src={Icon4} alt="" className="w-8" />
                  </span>
                  <span className="textPlay text-[#d6b8ff] w-[calc(100%-15%)] text-[14px]">
                    Win a gaming console!
                  </span>
                </li>
              </ul>
            </div>
            {/* END BOX PLAY */}

            {/* START DIVIDER TIMELINE */}
            <div className="dividerLine">
              <img src={DividerLine} className="w-full h-[5px]" />
            </div>
            {/* END DIVIDER TIMELINE */}

            {/* START BOX PLAY */}
            <div className="boxPlay h-auto px-[30px] py-[30px]">
              <h2 className="headTitle text-center text-white text-[2.6344676180021955vh] mb-[20px]">
                Got invited to a Birthday Bash?
              </h2>
              <ul className="listunstyled listBullet gap-[20px] grid w-full px-[20px] max-w-[300px] mx-auto">
                <li className="flex items-center gap-[15px]">
                  <span className="icon w-[15%] block">
                    <img src={Icon5} alt="" className="w-8" />
                  </span>
                  <span className="textPlay text-[#d6b8ff] w-[calc(100%-15%)] text-[14px]">
                    Play the Birthday Bash
                  </span>
                </li>
                <li className="flex items-center gap-[15px]">
                  <span className="icon w-[15%] block">
                    <img src={Icon6} alt="" className="w-8" />
                  </span>
                  <span className="textPlay text-[#d6b8ff] w-[calc(100%-15%)] text-[14px]">
                    Share on social media
                  </span>
                </li>
                <li className="flex items-center gap-[15px]">
                  <span className="icon w-[15%] block">
                    <img src={Icon7} alt="" className="w-8" />
                  </span>
                  <span className="textPlay text-[#d6b8ff] w-[calc(100%-15%)] text-[14px]">
                    Win a tablet!
                  </span>
                </li>
              </ul>
            </div>
            {/* END BOX PLAY */}
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToPlay;
