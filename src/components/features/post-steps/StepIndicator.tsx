"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";

interface Step {
  id: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="z-10 w-full max-w-3xl mx-auto mb-12 select-none">
      <div className="flex items-center justify-around relative">
        {/* Progress Line */}
        {/* <div className="absolute w-full top-5 -translate-y-1/2 h-5 bg-[#1f2937] rounded-full border">
          <motion.div
            className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
            initial={{ width: "0%" }}
            animate={{
              width: `${(3 / (steps.length)) * 100}%`,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div> */}

        {/* Steps */}
        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10"
            >
              <motion.div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${
                  isCompleted
                    ? "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]"
                    : isCurrent
                      ? "bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] shadow-lg shadow-[#6366f1]/50"
                      : "bg-[#1f2937]"
                }`}
                initial={false}
                animate={{
                  scale: isCurrent ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-white" />
                ) : (
                  <span className="text-white text-sm">{step.id}</span>
                )}
              </motion.div>
              <span
                className={`text-sm ${
                  isCurrent || isCompleted ? "text-white" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
