"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  longDescription?: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-white/24"
          onClick={onClose}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            className="absolute top-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform w-[45px] h-[45px] flex items-center justify-center"
          >
            <X className="w-5 h-5 text-gray-800" strokeWidth={2} />
          </motion.button>

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#c5cdd8] border border-black/35 border-dashed rounded-2xl shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)] p-3 flex flex-col gap-3 max-w-[425px] w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Image */}
            <div className="relative h-[248px] rounded-xl overflow-hidden bg-gray-900">
              <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-sm">
                <span>Project Screenshot</span>
              </div>
              {/* You can uncomment this when you have actual images */}
              {/* <img 
                src={project.image} 
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              /> */}
            </div>

            {/* Track Info */}
            <div className="flex flex-col gap-3 px-3">
              {/* Title and Action Buttons */}
              <div className="flex gap-3 items-start justify-between">
                <div className="flex flex-col gap-1 flex-1">
                  <p className="font-medium text-lg leading-[21.6px] text-gray-800 mono-paragraph">
                    {project.title}
                  </p>
                  <p className="font-normal text-xs leading-[18px] text-gray-600/75 mono-caption">
                    {project.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 items-center shrink-0">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-gray-700 flex gap-1.5 h-8 items-center justify-center rounded-full px-4 hover:bg-gray-600 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-white" />
                      <p className="font-normal text-sm leading-[16.8px] text-white">
                        GitHub
                      </p>
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-emerald-500 flex h-8 items-center justify-center rounded-full px-4 hover:bg-emerald-600 transition-colors"
                    >
                      <p className="font-normal text-sm leading-[16.8px] text-white">
                        Visit
                      </p>
                    </a>
                  )}
                </div>
              </div>

              {/* Long Description */}
              {project.longDescription && (
                <div className="flex flex-col gap-1 font-normal text-sm leading-[21px] text-gray-600 font-mono">
                  {project.longDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="w-full">
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
