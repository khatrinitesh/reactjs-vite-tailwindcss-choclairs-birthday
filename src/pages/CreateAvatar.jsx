import React, { useEffect, useState } from "react";

// BELOW COMPONENTS
import Balloon from "../components/Balloon.jsx";
import SlideshowAvatar from "../components/SlideshowAvatar.jsx";
import BtnPrimary from "../components/ButtonPrimary.jsx";
import Footer from "../components/Footer.jsx";
import HumanBody from "../components/HumanBody.jsx";
import ClickLoading from "../components/ClickLoading";
import bgfx from "../assets/sfx/bgfx.mp3";

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
import BImgFooter from "../assets/img/bg-footer.png";

//body
import SlideShow1 from "../assets/avatar/body/body_2.png";
import SlideShow2 from "../assets/avatar/body/body_1.png";
import SlideShow3 from "../assets/avatar/body/body_3.png";
import SlideShow4 from "../assets/avatar/body/body_4.png";
import SlideShow5 from "../assets/avatar/body/body_5.png";
import SlideShow6 from "../assets/avatar/body/body_6.png";

//hat
import hat1 from "../assets/avatar/hat/hat_1.png";
import hat2 from "../assets/avatar/hat/hat_2.png";
import hat3 from "../assets/avatar/hat/hat_3.png";

import { useImmer } from "use-immer";
import HeadTitle from "../components/HeadTitle.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function CreateAvatar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const userDetails = useSelector((state) => state.userDetailsState);
  const [loading, setLoading] = useState(false);
  const faceUrl = Cookies.get("faceUrl");
  const [activeHat, setActiveHat] = useState("hat1");

  const { uid } = userDetails;

  const [selectedAvatar, updateSelectedAvatar] = useImmer({
    hat: hat1,
    face: "",
    body: SlideShow1,
    hatStyle: "relative bottom-[-35%]",
    bodyStyle: "relative top-[-10%] z-[-1]",
  });

  const [avatar, updateAvatar] = useImmer({
    hatData: "hat1",
    stick: "stick1",
  });

  const { hat, face, body, hatStyle, bodyStyle } = selectedAvatar;
  const { hatData, stick } = avatar;

  const slidesShow = [
    {
      image: SlideShow1,
      name: "stick1",
      style: "relative top-[-10%] z-[-1]",
    },
    {
      image: SlideShow2,
      name: "stick2",
      style: "relative top-[-10%] z-[-1]",
    },
    {
      image: SlideShow3,
      name: "stick3",
      style: "relative top-[-24%] z-[-1]",
    },
    {
      image: SlideShow4,
      name: "stick4",
      style: "relative top-[-10%] z-[-1]",
    },
    {
      image: SlideShow5,
      name: "stick5",
      style: "relative top-[-10%] z-[-1]",
    },
    {
      image: SlideShow6,
      name: "stick6",
      style: "relative top-[-20%] z-[-1]",
    },
  ];
  const hats = [
    {
      image: hat1,
      name: "hat1",
      style: "relative bottom-[-35%]",
    },
    {
      image: hat2,
      name: "hat2",
      style: "relative bottom-[-60%] z-[-1] right-[12px]",
    },
    {
      image: hat3,
      name: "hat3",
      style: "relative bottom-[-20%] rotate-[30deg] z-[-1]",
    },
  ];

  const handleHatClick = (hat, hatStyle, hatName) => {
    setActiveHat(hatName);
    updateSelectedAvatar((draft) => {
      draft.hat = hat;
      draft.hatStyle = hatStyle;
    });
    updateAvatar((draft) => {
      draft.hatData = hatName;
    });
  };
  const googleAnalytics = () => {
    window.gtag("event", "conversion", {
      send_to: "AW-11226479655/bxllCKGpjIUZEKf4mekp",
    });
    const img = document.createElement("img");
    img.src =
      "https://trk.ultraind.in/pixel?adid=659b8fe857bdea078f1f4f87&goal_value=AvatarCreation";
    img.id = "trackingPixel";
    document.body.appendChild(img);
  };

  const handleSubmit = async () => {
    setLoading(true);
    await axios
      .post(`${serverUrl}/add-face-data`, { apikey, uid, hat: hatData, stick })
      .then((res) => {
        if (res.data.message === "SUCCESS") {
          window.dataLayer = window.dataLayer || [];
          dataLayer.push({
            event: "Final Avatar Submit_Next Button Click",
          });
          fbq("trackCustom", "Birthday_Avatar_Created");
          googleAnalytics();
          navigate("/share");
        } else {
          dispatch(
            clickToast({
              value: true,
              text: "Something went wrong, please try again later",
            })
          );
        }
      })
      .catch((error) => {
        dispatch(
          clickToast({
            value: true,
            text: "Something went wrong, please try again later",
          })
        );
      });
  };

  useEffect(() => {
    return () => {
      const img = document.getElementById("trackingPixel");
      if (img) {
        document.body.removeChild(img);
      }
    };
  }, []);

  return (
    <>
      <div className="h-[calc(100vh-150px-22px-100px-200px)] flex-col">
        <div className="w-full h-full createavatar">
          <div className="relative right-[-15%] translate-r-[-50%]">
            <HumanBody
              hat={hat}
              face={faceUrl}
              body={body}
              hatStyle={hatStyle}
              bodyStyle={bodyStyle}
            />
          </div>
          <div className="flex flex-col w-full h-full gap-[12px] items-center justify-center right-[12px]">
            <p className="text-white text-center txtDescription">Party Hats</p>
            {hats.map((item, idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    window.dataLayer = window.dataLayer || [];
                    dataLayer.push({
                      event: "Stick Figure",
                      Design: item.name,
                    });

                    handleHatClick(item.image, item.style, item.name);
                  }}
                  className={`${
                    activeHat === item.name
                      ? "border-[2px] border-[#c08829]"
                      : ""
                  } h-[60px] z-[99] w-[60px] casm:h-[80px] casm:w-[80px] bg-white rounded-full cass:p-4 p-2`}
                >
                  <img src={item.image} />
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex z-[2] fixed bottom-[-40px] gap-2 justify-start items-center mb-10 flex-col w-full">
          <p className="text-white text-center txtDescription">Stick Figure</p>
          <SlideshowAvatar
            slidesShow={slidesShow}
            selectedAvatar={selectedAvatar}
            updateSelectedAvatar={updateSelectedAvatar}
            updateAvatar={updateAvatar}
          />
          {!loading ? (
            <BtnPrimary onClick={handleSubmit} data="NEXT" />
          ) : (
            <div className="h-[56px]">
              <ClickLoading />
            </div>
          )}
        </div>

        <Footer
          style="bgFooter fixed"
          image={BImgFooter}
          text1="Mondelez International All rights reserved. T&C apply"
        />
      </div>
      <audio controls autoPlay src={bgfx} loop className="hidden"></audio>

      <Balloon
        style="balloonStripe top-[20%] left-[-20px]"
        image={BImgStripe}
      />
      <Balloon style="balloonStripe top-[3%] left-[-10%]" image={BImgStripe} />
      <Balloon style="balloonPurple top-[10%] left-[20%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[15%] left-[5%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[5%] right-[5%]" image={BImgPurple} />
      <Balloon
        style="balloonDot top-[20%] left-[-5%] w-[10px]"
        image={BImgDot}
      />
      <Balloon style="balloonDot top-[10%] right-[10%]" image={BImgDot} />
      <Balloon style="starBotRig top-[25%] left-[8%]" image={BImgStar} />
      <Balloon style="starBotRig top-[15%] right-[8%]" image={BImgStar} />
      <Balloon style="confeti top-[20%] right-[15%]" image={BImgConfeti1} />
      <Balloon style="confeti top-[5%] left-[5%]" image={BImgConfeti2} />
      <Balloon style="confeti top-[10%] left-[5%]" image={BImgConfeti3} />
      <Balloon style="confeti top-[10%] right-[10%]" image={BImgConfeti4} />
      <Balloon style="festoon top-[10%] left-[10%]" image={BImgConfeti5} />
      <Balloon style="festoon top-[20%] right-[5%]" image={BImgConfeti6} />
      <Balloon style="festoon top-[33%] left-[3%]" image={BImgConfeti7} />
    </>
  );
}
