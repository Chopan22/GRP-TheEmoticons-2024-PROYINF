import { createContext, useReducer } from "react";

export const ExamenesContexto = createContext()

export const ExamenesReducer = (state, action) => {
    switch(action.type){
        case 'SET_EXMAEN':
            return { 
                examenes: action.payload
            }
        case 'CREAR_EXAMEN':
            return {
                examenes: [action.payload, ...state.examenes]
            }
        case 'DELETE_EXAMEN':
            return {
                examenes: state.examenes.filter((p) => p._id !== action.payload._id)
            }
        default:
            return state
    }
}

export const ExamenesContextoProveedor = ({ children }) => {
    const [state, dispatch] = useReducer(ExamenesReducer, {
        examenes: []
    })

    
    return(
        <ExamenesContexto.Provider value={{...state, dispatch}}>
            {children}
        </ExamenesContexto.Provider>
    )
}