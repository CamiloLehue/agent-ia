import { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { LuSend, LuSparkles, LuMic, LuMicOff } from 'react-icons/lu';
import Button from '../../../components/ui/Button';
import type { SendMessageRequest } from '../types/chatTypes';
import { useVoice } from '../hooks/useVoice';

interface ChatInputProps {
    setResults: (results: boolean) => void
    results: boolean
    isSelected?: {id: number, name: string}
    removeSelectedItem: () => void
    onSendMessage: (messageData: SendMessageRequest) => void
    loading?: boolean
}

function ChatInput({ setResults, results, isSelected, removeSelectedItem, onSendMessage, loading }: ChatInputProps) {
    const boxRef = useRef<HTMLDivElement>(null);
    const [inputValue, setInputValue] = useState('');
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
                        ? `bg-black backdrop-blur-xl -mt-36 mx-1`
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
                <form onSubmit={handleSubmit} className='w-full h-full grid grid-cols-12'>
                    <input 
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={isListening ? '🎤 Escuchando...' : 'Hazme una pregunta aquí...'}
                        className={`px-10 w-full h-full col-span-10 outline-none text-white p-2 text-sm bg-transparent transition-all duration-200 ${
                            isListening 
                                ? 'animate-pulse border-l-2 border-red-400 bg-red-500/5' 
                                : 'focus:bg-white/5'
                        }`}
                        disabled={loading}
                    />
                    
                    {/* Botón de reconocimiento de voz */}
                    {isSupported && (
                        <div className='w-full h-full flex justify-center items-center'>
                            <Button
                                type="button"
                                variant='ghost' 
                                className={`flex justify-center items-center transition-all duration-200 ${
                                    isListening 
                                        ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/20 animate-pulse' 
                                        : 'text-primary hover:bg-primary/10 hover:text-accent'
                                }`}
                                onClick={handleVoiceToggle}
                                disabled={loading}
                                title={isListening ? 'Detener grabación' : 'Iniciar grabación de voz'}
                            >
                                {isListening ? <LuMicOff size={18} /> : <LuMic size={18} />}
                            </Button>
                        </div>
                    )}
                    
                    {/* Botón de enviar */}
                    <div className='w-full h-full flex justify-center items-center'>
                        <Button
                            type="submit"
                            variant='ghost' 
                            className='flex justify-center items-center'
                            disabled={loading || !inputValue.trim()}
                        >
                            <LuSend />
                        </Button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ChatInput


