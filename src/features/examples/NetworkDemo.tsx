import NetworkNodes from '../../components/ui/NetworkNodes';

const NetworkDemo = () => {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          Red de Nodos Animada
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Nodos conectados con animaciones suaves en tiempo real
        </p>
        
        <div className="grid gap-8">
          {/* Componente principal grande */}
          <div className="flex justify-center">
            <NetworkNodes 
              nodeCount={20}
              width={800}
              height={500}
              className="shadow-2xl"
            />
          </div>
          
          {/* Componentes más pequeños */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Red Densa
              </h3>
              <NetworkNodes 
                nodeCount={25}
                width={380}
                height={280}
                className="mx-auto"
              />
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-semibold text-white mb-4">
                Red Dispersa
              </h3>
              <NetworkNodes 
                nodeCount={12}
                width={380}
                height={280}
                className="mx-auto"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-white mb-4">
              Características
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Nodos animados con movimiento suave</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Conexiones dinámicas por proximidad</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Rebote en bordes del canvas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Opacidad basada en distancia</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkDemo;