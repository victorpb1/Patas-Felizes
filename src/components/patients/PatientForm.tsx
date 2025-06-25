import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { useData } from '../../contexts/DataContext';

interface PatientFormProps {
  onClose: () => void;
  onSuccess: () => void;
}

export const PatientForm: React.FC<PatientFormProps> = ({ onClose, onSuccess }) => {
  const { tutors, addPatient } = useData();
  const [formData, setFormData] = useState({
    name: '',
    tutorId: '',
    species: '',
    breed: '',
    gender: '' as 'macho' | 'femea' | '',
    birthDate: '',
    weight: '',
    color: '',
    observations: '',
    allergies: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const speciesOptions = [
    { value: 'Cão', label: 'Cão' },
    { value: 'Gato', label: 'Gato' },
    { value: 'Coelho', label: 'Coelho' },
    { value: 'Hamster', label: 'Hamster' },
    { value: 'Pássaro', label: 'Pássaro' },
    { value: 'Outro', label: 'Outro' }
  ];

  const genderOptions = [
    { value: 'macho', label: 'Macho' },
    { value: 'femea', label: 'Fêmea' }
  ];

  const tutorOptions = tutors.map(tutor => ({
    value: tutor.id,
    label: tutor.name
  }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!formData.tutorId) newErrors.tutorId = 'Tutor é obrigatório';
    if (!formData.species) newErrors.species = 'Espécie é obrigatória';
    if (!formData.breed.trim()) newErrors.breed = 'Raça é obrigatória';
    if (!formData.gender) newErrors.gender = 'Sexo é obrigatório';
    if (!formData.birthDate) newErrors.birthDate = 'Data de nascimento é obrigatória';
    if (!formData.weight || isNaN(Number(formData.weight))) newErrors.weight = 'Peso deve ser um número válido';
    if (!formData.color.trim()) newErrors.color = 'Cor é obrigatória';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const allergiesArray = formData.allergies
        ? formData.allergies.split(',').map(a => a.trim()).filter(a => a)
        : [];

      addPatient({
        name: formData.name.trim(),
        tutorId: formData.tutorId,
        species: formData.species,
        breed: formData.breed.trim(),
        gender: formData.gender as 'macho' | 'femea',
        birthDate: new Date(formData.birthDate),
        weight: Number(formData.weight),
        color: formData.color.trim(),
        observations: formData.observations.trim(),
        allergies: allergiesArray
      });

      onSuccess();
    } catch (error) {
      console.error('Erro ao cadastrar paciente:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Cadastrar Novo Paciente"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nome do Animal"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            required
          />

          <Select
            label="Tutor"
            value={formData.tutorId}
            onChange={(e) => setFormData({ ...formData, tutorId: e.target.value })}
            options={tutorOptions}
            error={errors.tutorId}
            required
          />

          <Select
            label="Espécie"
            value={formData.species}
            onChange={(e) => setFormData({ ...formData, species: e.target.value })}
            options={speciesOptions}
            error={errors.species}
            required
          />

          <Input
            label="Raça"
            value={formData.breed}
            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
            error={errors.breed}
            required
          />

          <Select
            label="Sexo"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value as 'macho' | 'femea' })}
            options={genderOptions}
            error={errors.gender}
            required
          />

          <Input
            label="Data de Nascimento"
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            error={errors.birthDate}
            required
          />

          <Input
            label="Peso (kg)"
            type="number"
            step="0.1"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            error={errors.weight}
            required
          />

          <Input
            label="Cor"
            value={formData.color}
            onChange={(e) => setFormData({ ...formData, color: e.target.value })}
            error={errors.color}
            required
          />
        </div>

        <Input
          label="Alergias (separadas por vírgula)"
          value={formData.allergies}
          onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
          placeholder="Ex: Frango, Beef, Milho"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observações
          </label>
          <textarea
            value={formData.observations}
            onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
            rows={3}
            className="block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            placeholder="Observações gerais sobre o animal..."
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar Paciente'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};