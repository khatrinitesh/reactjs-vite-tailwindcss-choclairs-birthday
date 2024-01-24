import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";

//REDUX DISPATCH FUNCTIONS
import { clickToast } from "../features/toastMessageState.js";
import { clickOtpModalState } from "../features/otpModalState.js";

// BELOW COMPONENTS
import Footer from "../components/Footer.jsx";
import Balloon from "../components/Balloon.jsx";
import Cartoon from "../components/Cartoon.jsx";
import BtnPrimary from "../components/ButtonPrimary.jsx";
import InputField from "../components/InputField.jsx";

// BELOW IMAGE FILES
import BImgStripe from "../assets/img/icons/iconballoonstripe.svg";
import BImgPurple from "../assets/img/icons/iconballoonpurple.svg";
import BImgDot from "../assets/img/icons/iconballoondot.svg";
import BImgFooter from "../assets/img/bg-footer.png";
import Cartoon1 from "../assets/img/cartoon.png";
import BImgStar from "../assets/img/icons/iconstar.svg";
import BImgConfeti1 from "../assets/img/icons/iconconfetti1.svg";
import BImgConfeti2 from "../assets/img/icons/iconconfetti2.svg";
import BImgConfeti3 from "../assets/img/icons/iconconfetti3.svg";
import BImgConfeti4 from "../assets/img/icons/iconconfetti4.svg";
import BImgConfeti5 from "../assets/img/icons/iconconfetti5.svg";

export default function Login({ person, updatePerson }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const handleSubmit = () => {
    const { mobile } = person;

    if (mobile !== "") {
      if (mobile.length === 10) {
        setLoading(true);
        handleSendOtp();
        dispatch(clickOtpModalState(true));
      } else {
        dispatch(
          clickToast({
            value: true,
            text: "Please enter valid mobile number",
          })
        );
        return;
      }
    } else {
      dispatch(
        clickToast({
          value: true,
          text: "Please enter your mobile number",
        })
      );
      return;
    }
  };

  const handleSendOtp = async () => {
    const { mobile } = person;

    await axios
      .post(`${serverUrl}/send-login-otp`, { apikey, mobile })
      .then((res) => {
        setLoading(false);
        updateToken(res.data.token);
      })
      .catch((error) => {
        dispatch(
          clickToast({
            value: true,
            text: "Something went wrong, please try again later",
          })
        );
        return;
      });
  };

  const updatePhoneNumber = (mobile) => {
    updatePerson((draft) => {
      draft.mobile = mobile;
    });
  };
  const updateToken = (token) => {
    updatePerson((draft) => {
      draft.token = token;
    });
  };

  return (
    <>
      <div className="relative flex justify-center items-center flex-col">
        {/* START CARTOON */}
        <div className="h-full mt-0 mb-3">
          <Cartoon image={Cartoon1} style="scale-[1]" />
        </div>
        <div className="flex flex-col h-full justify-center items-center w-full">
          <div className="h-full w-full flex flex-col px-8 items-stretch justify-center gap-2">
            <InputField
              onChange={(e) => updatePhoneNumber(e.target.value)}
              onKeyDown={(e) => {
                if (
                  (e.key.length === 1 && !e.key.match(/[0-9]/)) ||
                  (e.key === "Backspace" && e.target.selectionStart === 0)
                ) {
                  e.preventDefault();
                }
              }}
              type="tel"
              maxLength={10}
              minLength={25}
              placeholder="Mobile number"
            />
            <div>
              <BtnPrimary onClick={handleSubmit} data="Get OTP" />

              <Link to="/">
                <p className="linkurl text-decoration-underline text-[12px] text-white font-light text-center">
                  Don't have an account?
                </p>
              </Link>
            </div>
          </div>
        </div>{" "}
        {/* START FOOTER */}
        <div className="text-center bottom-0 fixed w-full left-0">
          <Footer image={BImgFooter} />
        </div>
        {/* END FOOTER */}
      </div>

      <Balloon
        style="balloonStripe top-[13%] left-[-20px]"
        image={BImgStripe}
      />
      <Balloon style="balloonPurple top-[20%] left-[20%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[10%] right-[15%]" image={BImgPurple} />
      <Balloon style="balloonDot top-[15%] right-[20%]" image={BImgDot} />
      <Balloon style="starBotRig top-[45%] left-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[20%] right-[3%]" image={BImgStar} />
      <Balloon style="starBotRig top-[50%] right-[3%]" image={BImgStar} />
      <Balloon style="confeti top-[20%] right-[15%]" image={BImgConfeti1} />
      <Balloon style="confeti top-[5%] left-[5%]" image={BImgConfeti2} />
      <Balloon style="confeti top-[10%] left-[5%]" image={BImgConfeti3} />
      <Balloon style="confeti top-[10%] right-[10%]" image={BImgConfeti4} />
      <Balloon style="festoon top-[20%] left-[3%]" image={BImgConfeti5} />
    </>
  );
}
