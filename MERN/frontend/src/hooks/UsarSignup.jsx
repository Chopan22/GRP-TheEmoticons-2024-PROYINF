import { useState } from "react";
import { UsarAuthContexto } from './UsarAuthContexto';
import axios from "axios";

export const usarSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = UsarAuthContexto()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = axios.post('http://localhost:4000/api/usuarios/signup',{
            email: email,
            password: password
        })
        .then(function(response){
            // Debería ser un simil a response.ok 
            localStorage.setItem('usuario',response.data)

            // Actualizar el AuthContexto
            dispatch({type: 'LOGIN', payload: response.data})
            setIsLoading(false)

            console.log(response)
        })
        .catch(function (error){

            setIsLoading(false)
            console.log(error)
        })


    }

    return {signup, isLoading, error }
}


