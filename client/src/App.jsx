import './App.css'
import { Store } from './app/store'
import Login from './components/Login'
import {Provider} from 'react-redux'
function App() {


  return (
    <Provider store = {Store}>
        <Login />
    </Provider>
  )
}

export default App
