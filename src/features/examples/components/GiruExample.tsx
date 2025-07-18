import { useState } from 'react';
import { GiruViewer } from '../../../components/wibots/GiruViewer';

export function GiruExample() {
  const [scale, setScale] = useState<number>(1.5);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [message, setMessage] = useState<string>('');

  const handleModelClick = () => {
    setMessage('¡Hola! Soy Giru, tu asistente 3D');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-bold text-center"><span className="text-red-600">Modelo 3D</span> Interactivo - <span className="text-red-600">Giru</span></h2>
      
      <div className="bg-gradient-to-r from-black to-gray-900 p-1 rounded-lg shadow-lg border border-red-900">
        <GiruViewer 
          height="500px"
          modelScale={scale}
          autoRotate={autoRotate}
          onModelClick={handleModelClick}
          enableZoom={true}
          enablePan={true}
          cameraPosition={[0, 0, 5]}
        />
      </div>

      {message && (
        <div className="bg-black/50 text-red-500 p-4 rounded-md text-center animate-pulse border border-red-900 shadow-lg shadow-red-900/20">
          {message}
        </div>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col gap-2">
          <label htmlFor="scale" className="text-sm text-gray-300">Escala: {scale.toFixed(1)}</label>
          <input
            id="scale"
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={scale}
            onChange={(e) => setScale(parseFloat(e.target.value))}
            className="w-40 accent-primary"
          />
        </div>

        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-4 py-2 rounded-md ${autoRotate ? 'bg-red-900 text-white' : 'bg-gray-900 text-gray-300'} border border-red-800 hover:bg-red-950 transition-colors`}
        >
          {autoRotate ? 'Desactivar Rotación' : 'Activar Rotación'}
        </button>

        <button
          onClick={handleModelClick}
          className="px-4 py-2 rounded-md bg-black text-red-500 border border-red-900 hover:bg-red-950 hover:text-white transition-colors"
        >
          Saludar a Giru
        </button>
      </div>

      <div className="bg-black/50 p-4 rounded-md border border-red-900/50 shadow-lg shadow-red-900/10">
        <h3 className="font-bold mb-2 text-red-500">Instrucciones:</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Haz clic en el modelo para detener/iniciar la rotación automática</li>
          <li>Arrastra para rotar manualmente el modelo</li>
          <li>Usa la rueda del ratón para hacer zoom</li>
          <li>Ajusta la escala con el control deslizante</li>
          <li>Haz clic en "Saludar a Giru" para una interacción</li>
        </ul>
      </div>
    </div>
  );
}