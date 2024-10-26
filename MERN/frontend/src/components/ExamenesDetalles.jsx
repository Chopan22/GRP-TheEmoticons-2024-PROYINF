import './PacientesDetalles.css'
import deleteIcon from '../assets/delete-user-1.svg'
import axios from 'axios';
import { UsarAuthContexto } from '../hooks/UsarAuthContexto';
import { Link, useNavigate } from 'react-router-dom';


function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}


const ExamenesDetalles = ({ examen}) => {

    const {dispatch} = UsarexamenContexto()
    const { user } = UsarAuthContexto()

    const navigate = useNavigate()

    const handleRevisarExamen = (examen) => {
        navigate('/examenesinfo', { state: {examen}})
    }

    const handleClick = async () => {
        if (!user){
            return console.log("No hay usuario papito")
        }

        
        const response = await axios.delete('http://localhost:4000/api/examenes/' + examen._id,{
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        dispatch({type: 'DELETE_EXAMEN', payload: response.data})
    }
    
    return (
        <div className="pacientes-detalles">
            <div className="card"> 
                <div className="card-title">
                    <h2 className='nombre-paciente'> { examen.paciente}</h2>

                    <img src={deleteIcon} alt="Eliminar" className="delete-examen" onClick={handleClick}/>
                </div>
                <p><strong> ID paciente: </strong>{examen.rut}</p>
                <p><strong> Fecha de Nacimiento: </strong>{formatDate(examen.fecha_nacimiento)}</p>
                <p><strong> ID del estudio: </strong>{examen.estudio}</p>
                <p><strong> Telefono: </strong>{examen.telefono}</p>
                <p><strong> Examen ingresado <el-></el->: </strong>{formatDate(examen.createdAt)}</p>
                <div className="container">
                    <button 
                        className="button-24" 
                        role="button"
                        onClick={() => handleRevisarExamen(examen)}
                    >
                        Revisar Examen 
                    </button>
                </div>
                

            </div>
            
        </div>

        
    )
}

export default ExamenesDetalles;