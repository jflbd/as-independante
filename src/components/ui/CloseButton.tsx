import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  ariaLabel?: string;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  className,
  size = 'md',
  ariaLabel = 'Fermer'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <button
      type="button"
      className={cn(
        'rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors',
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <X className={cn(
        'text-gray-700',
        size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6'
      )} />
    </button>
  );
};

export default CloseButton;