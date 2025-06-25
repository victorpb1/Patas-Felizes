import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = true
}) => {
  return (
    <div className={cn(
      'bg-white rounded-xl shadow-sm border border-patas-orange-100 hover:shadow-md transition-shadow duration-200',
      padding && 'p-6',
      className
    )}>
      {children}
    </div>
  );
};