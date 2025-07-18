import { useState } from 'react';
import Wibots from '../../components/wibots/Wibots';
import Button from '../../components/ui/Button';

function WibotsExample() {
  const [hasNotification, setHasNotification] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleAddNotification = () => {
    setNotificationCount(prev => prev + 1);
    setHasNotification(true);
  };

  const handleClearNotifications = () => {
    setNotificationCount(0);
    setHasNotification(false);
  };

  const handleInteraction = () => {
    setMessage('¡Has interactuado con Wibots!');
    setTimeout(() => setMessage(''), 3000);
    
    // Si hay notificaciones, las limpiamos al interactuar
    if (hasNotification) {
      handleClearNotifications();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-8">Ejemplo de Wibots Animado</h1>
      
      <div className="relative h-[400px] w-full max-w-2xl border border-gray-700 rounded-lg bg-gray-800 mb-8">
        {/* Contenedor para posicionar Wibots */}
        <Wibots 
          hasNotification={hasNotification} 
          notificationCount={notificationCount} 
          onInteraction={handleInteraction} 
        />
      </div>
      
      <div className="flex gap-4 mb-6">
        <Button onClick={handleAddNotification}>
          Añadir Notificación
        </Button>
        <Button onClick={handleClearNotifications}>
          Limpiar Notificaciones
        </Button>
      </div>
      
      {message && (
        <div className="mt-4 p-3 bg-blue-500 rounded-md animate-fade-in">
          {message}
        </div>
      )}
      
      <div className="mt-8 max-w-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Características:</h2>
        <ul className="list-disc text-left pl-6">
          <li>Animación de entrada suave</li>
          <li>Efecto de flotación continua</li>
          <li>Rotación sutil para dar vida</li>
          <li>Respuesta interactiva al hacer clic</li>
          <li>Sistema de notificaciones visual</li>
          <li>Efecto de brillo al pasar el cursor</li>
        </ul>
      </div>
    </div>
  );
}

export default WibotsExample;