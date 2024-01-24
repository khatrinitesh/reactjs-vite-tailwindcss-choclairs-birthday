import React, { useEffect, useState } from "react";
import { os } from "platform";
import { IconCopy, IconCheck, IconX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import screenshare_image from "../assets/img/screenshare_image.png";

import { clickToast } from "../features/toastMessageState.js";

const ScreenRecordingModal = ({ videoURL, setVideoURL, setCountDown }) => {
  const dispatch = useDispatch();
  const modalClass = videoURL !== null ? "animatedModal" : "modalHidden";
  const [copied, setCopied] = useState(false);
  const [convertedVideo, setConvertedVideo] = useState(null);

  //API KEY
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `Celebrating the OG way with #ChoclairsBirthdayBash`
      );
      setCopied(true);
    } catch (err) {}
  };

  useEffect(() => {
    if (copied === true) {
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [copied]);

  const handleConvert = async () => {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", `${serverUrl}/get-video`, true);
    xhr.setRequestHeader("Content-Type", "application/octet-stream");
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (xhr.status === 200) {
        setConvertedVideo(xhr.response);
      } else {
        dispatch(
          clickToast({
            value: true,
            text: "Something went wrong",
          })
        );
        setVideoURL(null);
        setConvertedVideo(null);
      }
    };
    xhr.send(videoURL);
  };

  const handleShare = async () => {
    if (os.family === "iOS") {
      var file = new File([convertedVideo], "birthday-bash.mp4", {
        type: "video/mp4",
      });
      var filesArray = [file];
      if (navigator.share) {
        navigator
          .share({
            files: filesArray,
          })
          .then(() => {})
          .catch((error) => {});
      } else {
        dispatch(
          clickToast({
            value: true,
            text: "Native sharing not supported on this browser",
          })
        );
      }
    } else if (os.family === "Android") {
      var file = new File([convertedVideo], "birthday-bash.mp4", {
        type: "video/mp4",
      });
      var filesArray = [file];
      if (navigator.share) {
        navigator
          .share({
            title: "#ChoclairsBirthdayBash",
            text: "Celebrating the OG way with #ChoclairsBirthdayBash",
            files: filesArray,
          })
          .then(() => {})
          .catch((error) => {});
      } else {
        dispatch(
          clickToast({
            value: true,
            text: "Native sharing not supported on this browser",
          })
        );
      }
    }
  };

  useEffect(() => {
    if (videoURL !== null) {
      handleConvert();
    }
  }, [videoURL]);

  return (
    <div className="bg-[#00000090] fixed top-0 left-0 w-full h-full z-[9999999999999] flex items-center justify-center">
      <div
        className={`w-[80%] gap-[1.5rem] bg-[#311878] rounded-[24px] flex flex-col items-center justify-center px-[12px] pt-4 ${modalClass}`}
      >
        {convertedVideo !== null ? (
          <video
            webkit-playsinline="true"
            playsInline
            src={URL.createObjectURL(convertedVideo)}
            autoPlay
            controls
            className="w-full max-h-[500px] rounded-[16px] shadow-2xl object-cover"
          ></video>
        ) : (
          <div className="w-full h-[200px] rounded-[16px] shadow-2xl object-cover justify-center items-center flex px-4">
            <p className="text-white text-center txtDescription">
              Your video is being generated, please wait...
            </p>
          </div>
        )}

        <div className="gap-[16px] flex flex-col justify-center items-center">
          <img src={screenshare_image} alt="" className="h-[44px]" />
          <p className="text-white desc text-center text-[13px] txtDescription">
            Share the video with the below message on Instagram or Facebook to
            win a tablet!
          </p>
          <div className="flex items-center justify-between gap-[12px]">
            <p className="text-white text-[12px] desc border txtDescription border-[#c6b6f7] p-2 rounded-[8px]">
              Celebrating the OG way with #ChoclairsBirthdayBash
            </p>
            <button disabled={copied} onClick={handleCopy}>
              {copied ? (
                <IconCheck color="#c6b6f7" />
              ) : (
                <IconCopy color="#c6b6f7" />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-[12px]">
          <button
            onClick={() => {
              window.dataLayer = window.dataLayer || [];
              dataLayer.push({
                event: "Redo_Button",
                value: "REDO",
              });
              setVideoURL(null);
              setConvertedVideo(null);
              setCountDown(10);
            }}
            className="btnPrimary flex border border-white items-center justify-center mx-auto !rounded-[30px] mb-3 text-white text-[2.1668472372697725vh] bg-secondarycolor h-[40px] text-center px-[50px] cursor-pointer w-full"
          >
            RETRY
          </button>
          <button
            disabled={convertedVideo === null}
            onClick={() => handleShare()}
            className="btnPrimary disabled:opacity-[50%] flex border border-white items-center justify-center mx-auto !rounded-[30px] mb-3 text-white text-[2.1668472372697725vh] bg-secondarycolor h-[40px] text-center px-[50px] cursor-pointer w-full"
          >
            <p>SHARE</p>
          </button>
        </div>
        <button
          className="absolute top-[-8px] right-[-8px] bg-[#d12b7e] rounded-full h-[32px] w-[32px] flex justify-center items-center"
          onClick={() => {
            setVideoURL(null);
            setConvertedVideo(null);
            setCountDown(10);
          }}
        >
          <IconX color="white" />
        </button>
      </div>
    </div>
  );
};

export default ScreenRecordingModal;
