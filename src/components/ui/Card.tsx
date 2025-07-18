
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
            className="w-full flex justify-center items-center relative">

            <div className="relative group h-40 w-40 p-5 cursor-pointer">
                <div className="absolute left-[50%] top-0 -translate-x-1/2  mx-auto rounded-full  translate-y-10 bg-primary/10 blur-xl transition-all duration-200 ease-in-out"></div>
                <div className={` 
                        ${isSelected
                        ? "bg-black border border-danger"
                        : "bg-black border border-red-950 border-b border-b-blue-200/15 border-e border-e-blue-200/15"
                    } 
                        relative w-full h-full  rounded-2xl p-2 overflow-hidden  `}>
                    <div className={`absolute left-0 top-0 w-full h-full -translate-y-24 group-hover:translate-x-10  blur-xl group-hover:bg-danger group-hover:translate-y-20 transition-all duration-1000 ease-in-out
                        ${isSelected
                            ? "bg-danger translate-y-20 translate-x-10 w-full h-full"
                            : "bg-danger -translate-x-20 "
                        }
                        `}></div>
                    <div className={`relative w-full h-full  rounded-xl border-t border-primary/20 shadow-md shadow-black/10 transition-all duration-1000 ease-in-out
                        ${isSelected
                            ? "bg-danger/40"
                            : "bg-black"}`}>
                        <div className='flex justify-center items-center w-full h-full overflow-hidden'>
                            <div className="absolute w-10 h-20 bg-danger/40 rounded-full blur-xl bottom-0 left-0 "></div>
                            <div className="absolute w-10 h-10 bg-primary/70 rounded-full blur-xl top-0 right-0 "></div>
                            <small className={`relative uppercase text-[11px] font-bold 
                                ${isSelected ? "text-accent" : "text-primary/50"} group-hover:text-primary transition-all duration-500`}>
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