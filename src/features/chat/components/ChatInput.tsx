import { useEffect, useRef } from 'react'
import gsap from "gsap";
import { LuSend, LuSparkles } from 'react-icons/lu';
import Button from '../../../components/ui/Button';

interface ChatInputProps {
    setResults: (results: boolean) => void
     results: boolean
    isSelected: {id: number, name: string}[]
    removeSelectedItem: (itemId: number) => void
}

function ChatInput({ setResults, results, isSelected, removeSelectedItem }: ChatInputProps) {
    const boxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (boxRef.current) {
            gsap.fromTo(
                boxRef.current,
                { opacity: 0, y: 300 },
                { opacity: 1, y: 0, duration: 1 }
            );
        }
    }, []);

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

                    {isSelected && isSelected.length > 0 && (
                        <div className='flex flex-wrap gap-1'>
                            {isSelected.map((item) => (
                                <div 
                                    key={item.id}
                                    className='bg-background px-2 flex justify-center items-center gap-1 rounded-2xl py-0.5 border border-primary/20 shadow shadow-black cursor-pointer hover:bg-black/50 transition-colors'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeSelectedItem(item.id);
                                    }}
                                >
                                    <LuSparkles size={13} className='text-accent' />
                                    <h5 className='text-primary/70'>
                                        {item.name} <span className='text-xs opacity-50'>#{item.id}</span>
                                    </h5>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className=' w-full h-full grid grid-cols-12'>
                    <input type="text"
                        placeholder='Hazme una pregunta aquí...'
                        className='px-10 w-full h-full col-span-11 outline-none text-white p-2 text-sm' />
                    <div className='w-full h-full flex justify-center items-center'>
                        <Button
                            onClick={() => setResults(true)}
                            variant='ghost' className='flex justify-center items-center'>
                            <LuSend />
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatInput


