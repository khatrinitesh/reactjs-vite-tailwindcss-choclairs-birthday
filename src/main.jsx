import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

//BELOW CODE FOR REDUX

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

// Redux slices
import userDetailsStateSlice from "./features/userDetails";
import toastMessageSlice from "./features/toastMessageState";
import otpModalStateSlice from "./features/otpModalState";
import loadingAnimStateSlice from "./features/loadingAnimState";
import notYourBirthdayModalStateSlice from "./features/notYourBirthdayModalState";
import howToPlayStateSlice from "./features/howToPlay";

const store = configureStore({
  reducer: {
    userDetailsState: userDetailsStateSlice,
    toastMessageState: toastMessageSlice,
    otpModalState: otpModalStateSlice,
    loadingAnimState: loadingAnimStateSlice,
    notYourBirthdayModalState: notYourBirthdayModalStateSlice,
    howToPlayState: howToPlayStateSlice,
  },
});

function setScriptSrc(scriptId, src) {
  const script = document.getElementById(scriptId);
  if (script) {
    script.src = src;
  } else {
  }
}

setScriptSrc("hs-script-loader", import.meta.env.VITE_SCRIPT_SRC);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
