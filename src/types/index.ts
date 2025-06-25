export interface User {
  id: string;
  name: string;
  email: string;
  role: 'recepcionista' | 'veterinario' | 'administrador' | 'estoquista';
  avatar?: string;
}

export interface Tutor {
  id: string;
  name: string;
  cpf: string;
  rg: string;
  phone: string;
  email: string;
  address: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Patient {
  id: string;
  name: string;
  tutorId: string;
  species: string;
  breed: string;
  gender: 'macho' | 'femea';
  birthDate: Date;
  weight: number;
  color: string;
  observations?: string;
  allergies?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  veterinarianId: string;
  date: Date;
  time: string;
  service: string;
  status: 'agendado' | 'confirmado' | 'realizado' | 'cancelado';
  observations?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  veterinarianId: string;
  appointmentId?: string;
  date: Date;
  anamnesis: string;
  diagnosis: string;
  treatment: string;
  prescription?: Prescription[];
  observations?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  supplier: string;
  stock: number;
  minStock: number;
  costPrice: number;
  sellPrice: number;
  expirationDate: Date;
  batch: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sale {
  id: string;
  patientId?: string;
  tutorId: string;
  items: SaleItem[];
  total: number;
  paymentMethod: 'dinheiro' | 'cartao' | 'pix';
  status: 'pendente' | 'pago' | 'cancelado';
  createdAt: Date;
  updatedAt: Date;
}

export interface SaleItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}