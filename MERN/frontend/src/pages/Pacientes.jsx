import { useEffect } from "react";
import axios from "axios";
import '../assets/css/Pacientes.css'
import { UsarPacienteContexto } from "../hooks/UsarPacienteContexto";
// Componentes
import PacienteDetalles from "../components/PacientesDetalles";

const Pacientes = () => {
    const { pacientes, dispatch} = UsarPacienteContexto()
    // const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/pacientes/');
                // setPacientes(response.data); // Aquí accedemos a la propiedad data
                dispatch({type: 'SET_PACIENTES', payload: response.data})
            } catch (error) {
                console.error("Error fetching pacientes:", error);
            }
        };

        fetchPacientes();
    }, []);

    return (
        <div className="home">
            <div className="pacientes">
                {pacientes && pacientes.map((paciente) => (
                    <PacienteDetalles key={paciente._id} paciente={paciente} />
                ))}
                
            </div>
        </div>
    );
};

export default Pacientes;