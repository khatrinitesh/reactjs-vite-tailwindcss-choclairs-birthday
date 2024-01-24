import React from "react";

const GivePermissionForCamera = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="w-[80%] aspect-[1/0.5] max-h-[450px] max-w-[400px] z-[9999] bg-[#3c2282] rounded-[24px] flex flex-col items-center justify-center px-4">
        <p className="text-[18px] text-white text-center">
          You have denied the camera permission. Give permissions to continue
          your journey
        </p>
      </div>
    </div>
  );
};

export default GivePermissionForCamera;
