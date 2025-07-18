import ButtonExample from "../../components/ui/ButtonExample"
import WibotsExample from "./WibotsExample"
import { GiruExample } from "./components/GiruExample"
import { useState } from "react"

function ExamplesPage() {
    const [activeExample, setActiveExample] = useState<string>("giru");

    return (
        <>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-6">Ejemplos de Componentes</h1>
                
                <div className="flex flex-wrap gap-4 mb-8">
                    <button 
                        className={`px-4 py-2 rounded-md ${activeExample === "giru" ? "bg-primary" : "bg-gray-700"}`}
                        onClick={() => setActiveExample("giru")}
                    >
                        Modelo 3D Giru
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-md ${activeExample === "wibots" ? "bg-primary" : "bg-gray-700"}`}
                        onClick={() => setActiveExample("wibots")}
                    >
                        Wibots Animado
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-md ${activeExample === "buttons" ? "bg-primary" : "bg-gray-700"}`}
                        onClick={() => setActiveExample("buttons")}
                    >
                        Botones
                    </button>
                    <button 
                        className={`px-4 py-2 rounded-md ${activeExample === "cards" ? "bg-primary" : "bg-gray-700"}`}
                        onClick={() => setActiveExample("cards")}
                    >
                        Cards
                    </button>
                </div>
                
                {activeExample === "giru" && (
                    <section className="mb-8">
                        <GiruExample />
                    </section>
                )}
                
                {activeExample === "wibots" && (
                    <section className="mb-8">
                        <WibotsExample />
                    </section>
                )}
                
                {activeExample === "buttons" && (
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Botones</h2>
                        <ButtonExample />
                    </section>
                )}
                
                {activeExample === "cards" && (
                    <section className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Card UI</h2>
                        {/* Contenido de Cards */}
                    </section>
                )}
            </div>
        </>
    )
}

export default ExamplesPage


// Icon 
// <LuMinimize2 /> : minimizar
// <LuMaximize2 /> : maximizar
// <LuMic /> : microfono
// <LuMicOff /> : microfono apagado
// <LuPlus /> : nuevo
// <LuSave /> : guardar
// <LuSend /> : enviar
// <LuSettings /> : configuracion
// <LuShare /> : compartir
// <LuThumbsUp /> : like
// <LuThumbsDown /> : dislike
// <LuTrash2 />: borrar
// <LuUserRound /> : usuario
// <LuX /> : cerrar



