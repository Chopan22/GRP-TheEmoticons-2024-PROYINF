import { useEffect } from "react";
import axios from "axios";
import '../assets/css/Pacientes.css'
import { UsarExamenContexto } from "../hooks/UsarExamenContexto";

import { UsarAuthContexto } from "../hooks/UsarAuthContexto";

// Componentes
import ExamenesDetalles from "../components/ExamenesDetalles";

const Examenes = () => {
    const { examenes, dispatch} = UsarExamenContexto()
    const { user } = UsarAuthContexto()
    // const [Examenes, setExamenes] = useState([]);

    useEffect(() => {
        const fetchExamenes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/examenes/',{
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                dispatch({type: 'SET_EXAMENES', payload: response.data})
            } catch (error) {
                console.error("Error fetching Examenes:", error);
            }
        };
        if (user){
            fetchExamenes();
        }
        
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="Examenes">
                {examenes && examenes.map((examen) => (
                    <ExamenesDetalles key={examen._id} examen={examen} />
                ))}
                
            </div>
        </div>
    );
};

export default Examenes;