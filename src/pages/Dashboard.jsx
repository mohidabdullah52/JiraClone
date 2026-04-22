import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import ProjectHeader from '../components/ProjectHeader'
import TicketCategory from '../components/TicketCategory'
import AuthAxios from '../api/AuthAxios'

export default function Dashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
      return;
    }

    AuthAxios.get('/tickets')
        .then((response) => {
            setTickets(response.data);
        })
        .catch((error) => {
            console.error("Failed to fetch dashboard tickets: ", error);
        });

  }, [navigate]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    // Convert visual column name to the database enum
    const statusMap = {
        "TO DO": "TODO",
        "IN REVIEW": "INREVIEW"
    };
    const targetStatus = statusMap[destination.droppableId];

    // Optimistically update the UI instantly without waiting or refreshing
    const updatedTickets = tickets.map(ticket => {
        if (String(ticket.id) === draggableId) {
            // Note: If you have a backend endpoint to update this, put the AuthAxios.patch call here!
            return { ...ticket, status: targetStatus };
        }
        return ticket;
    });

    setTickets(updatedTickets);
  };

  return (
    <>
      <ProjectHeader teamName="Jira Clone" />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex items-start flex-grow p-8 space-x-6 overflow-x-auto'>

          <TicketCategory
            categoryName="TO DO"
            ticketInfo={tickets.filter(ticket => ticket.status === 'TODO')}
          />

          <TicketCategory
            categoryName="IN REVIEW"
            ticketInfo={tickets.filter(ticket => ticket.status === 'INREVIEW')}
          />
        </div>
      </DragDropContext>
    </>
  )
}