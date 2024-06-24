import { Link } from 'react-router-dom'
import { UsarLogout } from '../hooks/UsarLogout'
import './Navbar.css'

const Navbar = () => {
    const { logout } = UsarLogout()

    const handleClick = () => {
        logout()
    }



    return (
        <div className='nav'>
            <div className='nav-logo'>CodeConvergence</div>
            <ul className='nav-menu'>

                <li><Link to="/">Home</Link></li>
                <li><Link to="/pacientes">Pacientes</Link></li>
                <input type="text" placeholder="Buscar Paciente" className="nav-search" />


                <div>
                    <button onClick={handleClick}>Log Out</button>
                </div>
                <li className='nav-login'> <Link to="/login"> Login </Link> </li>
                <li className='nav-signup'> <Link to="/signup"> Signup </Link> </li>
            </ul>
        </div>
    )
}

export default Navbar