
interface CardProps {
    id: string | number;
    children: React.ReactNode;
    isSelected: boolean;
    onSelect: (id: string | number) => void;
}

function Card({ id, children, isSelected, onSelect }: CardProps) {

    return (
        <div
            onClick={() => onSelect(id)}
            className="w-full flex justify-center items-center relative group">
            <div className="relative group h-20 w-50 cursor-pointer">
                <div className="absolute left-[50%] top-0 -translate-x-1/2  mx-auto rounded-full  translate-y-10   transition-all duration-200 ease-in-out"></div>
                <div className={` 
                        ${isSelected
                        ? "shadow-xl shadow-accent/50 bg-accent/50"
                        : "bg-black/50 border-b border-b-accent/15 border-e border-e-accent/15"
                    } 
                        relative w-full h-full  rounded-2xl p-2 overflow-hidden  `}>
                    <div className={`absolute left-0 top-0 w-full h-full -translate-y-24 group-hover:translate-x-10  blur-xl group-hover:bg-accent group-hover:translate-y-20 transition-all duration-1000 ease-in-out
                        ${isSelected
                            ? "bg-accent translate-y-10 translate-x-10 w-full h-full"
                            : "bg-accent/20 -translate-x-10 "
                        }
                        `}></div>
                    <div className={`relative w-full h-full  rounded-xl border-t border-primary/20 shadow-md shadow-black/10 transition-all duration-1000 ease-in-out
                        ${isSelected
                            ? "bg-black"
                            : "bg-black"}`}>
                        <div className='flex justify-center items-center w-full h-full overflow-hidden'>
                            <div className="absolute w-10 h-20 bg-secondary/40 rounded-full blur-xl bottom-0 left-0 "></div>
                            <div className="absolute w-10 h-10 bg-accent/40 rounded-full blur-xl top-0 right-0 "></div>
                            <small className={`relative uppercase text-[11px] font-bold 
                                ${isSelected ? "text-primary" : "text-primary/50"} group-hover:text-primary transition-all duration-500`}>
                                {children}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card