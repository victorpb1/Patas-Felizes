import React from 'react';
import { 
  Users, 
  Calendar, 
  Package, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  Activity,
  Heart
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatCurrency } from '../../utils/validations';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { patients, appointments, products, sales, notifications } = useData();

  const todayAppointments = appointments.filter(
    appointment => new Date(appointment.date).toDateString() === new Date().toDateString()
  );

  const lowStockProducts = products.filter(product => product.stock <= product.minStock);
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const unreadNotifications = notifications.filter(n => !n.read);

  const stats = [
    {
      title: 'Pacientes Cadastrados',
      value: patients.length,
      icon: Users,
      color: 'text-patas-blue-600',
      bgColor: 'bg-gradient-to-br from-patas-blue-100 to-patas-blue-200',
      visible: ['recepcionista', 'veterinario', 'administrador']
    },
    {
      title: 'Consultas Hoje',
      value: todayAppointments.length,
      icon: Calendar,
      color: 'text-patas-orange-600',
      bgColor: 'bg-gradient-to-br from-patas-orange-100 to-patas-yellow-100',
      visible: ['recepcionista', 'veterinario', 'administrador']
    },
    {
      title: 'Produtos em Estoque',
      value: products.length,
      icon: Package,
      color: 'text-patas-blue-600',
      bgColor: 'bg-gradient-to-br from-patas-blue-100 to-patas-blue-200',
      visible: ['administrador', 'estoquista']
    },
    {
      title: 'Produtos com Estoque Baixo',
      value: lowStockProducts.length,
      icon: AlertTriangle,
      color: 'text-patas-orange-600',
      bgColor: 'bg-gradient-to-br from-patas-orange-100 to-patas-yellow-100',
      visible: ['administrador', 'estoquista']
    },
    {
      title: 'Faturamento Total',
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
      visible: ['administrador']
    }
  ];

  const visibleStats = stats.filter(stat => 
    user && stat.visible.includes(user.role)
  );

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-patas-orange-500 via-patas-yellow-500 to-patas-blue-500 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 drop-shadow-sm">
              Bem-vindo, {user?.name}!
            </h1>
            <p className="text-white/90 text-lg">
              {user?.role === 'estoquista' 
                ? 'Mantenha o estoque sempre organizado e atualizado'
                : 'Tenha um ótimo dia cuidando dos nossos amigos de quatro patas'
              }
            </p>
          </div>
          <div className="hidden md:block">
            <Heart className="h-20 w-20 text-white/20" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-patas-blue-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-patas-blue-800 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bgColor} shadow-sm`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Alerts and Notifications */}
      {unreadNotifications.length > 0 && (
        <Card className="border-patas-orange-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-patas-blue-800">Notificações</h3>
            <Badge variant="warning" className="bg-patas-orange-100 text-patas-orange-800">
              {unreadNotifications.length} não lidas
            </Badge>
          </div>
          <div className="space-y-3">
            {unreadNotifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className="flex items-start space-x-3 p-3 bg-gradient-to-r from-patas-orange-50 to-patas-yellow-50 rounded-lg border border-patas-orange-200">
                <div className={`p-1 rounded-full ${
                  notification.type === 'warning' ? 'bg-patas-orange-100' :
                  notification.type === 'error' ? 'bg-red-100' :
                  notification.type === 'success' ? 'bg-green-100' :
                  'bg-patas-blue-100'
                }`}>
                  <AlertTriangle className={`h-4 w-4 ${
                    notification.type === 'warning' ? 'text-patas-orange-600' :
                    notification.type === 'error' ? 'text-red-600' :
                    notification.type === 'success' ? 'text-green-600' :
                    'text-patas-blue-600'
                  }`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-patas-blue-800">{notification.title}</p>
                  <p className="text-sm text-patas-blue-600">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Appointments - Not visible for Estoquista */}
        {user?.role !== 'estoquista' && (
          <Card className="border-patas-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-patas-blue-800">Consultas de Hoje</h3>
              <Activity className="h-5 w-5 text-patas-blue-400" />
            </div>
            {todayAppointments.length > 0 ? (
              <div className="space-y-3">
                {todayAppointments.slice(0, 3).map((appointment) => {
                  const patient = patients.find(p => p.id === appointment.patientId);
                  return (
                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-patas-blue-50 to-patas-orange-50 rounded-lg border border-patas-blue-200">
                      <div>
                        <p className="font-medium text-patas-blue-800">{patient?.name}</p>
                        <p className="text-sm text-patas-blue-600">{appointment.service}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-patas-blue-800">{appointment.time}</p>
                        <Badge variant={
                          appointment.status === 'confirmado' ? 'success' :
                          appointment.status === 'agendado' ? 'info' :
                          appointment.status === 'realizado' ? 'default' :
                          'warning'
                        }>
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-patas-blue-500 text-center py-4">Nenhuma consulta agendada para hoje</p>
            )}
          </Card>
        )}

        {/* Low Stock Alert - Visible for Admin and Estoquista */}
        {(user?.role === 'administrador' || user?.role === 'estoquista') && (
          <Card className="border-patas-orange-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-patas-blue-800">Estoque Baixo</h3>
              <Package className="h-5 w-5 text-patas-orange-400" />
            </div>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-3">
                {lowStockProducts.slice(0, 3).map((product) => (
                  <div key={product.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-patas-orange-50 rounded-lg border border-red-200">
                    <div>
                      <p className="font-medium text-patas-blue-800">{product.name}</p>
                      <p className="text-sm text-patas-blue-600">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-red-600">{product.stock} unidades</p>
                      <p className="text-xs text-patas-blue-500">Mín: {product.minStock}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-patas-blue-500 text-center py-4">Todos os produtos estão com estoque adequado</p>
            )}
          </Card>
        )}

        {/* Products Overview for Estoquista */}
        {user?.role === 'estoquista' && (
          <Card className="border-patas-blue-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-patas-blue-800">Resumo do Estoque</h3>
              <Package className="h-5 w-5 text-patas-blue-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-patas-blue-50 to-patas-blue-100 rounded-lg border border-patas-blue-200">
                <span className="text-sm font-medium text-patas-blue-800">Total de Produtos</span>
                <span className="text-lg font-bold text-patas-blue-700">{products.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <span className="text-sm font-medium text-green-800">Estoque Adequado</span>
                <span className="text-lg font-bold text-green-700">{products.length - lowStockProducts.length}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gradient-to-r from-patas-orange-50 to-patas-yellow-50 rounded-lg border border-patas-orange-200">
                <span className="text-sm font-medium text-patas-orange-800">Estoque Baixo</span>
                <span className="text-lg font-bold text-patas-orange-700">{lowStockProducts.length}</span>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};