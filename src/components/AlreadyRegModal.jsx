import React from "react";
import ButtonPrimary from "./ButtonPrimary";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

const AlreadyRegModal = ({ alreadyRegModalState, setAlreadyRegModalState }) => {
  const modalClass = alreadyRegModalState ? "animatedModal" : "modalHidden";
  const navigate = useNavigate();

  return (
    <div
      className={`bg-[#00000090]  fixed top-0 left-0 w-full h-full z-[9999999999999] flex items-center justify-center duration-300`}
    >
      <div
        className={`${modalClass} w-[80%] aspect-[1/0.5] max-h-[450px] max-w-[400px] bg-[#311878] rounded-[24px] flex flex-col items-center justify-center px-4 relative`}
      >
        <span className="txtDesc text-white text-[14px] block mt-[15px] mb-[20px] text-center">
          You have already Registered, try logging in
        </span>
        <ButtonPrimary onClick={() => navigate("/login")} data="LOGIN" />
        <button
          className="absolute top-[-8px] right-[-8px] bg-[#d12b7e] rounded-full h-[32px] w-[32px] flex justify-center items-center"
          onClick={() => {
            setAlreadyRegModalState(false);
          }}
        >
          <IconX color="white" />
        </button>
      </div>
    </div>
  );
};

export default AlreadyRegModal;
