import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch } from "react-redux";
import Header from "../components/header";

import { clickToast } from "../features/toastMessageState.js";
import ClickLoading from "../components/ClickLoading";

// BELOW COMPONENTS
import Balloon from "../components/Balloon";
import BigHeadTitle from "./BigHeadTitle";

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
import HeadTitle from "./HeadTitle.jsx";

const DataEnrichmentRec = ({ quesAsked, setDeDisplay }) => {
  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const dispatch = useDispatch();

  const uid = Cookies.get("uid");

  const [currentQuestion, setCurrentQuestion] = useState(quesAsked + 1);
  const [loading, setLoading] = useState(false);

  const optionOne = useRef(null);
  const optionTwo = useRef(null);
  const optionThree = useRef(null);
  const optionFour = useRef(null);

  const [answers, setAnswers] = useState({
    ansEatChocolates: null,
    ansHaveChoclairs: null,
    ansEnjoyChoclairs: null,
  });

  const { ansEatChocolates, ansHaveChoclairs, ansEnjoyChoclairs } = answers;

  const submit = (value) => {
    setLoading(true);
    if (currentQuestion === 1) {
      setAnswers({
        ...answers,
        ansEatChocolates: value,
      });
    } else if (currentQuestion === 2) {
      setAnswers({
        ...answers,
        ansHaveChoclairs: value,
      });
    } else if (currentQuestion === 3) {
      setAnswers({
        ...answers,
        ansEnjoyChoclairs: value,
      });
    }
  };

  useEffect(() => {
    const sendAnswers = async () => {
      await axios
        .post(`${serverUrl}/add-ques`, {
          apikey,
          uid,
          pg: "interact",
          ansEatChocolates,
          ansHaveChoclairs,
          ansEnjoyChoclairs,
        })
        .then((res) => {
          if (res.data.success) {
            setDeDisplay(false);
            setLoading(false);
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

    if (currentQuestion === 1 && ansEatChocolates !== null) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "EQ_Answer_Submit",
        Answer: ansEatChocolates, // pass this value dyanmically.
      });

      sendAnswers();
    } else if (currentQuestion === 2 && ansHaveChoclairs !== null) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "EQ_Answer_Submit",
        Answer: ansHaveChoclairs, // pass this value dyanmically.
      });
      sendAnswers();
    } else if (currentQuestion === 3 && ansEnjoyChoclairs !== null) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "EQ_Answer_Submit",
        Answer: ansEnjoyChoclairs, // pass this value dyanmically.
      });
      sendAnswers();
    }
  }, [ansEatChocolates, ansHaveChoclairs, ansEnjoyChoclairs]);

  return (
    <>
      <div className="w-full absolute top-0 left-0 z-[99999] purpleBackgroundColor h-[100vh]">
        <Header visibleLeftBackButton={false} />
        <div className="z-[99999] h-[100vh] flex-col flex items-start  mt-[50px]">
          <div className="mx-auto mt-[50px]">
            <div className="text-center  px-12 flex flex-col items-center gap-[20px]">
              <BigHeadTitle
                style="bigHeadTitle text-[2.1953896816684964vh] txtDescription"
                bigHeadTitle="Answer this for us and get closer"
                bigHeadTitle2="to winning a Tablet!"
              />
              <HeadTitle
                style="font-bold text-[1.9758507135016465vh] txtDescription"
                headTitle={
                  currentQuestion === 1
                    ? "How often do you eat a chocolate?"
                    : currentQuestion === 2
                    ? "How often do you have Choclairs?"
                    : currentQuestion === 3
                    ? "When do you enjoy Choclairs?"
                    : ""
                }
              />
              <ul className="list-unstyled listRadio mx-auto w-full">
                <li>
                  <label className="flex items-center fieldLbl">
                    <input
                      onClick={(e) => {
                        if (optionOne.current) {
                          optionOne.current.className = "dotCheck";
                          setTimeout(() => {
                            optionOne.current.className = "dotUnCheck";
                          }, 500);
                        }
                      }}
                      onChange={(e) => {
                        if (e.target.checked) {
                          e.target.checked = false;
                          if (currentQuestion === 1 || currentQuestion === 2) {
                            submit("At least once a week");
                          } else if (currentQuestion === 3) {
                            submit("On a road trip");
                          }
                        }
                      }}
                      type="radio"
                      name="radio"
                      className="hidden"
                    />
                    <span className="dotUnCheck" ref={optionOne}></span>
                    {currentQuestion === 1 || currentQuestion === 2 ? (
                      <span className="txtDesc">At least once a week</span>
                    ) : (
                      <span className="txtDesc">On a road trip</span>
                    )}
                  </label>
                </li>
                <li>
                  <label className="flex items-center fieldLbl">
                    <input
                      onClick={(e) => {
                        if (optionTwo.current) {
                          optionTwo.current.className = "dotCheck";
                          setTimeout(() => {
                            optionTwo.current.className = "dotUnCheck";
                          }, 500);
                        }
                      }}
                      onChange={(e) => {
                        if (e.target.checked) {
                          e.target.checked = false;
                          if (currentQuestion === 1 || currentQuestion === 2) {
                            submit(
                              "Less than once a week but at least once a month"
                            );
                          } else if (currentQuestion === 3) {
                            submit("During celebrations");
                          }
                        }
                      }}
                      type="radio"
                      name="radio"
                      className="hidden"
                    />
                    <span className="dotUnCheck" ref={optionTwo}></span>
                    {currentQuestion === 1 || currentQuestion === 2 ? (
                      <span className="txtDesc">
                        Less than once a week but at least once a month
                      </span>
                    ) : (
                      <span className="txtDesc">During celebrations</span>
                    )}
                  </label>
                </li>
                <li>
                  <label className="flex items-center fieldLbl">
                    <input
                      onClick={(e) => {
                        if (optionThree.current) {
                          optionThree.current.className = "dotCheck";
                          setTimeout(() => {
                            optionThree.current.className = "dotUnCheck";
                          }, 500);
                        }
                      }}
                      onChange={(e) => {
                        if (e.target.checked) {
                          e.target.checked = false;

                          if (currentQuestion === 1 || currentQuestion === 2) {
                            submit(
                              "Less than once a month but at least once in three months"
                            );
                          } else if (currentQuestion === 3) {
                            submit("For snacking");
                          }
                        }
                      }}
                      type="radio"
                      name="radio"
                      className="hidden"
                    />
                    <span className="dotUnCheck" ref={optionThree}></span>
                    {currentQuestion === 1 || currentQuestion === 2 ? (
                      <span className="txtDesc">
                        Less than once a month but at least once in three months
                      </span>
                    ) : (
                      <span className="txtDesc">For snacking</span>
                    )}
                  </label>
                </li>
                {currentQuestion !== 3 && (
                  <li>
                    <label className="flex items-center fieldLbl">
                      <input
                        onClick={(e) => {
                          if (optionFour.current) {
                            optionFour.current.className = "dotCheck";
                            setTimeout(() => {
                              optionFour.current.className = "dotUnCheck";
                            }, 500);
                          }
                        }}
                        onChange={(e) => {
                          if (e.target.checked) {
                            e.target.checked = false;

                            if (
                              currentQuestion === 1 ||
                              currentQuestion === 2
                            ) {
                              submit("Less than once in three months");
                            }
                          }
                        }}
                        type="radio"
                        name="radio"
                        className="hidden"
                      />
                      <span className="dotUnCheck" ref={optionFour}></span>
                      {currentQuestion === 1 || currentQuestion === 2 ? (
                        <span className="txtDesc">
                          Less than once in three months
                        </span>
                      ) : null}
                    </label>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>

        <Balloon
          style="balloonStripe top-[13%] left-[-40px]"
          image={BImgStripe}
        />
        <Balloon
          style="balloonPurple top-[20%] left-[20%]"
          image={BImgPurple}
        />
        <Balloon
          style="balloonPurple top-[10%] right-[15%]"
          image={BImgPurple}
        />
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
      </div>
      {loading && (
        <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center bg-[#36207d90] backdrop-blur-[10px] z-[99999]">
          <ClickLoading />
        </div>
      )}
    </>
  );
};

export default DataEnrichmentRec;
