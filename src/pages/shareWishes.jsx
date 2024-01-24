import React from "react";

// BELOW COMPONENTS
import Balloon from "../components/Balloon";
import BtnPrimary from "../components/ButtonPrimary";
import Footer from "../components/Footer";
import hurray from "../assets/lottie/hurray.json";

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
import imgGift from "../assets/img/icongamegift.png";
import BImgFooter from "../assets/img/bg-footer.png";

import Cookies from "js-cookie";
import Lottie from "lottie-react";

export default function ShareWishes() {
  //API KEY

  const flgHasOwnBash = Cookies.get("flgHasOwnBash");

  const shareClickLink = () => { };

  return (
    <>
      <div className="mainContent flex-row flex items-center justify-center h-[calc(100vh-157px)]">
        <div className="shareAvatarContent">
          <div className="row">
            <div className="col-10 mx-auto">
              <div className="wallpaperGift animate-bounce mb-2 max-w-[150px] sm:max-w-[200px] mx-auto">
                <img src={imgGift} className="img-fluid imgGame" />
              </div>
              <div className="grid gap-12">
                <div>
                  <p className="desc mb-2 text-center  text-white">
                    Share your recorded wishes on <strong>Instagram or Facebook</strong>{" "}
                    and <strong>stand a chance to win a tablet!</strong>
                  </p>
                  <BtnPrimary style="w-full"
                    onClick={shareClickLink}
                    data="SHARE YOUR WISHES"
                  />
                </div>
                <div>
                  <p className="desc mb-2 text-center text-white">
                    Your birthday coming up? Throw a birthday bash for your
                    gang!
                  </p>
                  <BtnPrimary
                    onClick={() => {
                      if (flgHasOwnBash) {
                        navigate("/bash-o-meter");
                      } else {
                        navigate("/dob");
                      }
                    }}
                    data={
                      !flgHasOwnBash
                        ? "THROW YOUR OWN BIRTHDAY BASH"
                        : "BASHBOARD"
                    }
                  />
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
      <Balloon style="balloonDot top-[33%] right-[40%]" image={BImgDot} />
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
