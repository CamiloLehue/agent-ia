import { Outlet, useNavigate } from 'react-router'
import Button from '../components/ui/Button'
import logo from '../../public/ast-white.svg'

function LayoutTemplate() {
    const navigate = useNavigate()

    const token = localStorage.getItem('token');

    const handleOutClick = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };
    return (
        <div className='relative h-screen w-full flex flex-col justify-start items-center'>
            <div className='h-20 w-full text-white flex items-center justify-between'>
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
                    {/* <Button
                        onClick={() => navigate('/examples')}
                        variant='ghost' size='sm'>
                        Examples UI Components
                    </Button> */}
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
            <div className='w-full h-full '>
                <Outlet />
            </div>
        </div>
    )
}

export default LayoutTemplate