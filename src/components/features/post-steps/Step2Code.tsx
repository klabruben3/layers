"use client";

import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ChevronRight, FileCode, FolderTree } from 'lucide-react';
import { useState } from 'react';

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

export default function Step2Code({ onNext, onBack }: Step2Props) {
  const [language, setLanguage] = useState<'TSX' | 'JSX'>('TSX');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const mockCode = `import React, { useState } from 'react';
import { motion } from 'motion/react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function AnimatedButton({ 
  children, 
  onClick, 
  variant = 'primary' 
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-5xl mx-auto"
    >
      <div className="bg-[#161a23] rounded-2xl shadow-2xl border border-gray-800/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <FileCode className="w-5 h-5 text-[#6366f1]" />
            <h2 className="text-xl text-white">Component Code</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex bg-[#0f1117] rounded-lg p-1 border border-gray-700">
              <button
                onClick={() => setLanguage('TSX')}
                className={`px-4 py-1.5 rounded-md text-sm transition-all ${
                  language === 'TSX'
                    ? 'bg-[#6366f1] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                TSX
              </button>
              <button
                onClick={() => setLanguage('JSX')}
                className={`px-4 py-1.5 rounded-md text-sm transition-all ${
                  language === 'JSX'
                    ? 'bg-[#6366f1] text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                JSX
              </button>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* File Structure Sidebar */}
          {sidebarOpen && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="bg-[#0f1117] border-r border-gray-800 p-4"
            >
              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <FolderTree className="w-4 h-4" />
                <span className="text-sm">Files</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#6366f1] text-sm">
                  <ChevronRight className="w-3 h-3" />
                  <FileCode className="w-4 h-4" />
                  <span>index.tsx</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm pl-5">
                  <FileCode className="w-4 h-4" />
                  <span>styles.css</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm pl-5">
                  <FileCode className="w-4 h-4" />
                  <span>types.ts</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Code Editor */}
          <div className="flex-1 relative">
            <div className="bg-[#0f1117] p-6 min-h-[500px] font-mono text-sm overflow-auto">
              {/* Line Numbers */}
              <div className="flex">
                <div className="text-gray-600 select-none pr-4 text-right">
                  {mockCode.split('\n').map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <pre className="flex-1">
                  <code className="text-gray-300">
                    {mockCode.split('\n').map((line, i) => (
                      <div key={i}>
                        {line.split(/(import|from|export|default|function|const|return|interface|className)/).map((part, j) => {
                          if (['import', 'from', 'export', 'default', 'function', 'const', 'return', 'interface'].includes(part)) {
                            return <span key={j} className="text-[#c678dd]">{part}</span>;
                          }
                          if (part === 'className') {
                            return <span key={j} className="text-[#e06c75]">{part}</span>;
                          }
                          return <span key={j}>{part}</span>;
                        })}
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>

            {/* Helper Note */}
            <div className="absolute bottom-4 right-4 bg-[#1f2937] border border-[#6366f1]/30 rounded-lg px-4 py-2 text-sm text-gray-300">
              💡 Export a default React component
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-800">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-[#1f2937] hover:bg-[#374151] text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </motion.button>
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c3aed] text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2 shadow-lg shadow-[#6366f1]/30"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
