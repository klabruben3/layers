"use client";

import { useState } from "react";
import {
  StepIndicator,
  Step1Details,
  Step2Code,
  Step3Dependencies,
  Step4Preview,
} from "@/components/features";
import { motion } from "motion/react";
import { useNavContext, useStepContext } from "@/contexts";

interface ComponentData {
  name: string;
  description: string;
  useCase: string;
  tags: string[];
}

const steps = [
  { id: 1, title: "Details" },
  { id: 2, title: "Code" },
  { id: 3, title: "Dependencies" },
  { id: 4, title: "Preview" },
];

type Step = (typeof steps)[number]["title"];

function isStep(value: unknown): value is Step {
  return (
    typeof value === "string" && steps.some((step) => step.title === value)
  );
}

export default function PostComponent() {
  const { navTitle, setNavTitle } = useNavContext();
  const { value: step, setValue: setStep } = useStepContext();
  const [componentData, setComponentData] = useState<ComponentData | null>(
    null,
  );

  if (!navTitle) {
    setNavTitle("Details");
  }

  const handleStep1Next = (data: ComponentData) => {
    setComponentData(data);
    setStep(2);
  };

  const handleStep2Next = () => {
    setStep(3);
  };

  const handleStep3Next = () => {
    setStep(4);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="z-30 w-full p-5 h-full overflow-y-scroll no-scroll"
    >
      <div className="card w-full border-2 border-[var(--gray) rounded-border mx-auto h-[calc(100vh-60px)] overflow-y-auto no-scroll p-10 ">
        {/* Header */}
        <div className="z-10 text-center mb-12">
          <h1 className="text-4xl text-white mb-4">Submit Your Component</h1>
          <p className="text-gray-400 text-lg">
            Share reusable React components with the community
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={step} />

        {/* Step Content */}
        <div className="mt-8 z-10 h-100 w-full mx-auto">
          {step === 1 && <Step1Details onNext={handleStep1Next} />}
          {step === 2 && (
            <Step2Code onNext={handleStep2Next} onBack={handleBack} />
          )}
          {step === 3 && (
            <Step3Dependencies onNext={handleStep3Next} onBack={handleBack} />
          )}
          {step === 4 && <Step4Preview onBack={handleBack} />}
        </div>
      </div>
    </motion.div>
  );
}
