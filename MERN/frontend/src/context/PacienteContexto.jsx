import { createContext, useReducer } from "react";

export const PacientesContexto = createContext()

export const PacientesReducer = (state, action) => {
    switch(action.type){
        case 'SET_PACIENTES':
            return { 
                pacientes: action.payload
            }
        case 'CREAR_PACIENTE':
            return {
                pacientes: [action.payload, ...state.pacientes]
            }
        case 'DELETE_PACIENTE':
            return {

            }
        default:
            return state
    }
}

export const PacientesContextoProveedor = ({ children }) => {
    const [state, dispatch] = useReducer(PacientesReducer, {
        pacientes: null
    })

    
    return(
        <PacientesContexto.Provider value={{...state, dispatch}}>
            {children}
        </PacientesContexto.Provider>
    )
}