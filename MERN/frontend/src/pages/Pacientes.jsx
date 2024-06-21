import { useEffect, useState } from "react";
import axios from "axios";

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await axios.get('http://localhost:4000/api/pacientes/');
                setPacientes(response.data); // Aquí accedemos a la propiedad data
            } catch (error) {
                console.error("Error fetching pacientes:", error);
            }
        };

        fetchPacientes();
    }, []);

    return (
        <div className="home">
            <div className="pacientes">
                {pacientes.length > 0 ? (
                    pacientes.map((paciente) => (
                        <p key={paciente._id}>{paciente.nombre}</p>
                    ))
                ) : (
                    <p>No hay pacientes disponibles.</p>
                )}
            </div>
        </div>
    );
};

export default Pacientes;