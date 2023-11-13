import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { Add, List } from '../../icons'


const Header = () => {
    return (
        <nav className='bg-white flex justify-between w-screen px-[10vh]'>
            <Logo src="https://res.cloudinary.com/dgsc66scx/image/upload/v1699831347/logo_tbumbb.jpg" title='Wealth Health' alt="Logo de Wealth Health" className='w-20 h-20' />
            <div className='flex items-center gap-5'>
                <NavLink to="/create" className="flex items-center gap-1 px-4 py-2 text-white bg-black rounded w-max hover:bg-black/70 h-max">
                    <Add />
                    <span>Create a new employee</span>
                </NavLink>
                <NavLink to="/list" className="flex items-center gap-1 px-4 py-2 text-white bg-black rounded w-max hover:bg-black/70 h-max">
                    <List />
                    <span>View current employee(s)</span>
                </NavLink>
            </div>
        </nav>
    )
}

export default Header