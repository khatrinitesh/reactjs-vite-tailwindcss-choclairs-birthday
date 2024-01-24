import React, { useEffect, useRef, useState } from "react";
import ClickLoading from "./ClickLoading";
import Lottie from "lottie-react";

//lottie animations
import cheekPullAnimation from "../assets/lottie/cheekPull.json";
import cakeSmashAnimation from "../assets/lottie/cakeSmash.json";
import surprisedAnimation from "../../src/assets/lottie/surprisedAnim_.json";
import hornAnimation from "../../src/assets/lottie/hornAnim.json";
import birthdayBumps from "../../src/assets/lottie/birthdayBumps.json";

import birthday_bumps from "../assets/sfx/birthday_bumps.mp3";
import cheek_pull from "../assets/sfx/cheek_pull.mp3";
import party_popper from "../assets/sfx/party_popper.mp3";
import party_horn from "../assets/sfx/party_horn.mp3";
import cake_smash from "../assets/sfx/cake_smash.wav";

const HumanBodyForAnimation = ({
  hat,
  body,
  hatStyle,
  bodyStyle,
  heightOfBody,
  lottieAnimation,
  userData,
  updateLottieAnimation,
  capturing,
}) => {
  const { faceImage, faceAnimation, animationName } = lottieAnimation;
  const lottieRef = useRef(null);
  const lottieBBRef1 = useRef(null);
  const lottieBBRef2 = useRef(null);
  const [sfxAudio, setSfxAudio] = useState(null);

  const { facePhoto1Base64, face1EndY } = userData;
  const animatedDiv = useRef(null);

  const removeLottieAnimation = () => {
    updateLottieAnimation((draft) => {
      draft.animation = null;
      draft.animationName = "";
    });
  };

  const removeFaceAnimation = () => {
    updateLottieAnimation((draft) => {
      draft.faceAnimation = "";
      draft.bodyAnimation = "";
      draft.animationDelay = 0;
    });
  };

  const removeFaceExp = () => {
    updateLottieAnimation((draft) => {
      draft.faceImage = facePhoto1Base64;
    });
  };

  useEffect(() => {
    if (animatedDiv.current) {
      const cubicBezierTiming = "cubic-bezier(1, 0, 0, 1)";
      let timeouts = []; // To hold all timeout IDs

      if (animationName === "Birthday Bumps") {
        animatedDiv.current.style.transition = `transform 200ms ${cubicBezierTiming}`;

        // Schedule the transformations
        const transformations = [
          { delay: 0, transform: "translateY(-80px)" },
          { delay: 250, transform: "rotate(-90deg)" },
          { delay: 500, transform: "rotate(-90deg) translateX(35px)" },
          { delay: 900, transform: "rotate(-90deg) translateX(-35px)" },
          { delay: 1300, transform: "rotate(-90deg) translateX(35px)" },
          { delay: 1700, transform: "rotate(-90deg) translateX(0px)" },
          { delay: 2200, transform: "rotate(0deg) translateX(0px)" },
        ];

        transformations.forEach(({ delay, transform }) => {
          const timeoutId = setTimeout(() => {
            animatedDiv.current.style.transform = transform;
          }, delay);
          timeouts.push(timeoutId);
        });

        // Clear the style after the entire animation
        const clearStyleTimeoutId = setTimeout(() => {
          animatedDiv.current.style = "";
        }, 2500);
        timeouts.push(clearStyleTimeoutId);
      } else {
        // Immediately clear the style if the animation name is not "Birthday Bumps"
        animatedDiv.current.style = "";
      }

      // Cleanup function to clear timeouts if the component unmounts or the effect reruns
      return () => {
        timeouts.forEach(clearTimeout);
        if (animatedDiv.current) {
          animatedDiv.current.style = ""; // Clear the style
        }
      };
    }
  }, [animationName, animatedDiv]);

  useEffect(() => {
    if (lottieRef.current) {
      const lottie = lottieRef.current;
      if (animationName !== "" && animationName !== undefined) {
        if (animationName === "Cheek Pull") {
          setSfxAudio(cheek_pull);
          lottie.setSpeed(2.5);
        } else if (animationName === "Cake Smash") {
          setTimeout(() => {
            setSfxAudio(cake_smash);
          }, 200);
          lottie.setSpeed(2);
        } else if (animationName === "Party Popper") {
          setTimeout(() => {
            setSfxAudio(party_popper);
          }, 500);
          lottie.setSpeed(2);
        }
      }
    }
  }, [lottieRef.current, animationName]);

  useEffect(() => {
    if (lottieBBRef1.current && lottieBBRef2.current) {
      const lottie1 = lottieBBRef1.current;
      const lottie2 = lottieBBRef2.current;
      if (animationName !== "" && animationName !== undefined) {
        if (animationName === "Birthday Bumps") {
          setSfxAudio(birthday_bumps);
          lottie1.setSpeed(2.5);
          lottie2.setSpeed(2.5);
        } else if (animationName === "Party Horn") {
          setTimeout(() => {
            setSfxAudio(party_horn);
          }, 500);
          lottie1.setSpeed(3);
          lottie2.setSpeed(3);
        }
      }
    }
  }, [lottieBBRef1.current, lottieBBRef2.current, animationName]);

  useEffect(() => {
    if (animationName === "") {
      setSfxAudio(null);
    }
  }, [animationName]);

  return (
    <>
      <div className={`${heightOfBody} relative w-full`}>
        <>
          {userData.length !== 0 ? (
            <>
              {animationName === "Party Horn" && (
                <>
                  <Lottie
                    lottieRef={lottieBBRef1}
                    animationData={hornAnimation}
                    loop={false}
                    onEnterFrame={(f) => {
                      if (f.currentTime > 100) {
                        removeFaceExp();
                        removeFaceAnimation();
                      }
                      if (f.currentTime > 120) {
                        removeLottieAnimation();
                        removeFaceExp();
                        removeFaceAnimation();
                      }
                    }}
                    style={{
                      position: "absolute",
                      top: window?.innerWidth > 375 ? "35%" : "30%",
                      width: "40%",
                      left: "-5%",
                      rotate: "10deg",
                      transform: "scaleX(-1)",
                    }}
                  />
                  <Lottie
                    lottieRef={lottieBBRef2}
                    animationData={hornAnimation}
                    loop={false}
                    onEnterFrame={(f) => {
                      if (f.currentTime > 100) {
                        removeFaceExp();
                        removeFaceAnimation();
                      }
                      if (f.currentTime > 120) {
                        removeLottieAnimation();
                        removeFaceExp();
                        removeFaceAnimation();
                      }
                    }}
                    style={{
                      position: "absolute",
                      top: window?.innerWidth > 375 ? "20%" : "35%",
                      width: "40%",
                      right: "-5%",
                      objectFit: "contain",
                    }}
                  />
                </>
              )}
              {animationName === "Birthday Bumps" && (
                <>
                  <Lottie
                    lottieRef={lottieBBRef1}
                    animationData={birthdayBumps}
                    loop={false}
                    onEnterFrame={(f) => {
                      if (f.currentTime > 160) {
                        removeFaceAnimation();
                        removeFaceExp();
                        removeLottieAnimation();
                      }
                    }}
                    style={{
                      position: "absolute",
                      left: window.innerWidth * (50 / 100),
                      objectFit: "contain",
                      width: "50%",
                      alignContent: "center",
                      justifyContent: "center",
                      display: "flex",
                      height: "100%",
                      top: 0,
                    }}
                  />
                  <Lottie
                    lottieRef={lottieBBRef2}
                    animationData={birthdayBumps}
                    loop={false}
                    onEnterFrame={(f) => {
                      if (f.currentTime > 160) {
                        removeFaceAnimation();
                        removeFaceExp();
                        removeLottieAnimation();
                      }
                    }}
                    style={{
                      position: "absolute",
                      right: window.innerWidth * (50 / 100),
                      objectFit: "contain",
                      width: "50%",
                      alignContent: "center",
                      justifyContent: "center",
                      display: "flex",
                      left: 0,
                      transform: "scaleX(-1)",
                      height: "100%",
                      top: 0,
                    }}
                  />
                </>
              )}
              {animationName === "Party Popper" && (
                <Lottie
                  onComplete={() => {
                    setSfxAudio("");
                  }}
                  lottieRef={lottieRef}
                  animationData={surprisedAnimation}
                  loop={false}
                  onEnterFrame={(f) => {
                    if (f.currentTime > 60) {
                      removeFaceExp();
                    }
                    if (f.currentTime > 60) {
                      removeLottieAnimation();
                      removeFaceExp();
                      removeFaceAnimation();
                    }
                  }}
                  style={{
                    position: "absolute",
                    width: "90%",
                    right: "-10%",
                    objectFit: "contain",
                    top: 0,
                    zIndex: 999,
                    height: "100%",
                  }}
                />
              )}
              <div
                ref={animatedDiv}
                className={`${heightOfBody} relative h-full avatarGrid items-center justify-center mx-auto`}
              >
                <img
                  src={hat}
                  className={`max-h-full min-h-full mx-auto flex items-center justify-center object-contain ${hatStyle} ${
                    faceAnimation === "headTilt" ? "opacity-0" : ""
                  } `}
                />
                <>
                  <img
                    src={faceImage}
                    className={`h-full object-contain mx-auto max-h-[200px] ${faceAnimation} mb-[-${face1EndY}px]  `}
                  />
                  {animationName === "Cheek Pull" && (
                    <Lottie
                      onComplete={() => {
                        setSfxAudio("");
                      }}
                      lottieRef={lottieRef}
                      autoPlay={true}
                      loop={false}
                      animationData={cheekPullAnimation}
                      onEnterFrame={(f) => {
                        if (f.currentTime > 80) {
                          removeFaceExp();
                          removeFaceAnimation();
                        }
                        if (f.currentTime > 95) {
                          removeLottieAnimation();
                        }
                      }}
                      style={{
                        position: "absolute",
                        right: window.innerWidth * (50 / 100),
                        objectFit: "contain",
                        width: "50%",
                        alignContent: "center",
                        justifyContent: "center",
                        left: 0,
                      }}
                    />
                  )}
                  {animationName === "Cake Smash" && (
                    <Lottie
                      onComplete={() => {
                        setSfxAudio("");
                      }}
                      lottieRef={lottieRef}
                      animationData={cakeSmashAnimation}
                      loop={false}
                      onEnterFrame={(f) => {
                        if (f.currentTime > 55) {
                          removeFaceExp();
                          removeFaceAnimation();
                        }
                        if (f.currentTime > 90) {
                          removeLottieAnimation();
                          removeFaceExp();
                          removeFaceAnimation();
                        }
                      }}
                      style={{
                        position: "absolute",
                        width: "50%",
                        right: window.innerWidth * (45 / 100),
                        marginTop: "15%",
                        zIndex: 99,
                      }}
                    />
                  )}
                </>

                <img
                  src={body}
                  className={`h-full mx-auto object-contain relative z-[-2] flex items-center justify-center ${bodyStyle}`}
                />
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full">
              <ClickLoading />
            </div>
          )}
        </>
      </div>
      {sfxAudio !== null && !capturing && (
        <audio src={sfxAudio} autoPlay className="hidden" loop={false}></audio>
      )}
    </>
  );
};

export default HumanBodyForAnimation;
