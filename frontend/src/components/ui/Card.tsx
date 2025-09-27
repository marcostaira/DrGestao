import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ children, className = "", title }: CardProps) {
  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-secondary-200 ${className}`}
    >
      {title && (
        <div className="px-6 py-4 border-b border-secondary-200">
          <h3 className="text-lg font-semibold text-secondary-900">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
