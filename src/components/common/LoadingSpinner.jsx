import React from "react";

export default function LoadingSpinner({ size = 48, className = "" }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span
        className="inline-block animate-spin rounded-full border-4 border-solid border-blue-400 border-t-purple-500 dark:border-blue-600 dark:border-t-purple-400"
        style={{ width: size, height: size, borderTopColor: "#a78bfa" }}
        role="status"
        aria-label="Đang tải..."
      ></span>
    </div>
  );
}
