import { useState } from "react"
import { usarConfig } from "../hooks/UsarConfig"

const Config = () =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [specialization, setSpecialization] = useState('')

    const { config, error, isLoading } = usarConfig()



    const handleSubmit = async (e) => {
        e.preventDefault()

        
        await config(email, password, specialization)
    }

    return (
        <form className="config" onSubmit={handleSubmit}>
            <h3> Configuración información de contacto y cambios de especialidad </h3>


            <label> Cambiar Correo </label>
            <input 
                type="email" 
                onChange={(e) => setEmail(e.target.value)} 
                value={email} 
            />

            <label> Cambiar Contraseña </label>
            <input 
                type="password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <label> Cambiar Especialización </label>
            <input 
                type="text" 
                onChange={(e) => setSpecialization(e.target.value)}
                value={specialization}
            />

            <button disabled={isLoading}> Confirmar cambios </button>
            {error && <div className="error"> { error} </div>}
        </form>
    )
}

export default Config