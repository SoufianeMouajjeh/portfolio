"use client";

import { motion } from "framer-motion";
import { TwitterIcon, GithubIcon, LinkedInIcon, DiscordIcon } from "@/components/icons";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
}

const socialLinks: SocialLink[] = [
  { 
    id: "twitter", 
    label: "Twitter", 
    href: "https://x.com/qLf81259152", 
    icon: <TwitterIcon className="w-4 h-4" /> 
  },
  { 
    id: "github", 
    label: "Github", 
    href: "https://github.com/SoufianeMouajjeh", 
    icon: <GithubIcon className="w-4 h-4" /> 
  },
  { 
    id: "resume", 
    label: "Resume", 
    href: "/resume.pdf", 
    icon: <FileText className="w-4 h-4" /> 
  },
  { 
    id: "linkedin", 
    label: "Linkedin", 
    href: "https://www.linkedin.com/in/soufiane-el-mouajjeh-052929280/", 
    icon: <LinkedInIcon className="w-4 h-4" /> 
  },
  { 
    id: "discord", 
    label: "Discord", 
    href: "https://discord.com", 
    icon: <DiscordIcon className="w-4 h-4" />
  },
];

export function LinksSection() {
  return (
    <section className="w-full py-8 px-4">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-lg md:text-xl text-black/80 mb-6 font-sans"
      >
        You can check these links if you wish to
      </motion.p>
      
      <div className="flex flex-wrap gap-3">
        {socialLinks.map((link, index) => (
          <motion.div
            key={link.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="soft"
              leftIcon={link.icon}
              onClick={() => window.open(link.href, '_blank', 'noopener,noreferrer')}
            >
              {link.label}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
