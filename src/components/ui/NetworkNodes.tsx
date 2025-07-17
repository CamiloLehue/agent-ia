import { useEffect, useRef, useState } from 'react';

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface NetworkNodesProps {
  nodeCount?: number;
  className?: string;
  width?: number;
  height?: number;
}

const NetworkNodes = ({
  nodeCount = 25,
  className = "",
  width = 1920,
  height = 1080
}: NetworkNodesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.log('Canvas no encontrado');
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.log('Contexto 2D no disponible');
      return;
    }

    console.log('Inicializando NetworkNodes...');

    // Configurar el canvas con pixel ratio para mejor calidad
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    // Inicializar nodos
    const initializeNodes = () => {
      nodesRef.current = Array.from({ length: nodeCount }, (_, i) => ({
        id: i,
        x: Math.random() * (width - 100) + 50,
        y: Math.random() * (height - 100) + 50,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 6 + 4
      }));
      console.log(`${nodeCount} nodos inicializados`);
    };

    // Renderizar
    const render = () => {
      // Limpiar canvas con fondo negro
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      const maxDistance = 200;

      // Dibujar conexiones primero
      for (let i = 0; i < nodesRef.current.length; i++) {
        for (let j = i + 1; j < nodesRef.current.length; j++) {
          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];
          const distance = Math.sqrt(
            Math.pow(nodeA.x - nodeB.x, 2) + Math.pow(nodeA.y - nodeB.y, 2)
          );

          if (distance < maxDistance) {
            const opacity = Math.max(0, 1 - distance / maxDistance);
            
            // Línea principal más intensa
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${opacity * 0.9})`;
            ctx.lineWidth = 2.5;
            ctx.stroke();
            
            // Efecto de brillo en las líneas
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(248, 113, 113, ${opacity * 0.4})`;
            ctx.lineWidth = 4;
            ctx.stroke();
          }
        }
      }

      // Dibujar nodos encima de las líneas
      nodesRef.current.forEach(node => {
        // Halo exterior brillante
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(220, 38, 38, 0.3)';
        ctx.fill();
        
        // Círculo principal rojo más intenso
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#dc2626';
        ctx.fill();

        // Borde aún más oscuro e intenso
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Brillo interno más intenso
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = '#f87171';
        ctx.fill();

        // Punto central más brillante
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = '#fecaca';
        ctx.fill();
        
        // Punto central ultra brillante
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.15, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      });
    };

    // Actualizar posiciones de nodos
    const updateNodes = () => {
      nodesRef.current.forEach(node => {
        // Actualizar posición
        node.x += node.vx;
        node.y += node.vy;

        // Rebotar en los bordes
        if (node.x <= node.radius || node.x >= width - node.radius) {
          node.vx *= -0.9; // Añadir un poco de amortiguación
          node.x = Math.max(node.radius, Math.min(width - node.radius, node.x));
        }
        if (node.y <= node.radius || node.y >= height - node.radius) {
          node.vy *= -0.9;
          node.y = Math.max(node.radius, Math.min(height - node.radius, node.y));
        }

        // Añadir un poco de variación aleatoria
        node.vx += (Math.random() - 0.5) * 0.02;
        node.vy += (Math.random() - 0.5) * 0.02;

        // Limitar velocidad
        const maxSpeed = 1.5;
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }
      });
    };

    // Loop de animación
    const animate = () => {
      updateNodes();
      render();
      animationRef.current = requestAnimationFrame(animate);
    };

    // Inicializar y comenzar animación
    initializeNodes();
    setIsLoaded(true);

    // Renderizar el primer frame inmediatamente
    render();

    // Comenzar la animación
    animate();

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodeCount, width, height]);

  return (
    <div className={`absolute opacity-55 ${className}`}>
      <canvas
        ref={canvasRef}
        className="block border border-red-500/20"
        style={{
          background: '#000000',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(239, 68, 68, 0.3)',
          width: `${width}px`,
          height: `${height}px`
        }}
      />

      {/* Indicador de carga */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-12px">
          <div className="text-red-500 text-lg">Cargando red de nodos...</div>
        </div>
      )}

      {/* Overlay con efecto de brillo */}
      <div
        className="absolute inset-0 pointer-events-none rounded-12px"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(239, 68, 68, 0.05) 70%, rgba(0, 0, 0, 0.2) 100%)'
        }}
      />
    </div>
  );
};

export default NetworkNodes;