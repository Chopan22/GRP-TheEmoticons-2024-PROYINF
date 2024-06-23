import { createContext, useReducer } from "react";

export const AuthContexto = createContext()

export const authReducer = (state, action ) => {
    switch (action.type) {
        case 'LOGIN':
            return {user: action.payload}
        case 'LOGOUT':
            return {user: null}
        default:
            return state
    }
}

export const AuthContextoProveedor = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    console.log('Estado de autorización: ', state)

    return (
        <AuthContexto.Provider value={{...state, dispatch}}>
            { children }
        </AuthContexto.Provider>
    )
}