import React from 'react';

export const Marquee = ({ children, className = '', speed = 50, direction = 'left' }) => {
  const animationDirection = direction === 'left' ? 'scroll-left' : 'scroll-right';
  
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div 
        className={`inline-block animate-${animationDirection}`}
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite'
        }}
      >
        {children}
        {/* Duplicate content for seamless loop */}
        <span className="ml-8">{children}</span>
      </div>
    </div>
  );
};

export default Marquee;

