import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

// BELOW PATH COMPONENTS
import HeadTitle from "./HeadTitle";
import OtpInput from "./OtpInput";
import BtnPrimary from "./ButtonPrimary";
import Balloon from "./Balloon";
import ClickLoading from "./ClickLoading";

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
import Logo from "../assets/img/logo.png";
import iconClose from "../assets/img/iconClose.webp";

//REDUX DISPATCH FUNCTIONS
import { clickOtpModalState } from "../features/otpModalState";
import { clickLoadingAnimState } from "../features/loadingAnimState";
import { clickUserDetailsState } from "../features/userDetails.js";
import { clickToast } from "../features/toastMessageState.js";

export default function Otp({ person, updatePerson }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const referalcode = urlSearchParams.get("refcode");

  const [loading, setLoading] = useState(false);
  const [resendSendBefore, setResendSendBefore] = useState(false);
  const [errorRecieved, setErrorRecieved] = useState(false);

  //REDUX STATES

  const [otpEntered, setOtpEntered] = useState(["", "", "", ""]);
  const joinedOtp = otpEntered.join("");
  const [timeRemaining, setTimeRemaining] = useState(30);

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const {
    name,
    email,
    mobile,
    dob,
    terms,
    promo,
    token,
    device,
    os,
    browser,
    cid,
    hutk,
    utm_campaign,
    utm_content,
    utm_medium,
    utm_source,
    utm_term,
  } = person;

  const googleAnalytics = () => {
    window.gtag("event", "conversion", {
      send_to: "AW-11226479655/SAKxCJupjIUZEKf4mekp",
    });

    const img = document.createElement("img");
    img.src =
      "https://trk.ultraind.in/pixel?adid=659b8fe857bdea078f1f4f87&goal_value=Registration";
    img.id = "trackingPixel";
    document.body.appendChild(img);
  };

  const handleSubmit = async () => {
    var convertedDob = new Date(dob);

    function addLeadingZero(number) {
      return number < 10 ? "0" + number : number;
    }

    var formattedDate =
      convertedDob.getFullYear() +
      "-" +
      addLeadingZero(convertedDob.getMonth() + 1) +
      "-" +
      addLeadingZero(convertedDob.getDate());

    if (timeRemaining !== 0) {
      if (joinedOtp !== "") {
        if (location.pathname === "/login") {
          setLoading(true);
          await axios
            .post(`${serverUrl}/login`, {
              apikey,
              mobile: mobile,
              otp: joinedOtp,
              token,
            })
            .then((res) => {
              if (res.data.message === "SUCCESS") {
                setLoading(false);
                dispatch(clickLoadingAnimState(true));
                const { uid, shareRefCode } = res.data;
                dispatch(
                  clickUserDetailsState({
                    uid,
                    shareRefCode,
                  })
                );
                Cookies.set("uid", uid);
                Cookies.set("shareRefCode", shareRefCode);
                Cookies.set("name", res.data.name);
                setTimeout(() => {
                  handleClose();
                  dispatch(clickLoadingAnimState(false));
                  if (referalcode === null) {
                    navigate("/dashboard");
                  } else {
                    navigate(`/join?refcode=${referalcode}`);
                  }
                }, 3000);
              } else if (res.data.message === "Invalid OTP!") {
                setLoading(false);
                dispatch(
                  clickToast({
                    value: true,
                    text: "Please enter valid OTP",
                  })
                );
              } else if (
                res.data.message ===
                "Mobile no. not registered. Kindly register."
              ) {
                dispatch(clickOtpModalState(false));
                setLoading(false);
                dispatch(
                  clickToast({
                    value: true,
                    text: "Mobile no. not registered. Kindly register.",
                  })
                );
              } else {
                setLoading(false);
                dispatch(
                  clickToast({
                    value: true,
                    text: "Something went wrong, please try again later",
                  })
                );
              }
            })
            .catch((error) => {
              setLoading(false);
              setErrorRecieved(true);
              setTimeRemaining(30);
              dispatch(
                clickToast({
                  value: true,
                  text: "Server response error, please try again later",
                })
              );
            });
        } else if (location.pathname === "/") {
          if (timeRemaining !== 0) {
            setLoading(true);
            await axios
              .post(`${serverUrl}/register`, {
                apikey,
                name,
                mobile,
                email,
                dob: referalcode === null ? formattedDate : "",
                refcode: referalcode,
                terms,
                promo,
                otp: joinedOtp,
                token,
                device,
                os,
                browser,
                cid,
                hutk,
                utm_camp: utm_campaign,
                utm_content,
                utm_medium,
                utm_src: utm_source,
                utm_term,
              })
              .then((res) => {
                if (res.data.message === "SUCCESS") {
                  fbq("trackCustom", "Birthday_Submit_PII");
                  googleAnalytics();
                  setLoading(false);
                  dispatch(clickLoadingAnimState(true));
                  const { uid, shareRefCode } = res.data;
                  dispatch(
                    clickUserDetailsState({
                      uid,
                      shareRefCode,
                    })
                  );
                  Cookies.set("uid", uid);
                  Cookies.set("shareRefCode", shareRefCode);
                  Cookies.set("name", name);
                  setTimeout(() => {
                    dispatch(clickLoadingAnimState(false));
                    if (referalcode === null) {
                      handleClose();
                      navigate("/capture");
                    } else {
                      handleClose();
                      navigate(`/join?refcode=${referalcode}`);
                    }
                  }, 3000);
                } else if (res.data.message === "Invalid OTP!") {
                  setLoading(false);
                  dispatch(
                    clickToast({
                      value: true,
                      text: "Please enter valid OTP",
                    })
                  );
                }
              })
              .catch((error) => {
                dispatch(
                  clickToast({
                    value: true,
                    text: "Server response error",
                  })
                );
              });
          } else {
          }
        }
      } else {
        setLoading(false);
        dispatch(
          clickToast({
            value: true,
            text: "Please enter valid OTP",
          })
        );
      }
    }
  };

  const handleResendOtp = async () => {
    setTimeRemaining(30);
    setResendSendBefore(true);
    setLoading(false);

    await axios
      .post(`${serverUrl}/resend-otp`, {
        apikey,
        mobile,
        token,
      })
      .then((res) => {
        if (res.data.message !== "SUCCESS") {
          dispatch(
            clickToast({
              value: true,
              text: "Something went wrong, please try again later",
            })
          );
        }
      });
  };

  const handleClose = () => {
    dispatch(clickOtpModalState(false));
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, []);

  const formatTime = (time) => {
    const seconds = time % 60;
    return `${seconds}`;
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
      <div className="fullScreenOverlayOtp fixed inset-[0] flex items-center justify-center flex-col z-[9999999]">
        <div className="topheader absolute top-[10px] left-[0] w-full">
          <Link to="/" className="linkLogo mx-auto max-w-[200px] block">
            <img src={Logo} className="object-cover img-fluid imgLogo" />
          </Link>
          <button
            onClick={handleClose}
            className="btnClose absolute top-[25px] right-[25px]"
          >
            <img src={iconClose} className="object-cover img-fluid imgClose" />
          </button>
        </div>

        <div className="col-10 mx-auto text-center">
          <HeadTitle style="headTitle mb-3" headTitle="Enter OTP" />
          <div className="flex items-center justify-center">
            <OtpInput otpEntered={otpEntered} setOtpEntered={setOtpEntered} />
          </div>
          <div className="d-flex align-items-center justify-content-center flex-column">
            <div>
              {!loading ? (
                <BtnPrimary onClick={handleSubmit} data="VERIFY" />
              ) : (
                <div className="h-[56px]">
                  <ClickLoading />
                </div>
              )}
            </div>

            {!resendSendBefore && !errorRecieved && !loading && (
              <>
                {timeRemaining === 0 ? (
                  <button
                    className="linkUrl mb-3 text-[1.733477789815818vh] text-white text-decoration-underline"
                    onClick={handleResendOtp}
                  >
                    Resend
                  </button>
                ) : (
                  <p className="linkUrl mb-3 text-[1.733477789815818vh] text-white text-decoration-underline">
                    Resend OTP in {formatTime(timeRemaining)}s
                  </p>
                )}
              </>
            )}
            <button
              onClick={handleClose}
              className="linkUrl text-[1.733477789815818vh] text-white text-decoration-underline"
            >
              Entered Wrong Number?
            </button>
          </div>
        </div>
      </div>
      <Balloon style="balloonStripe top-[10%] left-[-10%]" image={BImgStripe} />
      <Balloon style="balloonPurple top-[25%] left-[30%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[20%] right-[15%]" image={BImgPurple} />
      <Balloon style="balloonDot top-[20%] right-[20%]" image={BImgDot} />
      <Balloon style="starBotRig top-[35%] left-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[30%] right-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[55%] right-[5%]" image={BImgStar} />
      <Balloon style="confeti top-[30%] right-[15%]" image={BImgConfeti1} />
      <Balloon style="confeti top-[20%] left-[5%]" image={BImgConfeti2} />
      <Balloon style="confeti top-[20%] left-[15%]" image={BImgConfeti3} />
      <Balloon style="confeti top-[20%] right-[25%]" image={BImgConfeti4} />
      <Balloon style="festoon top-[20%] left-[3%]" image={BImgConfeti5} />
      <Balloon
        style="festoon top-[72%] right-[10%] rotate-180"
        image={BImgConfeti6}
      />
      <Balloon
        style="festoon top-[70%] left-[5%] rotate-180"
        image={BImgConfeti7}
      />
    </>
  );
}
