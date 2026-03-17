import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    // Remove both classes first
    root.classList.remove('light', 'dark');
    // Add the appropriate class
    root.classList.add(newTheme);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative h-9 w-9 rounded-md border border-primary/20 bg-background/50 backdrop-blur-sm hover:bg-primary/10 transition-all duration-300"
      aria-label="Toggle theme"
    >
      <Sun className={`h-4 w-4 transition-all duration-300 ${theme === 'light' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}`} />
      <Moon className={`absolute h-4 w-4 transition-all duration-300 ${theme === 'dark' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}`} />
    </Button>
  );
};

export default ThemeToggle;

