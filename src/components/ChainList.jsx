import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export const ChainList = ({ chains, selectedChain, setSelectedChain }) => {
  const { isDarkMode } = useTheme();
  const [hoveredChain, setHoveredChain] = useState(null);

  return (
    <div
      className={`w-24 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      } rounded-lg shadow-lg overflow-hidden transition-colors duration-300`}
    >
      <div className='flex flex-col items-center py-4 space-y-8'>
        {chains.map(([chainName, chainInfo]) => (
          <div
            key={chainName}
            className='relative group'
            onMouseEnter={() => setHoveredChain(chainName)}
            onMouseLeave={() => setHoveredChain(null)}
            onClick={() => setSelectedChain(chainName)}
          >
            <div className='relative'>
              <img
                src={chainInfo.icon}
                alt={chainName}
                className={`w-16 h-16 rounded-full transition-all duration-300 ${
                  selectedChain === chainName
                    ? "border-2 border-orange-500 p-1"
                    : "group-hover:scale-110"
                }`}
              />
              {hoveredChain === chainName && (
                <div className='absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  {chainName}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
