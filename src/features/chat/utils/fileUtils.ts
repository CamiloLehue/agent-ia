import type { FileAttachment } from '../types/chatTypes';

// Tipos de archivo permitidos (modular)
export const FILE_TYPES = {
    PDF: 'application/pdf',
    DOC: 'application/msword',
    DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    TXT: 'text/plain',
    IMAGE_JPEG: 'image/jpeg',
    IMAGE_PNG: 'image/png',
    IMAGE_GIF: 'image/gif'
} as const;

// Configuraciones predefinidas de formatos
export const FORMAT_CONFIGS = {
    PDF_ONLY: [FILE_TYPES.PDF],
    DOCUMENTS: [FILE_TYPES.PDF, FILE_TYPES.DOC, FILE_TYPES.DOCX, FILE_TYPES.TXT],
    IMAGES: [FILE_TYPES.IMAGE_JPEG, FILE_TYPES.IMAGE_PNG, FILE_TYPES.IMAGE_GIF],
    ALL: Object.values(FILE_TYPES)
} as const;

// Tamaño máximo de archivo (5MB por defecto)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

/**
 * Valida si un archivo cumple con los formatos permitidos
 */
export const validateFileType = (file: File, allowedTypes: readonly string[]): boolean => {
    return allowedTypes.includes(file.type);
};

/**
 * Valida el tamaño del archivo
 */
export const validateFileSize = (file: File, maxSize: number = MAX_FILE_SIZE): boolean => {
    return file.size <= maxSize;
};

/**
 * Convierte un archivo a base64
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                // Remover el prefijo "data:tipo/subtipo;base64," para obtener solo el base64
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            } else {
                reject(new Error('Error al leer el archivo'));
            }
        };
        
        reader.onerror = () => {
            reject(new Error('Error al leer el archivo'));
        };
        
        reader.readAsDataURL(file);
    });
};

/**
 * Procesa un archivo y lo convierte a FileAttachment
 */
export const processFile = async (
    file: File, 
    allowedTypes: readonly string[] = FORMAT_CONFIGS.PDF_ONLY
): Promise<FileAttachment> => {
    // Validar tipo de archivo
    if (!validateFileType(file, allowedTypes)) {
        const allowedExtensions = allowedTypes.map(type => {
            switch (type) {
                case FILE_TYPES.PDF: return 'PDF';
                case FILE_TYPES.DOC: return 'DOC';
                case FILE_TYPES.DOCX: return 'DOCX';
                case FILE_TYPES.TXT: return 'TXT';
                case FILE_TYPES.IMAGE_JPEG: return 'JPEG';
                case FILE_TYPES.IMAGE_PNG: return 'PNG';
                case FILE_TYPES.IMAGE_GIF: return 'GIF';
                default: return type;
            }
        }).join(', ');
        
        throw new Error(`Tipo de archivo no permitido. Solo se permiten: ${allowedExtensions}`);
    }
    
    // Validar tamaño
    // if (!validateFileSize(file)) {
    //     throw new Error(`El archivo es demasiado grande. Tamaño máximo: ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(1)}MB`);
    // }
    
    // Convertir a base64
    const base64 = await fileToBase64(file);
    
    return {
        name: file.name,
        type: file.type,
        size: file.size,
        base64
    };
};

/**
 * Formatea el tamaño del archivo para mostrar
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

/**
 * Obtiene el icono apropiado para el tipo de archivo
 */
export const getFileIcon = (fileType: string): string => {
    switch (fileType) {
        case FILE_TYPES.PDF:
            return '📄';
        case FILE_TYPES.DOC:
        case FILE_TYPES.DOCX:
            return '📝';
        case FILE_TYPES.TXT:
            return '📃';
        case FILE_TYPES.IMAGE_JPEG:
        case FILE_TYPES.IMAGE_PNG:
        case FILE_TYPES.IMAGE_GIF:
            return '🖼️';
        default:
            return '📎';
    }
};