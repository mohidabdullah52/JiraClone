import { Link } from 'react-router-dom'
import Header from '../components/header'
import Sidebar from '../components/Sidebar'
import ProjectHeader from '../components/ProjectHeader'
import TypingAnimatedText from '../components/loading'
import { useState } from 'react'

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-[#1d2125]">
      {isSidebarOpen && (
        <Sidebar setIsSidebarOpen={setIsSidebarOpen} />
      )}
      <div className="flex flex-col flex-grow overflow-auto w-full relative">
        <Header isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <ProjectHeader teamName="Jira Clone" />
        <div className='flex flex-col items-center justify-center flex-grow'>
          <TypingAnimatedText />
        </div>

      </div>
    </div>
  )
}