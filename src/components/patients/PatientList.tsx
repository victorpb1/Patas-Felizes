import React, { useState } from 'react';
import { Search, Plus, Edit, Eye, Calendar } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { PatientForm } from './PatientForm';
import { TutorForm } from './TutorForm';

export const PatientList: React.FC = () => {
  const { patients, tutors } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showPatientForm, setShowPatientForm] = useState(false);
  const [showTutorForm, setShowTutorForm] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTutorName = (tutorId: string) => {
    const tutor = tutors.find(t => t.id === tutorId);
    return tutor?.name || 'Tutor não encontrado';
  };

  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  const canWrite = user?.role === 'recepcionista' || user?.role === 'administrador';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pacientes</h1>
          <p className="text-gray-600">Gerencie os pacientes da clínica</p>
        </div>
        {canWrite && (
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowTutorForm(true)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Tutor
            </Button>
            <Button onClick={() => setShowPatientForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Paciente
            </Button>
          </div>
        )}
      </div>

      {/* Search */}
      <Card>
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar pacientes por nome, espécie ou raça..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="h-4 w-4" />}
            />
          </div>
        </div>
      </Card>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id}>
            <div className="space-y-4">
              {/* Patient Info */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{patient.name}</h3>
                  <p className="text-sm text-gray-600">{getTutorName(patient.tutorId)}</p>
                </div>
                <Badge variant="info">{patient.species}</Badge>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Raça:</span>
                  <span className="text-gray-900">{patient.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Idade:</span>
                  <span className="text-gray-900">{calculateAge(patient.birthDate)} anos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sexo:</span>
                  <span className="text-gray-900 capitalize">{patient.gender}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Peso:</span>
                  <span className="text-gray-900">{patient.weight} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cor:</span>
                  <span className="text-gray-900">{patient.color}</span>
                </div>
              </div>

              {/* Allergies */}
              {patient.allergies && patient.allergies.length > 0 && (
                <div className="p-3 bg-red-50 rounded-lg">
                  <p className="text-sm font-medium text-red-800">Alergias:</p>
                  <p className="text-sm text-red-700">{patient.allergies.join(', ')}</p>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setSelectedPatient(patient.id)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Ver
                </Button>
                {canWrite && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Calendar className="h-4 w-4 mr-1" />
                  Agendar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum paciente encontrado
            </h3>
            <p className="text-gray-600">
              {searchTerm ? 'Tente ajustar sua busca' : 'Comece cadastrando um novo paciente'}
            </p>
          </div>
        </Card>
      )}

      {/* Modals */}
      {showPatientForm && (
        <PatientForm 
          onClose={() => setShowPatientForm(false)}
          onSuccess={() => setShowPatientForm(false)}
        />
      )}

      {showTutorForm && (
        <TutorForm 
          onClose={() => setShowTutorForm(false)}
          onSuccess={() => setShowTutorForm(false)}
        />
      )}
    </div>
  );
};