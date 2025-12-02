"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Seeded random number generator for consistent results
function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

// Generate contribution levels (0-4) for the heatmap with a seed
function generateContributions(seed: number = 12345): number[][] {
  const random = seededRandom(seed);
  const weeks = 52;
  const daysPerWeek = 7;
  const contributions: number[][] = [];
  
  for (let week = 0; week < weeks; week++) {
    const weekData: number[] = [];
    for (let day = 0; day < daysPerWeek; day++) {
      // Random contribution level: 0 = no contribution, 1-4 = increasing levels
      const rand = random();
      let level = 0;
      if (rand > 0.3) level = 1;
      if (rand > 0.5) level = 2;
      if (rand > 0.7) level = 3;
      if (rand > 0.85) level = 4;
      weekData.push(level);
    }
    contributions.push(weekData);
  }
  
  return contributions;
}

// Pre-generate contributions with a fixed seed for SSR consistency
const STATIC_CONTRIBUTIONS = generateContributions(12345);

const contributionColors = [
  "bg-black/5",      // Level 0 - no contribution
  "bg-green-200",    // Level 1 - light
  "bg-green-300",    // Level 2
  "bg-green-400",    // Level 3
  "bg-green-500",    // Level 4 - dark
];

export function ContributionGraph() {
  const [contributions] = useState(() => STATIC_CONTRIBUTIONS);
  
  return (
    <div className="relative w-full overflow-hidden py-6">
      {/* Fade effect on left */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#C5CBD7] to-transparent z-10 pointer-events-none" />
      
      {/* Fade effect on right */}
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#C5CBD7] to-transparent z-10 pointer-events-none" />
      
      <div className="px-4">
        {/* Months header */}
        <div className="flex gap-[14px] mb-2 pl-[16px]">
          {months.map((month, index) => (
            <motion.span
              key={month}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.02 }}
              className="text-xs text-black/50 font-mono w-[60px]"
            >
              {month}
            </motion.span>
          ))}
        </div>
        
        {/* Contribution grid */}
        <div className="flex gap-[2px]">
          {contributions.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-[2px]">
              {week.map((level, dayIndex) => (
                <motion.div
                  key={`${weekIndex}-${dayIndex}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: weekIndex * 0.01 + dayIndex * 0.005,
                    type: "spring",
                    stiffness: 200
                  }}
                  className={`w-3 h-3 rounded-sm ${contributionColors[level]} hover:ring-2 hover:ring-black/20 transition-all cursor-pointer`}
                  title={`${level} contributions`}
                />
              ))}
            </div>
          ))}
        </div>
        
        {/* Caption */}
        <div className="flex justify-between mt-4 px-4">
          <span className="text-xs text-black/50 font-mono">
            Total 2954 contributions in lifetime
          </span>
          <span className="text-xs text-black/40 font-mono">
            Made by Soufiane
          </span>
        </div>
      </div>
    </div>
  );
}
