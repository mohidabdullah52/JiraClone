import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'
import './App.css'

function App() {
  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{ 
            style: { background: '#22272b', color: '#c7d1db', border: '1px solid #38414a' } 
        }} 
      />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
