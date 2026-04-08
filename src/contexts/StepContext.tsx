"use client"
import { Children, ContextState } from "@/types";
import { createContext, useContext, useState } from "react";

const StepContext = createContext<ContextState<number> | undefined>(
  undefined,
);

function StepContextProvider({ children }: Children) {
  const [step, setStep] = useState(1);

  return (
    <StepContext.Provider value={{ value: step, setValue: setStep }}>
      {children}
    </StepContext.Provider>
  );
}

function useStepContext() {
  const StepState = useContext(StepContext);

  if (!StepState) {
    throw new Error(
      "useStepContext cannot be used outside of the Login Context Provider",
    );
  }

  return StepState;
}

export { StepContextProvider, useStepContext };
