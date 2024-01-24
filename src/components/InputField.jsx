import React from "react";

const InputField = ({
  placeholder,
  onChange,
  type,
  maxLength,
  minLength,
  onKeyDown,
}) => {
  return (
    <div className="fieldGroup">
      <input
        type={type}
        className="fieldControl w-full form-control p-[10px] h-[45px] border-[1px] border-solid !border-lightpurplecolor !text-[1.5167930660888407vh] text-white text-fieldControl !rounded-[10px] bg-transparent"
        placeholder={placeholder}
        onChange={onChange}
        maxLength={maxLength}
        minLength={minLength}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default InputField;
