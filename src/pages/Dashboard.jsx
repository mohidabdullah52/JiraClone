import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectHeader from '../components/ProjectHeader'
import TicketCategory from '../components/TicketCategory'

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <ProjectHeader teamName="Jira Clone" />
        <div className='flex items-start flex-grow p-8 space-x-6 overflow-x-auto'>

          <TicketCategory
            categoryName="TO DO"
            ticketInfo={[
              {
                id: 'KAN-1',
                title: 'Task 1',
                date: '19 Apr 2026',
                assigneeInitials: 'M',
                assigneeColor: 'bg-[#00a3bf]'
              }
            ]}
          />

          {/* Empty Category Example */}
          <TicketCategory
            categoryName="IN REVIEW"
            ticketInfo={[]}
          />
        </div>
    </>
  )
}