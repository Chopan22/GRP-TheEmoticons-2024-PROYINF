import { Link } from 'react-router-dom'

import './Navbar.css'

const Navbar = () => {
    return (
        <div className='nav'>
            <div className='nav-logo'>CodeConvergence</div>
            <ul className='nav-menu'>

                <li><Link to="/">Home</Link></li>
                <li>Pacientes</li>
                <input type="text" placeholder="Buscar Paciente" className="nav-search" />
                <li className='nav-login'>Login</li>
            </ul>
        </div>
    )
}

export default Navbar