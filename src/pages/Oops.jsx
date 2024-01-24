import React from "react";

// BELOW COMPONENT FILE
import Balloon from "../components/Balloon.jsx";
import FooterLandscape from "../components/FooterLandscape.jsx";
// BELOW IMAGE FILES
import BgOOpsLandScape from "../assets/img/cartoon1.jpg";
import Logo from "../assets/img/logo.png";
import Barcode from "../assets/img/barcode.jpg";
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
import SidebarLandscape from "../components/sidebarLandscape.jsx";

const Oops = () => {
  // Dynamic background position values
  const backgroundPositionX = "260px !important"; // Adjust as needed
  const backgroundPositionY = "50%"; // Adjust as needed

  return (
    <>
      <SidebarLandscape />
      <div className="balloonAnimation h-[100%] z-[999] absolute top-[10%] lg:right-[20%] md:right-[10%] md:max-w-[300px] lg:max-w-[400px] 2xl:max-w-[500px] w-[100%] ">
        <Balloon
          style="balloonStripe top-[0%] left-[-15%]"
          image={BImgStripe}
        />
        <Balloon
          style="balloonPurple top-[20%] left-[-20%]"
          image={BImgPurple}
        />
        <Balloon
          style="balloonPurple top-[0%] right-[15%]"
          image={BImgPurple}
        />
        <Balloon style="balloonDot top-[-5%] right-[-20%]" image={BImgDot} />
        <Balloon style="starBotRig top-[30%] left-[5%]" image={BImgStar} />
        <Balloon style="starBotRig top-[15%] right-[5%]" image={BImgStar} />
        <Balloon style="confeti top-[20%] right-[15%]" image={BImgConfeti1} />
        <Balloon style="confeti top-[5%] left-[5%]" image={BImgConfeti2} />
        <Balloon style="confeti top-[10%] left-[5%]" image={BImgConfeti3} />
        <Balloon style="confeti top-[10%] right-[10%]" image={BImgConfeti4} />
        <Balloon style="festoson top-[20%] left-[3%]" image={BImgConfeti5} />
        <Balloon style="festoon top-[30%] right-[-10%]" image={BImgConfeti6} />
        <Balloon style="festoon top-[5%] left-[-15%]" image={BImgConfeti7} />
      </div>
      <div
        style={{
          backgroundImage: `url(${BgOOpsLandScape})`,
        }}
        className="oopsBlock bg-primarycolor overflow-hidden bg-cover bg-no-repeat md:py-[50px]  relative xl:py-[50px] w-[100vw] h-[100vh]"
      >
        <div className="md:px-[50px] lg:px-[100px] 2xl:px-[150px] h-full flex w-full items-start">
          <div className="relative z-[99] md:max-w-[350px] lg:max-w-[450px] 2xl:max-w-[500px] flex flex-col 2xl:justify-start md:justify-center ">
            <div className=" logoBlock flex items-center md:mb-[50px] lg:mb-[100] md:justify-start lg:justify-start w-full">
              <img
                src={Logo}
                alt=""
                className="max-w-[100%] w-[300px] 2xl:mx-auto"
              />
            </div>
            <div className="sectionTitleScanBlock justify-end relative">
              <div className="relative oopsSectionTitle my-[20px] 2xl:mt-[100px] mb-[30px]">
                <h3 className="oopsHeadTitle text-white text-semibold lg:leading-[90px]  uppercase text-[7.6125vw] 2xl:text-[6.6125vw] font-bold tracking-[-5px]">
                  OOPS!
                </h3>
                <p className="w-full text-left desc text-[1.0375vw] 2xl:text-[1.0375vw] text-white">
                  The experience is only available for mobile phone.
                </p>
              </div>
              <div className="w-full scanBlock flex items-center">
                <div className="bareCodeBlock me-[4%] w-[30%]">
                  <img
                    src={Barcode}
                    alt=""
                    className="max-w-full w-full h-full block rounded-[12px] mx-auto aspect-square"
                  />
                </div>
                <div className="caption w-[calc(100%-30%)]">
                  <h3 className="txtHead text-white text-[0.9375vw]">
                    Scan the QR Code
                  </h3>
                  <p className="desc text-white text-[0.9375vw]">
                    or go to <br />
                    <a href="https://www.choclairs.com" target="_blank">
                      www.choclairs.com
                    </a>{" "}
                    to <br />
                    enjoy the Birthday bash
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterLandscape />
    </>
  );
};

export default Oops;
