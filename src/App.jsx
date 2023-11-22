
import Devices from './pages/Devices'
import CreateDevices from './pages/CreateDevices'
import EditDevices from './pages/EditDevices'
import 'bootstrap'
import { Routes,Route,BrowserRouter } from 'react-router-dom'
function App() {
 
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/devices' element={<Devices/>}/>
    <Route path='/create-devices' element={<CreateDevices/>}/>
    <Route path='d/:id/edit-devices' element={<EditDevices/>}/>

   </Routes>
   </BrowserRouter>
  )
}

export default App
