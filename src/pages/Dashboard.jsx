import { Link } from 'react-router-dom'

export default function Dashboard() {
  return (
    <div className='flex flex-col items-center justify-center h-full min-h-[calc(100vh-56px)]'>
      <h1 className='text-4xl font-bold mb-4'>Dashboard</h1>
      <p className='mb-4'>This is the dashboard page.</p>
      <Link to="/">
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
          Go back home
        </button>
      </Link>
    </div>
  )
}