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
        <div className='relative min-h-screen max-h-screen overflow-hidden h-full w-full flex flex-col justify-start items-center'>
            <img src="/bg.png" alt="Background" className='absolute w-full h-full object-cover mix-blend-overlay' />
            <NetworkNodes/>
            <div className='w-full h-full '>
                <div className=' w-full text-white flex items-center justify-between'>
                    <div className='px-10'>
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
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutTemplate