import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Webcam from "react-webcam";

// BELOW COMPONENTS
import HeadTitle from "./HeadTitle";
// BELOW IMAGE FILES
import Face1 from "../assets/img/face1.png";
import Face2 from "../assets/img/face2.png";
import Face3 from "../assets/img/face3.png";
import iconCapture from "../assets/img/icons/iconcapture.svg";
import cameraflip from "../assets/img/icons/cameraflip.svg";
import axios from "axios";

//rdux functions
import { clickToast } from "../features/toastMessageState.js";
import Cookies from "js-cookie";

const Camera = ({
  faceUrl,
  currentIndex,
  setFaceUrlLocal,
  setAreYouSatisfiedModal,
}) => {
  const webcamRef = useRef(null);
  const dispatch = useDispatch();
  const [facingMode, setFacingMode] = useState("user");
  const [mirrored, setMirrored] = useState(true);

  const userDetails = useSelector((state) => state.userDetailsState);

  const { uid } = userDetails;

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  //upload to database and get image data
  const uploadImage = async (faceNo, faceBase64) => {
    await axios
      .post(`${serverUrl}/add-face`, {
        apikey,
        uid,
        faceNo,
        faceBase64,
      })
      .then((res) => {
        if (res.data.message === "SUCCESS") {
          setFaceUrlLocal(res.data.faceBase64);
          if (currentIndex === 1) {
            Cookies.set("faceUrl", res.data.facePhoto);
          }
        } else {
          setAreYouSatisfiedModal(false);
          dispatch(
            clickToast({
              value: true,
              text: "Something went wrong, please try again later",
            })
          );
          return;
        }
      })
      .catch((err) => {
        setAreYouSatisfiedModal(false);
        dispatch(
          clickToast({
            value: true,
            text: "Something went wrong, please try again later",
          })
        );
        return;
      });
  };

  //create base64 image data
  const create = () => {
    setFaceUrlLocal("");
    setAreYouSatisfiedModal(true);
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {
      const base64WithoutPrefix = imageSrc.split(",")[1];
      uploadImage(currentIndex, base64WithoutPrefix);
    }
  };

  const switchCamera = () => {
    setMirrored(!mirrored);
    setFacingMode((prevFacingMode) =>
      prevFacingMode === "user" ? "environment" : "user"
    );
  };

  return (
    <>
      <div className="webCameraBlock relative overflow-hidden h-full">
        <Webcam
          screenshotQuality={1}
          audio={false}
          ref={webcamRef}
          mirrored={mirrored}
          videoConstraints={{
            facingMode: facingMode,
          }}
        />
        <div className="w-full h-full absolute top-0 left-0">
          <img
            src={currentIndex === 1 ? Face1 : currentIndex === 2 ? Face3 : ""}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="toolbarOption mb-2 w-100 absolute bottom-4 text-center">
          <HeadTitle
            style="headTitle mb-2"
            headTitle={
              currentIndex === 1
                ? "Upload Happy Face"
                : currentIndex === 2
                ? "Upload Wowy Face"
                : ""
            }
          />
          <div className="innerToolbar w-full relative d-flex align-items-center justify-content-center pb-2">
            <div className="h-full w-full relative d-flex align-items-center justify-content-center">
              <button className="btnCapture w-[23%]" onClick={create}>
                <img
                  src={iconCapture}
                  alt=""
                  className="img-fluid imgCapture"
                />
              </button>
              <button
                onClick={switchCamera}
                className="btnRedo max-w-[15%] absolute right-[17%] w-full"
              >
                <img
                  src={cameraflip}
                  alt=""
                  className="img-fluid aspect-square imgRedo"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Camera;
