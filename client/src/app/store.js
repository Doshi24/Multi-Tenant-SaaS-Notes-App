import { configureStore} from '@reduxjs/toolkit'
import AuthReducer from '../Feactures/Auth.js'
import notereducer from '../Feactures/Note.js'

export const Store = configureStore({
    reducer : {
        auth : AuthReducer,
        notes : notereducer
    }
})