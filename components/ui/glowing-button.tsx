"use client";

import { useState } from "react";
import { cn } from "../../lib/utils";

interface GlowingButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "default" | "outline" | "phantom";
}

export function GlowingButton({
  children,
  className,
  onClick,
  variant = "default",
}: GlowingButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const variantClasses = {
    default: "bg-gradient-to-r from-teal-500 to-cyan-500 text-white",
    outline: "bg-transparent border border-teal-500 text-teal-400",
    phantom: "bg-gradient-to-r from-purple-600 to-blue-500 text-white",
  };

  return (
    <button
      className={cn(
        "relative px-6 py-3 rounded-md font-share-tech-mono text-sm transition-all duration-300 overflow-hidden group",
        variantClasses[variant],
        isHovered && "shadow-[0_0_25px_rgba(45,212,191,0.5)]",
        className
      )}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="relative z-10">{children}</span>
      <span
        className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
          variant === "default" && "bg-gradient-to-r from-teal-600 to-cyan-600",
          variant === "outline" && "bg-teal-900/20",
          variant === "phantom" && "bg-gradient-to-r from-purple-700 to-blue-600"
        )}
      />
      <span
        className={cn(
          "absolute -inset-1 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300",
          variant === "default" && "bg-teal-400",
          variant === "outline" && "bg-teal-400",
          variant === "phantom" && "bg-purple-400"
        )}
      />
    </button>
  );
}