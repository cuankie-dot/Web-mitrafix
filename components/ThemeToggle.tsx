import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type ThemeToggleProps = {
  className?: string;
};

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      onClick={toggleTheme}
      aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      title={isDark ? 'Mode Terang' : 'Mode Gelap'}
      className={`relative inline-flex h-9 w-16 shrink-0 items-center rounded-full border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-mitrafix-orange focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${
        isDark
          ? 'bg-slate-700 border-slate-600'
          : 'bg-slate-200 border-slate-300'
      } ${className}`}
    >
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transform transition-transform duration-300 ${
          isDark ? 'translate-x-8' : 'translate-x-1'
        }`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-slate-900" />
        ) : (
          <Sun className="w-4 h-4 text-amber-500" />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
