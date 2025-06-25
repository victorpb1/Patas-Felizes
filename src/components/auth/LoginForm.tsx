import React, { useState } from 'react';
import { Heart, User, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Credenciais inválidas. Tente novamente.');
      }
    } catch (err) {
      setError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-patas-orange-100 via-patas-yellow-50 to-patas-blue-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-patas-orange-200">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-patas-orange-500 to-patas-yellow-500 rounded-full mb-4 shadow-lg">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-patas-blue-600 to-patas-blue-800 bg-clip-text text-transparent mb-2">
              Patas Felizes
            </h1>
            <p className="text-patas-blue-600 font-medium">Sistema de Gestão Veterinária</p>
          </div>

          {/* Demo Credentials */}
          <div className="mb-6 p-4 bg-gradient-to-r from-patas-blue-50 to-patas-orange-50 rounded-lg border border-patas-blue-200">
            <h3 className="text-sm font-semibold text-patas-blue-800 mb-3 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Credenciais Demo:
            </h3>
            <div className="text-xs text-patas-blue-700 space-y-1">
              <p><strong>Recepcionista:</strong> ana@patasfelizes.com</p>
              <p><strong>Veterinário:</strong> carlos@patasfelizes.com</p>
              <p><strong>Administrador:</strong> maria@patasfelizes.com</p>
              <p><strong>Estoquista:</strong> pedro@patasfelizes.com</p>
              <p className="pt-1 border-t border-patas-blue-200"><strong>Senha:</strong> 123456</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              type="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<User className="h-4 w-4" />}
              required
            />

            <Input
              type="password"
              label="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
              required
            />

            {error && (
              <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-patas-blue-500">
              © 2024 Patas Felizes. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};