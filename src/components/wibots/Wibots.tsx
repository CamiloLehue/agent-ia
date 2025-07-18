
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './Wibots.css';

interface WibotsProps {
    hasNotification?: boolean;
    notificationCount?: number;
    onInteraction?: () => void;
}

function Wibots({ hasNotification = false, notificationCount = 0, onInteraction }: WibotsProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    
    useEffect(() => {
        // Animación inicial de entrada
        if (containerRef.current && imageRef.current) {
            // Configuración inicial
            gsap.set(containerRef.current, { opacity: 0, y: -20 });
            gsap.set(imageRef.current, { scale: 0.95, rotation: -5 });
            
            const tl = gsap.timeline();
            
            tl.to(containerRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            
            tl.to(imageRef.current, {
                scale: 1,
                rotation: 0,
                duration: 0.6,
                ease: "elastic.out(1, 0.5)"
            }, "-=0.4");
            
            gsap.to(imageRef.current, {
                y: 20,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            
            // Pequeña rotación sutil
            gsap.to(imageRef.current, {
                rotation: 13,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 0.5
            });
        }
        
        // Limpieza de animaciones al desmontar
        return () => {
            gsap.killTweensOf(containerRef.current);
            gsap.killTweensOf(imageRef.current);
        };
    }, []);
    
    // Efecto cuando cambia el estado de notificación
    useEffect(() => {
        if (hasNotification && imageRef.current) {
            // Animación de pulso cuando hay una notificación
            gsap.to(imageRef.current, {
                scale: 1.05,
                duration: 0.3,
                repeat: 3,
                yoyo: true,
                ease: "sine.inOut",
            });
        }
    }, [hasNotification]);

    const handleInteraction = () => {
        // Animación al hacer clic
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                scale: 1.1,
                rotation: 5,
                duration: 0.3,
                ease: "back.out(1.7)",
                onComplete: () => {
                    gsap.to(imageRef.current, {
                        scale: 1,
                        rotation: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.3)"
                    });
                }
            });
        }
        
        // Llamar al callback si existe
        if (onInteraction) {
            onInteraction();
        }
    };

    return (
        <div 
            ref={containerRef}
            className={`absolute left-[50%] top-0 -translate-x-1/2 cursor-pointer  ${isHovering ? 'wibots-glow' : ''}`}
            onClick={handleInteraction}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            <img 
                ref={imageRef}
                src="/wibots/01.png" 
                alt="Wibots" 
                className={`w-[300px] filter drop-shadow-lg transition-all duration-300 ${hasNotification ? 'wibots-pulse' : ''}`}
            />
            
            {/* Indicador de notificación */}
            {hasNotification && notificationCount > 0 && (
                <div className="wibots-notification">
                    {notificationCount > 9 ? '9+' : notificationCount}
                </div>
            )}
        </div>
    );
}

export default Wibots