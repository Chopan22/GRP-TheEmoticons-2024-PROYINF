import { useState } from "react";
import { UsarAuthContexto } from './UsarAuthContexto';
import axios from "axios";

export const usarSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = UsarAuthContexto()

    const signup = async (rut, nombre, apellido, sexo, email, password, specialization) => {
        setIsLoading(true)
        setError(null)

        const response = axios.post('http://localhost:4000/api/usuarios/signup',{
            rut_doctor: rut,
            nombre: nombre,
            apellido: apellido,
            sexo: sexo,
            email: email,
            password: password,
            specialization: specialization
        })
        .then(function(response){
            // Debería ser un simil a response.ok 
            localStorage.setItem('usuario',JSON.stringify(response.data))

            // Actualizar el AuthContexto
            dispatch({type: 'LOGIN', payload: response.data})
            setIsLoading(false)

            console.log(response)
        })
        .catch(function (error){
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error); // 
              } else {
                setError('Algo salió mal. Intente de nuevo.'); // 
              }

            setIsLoading(false)
            console.log(error)
        })


    }

    return {signup, isLoading, error }
}


