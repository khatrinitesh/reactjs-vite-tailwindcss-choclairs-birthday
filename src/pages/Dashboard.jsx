import React, { useEffect, useState } from "react";
import DashboardItem from "../components/DashboardItem.jsx";
import loadingAnimation from "../assets/Loading-Anim.json";
import bgfx from "../assets/sfx/bgfx.mp3";

import axios from "axios";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";

// BELOW COMPONENTS
import Balloon from "../components/Balloon.jsx";
import DataEnrichmentSender from "../components/DataEnrichmentSender";

//REDUX DISPATCH FUNCTIONS
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
import Lottie from "lottie-react";
import HeadTitle from "../components/HeadTitle.jsx";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const uid = Cookies.get("uid");
  const dispatch = useDispatch();
  const [totalPoints, setTotalPoints] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [dummyPercentage, setDummyPercentage] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [deDisplay, setDeDisplay] = useState(false);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [bonusPoints, setBonusPoints] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const fetchDashboardData = async () => {
    await axios
      .post(`${serverUrl}/get-dashboard`, { apikey, uid })
      .then((res) => {
        if (res.data.success) {
          setData(res.data.lstUsers);
          setBonusPoints(res.data.quesAsked * 5);
          setQuestionsAsked(res.data.quesAsked);
          if (res.data.quesAsked < 3) {
            setDeDisplay(true);
          }
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

  useEffect(() => {
    if (uid !== null || uid !== undefined) {
      fetchDashboardData();
    }
  }, [uid]);

  useEffect(() => {
    if (data.length > 0) {
      let total = 0;
      data.forEach((item1) => {
        item1.lstActions.forEach((item2) => {
          total += item2.points;
        });
      });
      setTotalPoints(total);
    }
  }, [data]);

  useEffect(() => {
    if (totalPoints !== "") {
      if (totalPoints <= 30) {
        const calc = Math.round((totalPoints / 30) * 100 + bonusPoints);
        setPercentage(calc);
      } else {
        setPercentage(100);
      }
    } else {
      setPercentage(bonusPoints);
    }
  }, [totalPoints, bonusPoints]);

  useEffect(() => {
    if (animationComplete) {
      const targetOffset = circumference - (percentage / 100) * circumference;
      const animationDuration = 1000; // 2 seconds
      const startTime = Date.now();

      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1);
        const newOffset =
          circumference - progress * (circumference - targetOffset);
        if (percentage <= 100) {
          setCurrentOffset(newOffset);
        } else {
          setCurrentOffset(newOffset + 37.6991118430775);
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);

      if (percentage !== 0) {
        if (percentage <= 100) {
          const intervalTime = 1000 / percentage;

          const interval = setInterval(() => {
            setDummyPercentage((prevValue) => {
              const newValue = prevValue + 1;

              if (newValue >= percentage) {
                clearInterval(interval);

                return percentage;
              }

              return newValue;
            });
          }, intervalTime);

          return () => clearInterval(interval);
        } else {
          setDummyPercentage(100);
        }
      } else {
        if (percentage <= 100) {
          setDummyPercentage(percentage);
        } else {
          setDummyPercentage(100);
        }
      }
    }
  }, [animationComplete, percentage, circumference, bonusPoints]);

  return (
    <>
      <div className="mainContent relative flex justify-center items-center flex-col h-[calc(100vh-157px)] px-4">
        <div className="dashboardBlock h-full w-full">
          <div className="w-[90%] mx-auto">
            <div className="row">
              <div className="col-12 mb-4">
                <div className="statusBlock items-center border-1 border-solid border-lightpurplecolor p-[10px] rounded-[10px] sticky top-[100px] gap-2 dashboardHeader">
                  <div className="relative flex items-center justify-center h-[100px]">
                    <>
                      <svg
                        width="100"
                        height="100"
                        className="absolute rotate-[-90deg] scale-y-[1] z-[2]"
                      >
                        <circle
                          stroke={animationComplete ? "#c79a42" : "#00000000"}
                          strokeWidth="5"
                          fill="transparent"
                          r={radius}
                          cx="50"
                          cy="50"
                          style={{
                            strokeDasharray: circumference,
                            strokeDashoffset: currentOffset,
                          }}
                        />
                      </svg>
                      <svg
                        width="100"
                        height="100"
                        className="absolute rotate-[-90deg] scale-y-[-1]"
                      >
                        <circle
                          stroke="white"
                          strokeWidth="5"
                          fill="transparent"
                          r={40}
                          cx="50"
                          cy="50"
                        />
                      </svg>
                    </>
                    {animationComplete && (
                      <p className="text-white text-[24px]">
                        {dummyPercentage}%
                      </p>
                    )}
                    <Lottie
                      onComplete={() => {
                        setAnimationComplete(true);
                      }}
                      loop={false}
                      animationData={loadingAnimation}
                      style={{
                        display: animationComplete ? "none" : "block",
                        position: "absolute",
                        height: 90,
                        width: 90,
                        top: 5,
                        left: 0,
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-white text-[12px] text-center">
                      {percentage >= 0 && percentage <= 29
                        ? "Great start!"
                        : percentage >= 30 && percentage <= 49
                        ? "Keep it up! Your party is bashing!"
                        : percentage >= 50 && percentage <= 74
                        ? "Yay! You just won a smartwatch!"
                        : percentage >= 75 && percentage <= 99
                        ? "Keep going! Just one level to go!"
                        : percentage === 100
                        ? "Congratulations! You unlocked a chance to win a gaming console!"
                        : "Congratulations! You unlocked a chance to win a gaming console!"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100vh-330px)] scrollbarnone flex flex-col gap-[20px]">
              {data.length > 0 ? (
                <>
                  {data.map((action, index) => (
                    <DashboardItem key={index} action={action} />
                  ))}
                </>
              ) : (
                <div className="flex px-4 items-center justify-center w-full h-full">
                  <HeadTitle
                    style="headTitle text-center text-[1.9501625135427951vh]"
                    headTitle="No one has interacted with your avatar."
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <audio src={bgfx} loop autoPlay controls className="hidden"></audio>

      <Balloon
        style="balloonStripe top-[2%] left-[8%] w-[10px !important]"
        image={BImgStripe}
      />
      <Balloon style="balloonPurple top-[10%] left-[10%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[5%] right-[5%]" image={BImgPurple} />
      <Balloon style="balloonDot top-[5%] right-[10%]" image={BImgDot} />
      <Balloon style="balloonStripe top-[30%] right-[-8%]" image={BImgStripe} />
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
      {deDisplay && (
        <DataEnrichmentSender
          quesAsked={questionsAsked}
          setDeDisplay={setDeDisplay}
        />
      )}
    </>
  );
}
