import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import ProjectHeader from '../components/ProjectHeader'
import TicketCategory from '../components/TicketCategory'
import TicketModal from '../components/TicketModal'
import { TicketAPI } from '../services/authService/endpoints'
import { useRef } from "react";

function Counter() {
  const countRef = useRef(0);

  const increment = () => {
    countRef.current += 1;
    console.log(countRef.current);
  };

  return <div className='flex items-center justify-center'>
    <button className='font-bold text-white bg-blue-500 px-4 py-2 rounded-lg' onClick={increment}>Increment</button>
    <br />
    <p className='font-bold text-white'>{countRef.current}</p>
  </div>
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    const cachedTickets = localStorage.getItem('temporaryTicketState');

    if (cachedTickets) {
      setTickets(JSON.parse(cachedTickets));
    } else {
      TicketAPI.listTickets()
        .then((response) => {
          setTickets(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch dashboard tickets: ", error);
        });
    }

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
        return { ...ticket, status: targetStatus };
      }
      return ticket;
    });

    // Update the visual React state
    setTickets(updatedTickets);

    // Save to local storage so they are kept on restart!
    localStorage.setItem('temporaryTicketState', JSON.stringify(updatedTickets));
  };

  return (
    <>
      <ProjectHeader teamName="Jira Clone" />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className='flex items-start flex-grow p-8 space-x-6 overflow-x-auto'>

          <TicketCategory
            categoryName="TO DO"
            ticketInfo={tickets.filter(ticket => ticket.status === 'TODO')}
            onTicketClick={setSelectedTicket}
          />

          <TicketCategory
            categoryName="IN REVIEW"
            ticketInfo={tickets.filter(ticket => ticket.status === 'INREVIEW')}
            onTicketClick={setSelectedTicket}
          />
          <Counter />
        </div>
      </DragDropContext>

      {/* Pop-up Ticket Modal */}
      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      )}
    </>
  )
}