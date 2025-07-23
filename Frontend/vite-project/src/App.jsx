
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import "./styles.css"




export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Login />}/>
      <Route path='/dashboard/:id' element={<Dashboard />}/>
      <Route path='/transactions/:id' element={<Transactions />}/>

    </Routes>
    </BrowserRouter>
  )



}


