import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { getDeviceDetails } from "./functions/getDeviceDetails";
import { useImmer } from "use-immer";
import platform from "platform";
import axios from "axios";
import Cookies from "js-cookie";

import { clickToast } from "./features/toastMessageState";
import { clickLoadingAnimState } from "./features/loadingAnimState";

// BELOW CODE BOOTSTRAP LIBRAY CSS AND JS
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

// BELOW COMPONENTS
import Header from "./components/header";
import ToastMessage from "./components/ToastMessage";
import Otp from "./components/Otp";
import LoadingAnimation from "./components/LoadingAnimation";
import Loading from "./components/Loading";

// BELOW PAGES => REACT LAZY
const Register = React.lazy(() => import("./pages/Register"));
const ShareAvatar = React.lazy(() => import("./pages/shareAvatar"));
const CreateAvatar = React.lazy(() => import("./pages/CreateAvatar"));
const Capture = React.lazy(() => import("./pages/Capture"));
const FriendList = React.lazy(() => import("./pages/FriendList"));
const MobileNumber = React.lazy(() => import("./pages/MobileNumber"));
const WelcomeBack = React.lazy(() => import("./pages/WelcomeBack"));
const BirthDate = React.lazy(() => import("./pages/BirthDate"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const ShareWishes = React.lazy(() => import("./pages/shareWishes"));
const Interact = React.lazy(() => import("./pages/Interact"));

import { clickUserDetailsState } from "./features/userDetails";
import BestPortraitView from "./components/BestPortraitView";
import Login from "./pages/Login";
import Oops from "./pages/Oops";
import NotYourBirthdayModal from "./components/NotYourBirthdayModal";
import HowToPlay from "./components/HowToPlay";

function App() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const location = useLocation();
  const navigate = useNavigate();

  const urlSearchParams = new URLSearchParams(location.search);
  const refcode = urlSearchParams.get("refcode");
  const uid = Cookies.get("uid");

  const [isPortrait, setIsPortrait] = useState(window.orientation === 90);

  const utm_campaign = params.get("utm_campaign");
  const utm_content = params.get("utm_content");
  const utm_medium = params.get("utm_medium");
  const utm_source = params.get("utm_source");
  const utm_term = params.get("utm_term");

  //LOCAL STATES
  const device = getDeviceDetails();
  const os = platform.os.family;
  const browser = platform.name;

  //USER STATES
  const [person, updatePerson] = useImmer({
    name: "",
    email: "",
    mobile: "",
    dob: "",
    refcode: refcode !== null ? refcode : "",
    terms: false,
    promo: false,
    otp: "",
    token: "",
    device: getDeviceDetails(),
    os: platform.os.family,
    browser: platform.name,
    cid: "",
    hutk: "",
    utm_campaign: utm_campaign !== null ? utm_campaign : "",
    utm_content: utm_content !== null ? utm_content : "",
    utm_medium: utm_medium !== null ? utm_medium : "",
    utm_source: utm_source !== null ? utm_source : "",
    utm_term: utm_term !== null ? utm_term : "",
  });

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  //////////////////////// REDUX STATES //////////////////////////

  const toastMessageState = useSelector((state) => state.toastMessageState);
  const otpModalState = useSelector((state) => state.otpModalState);
  const loadingAnimState = useSelector((state) => state.loadingAnimState);
  const howToPlayState = useSelector((state) => state.howToPlayState);
  const notYourBirthdayModalState = useSelector(
    (state) => state.notYourBirthdayModalState
  );

  ////////////////////////  USE EFFECT //////////////////////////

  useEffect(() => {
    if (toastMessageState.value) {
      setTimeout(() => {
        dispatch(
          clickToast({
            value: false,
          })
        );
      }, 5000);
    }
  }, [toastMessageState]);

  useEffect(() => {
    const addHitLog = async () => {
      await axios
        .post(`${serverUrl}/add-hit-log`, { apikey, device, os, browser })
        .then((res) => { })
        .catch((error) => { });
    };
    addHitLog();
  }, []);

  /////////////////////// IMMER FUNCTIONS //////////////////////

  const updateCid = (cid) => {
    updatePerson((draft) => {
      draft.cid = cid;
    });
  };

  const updateHutk = (hutk) => {
    updatePerson((draft) => {
      draft.hutk = hutk;
    });
  };

  /////////////////////// HUTK AND CID FUNCTIONS //////////////////////

  const getGoogleCID = () => {
    return getData("_ga").split(".")[2] + "." + getData("_ga").split(".")[3];
  };

  const getData = (cname) => {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  useEffect(() => {
    const hutkVar = getData("hubspotutk");
    const Cid = getGoogleCID();
    updateHutk(hutkVar);
    updateCid(Cid);

    const shareRefCode = Cookies.get("shareRefCode");
    if (uid !== null && shareRefCode !== null) {
      dispatch(
        clickUserDetailsState({
          uid,
          shareRefCode,
        })
      );
    } else return;
  }, []);

  useEffect(() => {
    const { utm_campaign, utm_content, utm_medium, utm_source, utm_term } =
      person;

    if (location.pathname === "/") {
      if (uid === undefined) {
        if (refcode === null) {
          if (
            utm_campaign === "" &&
            utm_content === "" &&
            utm_medium === "" &&
            utm_source === "" &&
            utm_term === ""
          ) {
            navigate("/");
          } else {
          }
        } else {
          navigate(`/?refcode=${refcode}`);
        }
      } else if (uid !== undefined) {
        navigate("/welcome");
      }
    } else if (location.pathname === "/login") {
      if (uid === undefined) {
        if (refcode === null) {
          if (
            utm_campaign === "" &&
            utm_content === "" &&
            utm_medium === "" &&
            utm_source === "" &&
            utm_term === ""
          ) {
          } else {
          }
        } else {
          navigate(`/login?refcode=${refcode}`);
        }
      } else if (uid !== undefined) {
        navigate("/welcome");
      }
    } else {
      if (uid === undefined) {
        if (refcode === null) {
          if (
            utm_campaign === "" &&
            utm_content === "" &&
            utm_medium === "" &&
            utm_source === "" &&
            utm_term === ""
          ) {
            navigate("/");
          } else {
          }
        } else {
          navigate(`/?refcode=${refcode}`);
        }
      } else if (uid !== undefined) {
        return;
      }
    }
  }, [uid, refcode, location.pathname]);

  useEffect(() => {
    if (location.pathname === "/create-avatar") {
      setTimeout(() => {
        dispatch(clickLoadingAnimState(false));
      }, 3000);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleOrientationChange = () => {
      setIsPortrait(window.orientation === 90);
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    // Clean up
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);

  useEffect(() => {
    fbq("trackCustom", "Birthday_Page_View");
  }, []);

  return (
    <>
      {!isPortrait && window.innerWidth <= 650 && (
        <>
          <Header
            visibleLeftBackButton={
              location.pathname === "/bash-o-meter" && true
            }
          />
          <Routes>
            <Route
              path="/"
              element={
                <React.Suspense fallback={<Loading />}>
                  <Register person={person} updatePerson={updatePerson} />
                </React.Suspense>
              }
            />
            <Route
              path="/login"
              element={
                <React.Suspense fallback={<Loading />}>
                  <Login person={person} updatePerson={updatePerson} />
                </React.Suspense>
              }
            />
            <Route
              path="/capture"
              element={
                <React.Suspense fallback={<Loading />}>
                  <Capture />
                </React.Suspense>
              }
            />
            <Route
              path="/create-avatar"
              element={
                <React.Suspense fallback={<Loading />}>
                  <CreateAvatar />
                </React.Suspense>
              }
            />
            <Route
              path="/share"
              element={
                <React.Suspense fallback={<Loading />}>
                  <ShareAvatar />
                </React.Suspense>
              }
            />
            <Route
              path="/dashboard"
              element={
                <React.Suspense fallback={<Loading />}>
                  <FriendList />
                </React.Suspense>
              }
            />
            <Route
              path="/mobile"
              element={
                <React.Suspense fallback={<Loading />}>
                  <MobileNumber />
                </React.Suspense>
              }
            />
            <Route
              path="/welcome"
              element={
                <React.Suspense fallback={<Loading />}>
                  <WelcomeBack />
                </React.Suspense>
              }
            />
            <Route
              path="/bash-o-meter"
              element={
                <React.Suspense fallback={<Loading />}>
                  <Dashboard />
                </React.Suspense>
              }
            />
            <Route
              path="/share-wishes"
              element={
                <React.Suspense fallback={<Loading />}>
                  <ShareWishes />
                </React.Suspense>
              }
            />
            {["/birthday-bash", "/join"].map((path, index) => (
              <Route
                key={index}
                path={path}
                element={
                  <React.Suspense fallback={<Loading />}>
                    <Interact />
                  </React.Suspense>
                }
              />
            ))}

            <Route
              path="/dob"
              element={
                <React.Suspense fallback={<Loading />}>
                  <BirthDate person={person} updatePerson={updatePerson} />
                </React.Suspense>
              }
            />
          </Routes>
        </>
      )}
      {!isPortrait && window.innerWidth >= 758 && (
        <div className="portrait:block">
          <Oops />
        </div>
      )}

      {isPortrait && <BestPortraitView />}
      {toastMessageState.value && (
        <ToastMessage text={toastMessageState.text} />
      )}

      {otpModalState && <Otp person={person} updatePerson={updatePerson} />}
      {notYourBirthdayModalState && <NotYourBirthdayModal />}

      {loadingAnimState && <LoadingAnimation />}

      {howToPlayState && <HowToPlay />}
    </>
  );
}

export default App;
