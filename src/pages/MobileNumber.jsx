import React, { useState } from "react";

// BELOW COMPONENTS
import Balloon from "../components/Balloon";
import HeadTitle from "../components/headTitle";
import BtnPrimary from "../components/ButtonPrimary";

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

export default function MobileNumber() {
  const [mobileNumber, setMobileNumber] = useState("");

  const handleMobileNumberChange = (e) => {
    // Remove non-numeric characters from the input
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, "");
    setMobileNumber(sanitizedValue);
  };
  return (
    <>
      <Balloon style="balloonStripe top-[20%] left-[-10%]" image={BImgStripe} />
      <Balloon style="balloonPurple top-[30%] left-[30%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[20%] right-[15%]" image={BImgPurple} />
      <Balloon style="balloonDot top-[25%] right-[20%]" image={BImgDot} />
      <Balloon style="starBotRig top-[50%] left-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[30%] right-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[80%] right-[5%]" image={BImgStar} />
      <Balloon style="confeti top-[30%] right-[15%]" image={BImgConfeti1} />
      <Balloon style="confeti top-[20%] left-[5%]" image={BImgConfeti2} />
      <Balloon style="confeti top-[20%] left-[15%]" image={BImgConfeti3} />
      <Balloon style="confeti top-[20%] right-[25%]" image={BImgConfeti4} />
      <Balloon style="festoon top-[20%] left-[3%]" image={BImgConfeti5} />

      <Balloon
        style="festoon top-[70%] right-[10%] rotate-180"
        image={BImgConfeti6}
      />
      <Balloon
        style="festoon top-[70%] left-[5%] rotate-180"
        image={BImgConfeti7}
      />
      <div className="mainContent relative flex justify-center items-center flex-col h-[calc(100vh-157px)]">
        <div className="col-10 mx-auto text-center">
          <HeadTitle
            style="headTitle mb-3 text-white"
            headTitle="Enter Mobile Number"
          />
          <div className="fieldGroup">
            <input
              type="tel" // "tel" type is used for telephone numbers
              id="mobileNumberInput"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              placeholder="e.g., 123-456-7890"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              title="Enter a valid mobile number (e.g., 123-456-7890)"
              maxLength="10"
              className="fieldControl form-control p-[10px] h-[45px] border-[1px] border-solid !border-lightpurplecolor !text-[1.5167930660888407vh] text-white text-fieldControl !rounded-[10px] bg-transparent"
            />
          </div>
          <div className="text-center">
            <BtnPrimary data="Get OTP" />
          </div>
        </div>
      </div>
    </>
  );
}
