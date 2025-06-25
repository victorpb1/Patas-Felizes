import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-patas-blue-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-patas-blue-400">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'block w-full rounded-lg border-2 border-patas-orange-200 px-3 py-2 text-sm text-patas-blue-800 placeholder-patas-blue-400 focus:border-patas-orange-400 focus:outline-none focus:ring-2 focus:ring-patas-orange-200 transition-colors',
            icon && 'pl-10',
            error && 'border-red-400 focus:border-red-500 focus:ring-red-200',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};