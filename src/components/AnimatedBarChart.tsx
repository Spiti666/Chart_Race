
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PlayerData } from "../data/leagueData";

interface AnimatedBarChartProps {
  data: {
    name: string;
    points: number;
    rank: number;
    color: string;
  }[];
  maxValue: number;
}

const AnimatedBarChart = ({ data, maxValue }: AnimatedBarChartProps) => {
  return (
    <div className="w-full space-y-2 my-3">
      {data.map((entry, index) => {
        // Determine text color based on background color brightness
        const getTextColor = (bgColor: string) => {
          // Convert hex to RGB
          const hex = bgColor.replace('#', '');
          const r = parseInt(hex.substr(0, 2), 16);
          const g = parseInt(hex.substr(2, 2), 16);
          const b = parseInt(hex.substr(4, 2), 16);
          
          // Calculate brightness
          const brightness = (r * 299 + g * 587 + b * 114) / 1000;
          
          // Return dark text for light backgrounds, light text for dark backgrounds
          return brightness > 125 ? 'text-gray-900' : 'text-white';
        };

        const textColorClass = getTextColor(entry.color);

        return (
          <div key={entry.name} className="flex items-center space-x-1">
            <div className="w-16 text-right font-medium text-gray-300 text-xs">{entry.name}</div>
            
            <div className="relative h-5 w-full bg-gray-800 rounded-md">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(entry.points / maxValue) * 100}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full rounded-md"
                style={{ backgroundColor: entry.color }}
              />
              
              <div className={`absolute inset-y-0 flex items-center pl-2 text-xs font-semibold drop-shadow-lg ${textColorClass}`}>
                {entry.points} Punkte (Platz {entry.rank})
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedBarChart;
