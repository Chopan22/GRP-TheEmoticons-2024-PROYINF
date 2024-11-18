import { useState } from "react";
import { UsarAuthContexto } from './UsarAuthContexto';
import axios from "axios";

export const useConfig = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = UsarAuthContexto();

    const config = async (email, password, specialization) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.put('http://localhost:4000/api/usuarios/update', {
                email: email,
                password: password,
                specialization: specialization
            });

            localStorage.setItem('usuario', JSON.stringify(response.data));

            dispatch({ type: 'UPDATE_USER', payload: response.data });
            setIsLoading(false);
            console.log(response);

        } catch (error) {
            setIsLoading(false);
            setError(error.response ? error.response.data : "Error desconocido");
            console.log(error);
        }
    };

    return { config, isLoading, error };
};
