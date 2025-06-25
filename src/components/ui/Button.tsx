import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md';
  
  const variants = {
    primary: 'bg-gradient-to-r from-patas-orange-500 to-patas-yellow-500 text-white hover:from-patas-orange-600 hover:to-patas-yellow-600 focus:ring-patas-orange-500',
    secondary: 'bg-gradient-to-r from-patas-blue-500 to-patas-blue-600 text-white hover:from-patas-blue-600 hover:to-patas-blue-700 focus:ring-patas-blue-500',
    outline: 'border-2 border-patas-orange-300 text-patas-blue-700 hover:bg-gradient-to-r hover:from-patas-orange-50 hover:to-patas-yellow-50 hover:border-patas-orange-400 focus:ring-patas-orange-500',
    ghost: 'text-patas-blue-700 hover:bg-gradient-to-r hover:from-patas-orange-50 hover:to-patas-yellow-50 focus:ring-patas-blue-500',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 focus:ring-red-500'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};