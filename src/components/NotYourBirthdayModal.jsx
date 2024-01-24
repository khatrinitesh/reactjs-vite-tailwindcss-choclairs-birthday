import React from "react";
import ButtonPrimary from "./ButtonPrimary";
import { clickNotYourBirthdayModalState } from "../features/notYourBirthdayModalState.js";
import { IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";

const NotYourBirthdayModal = () => {
  const dispatch = useDispatch();

  const notYourBirthdayModalState = useSelector(
    (state) => state.notYourBirthdayModalState
  );

  const shareClickLink = async () => {
    try {
      const currentURL = window.location.origin;

      await navigator.share({
        title: "#ChoclairsBirthdayBash",
        text: "Cadbury Choclairs - My Birthday Bash",
        url: currentURL,
      });
    } catch (error) {}
  };

  const modalClass = notYourBirthdayModalState
    ? "animatedModal"
    : "modalHidden";

  return (
    <div
      className={`bg-[#00000090]  fixed top-0 left-0 w-full h-full z-[9999999999999] flex items-center justify-center duration-300`}
    >
      <div
        className={`${modalClass} w-[80%] aspect-[1/0.5] max-h-[450px] max-w-[400px] bg-[#311878] rounded-[24px] flex flex-col items-center justify-center px-4 relative`}
      >
        <span className="txtDesc text-white text-[14px] block mt-[15px] mb-[20px] text-center">
          Your birthday is not within 3 months from now. No worries! Just send
          the link to a friend whose birthday is coming.
        </span>
        <ButtonPrimary onClick={shareClickLink} data="SHARE" />
        <button
          className="absolute top-[-8px] right-[-8px] bg-[#d12b7e] rounded-full h-[32px] w-[32px] flex justify-center items-center"
          onClick={() => {
            dispatch(clickNotYourBirthdayModalState(false));
          }}
        >
          <IconX color="white" />
        </button>
      </div>
    </div>
  );
};

export default NotYourBirthdayModal;
