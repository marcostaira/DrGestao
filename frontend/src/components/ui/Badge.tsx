import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "success" | "danger" | "warning" | "info" | "default";
  size?: "sm" | "md";
}

export default function Badge({
  children,
  variant = "default",
  size = "md",
}: BadgeProps) {
  const variants = {
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
    info: "bg-blue-100 text-blue-800",
    default: "bg-secondary-100 text-secondary-800",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
