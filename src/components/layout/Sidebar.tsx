import React from 'react';
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  Package, 
  DollarSign, 
  BarChart3,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../utils/cn';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onPageChange,
  isCollapsed,
  onToggleCollapse
}) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['recepcionista', 'veterinario', 'administrador', 'estoquista'] },
    { id: 'patients', label: 'Pacientes', icon: Users, roles: ['recepcionista', 'veterinario', 'administrador'] },
    { id: 'appointments', label: 'Agendamentos', icon: Calendar, roles: ['recepcionista', 'veterinario', 'administrador'] },
    { id: 'medical-records', label: 'Prontuários', icon: FileText, roles: ['veterinario', 'administrador'] },
    { id: 'inventory', label: 'Estoque', icon: Package, roles: ['administrador', 'estoquista'] },
    { id: 'financial', label: 'Financeiro', icon: DollarSign, roles: ['administrador'] },
    { id: 'reports', label: 'Relatórios', icon: BarChart3, roles: ['administrador'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className={cn(
      'bg-white border-r border-patas-orange-200 transition-all duration-300 flex flex-col shadow-lg',
      isCollapsed ? 'w-16' : 'w-64'
    )}>
      {/* Header */}
      <div className="p-6 border-b border-patas-orange-200 bg-gradient-to-r from-patas-orange-50 to-patas-yellow-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-patas-orange-500 to-patas-yellow-500 rounded-lg shadow-md">
              <Heart className="h-6 w-6 text-white" />
            </div>
            {!isCollapsed && (
              <div>
                <h1 className="font-bold text-lg bg-gradient-to-r from-patas-blue-600 to-patas-blue-800 bg-clip-text text-transparent">
                  Patas Felizes
                </h1>
                <p className="text-sm text-patas-blue-600">Clínica Veterinária</p>
              </div>
            )}
          </div>
          <button
            onClick={onToggleCollapse}
            className="p-1 hover:bg-patas-orange-100 rounded-lg transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 text-patas-blue-500" />
            ) : (
              <ChevronLeft className="h-4 w-4 text-patas-blue-500" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={cn(
                'w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200',
                isActive 
                  ? 'bg-gradient-to-r from-patas-orange-100 to-patas-yellow-100 text-patas-blue-700 shadow-md border border-patas-orange-200' 
                  : 'text-patas-blue-600 hover:bg-gradient-to-r hover:from-patas-orange-50 hover:to-patas-yellow-50 hover:text-patas-blue-700'
              )}
            >
              <Icon className={cn(
                "h-5 w-5 flex-shrink-0",
                isActive ? "text-patas-orange-600" : "text-patas-blue-500"
              )} />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Info */}
      {!isCollapsed && user && (
        <div className="p-4 border-t border-patas-orange-200 bg-gradient-to-r from-patas-blue-50 to-patas-orange-50">
          <div className="flex items-center space-x-3">
            <img
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
              alt={user.name}
              className="h-8 w-8 rounded-full border-2 border-patas-orange-300"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-patas-blue-800 truncate">{user.name}</p>
              <p className="text-xs text-patas-blue-600 capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};