import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import QBtronLogo from "../../assets/QBtron.png";

export default function Logo({ className = "", showText = true, size = "default", lightMode = false }) {
  const sizeClasses = {
    small: "w-8 h-8",
    default: "w-10 h-10",
    large: "w-14 h-14"
  };

  return (
    <Link to={createPageUrl('Landing')} className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={QBtronLogo}
        alt="QBtron Logo"
        className={`${sizeClasses[size]} object-contain`}
      />
      {showText && (
        <span className="text-xl font-semibold tracking-wide">
          <span className="text-[#2d6a4f]">QB</span>
          <span className="text-gray-700">tron</span>
        </span>
      )}
    </Link>
  );
}