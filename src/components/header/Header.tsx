import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import logo from "../../../public/logo.jpg"
import { Add, Circle, List } from '../../icons'


const Header = () => {
    return (
        <nav className='bg-red-500 flex justify-between w-screen px-[10vh]'>
            <Logo src={logo} title='Wealth Health' alt="Logo de Wealth Health" className='w-20 h-20' />
            <div className='flex gap-5 items-center'>
                <NavLink to="/create" className="flex items-center gap-1 bg-black w-max text-white py-2 px-4 rounded-full hover:bg-black/70 h-max">
                    <Add />
                    <span>Create a new employee</span>
                </NavLink>
                <NavLink to="/list" className="flex items-center gap-1 bg-black w-max text-white py-2 px-4 rounded-full hover:bg-black/70 h-max">
                    <List />
                    <span>View current employee(s)</span>
                </NavLink>
            </div>
        </nav>
    )
}

export default Header