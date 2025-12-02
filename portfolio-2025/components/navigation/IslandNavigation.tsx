"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Briefcase, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <Home className="w-4 h-4" /> },
  { id: "work", label: "Work", icon: <Briefcase className="w-4 h-4" /> },
  { id: "skills", label: "Skills", icon: <Zap className="w-4 h-4" /> },
];

interface IslandNavigationProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export function IslandNavigation({ activeTab = "home", onTabChange }: IslandNavigationProps) {
  const [active, setActive] = useState(activeTab);

  const handleTabClick = (tabId: string) => {
    setActive(tabId);
    onTabChange?.(tabId);
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-12 px-6 py-3 bg-white/20 backdrop-blur-[15px] rounded-[28px] border border-white/85 shadow-[0px_10px_30px_rgba(0,0,0,0.15)]">
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-[28px] shadow-[inset_0px_1px_0px_rgba(255,255,255,0.35)] pointer-events-none" />
        
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={cn(
                "flex flex-col items-center gap-0.5 transition-all duration-200 relative group",
                isActive ? "opacity-100" : "opacity-70 hover:opacity-90"
              )}
            >
              <div className={cn(
                "transition-transform duration-200",
                isActive && "scale-110"
              )}>
                {item.icon}
              </div>
              <span className={cn(
                "text-xs font-medium text-black transition-all",
                isActive ? "text-[13px] font-semibold" : "text-[10px]"
              )}>
                {item.label}
              </span>
              
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[23px] h-[0.5px] bg-[#2F00FF] rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
