import React, { useEffect, useRef } from 'react';

export const Spotlight = ({ className = '', children, ...props }) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const handleMouseMove = (e) => {
      const rect = spotlight.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      spotlight.style.setProperty('--mouse-x', `${x}px`);
      spotlight.style.setProperty('--mouse-y', `${y}px`);
    };

    spotlight.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      spotlight.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20" />
      <div 
        className="absolute inset-0 opacity-0 transition-opacity duration-300 hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.1), transparent 40%)`
        }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Spotlight;

