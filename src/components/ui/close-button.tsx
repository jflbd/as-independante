import React from 'react';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CloseButton({
  onClick,
  className = '',
  ariaLabel = 'Fermer',
  size = 'md',
}: CloseButtonProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4/6 h-4/6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}