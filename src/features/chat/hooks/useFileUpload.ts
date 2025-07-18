import { useState, useRef } from 'react';
import type { FileAttachment } from '../types/chatTypes';
import { processFile, FORMAT_CONFIGS } from '../utils/fileUtils';

interface UseFileUploadOptions {
    allowedFormats?: readonly string[];
    onFileSelect?: (file: FileAttachment) => void;
    onError?: (error: string) => void;
}

export const useFileUpload = (options: UseFileUploadOptions = {}) => {
    const {
        allowedFormats = FORMAT_CONFIGS.PDF_ONLY,
        onFileSelect,
        onError
    } = options;

    const [selectedFile, setSelectedFile] = useState<FileAttachment | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        
        if (!file) return;

        setIsProcessing(true);
        setError(null);

        try {
            const fileAttachment = await processFile(file, allowedFormats);
            setSelectedFile(fileAttachment);
            onFileSelect?.(fileAttachment);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Error al procesar el archivo';
            setError(errorMessage);
            onError?.(errorMessage);
            
            // Limpiar el input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        } finally {
            setIsProcessing(false);
        }
    };

    const removeFile = () => {
        setSelectedFile(null);
        setError(null);
        
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const triggerFileSelect = () => {
        fileInputRef.current?.click();
    };

    // Crear el accept string para el input basado en los formatos permitidos
    const acceptString = allowedFormats.join(',');

    return {
        selectedFile,
        isProcessing,
        error,
        fileInputRef,
        handleFileSelect,
        removeFile,
        triggerFileSelect,
        acceptString
    };
};