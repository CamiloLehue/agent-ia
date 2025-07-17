import { LuAlignVerticalDistributeCenter, LuWifi, LuWifiOff } from 'react-icons/lu';

interface ConnectionStatusProps {
    isConnected: boolean;
    error?: string;
}

function ConnectionStatus({ isConnected, error }: ConnectionStatusProps) {
    if (error) {
        return (
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-red-200 text-xs">
                <LuAlignVerticalDistributeCenter size={12} />
                <span>Error de conexión</span>
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
            isConnected 
                ? 'bg-green-500/20 border border-green-500/30 text-green-200'
                : 'bg-yellow-500/20 border border-yellow-500/30 text-yellow-200'
        }`}>
            {isConnected ? <LuWifi size={12} /> : <LuWifiOff size={12} />}
            <span>{isConnected ? 'Conectado' : 'Desconectado'}</span>
        </div>
    );
}

export default ConnectionStatus;