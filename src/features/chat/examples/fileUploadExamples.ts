// Ejemplo de cómo usar diferentes configuraciones de formatos de archivo

import { useFileUpload } from '../hooks/useFileUpload';
import { FORMAT_CONFIGS } from '../utils/fileUtils';

// Ejemplo 1: Solo PDF (configuración actual)
const pdfOnlyUpload = useFileUpload({
    allowedFormats: FORMAT_CONFIGS.PDF_ONLY
});

// Ejemplo 2: Documentos (PDF, DOC, DOCX, TXT)
const documentsUpload = useFileUpload({
    allowedFormats: FORMAT_CONFIGS.DOCUMENTS
});

// Ejemplo 3: Solo imágenes
const imagesUpload = useFileUpload({
    allowedFormats: FORMAT_CONFIGS.IMAGES
});

// Ejemplo 4: Todos los formatos
const allFormatsUpload = useFileUpload({
    allowedFormats: FORMAT_CONFIGS.ALL
});

// Ejemplo 5: Configuración personalizada
const customUpload = useFileUpload({
    allowedFormats: ['application/pdf', 'text/plain'], // Solo PDF y TXT
    onFileSelect: (file) => {
        console.log('Archivo seleccionado:', file);
    },
    onError: (error) => {
        console.error('Error:', error);
    }
});

export {
    pdfOnlyUpload,
    documentsUpload,
    imagesUpload,
    allFormatsUpload,
    customUpload
};