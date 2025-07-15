import { useEffect, useRef, useState } from "react";
import { GrFormNextLink } from "react-icons/gr";
import Button from "../../../../components/ui/Button";
import { useLogin } from "../../hooks/useLogin";

function Login() {
    const { login, message } = useLogin();

    const imageRef = useRef<HTMLImageElement>(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!imageRef.current) return;

            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            const moveX = (clientX / innerWidth - 0.5) * 20;
            const moveY = (clientY / innerHeight - 0.5) * 20;

            imageRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(username, password);
    };

    return (
        <div className="relative flex justify-center items-center bg-gradient-to-bl from-bgt to-bgp h-full min-h-screen max-h-screen overflow-hidden w-full">
            <div className="relative flex flex-col justify-center items-center gap-20">
                <div className="relative flex flex-col justify-center items-center">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bg-gradient-to-b from-danger rounded-full opacity-30 h-100 w-100 blur-3xl" />
                    <h5 className="font-bold"><span className="text-danger">WI</span>SENSOR</h5>
                    <small className="font-thin py-1">Presenta</small>
                    <div className="relative">
                        <div className="absolute font-black  -top-0 -left-1 blur-lg text-primary rounded-bl-none rounded-tr-none bg-gradient-to-bl from-danger/80 to-indigo-500 border-t border-primary/40 shadow shadow-secondary px-8 rounded-full py-0.5">AGENTE IA</div>
                        <div className="font-black relative text-primary rounded-bl-none rounded-tr-none  px-8 rounded-full py-0.5"><small>AGENTE <span className="bg-black text-indigo-300 px-2 py-1 rounded ">IA</span></small></div>
                    </div>
                    <img
                        ref={imageRef}
                        src="ast-white.svg"
                        alt="Logo animado"
                        className="w-[35%] transition-transform duration-100 ease-out will-change-transform my-12"
                    />
                    <small className="text-gray">D E M O v1.0</small>
                </div>

                <form onSubmit={handleSubmit} className="relative flex flex-col gap-4 mt-5 justify-center items-center w-full max-w-[300px]">
                    <div className="w-full">
                        <label htmlFor="username" className="text-gray block mb-1">Correo Electrónico</label>
                        <input
                            id="username"
                            
                            type="email"
                            placeholder="tuemail@ejemplo.com"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="border border-bgsecondary/20 bg-bgt shadow text-gray focus:text-white rounded-lg p-2 w-full focus:outline-none"
                        />
                    </div>

                    <div className="w-full">
                        <label htmlFor="password" className="text-gray block mb-1">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border border-bgsecondary/20 bg-bgt shadow text-gray focus:text-white rounded-lg p-2 w-full focus:outline-none"
                        />
                    </div>
                    {
                        message && <small className="text-danger">{message}</small>
                    }

                    <Button
                        type="submit"
                        className="bg-bgp cursor-pointer px-5 w-full h-10 border border-secondary hover:bg-secondary/5 flex items-center justify-center gap-2"
                    >
                        Iniciar Sesión <GrFormNextLink />
                    </Button>

                </form>
            </div>
        </div>
    );
}

export default Login;