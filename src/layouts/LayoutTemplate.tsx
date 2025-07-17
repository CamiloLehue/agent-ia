import { Outlet, useNavigate } from 'react-router'
import Button from '../components/ui/Button'
import logo from '../../public/ast-white.svg'
import NetworkNodes from '../components/ui/NetworkNodes';

function LayoutTemplate() {
    const navigate = useNavigate()

    const token = localStorage.getItem('token');

    const handleOutClick = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };
    return (
        <div className='relative h-screen w-full overflow-hidden flex flex-col'>
            <img src="/bg.png" alt="Background" className='absolute inset-0 w-full h-full object-cover mix-blend-overlay' />
            <NetworkNodes/>
            
            {/* Header fijo */}
            <div className='relative z-10 w-full flex-shrink-0 text-white flex items-center justify-between py-6 px-4'>
                <div className='px-6'>
                    <img src={logo} alt="Logo ast" className='w-15' />
                </div>
                <div className='px-5 flex justify-center items-center gap-2'>
                    <Button
                        onClick={() => navigate('/app')}
                        variant='border' size='sm'
                        className='font-bold'
                    >
                        Chat Agent
                    </Button>

                    {!token && <Button variant='solid' size='sm'>
                        Iniciar Sesión
                    </Button>
                    }
                    <Button
                        onClick={handleOutClick}
                        variant='transparent' size='sm'>
                        Cerrar sesión
                    </Button>
                </div>
            </div>
            
            {/* Contenido principal con altura controlada */}
            <div className='relative z-10 flex-1 overflow-hidden'>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutTemplate