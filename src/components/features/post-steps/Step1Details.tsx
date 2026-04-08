"use client";

import { motion } from 'motion/react';
import { ArrowRight, Plus, X } from 'lucide-react';
import { useState } from 'react';

interface Step1Props {
  onNext: (data: {
    name: string;
    description: string;
    useCase: string;
    tags: string[];
  }) => void;
}

export default function Step1Details({ onNext }: Step1Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [useCase, setUseCase] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = () => {
    if (name.trim() && description.trim()) {
      onNext({ name, description, useCase, tags });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-[#161a23] rounded-2xl p-8 shadow-2xl border border-gray-800/50">
        <h2 className="text-2xl text-white mb-2">Component Details</h2>
        <p className="text-gray-400 mb-8">
          Tell us about the component you're submitting.
        </p>

        <div className="space-y-6">
          {/* Component Name */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Component Name <span className="text-[#ef4444]">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. AnimatedButton"
              className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Description <span className="text-[#ef4444]">*</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what your component does and its key features..."
              rows={4}
              className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Example Use Case */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Example Use Case
            </label>
            <textarea
              value={useCase}
              onChange={(e) => setUseCase(e.target.value)}
              placeholder="When and how should developers use this component?"
              rows={3}
              className="w-full bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Category Tags
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="e.g. UI, Animation, Form"
                className="flex-1 bg-[#0f1117] border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-transparent transition-all"
              />
              <button
                onClick={handleAddTag}
                className="bg-[#6366f1] hover:bg-[#5558e3] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-[#6366f1]/20 text-[#a5b4fc] px-3 py-1 rounded-full text-sm flex items-center gap-2 border border-[#6366f1]/30"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-white transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end mt-8">
          <motion.button
            onClick={handleSubmit}
            disabled={!name.trim() || !description.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:from-[#5558e3] hover:to-[#7c3aed] text-white px-6 py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-[#6366f1]/30"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
