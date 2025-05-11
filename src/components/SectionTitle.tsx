import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '' }) => {
  return (
    <div className={`text-center max-w-3xl mx-auto px-4 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-800">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className="w-20 h-1.5 bg-primary/70 rounded-full mx-auto mt-4"></div>
    </div>
  );
};

export default SectionTitle;
