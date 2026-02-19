import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import { getUser } from './services/api'
import { useDispatch, useSelector } from 'react-redux'

export const serverUrl = "http://localhost:8000"

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    getUser(dispatch)
  }, [])

  const { userData } = useSelector((state) => state.user)

  return (
    <>
      <Routes>
        <Route path='/' element={userData ? <Home /> : <Navigate to="/auth" replace />} />
        <Route path='/auth' element={userData ? <Navigate to="/" replace /> : <Authentication />} />
      </Routes>
    </>
  )
}

export default App