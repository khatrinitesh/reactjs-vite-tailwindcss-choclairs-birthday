import React, { useState, useEffect } from "react";
import { useImmer } from "use-immer";

// BELOW COMPONENTS
import Camera from "../components/Camera";
import HorizontalTimeline from "../components/HorizontalTimeline";
import AreYouSatified from "../components/AreYouSatified";

import Balloon from "../components/Balloon.jsx";

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
import { clickLoadingAnimState } from "../features/loadingAnimState.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GivePermissionForCamera from "../components/GivePermissionForCamera.jsx";
import Cookies from "js-cookie";
import axios from "axios";

const Capture = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [faceUrlLocal, setFaceUrlLocal] = useState("");
  const [userSatisfied, setUserSatisfied] = useState(false);
  const [areYouSatisfiedModal, setAreYouSatisfiedModal] = useState(false);
  const [cameraClicked, setCameraClicked] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [reCapture, setReCapture] = useState(false);

  const userDetails = useSelector((state) => state.userDetailsState);

  const [faceUrl, updateFaceUrl] = useImmer({
    face1Url: "",
    face2Url: "",
  });

  const checkCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setCameraPermission(true);
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "Camera_Open_Consent",
        value: "Allow",
      });

      stream.getTracks().forEach((track) => track.stop());
    } catch (error) {
      setCameraPermission(false);
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "Camera_Open_Consent",
        value: "Deny",
      });
    }
  };

  const submit = () => {
    dispatch(clickLoadingAnimState(true));
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: "Face_Expression_Upload Completed",
    });

    if (reCapture) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "Face_Expression_Upload Completed",
        value: "/capture",
      });
    }

    navigate("/create-avatar");
  };

  const handleUserSatisfied = () => {
    setUserSatisfied(false);
    setAreYouSatisfiedModal(false);
    setCameraClicked(false);

    if (currentIndex === 1) {
      updateFace1Url(faceUrlLocal);
    } else if (currentIndex === 2) {
      updateFace2Url(faceUrlLocal);
      submit();
    }
    setCurrentIndex(currentIndex + 1);
  };

  const handleNotUserSatisfied = () => {
    setUserSatisfied(false);
    setAreYouSatisfiedModal(false);
    setCameraClicked(false);
    if (currentIndex === 1) {
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "Face_Expression_Re-upload",
        Expression: "Happy Face",
      });
    } else if (currentIndex === 2) {
      setReCapture(true);
      window.dataLayer = window.dataLayer || [];
      dataLayer.push({
        event: "Face_Expression_Re-upload",
        Expression: "Wowy Face",
      });
    }
  };

  ///immer functions
  const updateFace1Url = (url) => {
    updateFaceUrl((draft) => {
      draft.face1Url = url;
    });
  };
  const updateFace2Url = (url) => {
    updateFaceUrl((draft) => {
      draft.face2Url = url;
    });
  };

  useEffect(() => {
    checkCameraPermission();
  }, []);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    dataLayer.push({
      event: "Camera_Open",
    });
  }, []);

  return (
    <>
      <div className="mainContent relative flex items-center justify-center flex-col">
        <div className="cameraBlock absolute bottom-[0] left-[0] d-flex align-items-center justify-content-center flex-column w-full h-full">
          <HorizontalTimeline currentIndex={currentIndex} />
          <div className="h-full">
            {(cameraPermission || cameraPermission === null) && (
              <Camera
                faceUrl={faceUrl}
                currentIndex={currentIndex}
                faceUrlLocal={faceUrlLocal}
                setFaceUrlLocal={setFaceUrlLocal}
                userSatisfied={userSatisfied}
                setUserSatisfied={setUserSatisfied}
                areYouSatisfiedModal={areYouSatisfiedModal}
                setAreYouSatisfiedModal={setAreYouSatisfiedModal}
                cameraClicked={cameraClicked}
                setCameraClicked={setCameraClicked}
              />
            )}
            {!cameraPermission && cameraPermission !== null && (
              <>
                <GivePermissionForCamera />
              </>
            )}
          </div>
        </div>
      </div>

      {areYouSatisfiedModal && (
        <AreYouSatified
          image={faceUrlLocal}
          handleUserSatisfied={handleUserSatisfied}
          handleNotUserSatisfied={handleNotUserSatisfied}
          setAreYouSatisfiedModal={setAreYouSatisfiedModal}
          areYouSatisfiedModal={areYouSatisfiedModal}
        />
      )}

      {/* Balloons */}

      <Balloon
        style="balloonStripe top-[2%] left-[8%] w-[10px !important]"
        image={BImgStripe}
      />
      <Balloon style="balloonPurple top-[10%] left-[10%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[5%] right-[5%]" image={BImgPurple} />
      <Balloon style="balloonDot top-[5%] right-[10%]" image={BImgDot} />
      <Balloon style="starBotRig top-[5%] left-[15%]" image={BImgStar} />
      <Balloon style="starBotRig top-[2%] right-[15%]" image={BImgStar} />
      <Balloon style="confeti top-[5%] right-[25%]" image={BImgConfeti1} />
      <Balloon style="confeti top-[5%] left-[5%]" image={BImgConfeti2} />
      <Balloon style="confeti top-[10%] left-[5%]" image={BImgConfeti3} />
      <Balloon style="confeti top-[10%] right-[10%]" image={BImgConfeti4} />
      <Balloon style="festoon top-[15%] left-[5%]" image={BImgConfeti5} />
      <Balloon style="festoon top-[15%] right-[5%]" image={BImgConfeti6} />
    </>
  );
};

export default Capture;
