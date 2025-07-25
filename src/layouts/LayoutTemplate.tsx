import { Outlet, useNavigate } from 'react-router'
import Button from '../components/ui/Button'
import logo from '../../public/ast-white.svg'

function LayoutTemplate() {
    const navigate = useNavigate()

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const handleOutClick = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };
    return (
        <div className='relative h-screen w-full  flex flex-col'>
            <div className='relative z-10 h-full'>
                <div className='relative z-10 w-full flex-shrink-0 text-white flex items-center justify-between py-3 px-4'>
                    <div className='px-6'>
                        <img src={logo} alt="Logo ast" className='w-15' />
                    </div>
                    <div className='absolute left-[50%] -translate-x-1/2'>
                        <h5 className='font-bold'><span className='text-danger'>Wi</span>sensor <span className='text-accent'>IA</span></h5>
                    </div>
                    <div className='px-5 flex justify-center items-center gap-2'>
                        <Button
                            onClick={() => navigate('/app')}
                            variant='solid' size='sm'
                            className='font-bold'
                        >
                            Chat Agent
                        </Button>
                        <Button
                            variant='solid' size='sm'
                            className=''
                        >
                            {username ? `Hola, ${username}` : 'Usuario'}
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