"use client";

import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Search, Plus, Check, X } from 'lucide-react';
import { useState } from 'react';

interface Step3Props {
  onNext: () => void;
  onBack: () => void;
}

interface Dependency {
  name: string;
  version: string;
  selected: boolean;
}

export default function Step3Dependencies({ onNext, onBack }: Step3Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [enablePreview, setEnablePreview] = useState(true);
  const [dependencies, setDependencies] = useState<Dependency[]>([
    { name: 'react', version: '18.3.1', selected: true },
    { name: 'motion', version: '12.23.24', selected: false },
    { name: 'lucide-react', version: '0.487.0', selected: false },
    { name: 'tailwindcss', version: '4.1.12', selected: true },
  ]);

  const toggleDependency = (name: string) => {
    setDependencies(
      dependencies.map((dep) =>
        dep.name === name ? { ...dep, selected: !dep.selected } : dep
      )
    );
  };

  const filteredDeps = dependencies.filter((dep) =>
    dep.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="bg-[#161a23] rounded-2xl p-8 shadow-2xl border border-gray-800/50">
        <h2 className="text-2xl text-white mb-2">Dependencies</h2>
        <p className="text-gray-400 mb-8">
          Select the npm packages your component needs.
        </p>

        {/* Search Input */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search npm packages..."
              className="w-full bg-[#0f1117] border border-gray-700 rounded-lg pl-12 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Dependencies List */}
        <div className="space-y-2 mb-8 max-h-72 overflow-y-auto">
          {filteredDeps.map((dep) => (
            <motion.div
              key={dep.name}
              whileHover={{ scale: 1.01 }}
              className={`bg-[#0f1117] border rounded-lg p-4 cursor-pointer transition-all ${
                dep.selected
                  ? 'border-[#6366f1] shadow-lg shadow-[#6366f1]/10'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
              onClick={() => toggleDependency(dep.name)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      dep.selected
                        ? 'bg-[#6366f1] border-[#6366f1]'
                        : 'border-gray-600'
                    }`}
                  >
                    {dep.selected && <Check className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <div className="text-white">{dep.name}</div>
                    <div className="text-sm text-gray-500">v{dep.version}</div>
                  </div>
                </div>
                {dep.selected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-[#6366f1]"
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Custom Package */}
        <button className="w-full bg-[#0f1117] border border-dashed border-gray-700 hover:border-[#6366f1] rounded-lg p-4 text-gray-400 hover:text-[#6366f1] transition-all flex items-center justify-center gap-2 mb-8">
          <Plus className="w-5 h-5" />
          Add custom package
        </button>

        {/* Live Preview Toggle */}
        <div className="bg-[#0f1117] border border-gray-700 rounded-lg p-6 mb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-white mb-1">Enable Live Preview</h3>
              <p className="text-sm text-gray-400">
                Test your component in a live sandbox environment
              </p>
            </div>
            <button
              onClick={() => setEnablePreview(!enablePreview)}
              className={`relative w-14 h-7 rounded-full transition-all ${
                enablePreview ? 'bg-[#6366f1]' : 'bg-gray-700'
              }`}
            >
              <motion.div
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-lg"
                animate={{ x: enablePreview ? 28 : 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
          {enablePreview && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="text-xs text-gray-500 bg-[#1f2937] rounded-lg p-3 border border-gray-800"
            >
              ℹ️ Preview sessions are time-limited to 15 minutes
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
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
            {enablePreview ? 'Launch Preview' : 'Submit'}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
