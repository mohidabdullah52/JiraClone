import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Header from './components/header'
import './App.css'

function Home() {
  return (
    <>
      <div className='flex flex-col items-center justify-center h-full min-h-[calc(100vh-56px)]'>
        <h1 className='text-4xl font-bold mb-4'>Jira Clone</h1>
        <p className='mb-4'>Welcome to the main page.</p>
        <Link to="/dashboard">
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
            Go to dashboard
          </button>
        </Link>
      </div>
    </>
  )
}
function AppContent() {
  const location = useLocation()
  
  return (
    <div className="flex flex-col min-h-screen w-full">
      {location.pathname !== '/' && <Header />}
      <main className="flex-grow relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
