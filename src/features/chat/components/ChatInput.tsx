import { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { LuSend, LuSparkles, LuMic, LuMicOff, LuPaperclip } from 'react-icons/lu';
import Button from '../../../components/ui/Button';
import type { SendMessageRequest } from '../types/chatTypes';
import { useVoice } from '../hooks/useVoice';

interface ChatInputProps {
    setResults: (results: boolean) => void
    results: boolean
    isSelected?: { id: number, name: string }
    removeSelectedItem: () => void
    onSendMessage: (messageData: SendMessageRequest) => void
    loading?: boolean
}

function ChatInput({ setResults, results, isSelected, removeSelectedItem, onSendMessage, loading }: ChatInputProps) {
    const boxRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [inputValue, setInputValue] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const {
        isListening,
        transcript,
        startListening,
        stopListening,
        resetTranscript,
        isSupported,
        error
    } = useVoice();

    useEffect(() => {
        if (boxRef.current) {
            gsap.fromTo(
                boxRef.current,
                { opacity: 0, y: 300 },
                { opacity: 1, y: 0, duration: 1 }
            );
        }
    }, []);

    useEffect(() => {
        if (transcript) {
            setInputValue(transcript);
        }
    }, [transcript]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!inputValue.trim()) return;

        const messageData: SendMessageRequest = {
            prompt: inputValue.trim(),
            selectedItem: isSelected || undefined
        };

        onSendMessage(messageData);
        setInputValue('');
        resetTranscript();
        setResults(true);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    const handleVoiceToggle = () => {
        if (isListening) {
            stopListening();
        } else {
            resetTranscript();
            setInputValue('');
            startListening();
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            console.log('Archivo seleccionado:', file.name);
        }
    };

    const handleFileButtonClick = () => {
        fileInputRef.current?.click();
    };

    const removeSelectedFile = () => {
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            {/* Notificación de error */}
            {error && (
                <div className="fixed top-4 right-4 z-50 bg-red-500/90 text-white px-4 py-2 rounded-lg shadow-lg border border-red-400 animate-pulse">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-300 rounded-full"></div>
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                </div>
            )}

            <div
                ref={boxRef}
                className={` z-2 
                    
                    ${results
                        ? `bg-gradient-to-tl from-danger/20 to-black backdrop-blur-xl -mt-36 mx-1`
                        : 'bg-secondary   '}
                         border border-primary/20 text-white flex flex-col justify-start items-center  rounded-2xl min-h-35 overflow-hidden shadow-2xl shadow-background/40 transition-all duration-200 ease-in `}
            >
                <div className='w-full h-10 flex items-center justify-between p-2 '>
                    <div className='bg-background px-2 flex justify-center items-center gap-1 rounded-2xl rounded-bl-none py-0.5 border border-primary/20 shadow shadow-black'>
                        <LuSparkles size={13} className='text-accent' />
                        <h5 className='text-primary/70 pe-3'>
                            Chat <span className='font-bold'>IA</span>
                        </h5>
                    </div>

                    {/* Indicador de grabación */}
                    {isListening && (
                        <div className='bg-red-500/20 px-3 py-1 flex justify-center items-center gap-2 rounded-full border border-red-500/30 animate-pulse'>
                            <div className='w-2 h-2 bg-red-400 rounded-full animate-ping'></div>
                            <span className='text-red-400 text-xs font-medium'>Grabando...</span>
                        </div>
                    )}

                    {isSelected && (
                        <div className='flex flex-wrap gap-1'>
                            <div
                                className='bg-background px-2 flex justify-center items-center gap-1 rounded-2xl py-0.5 border border-primary/20 shadow shadow-black cursor-pointer hover:bg-black/50 transition-colors'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeSelectedItem();
                                }}
                            >
                                <LuSparkles size={13} className='text-accent' />
                                <h5 className='text-primary/70'>
                                    {isSelected.name} <span className='text-xs opacity-50'>#{isSelected.id}</span>
                                </h5>
                            </div>
                        </div>
                    )}
                </div>

                {selectedFile && (
                    <div className='w-full px-4 pb-2'>
                        <div className='bg-primary/10 border border-primary/20 rounded-lg p-2 flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                                <LuPaperclip size={14} className='text-accent' />
                                <span className='text-sm text-primary/80 truncate max-w-48'>
                                    {selectedFile.name}
                                </span>
                                <span className='text-xs text-primary/50'>
                                    ({(selectedFile.size / 1024).toFixed(1)} KB)
                                </span>
                            </div>
                            <button
                                onClick={removeSelectedFile}
                                className='text-red-400 hover:text-red-300 transition-colors text-sm'
                                title='Eliminar archivo'
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className='w-full h-20 grid grid-cols-12 '>
                    {/* Botón para subir archivos */}
                    <div className='w-full h-full flex justify-center items-center'>
                        <input
                            ref={fileInputRef}
                            type='file'
                            onChange={handleFileSelect}
                            className='hidden'
                            accept='.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.gif'
                        />
                        <Button
                            type="button"
                            variant='ghost'
                            className={`flex justify-center items-center transition-all duration-200 ${selectedFile
                                ? 'text-accent bg-accent/10 border border-accent/20'
                                : 'text-primary hover:bg-primary/10 hover:text-accent'
                                }`}
                            onClick={handleFileButtonClick}
                            disabled={loading}
                            title='Subir archivo'
                        >
                            <LuPaperclip size={18} />
                        </Button>
                    </div>

                    {
                        isSelected?.id !== 4 ? <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder={isListening ? '🎤 Escuchando...' : 'Actualmente solo disponible STACK'}
                            className={`px-10 w-[95%] h-full col-span-10 outline-none text-white p-2 text-sm bg-transparent transition-all duration-200 ${isListening
                                ? 'animate-pulse border-l-2 border-red-400 bg-red-500/5'
                                : 'focus:bg-white/5'
                                } cursor-not-allowed`}
                            disabled={true}
                        /> :
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder={isListening ? '🎤 Escuchando...' : 'Hazme una pregunta aquí...'}
                                className={`px-10 w-[95%] h-full col-span-10 outline-none text-white p-2 text-sm bg-transparent transition-all duration-200 ${isListening
                                    ? 'animate-pulse border-l-2 border-red-400 bg-red-500/5'
                                    : 'focus:bg-white/5'
                                    }`}
                                disabled={loading}
                            />
                    }


                    {/* Botón de reconocimiento de voz */}
                    {isSupported && (
                        <div className='w-full h-full flex justify-center items-center pe-10'>
                            <Button
                                type="button"
                                variant='ghost'
                                className={`flex justify-center items-center transition-all duration-200 ${isListening
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/20 animate-pulse'
                                    : 'text-primary hover:bg-primary/10 hover:text-accent'
                                    }`}
                                onClick={handleVoiceToggle}
                                disabled={loading}
                                title={isListening ? 'Detener grabación' : 'Iniciar grabación de voz'}
                            >
                                {isListening ? <LuMicOff size={18} /> : <LuMic size={18} />}
                            </Button>
                            <Button
                                type="submit"
                                variant='ghost'
                                className='flex justify-center items-center'
                                disabled={loading || !inputValue.trim()}
                            >
                                <LuSend />
                            </Button>
                        </div>
                    )}

                </form>
            </div>
        </>
    )
}

export default ChatInput


