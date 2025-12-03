"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const contributionColors = [
  "bg-black/5",      // Level 0 - no contribution
  "bg-green-200",    // Level 1 - light
  "bg-green-300",    // Level 2
  "bg-green-400",    // Level 3
  "bg-green-500",    // Level 4 - dark
];

interface ContributionGraphProps {
  contributions: number[][];
  dates: string[][]; // Changed from Date[][] to string[][]
  totalContributions: number;
}

export function ContributionGraph({ contributions, dates, totalContributions }: ContributionGraphProps) {
  const [hoveredDay, setHoveredDay] = useState<{ weekIndex: number; dayIndex: number; x: number; y: number } | null>(null);

  // Map raw GitHub counts to visual levels using fixed thresholds:
  // 0 => 0
  // 1-3 => 1
  // 4-6 => 2
  // 7-9 => 3
  // 10+ => 4
  const getLevelFromCount = (count: number) => {
    if (!count || count === 0) return 0;
    if (count >= 1 && count <= 3) return 1;
    if (count >= 4 && count <= 6) return 2;
    if (count >= 7 && count <= 9) return 3;
    return 4;
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  };
  
  return (
    <div className="relative w-full py-0">
      {/* Tooltip */}
      <AnimatePresence>
        {hoveredDay && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              left: hoveredDay.x,
              top: hoveredDay.y - 10,
              transform: 'translate(-50%, -100%)',
              zIndex: 50,
            }}
            className="pointer-events-none"
          >
            <div className="bg-black/90 text-white text-xs px-3 py-2 rounded-lg shadow-lg backdrop-blur-sm">
              <div className="font-semibold">
                {contributions[hoveredDay.weekIndex][hoveredDay.dayIndex]} contributions
              </div>
              <div className="text-white/70 mt-0.5">
                {formatDate(dates[hoveredDay.weekIndex][hoveredDay.dayIndex])}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="px-2">
        {/* Months header */}
  <div className="flex gap-3.5 mb-2 pl-11">
          {months.map((month, index) => (
            <motion.span
              key={month}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.02 }}
              className="text-[10px] text-black/50 mono-caption w-[60px]"
            >
              {month}
            </motion.span>
          ))}
        </div>

        {/* Contribution grid */}
        <div className="flex">
          <div className="flex gap-0.5">
            {contributions.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-0.5">
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
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setHoveredDay({
                        weekIndex,
                        dayIndex,
                        x: rect.left + rect.width / 2,
                        y: rect.top
                      });
                    }}
                    onMouseLeave={() => setHoveredDay(null)}
                      // Use raw count -> derive visual level
                      className={`w-3 h-3 rounded-sm ${contributionColors[getLevelFromCount(contributions[weekIndex][dayIndex])]} hover:ring-2 hover:ring-black/20 transition-all cursor-pointer`}
                      title={`${contributions[weekIndex][dayIndex]} contributions`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Caption */}
        <div className="flex justify-between mt-2 px-5 mb-5">
          <span className="text-black/50 mono-caption">
            Total <span className="mono-extrabold">{totalContributions.toLocaleString()}</span> contributions in lifetime
          </span>
          <span className="text-black/40 mono-caption">
            Made by Soufiane
          </span>
        </div>
      </div>
    </div>
  );
}
