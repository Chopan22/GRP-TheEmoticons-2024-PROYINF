import './PacientesDetalles.css'

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

const PacienteDetalles = ({ paciente}) => {
    return (
        <div className="pacientes-detalles">
            <div className="card"> 

                <h2 className='nombre-pacientes'> { paciente.nombre}</h2>
                <p><strong> Rut: </strong>{paciente.rut}</p>
                <p><strong> Fecha de Nacimiento: </strong>{formatDate(paciente.fecha_nacimiento)}</p>
                <p><strong> Sexo: </strong>{paciente.sexo}</p>
                <p><strong> Telefono: </strong>{paciente.telefono}</p>
                <p><strong> Ingresado al Hospital: </strong>{formatDate(paciente.createdAt)}</p>
                <div className="container">
                    <button className="button-24" role="button"> Revisar Perfil </button>
                </div>
                

            </div>
            
        </div>

        
    )
}

export default PacienteDetalles;