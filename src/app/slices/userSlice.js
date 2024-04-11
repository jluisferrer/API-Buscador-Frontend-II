import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',  //seccion
    initialState: {  //lo que vale sin nada
        credentials: {} //objeto vacio para token y usuario
    },

    reducers: {   //el que efectua las funciones
        login: (state, action) => {   //cuando entre algo a login lo guardamos en el estado
            return {
                ...state,   //spreads
                ...action.payload //lo que recibimos
            }
        },
        logout: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        profile: (state, action) => {
            return {
                ...state,
                ...action.payload
            }
        },
        deleteUserById: (state, action) => {
            return {
                ...state,
                credentials: state.credentials.filter(user => user.id !== action.payload.id)
            }
        }
    }
});




export const { login, logout, profile, deleteUserById } = userSlice.actions;

export const userData = (state) => state.user;

export default userSlice.reducer;