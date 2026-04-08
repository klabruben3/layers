"use client";

import { motion } from 'motion/react';
import { Check, Clock, Package, Sparkles, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Step4Props {
  onBack: () => void;
}

interface ProgressStep {
  id: number;
  title: string;
  status: 'pending' | 'loading' | 'complete';
}

export default function Step4Preview({ onBack }: Step4Props) {
  const [progressSteps, setProgressSteps] = useState<ProgressStep[]>([
    { id: 1, title: 'Installing dependencies', status: 'loading' },
    { id: 2, title: 'Starting sandbox', status: 'pending' },
    { id: 3, title: 'Building project', status: 'pending' },
  ]);

  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes in seconds
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress steps
    const step1Timer = setTimeout(() => {
      setProgressSteps((prev) =>
        prev.map((step) =>
          step.id === 1
            ? { ...step, status: 'complete' }
            : step.id === 2
            ? { ...step, status: 'loading' }
            : step
        )
      );
      setProgress(33);
    }, 2000);

    const step2Timer = setTimeout(() => {
      setProgressSteps((prev) =>
        prev.map((step) =>
          step.id === 2
            ? { ...step, status: 'complete' }
            : step.id === 3
            ? { ...step, status: 'loading' }
            : step
        )
      );
      setProgress(66);
    }, 4000);

    const step3Timer = setTimeout(() => {
      setProgressSteps((prev) =>
        prev.map((step) => (step.id === 3 ? { ...step, status: 'complete' } : step))
      );
      setProgress(100);
    }, 6000);

    return () => {
      clearTimeout(step1Timer);
      clearTimeout(step2Timer);
      clearTimeout(step3Timer);
    };
  }, []);

  useEffect(() => {
    // Countdown timer
    const timer = setInterval(() => {
      setTimeRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const allComplete = progressSteps.every((step) => step.status === 'complete');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-7xl mx-auto"
    >
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Panel - Setup Progress */}
        <div className="lg:col-span-2">
          <div className="bg-[#161a23] rounded-2xl p-6 shadow-2xl border border-gray-800/50">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Setup Progress</h2>
              <div className="flex items-center gap-2 bg-[#0f1117] px-3 py-1.5 rounded-full border border-gray-700">
                <Clock className="w-4 h-4 text-[#6366f1]" />
                <span className="text-sm text-gray-300">
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="h-2 bg-[#0f1117] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-sm text-gray-400 mt-2 text-right">
                {progress}% Complete
              </div>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              {progressSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${
                    step.status === 'complete'
                      ? 'bg-[#0f1117] border-[#6366f1]/30'
                      : step.status === 'loading'
                      ? 'bg-[#0f1117] border-[#6366f1] shadow-lg shadow-[#6366f1]/10'
                      : 'bg-[#0f1117] border-gray-800'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      step.status === 'complete'
                        ? 'bg-gradient-to-br from-[#6366f1] to-[#8b5cf6]'
                        : step.status === 'loading'
                        ? 'bg-[#6366f1]/20 border-2 border-[#6366f1]'
                        : 'bg-gray-800'
                    }`}
                  >
                    {step.status === 'complete' ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : step.status === 'loading' ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <Package className="w-5 h-5 text-[#6366f1]" />
                      </motion.div>
                    ) : (
                      <div className="w-2 h-2 bg-gray-600 rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div
                      className={`${
                        step.status === 'pending' ? 'text-gray-500' : 'text-white'
                      }`}
                    >
                      {step.title}
                    </div>
                    {step.status === 'loading' && (
                      <div className="text-sm text-gray-400 mt-1">
                        In progress...
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Info Box */}
            <div className="mt-6 bg-[#0f1117] border border-gray-700 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#8b5cf6] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-white text-sm mb-1">Session Info</h4>
                  <p className="text-xs text-gray-400">
                    Your preview environment is isolated and secure. All changes
                    are temporary and will be cleared after the session expires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Preview Frame */}
        <div className="lg:col-span-3">
          <div className="bg-[#161a23] rounded-2xl shadow-2xl border border-gray-800/50 overflow-hidden h-full min-h-[600px]">
            {/* Preview Header */}
            <div className="bg-[#0f1117] px-6 py-4 border-b border-gray-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
                  <div className="w-3 h-3 rounded-full bg-[#eab308]" />
                  <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
                </div>
                <div className="text-sm text-gray-400">
                  localhost:5173/preview
                </div>
              </div>
              {allComplete && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-2 text-sm text-[#22c55e]"
                >
                  <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                  Live
                </motion.div>
              )}
            </div>

            {/* Preview Content */}
            <div className="p-8 flex items-center justify-center h-[calc(100%-60px)]">
              {!allComplete ? (
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-4 border-gray-700 border-t-[#6366f1] rounded-full mx-auto mb-4"
                  />
                  <p className="text-gray-400">Setting up preview environment...</p>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full"
                >
                  <div className="bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/10 rounded-xl border border-[#6366f1]/30 p-12 text-center">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-2xl shadow-[#6366f1]/50"
                    >
                      <Wrench className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-2xl text-white mb-3">
                      Preview Ready!
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Your component is now running in the live sandbox
                    </p>
                    <div className="inline-flex items-center gap-2 bg-[#0f1117] px-4 py-2 rounded-lg border border-gray-700">
                      <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse" />
                      <span className="text-sm text-gray-300">
                        Session active: {formatTime(timeRemaining)} remaining
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
