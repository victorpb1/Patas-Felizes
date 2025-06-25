import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md'
}) => {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        <div className={cn(
          'relative transform overflow-hidden rounded-xl bg-white text-left shadow-2xl transition-all w-full border border-patas-orange-200',
          sizes[size]
        )}>
          <div className="flex items-center justify-between p-6 border-b border-patas-orange-200 bg-gradient-to-r from-patas-orange-50 to-patas-yellow-50">
            <h3 className="text-lg font-semibold text-patas-blue-800">{title}</h3>
            <button
              onClick={onClose}
              className="text-patas-blue-400 hover:text-patas-orange-600 hover:bg-patas-orange-100 rounded-lg p-1 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};