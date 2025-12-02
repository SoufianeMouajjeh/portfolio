"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HomeIcon, WorkIcon, SkillsIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: <HomeIcon className="w-6 h-6" /> },
  { id: "work", label: "Work", icon: <WorkIcon className="w-6 h-6" /> },
  { id: "skills", label: "Skills", icon: <SkillsIcon className="w-6 h-6" /> },
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
      <div className="overflow-hidden backdrop-blur-[15px] backdrop-filter bg-gradient-to-r from-[rgba(255,255,255,0.28)] to-[rgba(255,255,255,0.07)] border border-[rgba(255,255,255,0.85)] box-border flex items-center gap-[48px] px-[24px] py-[10px] relative rounded-[50px] shadow-[0px_10px_30px_0px_rgba(0,0,0,0.15)]">
        {/* Soft inner glow (gradient overlay) to emulate glassmorphism without a hard line */}
        <div className="absolute inset-0 pointer-events-none rounded-[50px] overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-60" />
        </div>
        
        {navItems.map((item) => {
          const isActive = active === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={cn(
                "flex flex-col items-center gap-[2px] relative shrink-0 transition-all duration-200 px-3 py-1",
                isActive ? "opacity-100" : "opacity-70 hover:opacity-90"
              )}
            >
              <div className="relative z-10 flex flex-col items-center gap-[2px]">
                <div className={cn(
                  "relative shrink-0",
                  item.id === 'home' ? 'w-[16px] h-[16px]' : 'w-[14px] h-[14px]'
                )}>
                  {item.icon}
                </div>
                <span className={cn(
                  "leading-[14.4px] transition-all",
                  isActive ? 'text-white text-[13px] font-semibold' : 'text-white/80 text-[10px] font-medium'
                )}>
                  {item.label}
                </span>
              </div>

                {/* Active background pill (soft glassy highlight) */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 mx-1 my-1 rounded-[14px] bg-gradient-to-b from-[#2F00FF]/12 to-transparent shadow-[0_8px_24px_rgba(47,0,255,0.08)] pointer-events-none"
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
