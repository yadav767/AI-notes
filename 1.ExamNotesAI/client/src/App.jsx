import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Authentication from './pages/Authentication'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/'  element={<Home/>} />
      <Route path='/auth'  element={<Authentication/>} />
    </Routes>
    </>
  )
}

export default App