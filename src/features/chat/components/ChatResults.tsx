import { useEffect, useRef } from "react";
import gsap from "gsap";


interface ChatResultsProps {
    setResults: (results: boolean) => void
    results: boolean
}

function ChatResults({ setResults, results }: ChatResultsProps) {
    const boxRef = useRef<HTMLDivElement>(null);

    console.log(setResults);

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

        <div
            ref={boxRef}
            className={`${results
                ? "w-full bg-secondary border border-primary/10 shadow-2xl rounded-2xl p-5 h-full"
                : "h-0  bg-transparent border border-transparent shadow-none  "}
                transition-all duration-500 ease-in
                `}>
            {
                results && <small>Resultados</small>
            }
        </div>
    )
}

export default ChatResults