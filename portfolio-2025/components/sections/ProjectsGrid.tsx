"use client";

import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
}

const projects: Project[] = [
  {
    id: "laundryhub",
    title: "LaundryHub",
    description: "A full-stack laundry management system with real-time tracking and scheduling.",
    image: "/projects/laundryhub.png",
    githubUrl: "https://github.com",
    liveUrl: "https://laundryhub.com",
  },
  {
    id: "ednami",
    title: "EDNAMI",
    description: "An educational platform for interactive learning experiences.",
    image: "/projects/ednami.png",
    githubUrl: "https://github.com",
    liveUrl: "https://ednami.com",
  },
  {
    id: "project3",
    title: "Design System",
    description: "A comprehensive design system built with React and Tailwind CSS.",
    image: "/projects/design-system.png",
    githubUrl: "https://github.com",
  },
  {
    id: "project4",
    title: "Portfolio V2",
    description: "Previous iteration of my portfolio with a different design approach.",
    image: "/projects/portfolio-v2.png",
    liveUrl: "https://portfolio-v2.com",
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-black rounded-2xl overflow-hidden group"
    >
      {/* Image Container */}
      <div className="relative h-[248px] overflow-hidden bg-gray-900">
        <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-sm">
          {/* Placeholder for project image */}
          <span>Project Screenshot</span>
        </div>
        {/* You can uncomment this when you have actual images */}
        {/* <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        /> */}
      </div>
      
      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {project.title}
            </h3>
            <p className="text-sm text-gray-400 line-clamp-2">
              {project.description}
            </p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-medium transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-white text-xs font-medium transition-colors"
              >
                Visit
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsGrid() {
  return (
    <section className="w-full py-8 px-4">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xl md:text-2xl text-black font-medium mb-6 font-sans"
      >
        Check my Projects here
      </motion.h2>
      
      {/* Dashed border container */}
      <div className="border border-dashed border-black/20 rounded-2xl p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
