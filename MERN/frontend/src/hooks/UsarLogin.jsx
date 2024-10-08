import { useState } from "react";
import { UsarAuthContexto } from './UsarAuthContexto';
import axios from "axios";

export const usarLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = UsarAuthContexto()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = axios.post('http://localhost:4000/api/usuarios/login',{
            email: email,
            password: password
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

    return {login, isLoading, error }
}

