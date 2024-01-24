import React, { useState, useRef, useEffect } from "react";

const OtpInput = ({ otpEntered, setOtpEntered }) => {
  const inputRefs = useRef([]);

  const handleInputChange = (index, value) => {
    // Allow backspace (empty value) or a single digit number
    if (value === "" || value.match(/^[0-9]$/)) {
      const newOtp = [...otpEntered];
      newOtp[index] = value;
      setOtpEntered(newOtp);

      // Move focus to the next input field if value is a number
      if (value.match(/^[0-9]$/) && index < otpEntered.length - 1) {
        inputRefs.current[index + 1].focus();
      }

      // Move focus to the previous input field if value is empty (backspace)
      if (value === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move focus to the previous input field on backspace
    if (e.key === "Backspace" && index > 0 && otpEntered[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <ul className="listOtp w-full flex items-center justify-center mb-[20px] p-[0] max-w-[350px] gap-2">
      {otpEntered.map((digit, index) => (
        <li key={index}>
          <input
            className="text-center aspect-square outline-none w-[60px] h-[60px] border-[1px] border-solid !border-lightpurplecolor !text-[20px] text-white text-fieldControl !rounded-[15px] bg-transparent"
            type="tel"
            maxLength={1}
            value={digit}
            onChange={(e) => handleInputChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            ref={(ref) => (inputRefs.current[index] = ref)}
          />
        </li>
      ))}
    </ul>
  );
};

export default OtpInput;
