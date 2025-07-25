import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LuUser, LuBot, LuSparkles, LuVolume2, LuVolumeX } from 'react-icons/lu';
import type { ChatMessage } from "../types/chatTypes";
import ConnectionStatus from "./ConnectionStatus";
import { useVoice } from "../hooks/useVoice";

interface ChatResultsProps {
    setResults: (results: boolean) => void
    results: boolean
    messages: ChatMessage[]
    loading: boolean
    error?: string
    isConnected?: boolean
}

function ChatResults({ setResults, messages, loading, error, isConnected = true }: ChatResultsProps) {
    const boxRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { isSpeaking, speak, stopSpeaking, speechSupported } = useVoice();

    console.log(setResults);

    useEffect(() => {
        if (boxRef.current) {
            gsap.fromTo(
                boxRef.current,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 0.5 }
            );
        }
    }, []);

    useEffect(() => {
        // Scroll automático al último mensaje de forma más controlada
        if (messagesEndRef.current && messages.length > 0) {
            const parent = messagesEndRef.current.parentElement;
            if (parent) {
                parent.scrollTop = parent.scrollHeight;
            }
        }
    }, [messages]);

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const handleSpeak = (text: string) => {
        if (isSpeaking) {
            stopSpeaking();
        } else {
            speak(text);
        }
    };




    return (
        <div
            ref={boxRef}
            className={`w-full transition-all duration-500 ease-in-out h-[490px]  shadow-2xl rounded-t-2xl p-5 flex flex-col opacity-100`}>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-primary/20 flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <LuSparkles className="text-accent" size={16} />
                            <small className="text-primary/70 font-medium">Conversación</small>
                        </div>

                        <div className="flex items-center gap-2">
                            <ConnectionStatus isConnected={isConnected} error={error} />
                            {loading && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-accent"></div>
                            )}
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-2 min-h-0 max-h-[calc(100vh-362px)]">
                        {messages.length === 0 && !loading && (
                            <div className="text-center text-primary/50 py-8">
                                <LuBot size={32} className="mx-auto mb-2 opacity-50" />
                                <p>¡Hola! Soy tu asistente IA. ¿En qué puedo ayudarte hoy?</p>
                                <p className="text-xs mt-2 opacity-70">
                                    Puedes seleccionar elementos de los botones Superiores para incluirlos en tu consulta.
                                </p>
                            </div>
                        )}

                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                {message.role === 'assistant' && (
                                    <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                                        <LuBot size={16} className="text-accent" />
                                    </div>
                                )}

                                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                                    <div
                                        className={`p-3 rounded-2xl ${message.role === 'user'
                                            ? 'bg-accent text-white rounded-br-sm'
                                            : 'bg-background border border-primary/20 text-primary rounded-bl-sm'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="text-sm leading-relaxed whitespace-pre-wrap flex-1">
                                                {message.content}
                                            </p>
                                            
                                            {/* Botón de síntesis de voz solo para mensajes del asistente */}
                                            {message.role === 'assistant' && speechSupported && (
                                                <button
                                                    onClick={() => handleSpeak(message.content)}
                                                    className={`flex-shrink-0 p-1 rounded-full hover:bg-primary/20 transition-colors ${
                                                        isSpeaking ? 'text-accent animate-pulse' : 'text-primary/60 hover:text-primary'
                                                    }`}
                                                    title={isSpeaking ? 'Detener lectura' : 'Leer mensaje'}
                                                >
                                                    {isSpeaking ? <LuVolumeX size={14} /> : <LuVolume2 size={14} />}
                                                </button>
                                            )}
                                        </div>

                                        {message.selectedItem && (
                                            <div className="mt-2 pt-2 border-t border-white/20">
                                                <div className="flex flex-wrap gap-1">
                                                    <span
                                                        className="text-xs bg-white/20 px-2 py-1 rounded-full"
                                                    >
                                                        {message.selectedItem.name}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className={`text-xs text-primary/50 mt-1 ${message.role === 'user' ? 'text-right' : 'text-left'
                                        }`}>
                                        {formatTime(message.timestamp)}
                                    </div>
                                </div>

                                {message.role === 'user' && (
                                    <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center order-2">
                                        <LuUser size={16} className="text-primary" />
                                    </div>
                                )}
                            </div>
                        ))}

                        {loading && (
                            <div className="flex gap-3 justify-start">
                                <div className="flex-shrink-0 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                                    <LuBot size={16} className="text-accent" />
                                </div>
                                <div className="bg-background border border-primary/20 p-3 rounded-2xl rounded-bl-sm">
                                    <div className="flex space-x-1">
                                        <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                                        <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                        <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
        </div>
    )
}

export default ChatResults