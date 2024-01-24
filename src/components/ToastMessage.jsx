import React from "react";

const ToastMessage = ({ text }) => {
  return (
    <div className="toast_container_for_welcome_message z-[999999999] ">
      <div className="toast_message">
        <p className="text-black text-center text-[12px]">{text}</p>
      </div>
    </div>
  );
};

export default ToastMessage;
