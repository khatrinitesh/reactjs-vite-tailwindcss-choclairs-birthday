import React, { useState } from "react";

// BELOW COMPONENTS
import Balloon from "../components/Balloon";
import HeadTitle from "../components/HeadTitle";
import BtnPrimary from "../components/ButtonPrimary";
import DatePickerComp from "../components/DatePickerComp.jsx";
import axios from "axios";
import { checkBirthdate } from "../functions/checkBirthdate.js";
import { clickNotYourBirthdayModalState } from "../features/notYourBirthdayModalState.js";

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
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function BirthDate({ person, updatePerson }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;
  const [loading, setLoading] = useState(false);

  const uid = Cookies.get("uid");

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 15);
  const maxDateString = maxDate.toISOString().split("T")[0];
  const { dob } = person;

  const handleSubmit = () => {
    const convertedDob = new Date(dob);

    function addLeadingZero(number) {
      return number < 10 ? "0" + number : number;
    }

    var formattedDate =
      convertedDob.getFullYear() +
      "-" +
      addLeadingZero(convertedDob.getMonth() + 1) +
      "-" +
      addLeadingZero(convertedDob.getDate());

    if (dob !== "") {
      if (checkBirthdate(formattedDate)) {
        setLoading(true);
        handleSendData(formattedDate);
      } else {
        dispatch(clickNotYourBirthdayModalState(true));
        return;
      }
    } else {
      dispatch(
        clickToast({
          value: true,
          text: "Please enter your date of birth",
        })
      );
      return;
    }
  };

  const handleSendData = async (formattedDate) => {
    await axios
      .post(`${serverUrl}/update-dob`, { apikey, uid, dob: formattedDate })
      .then((res) => {
        setLoading(false);
        if (res.data.success) {
          navigate("/capture");
        }
      })
      .catch((error) => {});
  };

  const updateBirthDate = (dob) => {
    updatePerson((draft) => {
      draft.dob = dob;
    });
  };

  return (
    <>
      <Balloon style="balloonStripe top-[20%] left-[-5%]" image={BImgStripe} />
      <Balloon style="balloonPurple top-[25%] left-[30%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[20%] right-[15%]" image={BImgPurple} />
      <Balloon style="balloonDot top-[20%] right-[20%]" image={BImgDot} />
      <Balloon style="starBotRig top-[70%] left-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[30%] right-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[85%] right-[5%]" image={BImgStar} />
      <Balloon style="confeti top-[10%] right-[15%]" image={BImgConfeti1} />
      <Balloon style="confeti top-[30%] left-[5%]" image={BImgConfeti2} />
      <Balloon style="confeti top-[30%] left-[15%]" image={BImgConfeti3} />
      <Balloon style="confeti top-[35%] right-[25%]" image={BImgConfeti4} />
      <Balloon style="festoon top-[20%] left-[3%]" image={BImgConfeti5} />
      <Balloon
        style="festoon top-[70%] right-[10%] rotate-180"
        image={BImgConfeti6}
      />
      <Balloon
        style="festoon top-[75%] left-[5%] rotate-180"
        image={BImgConfeti7}
      />
      <div className="mainContent flex-row flex items-center justify-center h-[calc(100vh-157px)]">
        <div className="shareAvatarContent">
          <div className="row">
            <div className="col-10 mx-auto text-center">
              <HeadTitle
                style="headTitle mb-3"
                headTitle="Let us know your birth date, before we generate your wishes"
              />
              <div className="grid gap-[12px]">
                <DatePickerComp
                  max={maxDateString}
                  onChange={(e) => {
                    updateBirthDate(e.$d);
                  }}
                  value={dob}
                  className="fieldControl form-control p-[10px] h-[45px] border-[1px] border-solid !border-lightpurplecolor !text-[1.5167930660888407vh] text-white text-fieldControl !rounded-[10px] bg-transparent"
                />
                <BtnPrimary onClick={handleSubmit} data="ENTER" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
