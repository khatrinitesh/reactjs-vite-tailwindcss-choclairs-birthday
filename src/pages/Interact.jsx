import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import RecordRTC from "recordrtc";
import html2canvas from "html2canvas";

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
import SlideshowAnimation from "../components/SlideShowAnimation.jsx";
import axios from "axios";
import Cookies from "js-cookie";
import HeadTitle from "../components/HeadTitle.jsx";

//slideshow images
import cheekpull from "../assets/img/icons/slideshowAnimationImage_1.png";
import cake from "../assets/img/icons/slideshowAnimationImage_2.png";
import blast from "../assets/img/icons/slideshowAnimationImage_3.png";
import spank from "../assets/img/icons/slideshowAnimationImage_4.png";
import horn from "../assets/img/icons/slideshowAnimationImage_5.png";

//body
import stick1 from "../assets/avatar/body/body_2.png";
import stick2 from "../assets/avatar/body/body_1.png";
import stick3 from "../assets/avatar/body/body_3.png";
import stick4 from "../assets/avatar/body/body_4.png";
import stick5 from "../assets/avatar/body/body_5.png";
import stick6 from "../assets/avatar/body/body_6.png";

//hat
import hat1 from "../assets/avatar/hat/hat_1.png";
import hat2 from "../assets/avatar/hat/hat_2.png";
import hat3 from "../assets/avatar/hat/hat_3.png";

//REDUX DISPATCH FUNCTIONS
import { clickToast } from "../features/toastMessageState.js";

import HumanBodyForAnimation from "../components/HumanBodyForAnimation.jsx";
import ClickLoading from "../components/ClickLoading.jsx";
import { useImmer } from "use-immer";
import ScreenRecordingModal from "../components/ScreenRecordingModal.jsx";
import { IconX } from "@tabler/icons-react";
import DataEnrichmentRec from "../components/DataEnrichmentRec.jsx";

export default function Interact() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const uidCookie = Cookies.get("uid");
  const [recordAlert, setRecordAlert] = useState(true);
  const [deDisplay, setDeDisplay] = useState(false);

  const urlSearchParams = new URLSearchParams(location.search);
  const referalcode = urlSearchParams.get("refcode");

  const { facePhoto1Base64, facePhoto2Base64, hat, stick } = userData;

  const [lottieAnimation, updateLottieAnimation] = useImmer({
    animation: null,
    faceImage: "",
    faceAnimation: "",
    bodyAnimation: "",
    animationDelay: 0,
  });

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const getAvatarData = async () => {
    const uid = Cookies.get("uid");

    await axios
      .post(`${serverUrl}/get-friend`, { apikey, uid, refcode: referalcode })
      .then((res) => {
        if (res.data.success) {
          setUserData(res.data);
          Cookies.set("flgHasOwnBash", res.data.flgHasOwnBash);
          if (res.data.quesAsked < 3) {
            setDeDisplay(true);
          }
        } else if (res.data.message === "Invalid referral code!") {
          dispatch(
            clickToast({
              value: true,
              text: "Invalid referral code!",
            })
          );
        } else {
          dispatch(
            clickToast({
              value: true,
              text: "Something went wrong, please try again later",
            })
          );
        }
      })
      .catch((err) => {
        dispatch(
          clickToast({
            value: true,
            text: "Something went wrong, please try again later",
          })
        );
      });
  };

  useEffect(() => {
    getAvatarData();
  }, [referalcode]);

  const removeLottieAnimation = () => {
    updateLottieAnimation((draft) => {
      draft.animation = null;
    });
  };

  const removeFaceAnimation = () => {
    updateLottieAnimation((draft) => {
      draft.faceAnimation = "";
      draft.bodyAnimation = "";
      draft.animationDelay = 0;
    });
  };

  const removeFaceExp = () => {
    updateLottieAnimation((draft) => {
      draft.faceImage = facePhoto1Base64;
    });
  };

  const slideShow = [
    {
      image: cheekpull,
      title: "Cheek Pull",
      faceImage: facePhoto2Base64,
      faceAnimation: "headWobble",
      bodyStyle: "z-[-999999999]",
      animationDelay: 500,
    },
    {
      image: cake,
      title: "Cake Smash",
      faceImage: facePhoto2Base64,
      faceAnimation: "",
      bodyAnimation: "cakeAnimation",
      animationDelay: 100,
      bodyStyle: "z-[-999999999]",
    },
    {
      image: blast,
      title: "Party Popper",
      faceImage: facePhoto2Base64,
      bodyStyle: "z-[-999999999]",
      animationDelay: 500,
    },
    {
      image: spank,
      faceImage: facePhoto2Base64,
      title: "Birthday Bumps",
      bodyStyle: "z-[-999999999]",
      bodyAnimation: "liftBodyBump",
      faceAnimation: "headTilt",
    },
    {
      image: horn,
      title: "Party Horn",
      faceImage: facePhoto2Base64,
      bodyStyle: "z-[-999999999]",
      animationDelay: 500,
    },
  ];

  const hatCondition =
    hat === "hat1" ? hat1 : hat === "hat2" ? hat2 : hat === "hat3" ? hat3 : "";

  const hatStyles =
    hat === "hat1"
      ? "relative bottom-[-35%] z-[1]"
      : hat === "hat2"
      ? "relative bottom-[-70%] z-[-1] pr-[12px]"
      : hat === "hat3"
      ? "relative bottom-[-20%] rotate-[30deg] z-[-1]"
      : "";

  const stickCondition =
    stick === "stick1"
      ? stick1
      : stick === "stick2"
      ? stick2
      : stick === "stick3"
      ? stick3
      : stick === "stick4"
      ? stick4
      : stick === "stick5"
      ? stick5
      : stick === "stick6"
      ? stick6
      : "";
  const stickStyles =
    stick === "stick1"
      ? "top-[-10%] relative z-[-99999]"
      : stick === "stick2"
      ? "top-[-10%] relative z-[-99999]"
      : stick === "stick3"
      ? "top-[-25%] relative z-[-99999]"
      : stick === "stick4"
      ? "top-[-10%] relative z-[-99999]"
      : stick === "stick5"
      ? "top-[-10%] relative z-[-99999]"
      : stick === "stick6"
      ? "top-[-10%] relative z-[-99999]"
      : "";

  useEffect(() => {
    if (facePhoto1Base64 !== undefined) {
      updateLottieAnimation((draft) => {
        draft.faceImage = facePhoto1Base64;
      });
    }
  }, [facePhoto1Base64]);

  useEffect(() => {
    if (userData?.length !== 0) {
      if (userData?.uid === uidCookie) {
        navigate("/dashboard");
        dispatch(
          clickToast({
            value: true,
            text: "You cannot interact with your own avatar",
          })
        );
      } else {
        return;
      }
    } else return;
  }, [userData, uidCookie]);

  //screen recording
  const [videoURL, setVideoURL] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [countDown, setCountDown] = useState(10);

  let isRecording = false;
  let recorder;
  let animationFrameId;

  const startRecording = async () => {
    setCapturing(true);
    isRecording = true;
    try {
      const canvas = await html2canvas(document.querySelector("#capture"), {
        backgroundColor: "#311878",
        useCORS: true,
        scale: 2,
      });

      const stream = canvas.captureStream(30);

      recorder = new RecordRTC(stream, {
        type: "video",
        disableLogs: true,
        frameRate: 2,
        scale: 2,
      });

      recorder.startRecording();

      captureFrame(canvas);

      setTimeout(stopRecording, 12000);
    } catch (error) {}
  };

  const captureFrame = (canvas) => {
    if (!isRecording) return;

    html2canvas(document.querySelector("#capture"), {
      backgroundColor: "#311878",
      useCORS: true,
      disableLogs: true,
    }).then((newCanvas) => {
      const context = canvas.getContext("2d");
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.scale(1, 1);
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(newCanvas, 0, 0, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(() => captureFrame(canvas));
    });
  };

  const stopRecording = () => {
    isRecording = false;
    setCapturing(false);
    cancelAnimationFrame(animationFrameId);

    recorder.stopRecording(() => {
      const blob = recorder.getBlob();
      setVideoURL(blob);
    });
  };

  useEffect(() => {
    let interval = null;
    if (capturing && countDown > 0) {
      interval = setInterval(() => {
        setCountDown((prevCountDown) => prevCountDown - 1);
      }, 1000);
    } else if (!capturing || countDown === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [countDown, capturing]);

  useEffect(() => {
    const interacted = Cookies.get("friendsList");
    if (interacted === undefined || interacted === "no") {
      setRecordAlert(true);
    } else {
      setRecordAlert(false);
    }
  }, []);

  return (
    <>
      <div className="flex items-center justify-between flex-col w-full">
        <>
          {userData.length !== 0 ? (
            <>
              {facePhoto1Base64 !== null && (
                <>
                  <div className="w-full" id="capture">
                    <div className="w-full overflow-hidden text-center h-[calc(100vh-150px-100px-198px)] gap-2 grid">
                      <>
                        <HeadTitle
                          style="headTitle"
                          headTitle={`Happy B'day ${
                            userData.name.split(" ")[0]
                          }!!`}
                        />

                        <HumanBodyForAnimation
                          hat={hatCondition}
                          body={stickCondition}
                          hatStyle={hatStyles}
                          bodyStyle={stickStyles}
                          heightOfBody="h-[calc(100vh-150px-22px-100px-200px)]"
                          lottieAnimation={lottieAnimation}
                          userData={userData}
                          updateLottieAnimation={updateLottieAnimation}
                          capturing={capturing}
                        />
                      </>
                    </div>
                  </div>
                  <div className="flex justify-start gap-[24px] items-center flex-col w-full">
                    <SlideshowAnimation
                      slidesShow={slideShow}
                      lottieAnimation={lottieAnimation}
                      updateLottieAnimation={updateLottieAnimation}
                      facePhoto1Base64={facePhoto1Base64}
                      removeLottieAnimation={removeLottieAnimation}
                      removeFaceExp={removeFaceExp}
                      removeFaceAnimation={removeFaceAnimation}
                      userData={userData}
                    />
                  </div>
                </>
              )}
              <div
                className={`grid grid-cols-2 z-[9999] px-[24px] gap-[12px] justify-center items-center w-full mt-[20px]`}
              >
                <button
                  disabled={capturing}
                  onClick={startRecording}
                  className={`disabled:opacity-[50%] btnPrimary border border-white flex items-center mx-auto !rounded-[30px] text-white text-[2.1668472372697725vh] bg-secondarycolor py-2 w-full text-center justify-center cursor-pointer ${
                    capturing && "blob purple"
                  }`}
                >
                  {capturing ? (
                    <p className="flex items-center justify-center gap-[6px]">
                      <span className="h-[16px] w-[16px] rounded-full bg-red-600 border"></span>{" "}
                      RECORDING ({countDown})
                    </p>
                  ) : (
                    <p>RECORD</p>
                  )}
                </button>
                <button
                  onClick={() => {
                    if (!userData?.flgHasOwnBash) {
                      navigate("/dob");
                    } else {
                      navigate("/dashboard");
                    }
                  }}
                  className="btnPrimary border border-white flex items-center justify-center mx-auto !rounded-[30px] text-white text-[2.1668472372697725vh] bg-secondarycolor py-2 w-full text-center px-[20px] cursor-pointer"
                >
                  {!userData?.flgHasOwnBash ? (
                    <p>CREATE AVATAR</p>
                  ) : (
                    <p>BASHBOARD</p>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-[calc(100vh-150px-100px)] w-full">
              <ClickLoading />
            </div>
          )}
          <Footer style="bgFooter fixed bottom-0" image={BImgFooter} />
        </>
      </div>

      {videoURL !== null && (
        <ScreenRecordingModal
          videoURL={videoURL}
          setVideoURL={setVideoURL}
          setCountDown={setCountDown}
        />
      )}

      <Balloon style="balloonStripe top-[3%] left-[-10%]" image={BImgStripe} />
      <Balloon style="balloonPurple top-[10%] left-[20%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[15%] left-[5%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[5%] right-[5%]" image={BImgPurple} />
      <Balloon style="balloonDot top-[10%] right-[10%]" image={BImgDot} />
      <Balloon style="starBotRig top-[15%] right-[8%]" image={BImgStar} />
      <Balloon style="confeti top-[20%] right-[15%]" image={BImgConfeti1} />
      <Balloon style="confeti top-[5%] left-[5%]" image={BImgConfeti2} />
      <Balloon style="confeti top-[10%] left-[5%]" image={BImgConfeti3} />
      <Balloon style="confeti top-[10%] right-[10%]" image={BImgConfeti4} />
      <Balloon style="festoon top-[10%] left-[10%]" image={BImgConfeti5} />
      <Balloon style="festoon top-[20%] right-[5%]" image={BImgConfeti6} />

      {recordAlert && (
        <>
          <div className="absolute top-0 left-0 w-full h-full z-[999] flex items-center justify-center">
            <div className="bg-[#39217f] w-[80%] opacity-[0.9] h-[200px] rounded-[12px] flex items-center justify-center flex-col relative">
              <p className="text-white text-[18px] text-center">
                Record & start
              </p>
              <p className="text-white text-[18px] text-center">
                the bashing fun!
              </p>
              <Balloon
                style="festoon bottom-[10%] right-[5%]"
                image={BImgConfeti6}
              />
              <Balloon
                style="balloonPurple top-[40%] right-[20%]"
                image={BImgPurple}
              />
              <Balloon style="balloonDot top-[5%] left-[15%]" image={BImgDot} />
              <Balloon
                style="balloonPurple top-[15%] left-[8%]"
                image={BImgStar}
              />
              <button
                className="absolute top-[-8px] right-[-8px] bg-[#d12b7e] rounded-full h-[32px] w-[32px] flex justify-center items-center"
                onClick={() => {
                  setRecordAlert(false);
                }}
              >
                <IconX color="white" />
              </button>
            </div>
          </div>
        </>
      )}

      {deDisplay && (
        <DataEnrichmentRec
          quesAsked={userData.quesAsked}
          setDeDisplay={setDeDisplay}
        />
      )}
    </>
  );
}
