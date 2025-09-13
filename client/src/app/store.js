import { configureStore} from '@reduxjs/toolkit'
import AuthReducer from '../Feactures/Auth.js'

export const Store = configureStore({
    reducer : {
        auth : AuthReducer
    }
})