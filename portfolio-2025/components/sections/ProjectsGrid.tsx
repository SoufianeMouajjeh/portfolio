"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProjectModal from "@/components/ui/ProjectModal";

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

const projects: Project[] = [
  {
    id: "laundryhub",
    title: "LaundryHub",
    description: "A full-stack laundry management system with real-time tracking and scheduling.",
    image: "/projects/laundryhub.png",
    tags: ["React", "Node.js", "MongoDB"],
    githubUrl: "https://github.com",
    liveUrl: "https://laundryhub.com",
    longDescription: "LaundryHub is a comprehensive laundry management platform designed to streamline the entire laundry process. The system features real-time tracking, automated scheduling, and seamless payment integration.\n\nBuilt with modern web technologies, it provides both customers and service providers with an intuitive interface for managing laundry orders, tracking progress, and ensuring timely delivery.\n\nThe platform includes features such as user authentication, order management, real-time notifications, and detailed analytics for business insights."
  },
  {
    id: "ednami",
    title: "EDNAMI",
    description: "An educational platform for interactive learning experiences.",
    image: "/projects/ednami.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://ednami.com",
    longDescription: "EDNAMI is an innovative educational platform that revolutionizes the way students learn through interactive and engaging content. The platform combines gamification with traditional learning methods.\n\nStudents can track their progress, participate in collaborative projects, and receive personalized feedback from instructors. The system supports multiple learning formats including video lectures, interactive quizzes, and hands-on projects.\n\nBuilt with accessibility and scalability in mind, EDNAMI serves thousands of students worldwide."
  },
  {
    id: "project3",
    title: "Design System",
    description: "A comprehensive design system built with React and Tailwind CSS.",
    image: "/projects/design-system.png",
    tags: ["React", "Tailwind CSS", "Storybook"],
    githubUrl: "https://github.com",
    longDescription: "A production-ready design system that provides consistent UI components and patterns for building modern web applications. Features extensive component library, theming support, and comprehensive documentation.\n\nThe design system includes pre-built components for forms, navigation, data display, and feedback elements. All components are fully accessible and follow WCAG 2.1 guidelines.\n\nIntegrated with Storybook for component documentation and testing."
  },
  {
    id: "project4",
    title: "Portfolio V2",
    description: "Previous iteration of my portfolio with a different design approach.",
    image: "/projects/portfolio-v2.png",
    tags: ["React", "Three.js", "GSAP"],
    liveUrl: "https://portfolio-v2.com",
    longDescription: "The second version of my personal portfolio featuring 3D graphics and smooth animations. Built with a focus on creative design and user experience.\n\nIncorporates WebGL effects, scroll-based animations, and interactive elements to create an immersive browsing experience. The portfolio showcases various projects with detailed case studies.\n\nOptimized for performance while maintaining rich visual effects."
  },
];

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: () => void;
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-[#c5cdd8] border border-black/35 border-dashed rounded-2xl overflow-hidden cursor-pointer flex flex-col gap-3 p-3 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.04)]"
    >
      {/* Image Container */}
      <div className="relative h-[248px] rounded-xl overflow-hidden bg-gray-900">
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
      
      {/* Track Info */}
      <div className="flex flex-col gap-1 px-3">
        <p className="font-medium text-lg leading-[21.6px] text-gray-800 mono-paragraph">
          {project.title}
        </p>
        <p className="font-normal text-xs leading-[18px] text-gray-600/75 mono-caption">
          {project.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay resetting the selected project to allow exit animation to complete
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section className="w-full py-4 px-4">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-black/80 font-medium mb-6 mono-paragraph"
        >
          Check my <span className="mono-extrabold">Projects</span> here
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>
      </section>

      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
}
