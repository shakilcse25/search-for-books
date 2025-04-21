import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface ErrorMessageProps {
  message: string | ReactNode;
  variant?: "error" | "warning" | "info";
  className?: string;
  onRetry?: () => void;
}

export default function ErrorMessage({
  message,
  variant = "error",
  className = "",
  onRetry,
}: ErrorMessageProps) {
  const variantStyles = {
    error: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
  };

  const iconColors = {
    error: "text-red-500",
    warning: "text-amber-500",
    info: "text-blue-500",
  };

  return (
    <div
      className={`p-4 mb-4 rounded-lg border ${variantStyles[variant]} ${className}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className={`w-5 h-5 mt-0.5 ${iconColors[variant]}`}
          />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className={`mt-2 px-3 py-1 text-xs font-medium rounded-md ${
                variant === "error"
                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                  : variant === "warning"
                  ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  : "bg-blue-100 text-blue-700 hover:bg-blue-200"
              } transition-colors`}
            >
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
