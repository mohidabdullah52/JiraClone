import { Link } from 'react-router-dom'
import Header from '../components/header'
import ProjectHeader from '../components/ProjectHeader'

export default function Dashboard() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#1d2125]">
      <Header />
      <ProjectHeader teamName="Jira Clone" />
      <div className='flex flex-col items-center justify-center flex-grow'>

      </div>
    </div>
  )
}