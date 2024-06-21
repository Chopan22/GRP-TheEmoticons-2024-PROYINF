import './PacientesDetalles.css'

const PacienteDetalles = ({ paciente}) => {
    return (
        <div className="pacientes-detalles">
            <div className="card"> 

                <h4> { paciente.nombre}</h4>
                <p><strong> Rut: </strong>{paciente.rut}</p>
                <p><strong> fecha de nacimiento: </strong>{paciente.fecha_nacimiento}</p>
                <p><strong> Sexo: </strong>{paciente.sexo}</p>
                <p><strong> telefono: </strong>{paciente.telefono}</p>
                <p>{paciente.createdAt}</p>

            </div>
            
        </div>

        
    )
}

export default PacienteDetalles;