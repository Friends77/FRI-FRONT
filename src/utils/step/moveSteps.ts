import React from "react";

export const moveToStep = (
  type: "next" | "prev",
  setStep: React.Dispatch<React.SetStateAction<number>>
) => {
  switch (type) {
    case "next":
      setStep((prevStep) => ++prevStep);
      break;
    case "prev":
      setStep((prevStep) => --prevStep);
  }
};
