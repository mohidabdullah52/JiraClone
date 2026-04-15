import { Link } from 'react-router-dom'
import Header from '../components/header'

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <div className='flex flex-col items-center justify-center flex-grow'>
        <h1 className='text-4xl font-bold mb-4'>Dashboard</h1>
        <p className='mb-4'>This is the dashboard page.</p>
        <Link to="/">
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
            Go back home
          </button>
        </Link>
      </div>
    </div>
  )
}