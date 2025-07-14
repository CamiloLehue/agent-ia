import { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { LuSend, LuSparkles } from 'react-icons/lu';
import Button from '../../../components/ui/Button';
import type { SendMessageRequest } from '../types/chatTypes';

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

    useEffect(() => {
        if (boxRef.current) {
            gsap.fromTo(
                boxRef.current,
                { opacity: 0, y: 300 },
                { opacity: 1, y: 0, duration: 1 }
            );
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!inputValue.trim()) return;

        const messageData: SendMessageRequest = {
            prompt: inputValue.trim(),
            selectedItem: isSelected || undefined
        };

        onSendMessage(messageData);
        setInputValue('');
        setResults(true);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <>
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
                        placeholder='Hazme una pregunta aquí...'
                        className='px-10 w-full h-full col-span-11 outline-none text-white p-2 text-sm bg-transparent'
                        disabled={loading}
                    />
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


