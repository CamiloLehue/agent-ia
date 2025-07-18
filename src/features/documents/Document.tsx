
function Document() {
    return (
        <div className="relative w-full h-full">
            <div className="grid grid-cols-12 h-full w-full">

                <div className="col-span-2 relative bg-black border-e border-e-primary/20 flex justify-center py-10">
                    <h4 className="font-bold">Documentación de Agente IA</h4>
                    <nav className=" absolute top-0 left-0 w-full h-full z-10 flex flex-col justify-start items-center">

                    </nav>
                </div>
                <div className="w-full h-full col-span-10 bg-black">

                </div>
            </div>
        </div>
    )
}

export default Document