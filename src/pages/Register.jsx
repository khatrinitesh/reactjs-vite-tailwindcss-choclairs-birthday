import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { lstBlockWords } from "../abusive-words.js";
import { checkBirthdate } from "../functions/checkBirthdate.js";
import axios from "axios";
import DatePickerComp from "../components/DatePickerComp.jsx";
import ClickLoading from "../components/ClickLoading.jsx";
import AlreadyRegModal from "../components/AlreadyRegModal.jsx";

//REDUX DISPATCH FUNCTIONS
import { clickToast } from "../features/toastMessageState.js";
import { clickOtpModalState } from "../features/otpModalState.js";
import { clickNotYourBirthdayModalState } from "../features/notYourBirthdayModalState.js";

// BELOW COMPONENTS
import Footer from "../components/Footer.jsx";
import Balloon from "../components/Balloon.jsx";
import Cartoon from "../components/Cartoon.jsx";
import BtnPrimary from "../components/ButtonPrimary.jsx";
import InputField from "../components/InputField.jsx";

// BELOW IMAGE FILES
import BImgStripe from "../assets/img/icons/iconballoonstripe.svg";
import BImgPurple from "../assets/img/icons/iconballoonpurple.svg";
import BImgDot from "../assets/img/icons/iconballoondot.svg";
import BImgFooter from "../assets/img/bg-footer.png";
import Cartoon1 from "../assets/img/cartoon.png";
import BImgStar from "../assets/img/icons/iconstar.svg";
import BImgConfeti1 from "../assets/img/icons/iconconfetti1.svg";
import BImgConfeti2 from "../assets/img/icons/iconconfetti2.svg";
import BImgConfeti3 from "../assets/img/icons/iconconfetti3.svg";
import BImgConfeti4 from "../assets/img/icons/iconconfetti4.svg";
import BImgConfeti5 from "../assets/img/icons/iconconfetti5.svg";
import stamp_1 from "../assets/img/icons/stamp_1.png";
import stamp_2 from "../assets/img/icons/stamp_2.png";
import Cookies from "js-cookie";

export default function Register({ person, updatePerson }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const urlSearchParams = new URLSearchParams(location.search);
  const refcode = urlSearchParams.get("refcode");

  const [loading, setLoading] = useState(false);
  const [alreadyRegModalState, setAlreadyRegModalState] = useState(false);

  //API KEY
  const apikey = import.meta.env.VITE_API_KEY;
  const serverUrl = import.meta.env.VITE_SERVER_URL;

  let isBlocked = false;

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 15);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    const { name, email, mobile, dob, terms } = person;
    const birthDate = new Date(dob);

    if (name !== "") {
      const nameSplit = person.name.split(" ");
      nameSplit.map((name) => {
        if (lstBlockWords.includes(name)) {
          isBlocked = true;
        }
      });

      if (!isBlocked) {
        if (email !== "") {
          if (isValidEmail(email)) {
            if (mobile !== "") {
              if (mobile.length === 10) {
                if (terms !== false) {
                  if (refcode === null) {
                    if (dob !== "") {
                      if (checkBirthdate(birthDate)) {
                        setLoading(true);
                        handleSendOtp();
                      } else {
                        dispatch(clickNotYourBirthdayModalState(true));
                        return;
                      }
                    } else {
                      dispatch(
                        clickToast({
                          value: true,
                          text: "Please enter your date of birth",
                        })
                      );
                      return;
                    }
                  } else {
                    setLoading(true);
                    handleSendOtp();
                  }
                } else {
                  dispatch(
                    clickToast({
                      value: true,
                      text: "Please accept Terms and Conditions",
                    })
                  );
                  return;
                }
              } else {
                dispatch(
                  clickToast({
                    value: true,
                    text: "Please enter valid mobile number",
                  })
                );
                return;
              }
            } else {
              dispatch(
                clickToast({
                  value: true,
                  text: "Please enter your mobile number",
                })
              );
              return;
            }
          } else {
            dispatch(
              clickToast({
                value: true,
                text: "Please enter valid email id",
              })
            );
            return;
          }
        } else {
          dispatch(
            clickToast({
              value: true,
              text: "Please enter your email id",
            })
          );
          return;
        }
      } else {
        dispatch(
          clickToast({
            value: true,
            text: "Please enter appropriate name",
          })
        );
        return;
      }
    } else {
      dispatch(
        clickToast({
          value: true,
          text: "Please enter your name",
        })
      );
      return;
    }
  };

  const handleSendOtp = async () => {
    const { mobile } = person;
    await axios
      .post(`${serverUrl}/send-reg-otp`, { apikey, mobile: mobile })
      .then((res) => {
        if (!res.data.success) {
          if (
            res.data.message === "Mobile no. already registered. Kindly login."
          ) {
            setLoading(false);
            setAlreadyRegModalState(true);
          }
        } else {
          dispatch(clickOtpModalState(true));
          setLoading(false);
          updateToken(res.data.token);
        }
      })
      .catch((error) => {
        setLoading(false);
        dispatch(
          clickToast({
            value: true,
            text: "Something went wrong, please try again later",
          })
        );
        return;
      });
  };

  //update immer functions
  const updateName = (name) => {
    updatePerson((draft) => {
      draft.name = name;
    });
  };
  const updateEmail = (email) => {
    updatePerson((draft) => {
      draft.email = email;
    });
  };
  const updatePhoneNumber = (mobile) => {
    updatePerson((draft) => {
      draft.mobile = mobile;
    });
  };
  const updateBirthDate = (dob) => {
    updatePerson((draft) => {
      draft.dob = dob;
    });
  };
  const updateTerms = (terms) => {
    updatePerson((draft) => {
      draft.terms = terms;
    });
  };
  const updateConsent = (consent) => {
    updatePerson((draft) => {
      draft.promo = consent;
    });
  };
  const updateToken = (token) => {
    updatePerson((draft) => {
      draft.token = token;
    });
  };

  return (
    <>
      <div className="w-full">
        {/* START CARTOON */}
        <div className="h-full xs:mb-[80px] cass:mb-[40px] relative">
          <Cartoon image={Cartoon1} style="scale-[1]" />
          <img
            src={refcode === null ? stamp_1 : stamp_2}
            alt="stamp 1"
            className={`absolute top-[-10%] h-[110px] right-[60%] z-[9]`}
          />
        </div>
        <div className="flex flex-col justify-center items-center h-[calc(100vh-150px-162px)] w-full ">
          <div className="px-8 h-full mx-w-[400px] z-[9]">
            <InputField
              type="text"
              onChange={(e) => updateName(e.target.value)}
              onKeyDown={(e) => {
                if (
                  (e.key.length === 1 && !e.key.match(/[a-zA-Z" "]/)) ||
                  (e.key === "Backspace" && e.target.selectionStart === 0)
                ) {
                  e.preventDefault();
                }
              }}
              maxLength={25}
              placeholder="Name"
            />
            <InputField
              onChange={(e) => updateEmail(e.target.value)}
              type="email"
              maxLength={50}
              placeholder="Email"
            />
            <InputField
              onChange={(e) => updatePhoneNumber(e.target.value)}
              onKeyDown={(e) => {
                if (
                  (e.key.length === 1 && !e.key.match(/[0-9]/)) ||
                  (e.key === "Backspace" && e.target.selectionStart === 0)
                ) {
                  e.preventDefault();
                }
              }}
              type="tel"
              maxLength={10}
              minLength={25}
              placeholder="Mobile number"
            />
            {refcode === null && (
              <>
                <div className="fieldGroup">
                  <DatePickerComp
                    max={maxDateString}
                    onChange={(e) => {
                      updateBirthDate(e.$d);
                    }}
                    value={person.dob}
                    className="fieldControl form-control p-[10px] h-[45px] border-[1px] border-solid !border-lightpurplecolor !text-[1.5167930660888407vh] text-white text-fieldControl !rounded-[10px] bg-transparent"
                  />
                </div>
              </>
            )}
            <div className="list_checkbox flex flex-col gap-[10px] mb-[20px] px-[10px]">
              <div className="col-12">
                <label className="field_chk relative cursor-pointer flex items-center">
                  <input
                    required
                    type="checkbox"
                    className="field_input_chk hidden"
                    onChange={(e) => updateTerms(e.target.checked)}
                  />
                  <span className="dot_chk w-[25px] h-[25px] rounded-[50%] border-1 border-solid border-lightpurplecolor flex items-center justify-center me-[10px] float-left" />
                  <span className="txt_chk float-right w-[calc(100%-30px)] text-[1.0834236186348862vh] text-white font-normal">
                    I accept{" "}
                    <a
                      target="_blank"
                      href="https://choclairs.com/terms.html"
                      className="linkurl text-decoration-underline text-white font-medium"
                    >
                      T&amp;Cs
                    </a>{" "}
                    and{" "}
                    <a
                      target="_blank"
                      href="https://privacy.mondelezinternational.com/in/en-IN/privacy-policy/"
                      className="linkurl text-decoration-underline text-white font-medium"
                    >
                      Privacy Policy
                    </a>{" "}
                    of Mondelez (Cadbury).
                  </span>
                </label>
                <span className="labelError checkbox" />
              </div>
              <div className="col-12">
                <label className="field_chk relative cursor-pointer flex items-center !rounded-full">
                  <input
                    type="checkbox"
                    className="field_input_chk hidden "
                    onChange={(e) => updateConsent(e.target.checked)}
                  />
                  <span className="dot_chk w-[25px] h-[25px] rounded-[50%] border-1 border-solid border-lightpurplecolor flex items-center justify-center me-[10px] float-left" />
                  <span className="txt_chk float-right w-[calc(100%-30px)] text-[1.0834236186348862vh] text-white font-normal">
                    I consent to receiving communication from Mondelez (Cadbury)
                    about its products and offers.
                  </span>
                </label>
              </div>
            </div>
            <div>
              {!loading ? (
                <BtnPrimary onClick={handleSubmit} data="Get OTP" />
              ) : (
                <div className="h-[60px]">
                  <ClickLoading />
                </div>
              )}{" "}
              {refcode !== undefined && (
                <Link
                  className="z-[9999]"
                  to={refcode !== null ? `/login?refcode=${refcode}` : "/login"}
                >
                  <p className="linkurl text-decoration-underline text-[12px] text-white font-light text-center">
                    Already Registered?
                  </p>
                </Link>
              )}
            </div>
          </div>

          {/* END FILL FORM SCROLLBAR */}

          {/* START FOOTER */}
          <div className="text-center w-full">
            <Footer image={BImgFooter} />
          </div>
        </div>
        {/* END FOOTER */}
      </div>

      <>
        {alreadyRegModalState && (
          <AlreadyRegModal
            alreadyRegModalState={alreadyRegModalState}
            setAlreadyRegModalState={setAlreadyRegModalState}
          />
        )}
      </>

      <Balloon
        style="balloonStripe top-[13%] left-[-20px]"
        image={BImgStripe}
      />
      <Balloon style="balloonPurple top-[20%] left-[20%]" image={BImgPurple} />
      <Balloon style="balloonPurple top-[10%] right-[15%]" image={BImgPurple} />
      <Balloon style="balloonDot top-[15%] right-[20%]" image={BImgDot} />
      <Balloon style="starBotRig top-[45%] left-[5%]" image={BImgStar} />
      <Balloon style="starBotRig top-[20%] right-[3%]" image={BImgStar} />
      <Balloon style="starBotRig top-[50%] right-[3%]" image={BImgStar} />
      <Balloon style="confeti top-[20%] right-[15%]" image={BImgConfeti1} />
      <Balloon style="confeti top-[5%] left-[5%]" image={BImgConfeti2} />
      <Balloon style="confeti top-[10%] left-[5%]" image={BImgConfeti3} />
      <Balloon style="confeti top-[10%] right-[10%]" image={BImgConfeti4} />
      <Balloon style="festoon top-[20%] left-[3%]" image={BImgConfeti5} />
    </>
  );
}
