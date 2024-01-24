import React from "react";

import icon1 from "../assets/img/icons/bash/icon1.svg";
import icon2 from "../assets/img/icons/bash/icon2.svg";
import icon3 from "../assets/img/icons/bash/icon3.svg";
import icon4 from "../assets/img/icons/bash/icon4.svg";
import icon5 from "../assets/img/icons/bash/icon6.svg";

const DashboardItem = ({ action }) => {
  const actionNames = [
    { title: "Cheek Pull", icon: icon1 },
    { title: "Cake Smash", icon: icon5 },
    { title: "Party Popper", icon: icon3 },
    { title: "Birthday Bumps", icon: icon4 },
    { title: "Party Horn", icon: icon2 },
  ];

  // Function to find an action in lstActions by title
  const findActionByTitle = (title) => {
    return action.lstActions.find((act) => act.title === title);
  };

  return (
    <div className="col-12">
      <div className="boxDashB">
        <h3 className="headName text-white mb-2">{action.name}</h3>
        <div className="grid grid-cols-3 border border-lightpurplecolor p-2 rounded-[8px] justify-center items-center">
          {actionNames.map((act, idx) => {
            const foundAction = findActionByTitle(act.title);
            return (
              <div
                key={idx}
                className={`w-full flex flex-col justify-center items-start gap-[4px] p-2 h-[70px] ${
                  idx < 3 ? "border-b" : ""
                }  ${idx !== 2 && idx !== 5 ? "border-r" : ""}`}
              >
                <p className="text-[10px] text-whitecolor">{act.title}</p>
                <div className="grid grid-cols-2 items-center justify-center w-full gap-[4px]">
                  <img
                    src={act.icon}
                    alt={act.title}
                    className="h-[35px] object-contain"
                  />
                  <p className="text-[16px] text-whitecolor">
                    {foundAction ? foundAction.points : 0}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DashboardItem;
