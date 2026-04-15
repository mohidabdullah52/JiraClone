import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen w-full'>
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
