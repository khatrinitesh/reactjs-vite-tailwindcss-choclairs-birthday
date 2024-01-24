import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import ClickLoading from "../components/ClickLoading";
import bgfx from "../assets/sfx/bgfx.mp3";

//REDUX DISPATCH FUNCTIONS
import { clickToast } from "../features/toastMessageState.js";

// BELOW COMPONENTS
import Balloon from "../components/Balloon.jsx";
import Footer from "../components/Footer.jsx";

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
import BImgFooter from "../assets/img/bg-footer.png";
import HeadTitle from "../components/HeadTitle.jsx";
import { useDispatch } from "react-redux";

export default function FriendList() {
  const navigate = useNavigate();
  const uid = Cookies.get("uid");
  const [friendsList, setFriendsList] = useState(null);
  const dispatch = useDispatch();
  const refcode = Cookies.get("shareRefCode");
  const [loadingBash, setLoadingBash] = useState(false);
  const [loadingShare, setLoadingShare] = useState(false);

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const handleGetFriendsList = async () => {
    await axios
      .post(`${serverUrl}/get-friends`, { apikey, uid })
      .then((res) => {
        if (res.data.success) {
          setFriendsList(res.data);
        } else {
          dispatch(
            clickToast({
              value: true,
              text: "Something went wrong, please try again later",
            })
          );
          return;
        }
      })
      .catch((err) => {
        dispatch(
          clickToast({
            value: true,
            text: "Something went wrong, please try again later",
          })
        );
        return;
      });
  };

  const handleNavigateInteract = (code, name) => {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: "Profile_created_by_your_Friend",
      value: name,
    });

    navigate(`/birthday-bash?refcode=${code}`);
  };

  useEffect(() => {
    handleGetFriendsList();
  }, []);

  useEffect(() => {
    if (friendsList?.length !== 0) {
      Cookies.set("friendsList", "yes");
    } else {
      Cookies.set("friendsList", "no");
    }
  }, [friendsList]);

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
        url: `${currentURL}/join?refcode=${refcode}`,
      });
    } catch (error) {
      setLoadingShare(false);
    }
  };

  return (
    <>
      <div className="mainContent flex items-start justify-start h-[calc(100vh-200px)] flex-col">
        <div className="h-full flex flex-col gap-[12px] w-full">
          {friendsList !== null ? (
            <>
              {!friendsList?.flgHasOwnBash ? (
                <>
                  <button
                    onClick={() => navigate("/dob")}
                    className="btnPrimary flex border border-white items-center justify-center mx-auto !rounded-[30px]  text-white text-[2.1668472372697725vh] bg-secondarycolor h-[40px] text-center cursor-pointer w-[265px]"
                  >
                    THROW YOUR OWN BIRTHDAY BASH
                  </button>
                </>
              ) : (
                <>
                  {loadingBash ? (
                    <ClickLoading />
                  ) : (
                    <button
                      onClick={() => {
                        handleBashOMeterClick();
                      }}
                      className="btnPrimary flex border border-white items-center justify-center mx-auto !rounded-[30px]  text-white text-[2.1668472372697725vh] bg-secondarycolor h-[40px] text-center cursor-pointer w-[265px]"
                    >
                      CHECK YOUR BASH-O-METER
                    </button>
                  )}
                  {loadingShare ? (
                    <ClickLoading />
                  ) : (
                    <button
                      onClick={shareClickLink}
                      className="btnPrimary flex border border-white items-center justify-center mx-auto !rounded-[30px]  text-white text-[2.1668472372697725vh] bg-secondarycolor h-[40px] text-center cursor-pointer w-[265px]"
                    >
                      REMIND YOUR FRIENDS TO PLAY
                    </button>
                  )}
                </>
              )}
              <div className="hrDivider my-[15px] w-full h-[1px] bg-lightpurplecolor "></div>
              {friendsList?.lstUsers?.length > 0 ? (
                <>
                  <HeadTitle
                    style="headTitle text-center text-[1.9501625135427951vh] px-4 "
                    headTitle="Tap on profile to give birthday bashes to your friend"
                  />
                  <div className="px-10 overflow-y-auto h-[calc(100vh-400px)]">
                    <ul className="grid gap-[12px]">
                      {friendsList?.lstUsers?.map((val, index) => {
                        return (
                          <React.Fragment key={index}>
                            {val?.refcode !== refcode ? (
                              <li>
                                <button
                                  onClick={() =>
                                    handleNavigateInteract(
                                      val.refcode,
                                      val.name
                                    )
                                  }
                                  className="btnFriends border-1 border-solid border-lightpurplecolor text-white text-[2.5vh] w-full rounded-full p-[15px] cursor-pointer"
                                >
                                  {val.name.toUpperCase().split(" ")[0]}'s
                                  BIRTHDAY BASH
                                </button>
                              </li>
                            ) : null}
                          </React.Fragment>
                        );
                      })}
                    </ul>
                  </div>
                </>
              ) : (
                <div className="flex px-4 items-center justify-center w-full h-full">
                  <HeadTitle
                    style="headTitle text-center text-[1.9501625135427951vh]"
                    headTitle="You have not interacted with any of your friends avatar."
                  />
                </div>
              )}
            </>
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <ClickLoading />
            </div>
          )}
        </div>
        <Footer image={BImgFooter} />
      </div>
      <audio src={bgfx} loop autoPlay controls className="hidden"></audio>

      <Balloon
        style="balloonStripe top-[2%] left-[8%] w-[10px !important]"
        image={BImgStripe}
      />
      <Balloon style="balloonPurple top-[10%] left-[10%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[5%] right-[5%]" image={BImgPurple} />
      <Balloon style="balloonDot top-[5%] right-[10%]" image={BImgDot} />
      <Balloon style="balloonDot top-[50%] left-[-5%]" image={BImgDot} />
      <Balloon style="balloonPurple top-[50%] right-[1%]" image={BImgPurple} />
      <Balloon style="starBotRig top-[10%] left-[20%]" image={BImgStar} />
      <Balloon style="starBotRig top-[2%] right-[15%]" image={BImgStar} />
      <Balloon style="starBotRig top-[20%] left-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[40%] right-[2%]" image={BImgStar} />
      <Balloon style="confeti top-[5%] right-[25%]" image={BImgConfeti1} />
      <Balloon style="confeti top-[5%] left-[5%]" image={BImgConfeti2} />
      <Balloon style="confeti top-[10%] left-[5%]" image={BImgConfeti3} />
      <Balloon style="confeti top-[10%] right-[10%]" image={BImgConfeti4} />
      <Balloon style="festoon top-[15%] left-[5%]" image={BImgConfeti5} />
      <Balloon style="festoon top-[15%] right-[5%]" image={BImgConfeti6} />
    </>
  );
}
