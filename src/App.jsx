import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import BillPage from '../Page/BillPage'
import UploadBill from '../Page/UploadBill'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/' index element={<BillPage/>} />
      <Route path='/upload' index element={<UploadBill/>} />
     </Routes>
    </>
  )
}

export default App
