import React from 'react';
import { Bell, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Badge } from '../ui/Badge';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { notifications } = useData();
  
  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white border-b border-patas-orange-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold bg-gradient-to-r from-patas-blue-600 to-patas-blue-800 bg-clip-text text-transparent">
            Bem-vindo, {user?.name}!
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <div className="relative">
            <button className="p-2 text-patas-blue-400 hover:text-patas-orange-600 hover:bg-patas-orange-50 rounded-lg transition-colors">
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge 
                  variant="error" 
                  size="sm"
                  className="absolute -top-1 -right-1 min-w-[20px] h-5 flex items-center justify-center bg-patas-orange-500 text-white"
                >
                  {unreadNotifications}
                </Badge>
              )}
            </button>
          </div>

          {/* Settings */}
          <button className="p-2 text-patas-blue-400 hover:text-patas-orange-600 hover:bg-patas-orange-50 rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
          </button>

          {/* User Menu */}
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-patas-blue-800">{user?.name}</p>
              <p className="text-xs text-patas-blue-600 capitalize">{user?.role}</p>
            </div>
            <img
              src={user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
              alt={user?.name}
              className="h-8 w-8 rounded-full border-2 border-patas-orange-300"
            />
            <button
              onClick={logout}
              className="p-2 text-patas-blue-400 hover:text-patas-orange-600 hover:bg-patas-orange-50 rounded-lg transition-colors"
              title="Sair"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};