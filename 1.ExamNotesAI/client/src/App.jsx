import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import History from './pages/History'
import Notes from './pages/Notes'
import Pricing from './pages/Pricing'



import { getUser } from './services/api'
import { useDispatch, useSelector } from 'react-redux'

export const serverUrl = "http://localhost:8000"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    getUser(dispatch)
  }, [])

  const { userData } = useSelector((state) => state.user)

  // useEffect(()=>{}, [userData])
  return (
    <>
      <Routes>
        <Route path='/' element={userData ? <Home /> : <Navigate to="/auth" replace />} />
        <Route path='/auth' element={userData ? <Navigate to="/" replace /> : <Authentication />} />
        <Route path='/history' element={userData ? <History /> : <Navigate to="/auth" replace />} />
        <Route path='/notes' element={userData ? <Notes /> : <Navigate to="/auth" replace />} />
        <Route path='/pricing' element={userData ? <Pricing /> : <Navigate to="/auth" replace />} />

      </Routes>
    </>
  )
}

export default App