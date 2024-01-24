import React, { useEffect, useState } from "react";

// BELOW COMPONENTS
import Balloon from "../components/Balloon";
import BtnPrimary from "../components/ButtonPrimary";
import Footer from "../components/Footer";
import BigHeadTitle from "../components/BigHeadTitle";
import axios from "axios";

//rdux functions
import { clickToast } from "../features/toastMessageState.js";

// BELOW IMAGE FILES
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
import imgGift from "../assets/img/icons/icongamegift.svg";
import BImgFooter from "../assets/img/bg-footer.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import hurray from "../assets/lottie/hurray.json";
import Lottie from "lottie-react";
import ClickLoading from "../components/ClickLoading.jsx";

export default function ShareAvatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingBash, setLoadingBash] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const userDetails = useSelector((state) => state.userDetailsState);
  const { uid, shareRefCode } = userDetails;

  const shareClickLink = async () => {
    setLoadingShare(true);
    try {
      await axios
        .post(`${serverUrl}/set-flag`, {
          apikey,
          uid,
          type: "invite",
        })
        .then((res) => {
          setLoadingShare(false);
        })
        .catch((error) => {});
      const currentURL = window.location.origin;

      await navigator.share({
        title: "#ChoclairsBirthdayBash",
        text: "Hey rockstar! This birthday, I’m throwing the best celebration ever! Join my Choclairs Birthday Bash. And together let’s win a gaming console, tablet & more! Tap the link to get bashing!",
        url: `${currentURL}/join?refcode=${shareRefCode}`,
      });
    } catch (error) {}
  };

  const handleBashOMeterClick = async () => {
    setLoadingBash(true);
    await axios
      .post(`${serverUrl}/set-flag`, {
        apikey,
        uid,
        type: "bash-o-meter",
      })
      .then((res) => {
        setLoadingBash(false);
      })
      .catch((error) => {});
    navigate("/bash-o-meter");
  };

  return (
    <>
      <div className="mainContent overflow-x-hidden flex-row flex items-center justify-center h-[calc(100vh-157px)]">
        <div className="shareAvatarContent">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="wallpaperGift animate-bounce mb-2 max-w-[150px] sm:max-w-[200px] mx-auto">
                <img src={imgGift} className="img-fluid imgGame" />
              </div>
              <div className="grid gap-12">
                <div>
                  <div className="grid gap-2">
                    <BigHeadTitle
                      style="bigHeadTitle mb-0"
                      bigHeadTitle="Yay!"
                    />
                    <BigHeadTitle
                      style="bigHeadTitle"
                      bigHeadTitle="Your birthday avatar is ready!"
                    />
                  </div>
                  <p className="desc mb-2 text-center text-[12px] text-white">
                    <strong>Invite up to 10 friends</strong> and enjoy your
                    party!
                  </p>
                  {loadingShare ? (
                    <ClickLoading />
                  ) : (
                    <BtnPrimary onClick={shareClickLink} data="SHARE" />
                  )}
                </div>
                <div>
                  <p className="desc mb-2 text-center text-white">
                    Don't forget to come back &
                  </p>
                  {loadingBash ? (
                    <ClickLoading />
                  ) : (
                    <BtnPrimary
                      onClick={handleBashOMeterClick}
                      data="CHECK YOUR BASH-O-METER"
                    />
                  )}
                  <p className="desc text-center text-[12px] text-white">
                    More the birthday wishes!
                    <br /> More the chance of you
                    <br />
                    <span className="txtWin font-medium text-[16px]">
                      winning a gaming console!
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer
          style="bgFooter fixed bottom-0 text-center"
          image={BImgFooter}
        />
      </div>

      <Lottie
        loop={false}
        animationData={hurray}
        style={{
          height: "100%",
          width: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          overflow: "hidden",
          objectFit: "contain",
          zIndex: -9999,
        }}
      />

      <Balloon
        style="balloonStripe top-[13%] left-[-40px]"
        image={BImgStripe}
      />
      <Balloon style="balloonPurple top-[20%] left-[20%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[10%] right-[15%]" image={BImgPurple} />
      <Balloon style="balloonDot top-[20%] right-[40%]" image={BImgDot} />
      <Balloon style="starBotRig top-[45%] left-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[20%] right-[3%]" image={BImgStar} />
      <Balloon style="starBotRig top-[50%] right-[3%]" image={BImgStar} />
      <Balloon style="confeti top-[20%] right-[15%]" image={BImgConfeti1} />
      <Balloon style="confeti top-[5%] left-[5%]" image={BImgConfeti2} />
      <Balloon style="confeti top-[10%] left-[5%]" image={BImgConfeti3} />
      <Balloon style="confeti top-[10%] right-[10%]" image={BImgConfeti4} />
      <Balloon style="festoon top-[20%] left-[3%]" image={BImgConfeti5} />
      <Balloon style="festoon top-[40%] right-[7%]" image={BImgConfeti6} />
      <Balloon style="festoon top-[60%] left-[3%]" image={BImgConfeti7} />
    </>
  );
}
