import React, { createContext, useContext, useState, useEffect } from 'react';
import { Tutor, Patient, Appointment, MedicalRecord, Product, Sale, Notification } from '../types';

interface DataContextType {
  tutors: Tutor[];
  patients: Patient[];
  appointments: Appointment[];
  medicalRecords: MedicalRecord[];
  products: Product[];
  sales: Sale[];
  notifications: Notification[];
  addTutor: (tutor: Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addPatient: (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addMedicalRecord: (record: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  addSale: (sale: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProductStock: (productId: string, quantity: number) => void;
  markNotificationAsRead: (notificationId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Initialize with mock data
  useEffect(() => {
    const mockTutors: Tutor[] = [
      {
        id: '1',
        name: 'João Silva',
        cpf: '123.456.789-00',
        rg: '12.345.678-9',
        phone: '(11) 99999-9999',
        email: 'joao@email.com',
        address: {
          street: 'Rua das Flores',
          number: '123',
          neighborhood: 'Centro',
          city: 'São Paulo',
          state: 'SP',
          zipCode: '01234-567'
        },
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      }
    ];

    const mockPatients: Patient[] = [
      {
        id: '1',
        name: 'Rex',
        tutorId: '1',
        species: 'Cão',
        breed: 'Golden Retriever',
        gender: 'macho',
        birthDate: new Date('2020-05-15'),
        weight: 25.5,
        color: 'Dourado',
        allergies: ['Frango'],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      }
    ];

    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Ração Premium Cães',
        description: 'Ração super premium para cães adultos',
        category: 'Alimentação',
        supplier: 'PetFood Brasil',
        stock: 50,
        minStock: 10,
        costPrice: 45.00,
        sellPrice: 65.00,
        expirationDate: new Date('2024-12-31'),
        batch: 'LOT001',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10')
      },
      {
        id: '2',
        name: 'Vermífugo Canino',
        description: 'Vermífugo para cães de porte médio',
        category: 'Medicamentos',
        supplier: 'VetMed',
        stock: 5,
        minStock: 15,
        costPrice: 18.00,
        sellPrice: 28.00,
        expirationDate: new Date('2025-06-30'),
        batch: 'VM2024',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10')
      }
    ];

    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'warning',
        title: 'Estoque Baixo',
        message: 'Vermífugo Canino está com estoque abaixo do mínimo (5 unidades)',
        read: false,
        createdAt: new Date()
      },
      {
        id: '2',
        type: 'info',
        title: 'Consulta Agendada',
        message: 'Nova consulta agendada para Rex às 14:00',
        read: false,
        createdAt: new Date()
      }
    ];

    setTutors(mockTutors);
    setPatients(mockPatients);
    setProducts(mockProducts);
    setNotifications(mockNotifications);
  }, []);

  const addTutor = (tutorData: Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTutor: Tutor = {
      ...tutorData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setTutors(prev => [...prev, newTutor]);
  };

  const addPatient = (patientData: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newPatient: Patient = {
      ...patientData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setPatients(prev => [...prev, newPatient]);
  };

  const addAppointment = (appointmentData: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newAppointment: Appointment = {
      ...appointmentData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setAppointments(prev => [...prev, newAppointment]);
  };

  const addMedicalRecord = (recordData: Omit<MedicalRecord, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRecord: MedicalRecord = {
      ...recordData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setMedicalRecords(prev => [...prev, newRecord]);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const addSale = (saleData: Omit<Sale, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newSale: Sale = {
      ...saleData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setSales(prev => [...prev, newSale]);

    // Update product stock
    saleData.items.forEach(item => {
      updateProductStock(item.productId, -item.quantity);
    });
  };

  const updateProductStock = (productId: string, quantity: number) => {
    setProducts(prev => prev.map(product => 
      product.id === productId 
        ? { ...product, stock: Math.max(0, product.stock + quantity) }
        : product
    ));
  };

  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  return (
    <DataContext.Provider value={{
      tutors,
      patients,
      appointments,
      medicalRecords,
      products,
      sales,
      notifications,
      addTutor,
      addPatient,
      addAppointment,
      addMedicalRecord,
      addProduct,
      addSale,
      updateProductStock,
      markNotificationAsRead
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};