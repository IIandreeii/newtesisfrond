"use client";
import React, { createContext, useContext, useRef, ReactNode } from 'react';
import { Toast } from 'primereact/toast';
import { ToastMessage } from 'primereact/toast';
// Añade estas importaciones
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // tema (o el que prefieras)
import 'primereact/resources/primereact.min.css';                    // core
import 'primeicons/primeicons.css';                                  // iconos

// Interfaz corregida sin [x: string] que causa el error de any
interface ToastContextType {
    showError: (message: string) => void;
    showSuccess: (message: string) => void;
    // Si necesitas propiedades adicionales, defínelas explícitamente aquí
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = (): ToastContextType => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const toast = useRef<Toast>(null);

    const showError = (message: string) => {
        toast.current?.show({
            severity: 'error',
            summary: 'Error',
            detail: message,
            life: 3000,
        } as ToastMessage);
    };

    const showSuccess = (message: string) => {
        toast.current?.show({
            severity: 'success',
            summary: 'Success',
            detail: message,
            life: 3000,
        } as ToastMessage);
    };

    return (
        <ToastContext.Provider value={{ showError, showSuccess }}>
            <Toast ref={toast} />
            {children}
        </ToastContext.Provider>
    );
};