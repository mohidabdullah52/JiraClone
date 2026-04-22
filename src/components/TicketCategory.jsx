import React from 'react';
import { Plus } from 'lucide-react';
import { Droppable } from '@hello-pangea/dnd';
import TicketCard from './TicketCard';

export default function TicketCategory({ categoryName, ticketInfo = [] }) {
  const isEmpty = ticketInfo.length === 0;

  return (
    <div className="bg-[#161a1d] rounded-xl w-[280px] min-h-[140px] flex flex-col p-2.5 shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 px-1.5 pt-1">
        <div className="flex items-center space-x-2">
          <h2 className="text-[#9fadbc] text-[11px] font-bold uppercase tracking-wider">
            {categoryName}
          </h2>
          {!isEmpty && (
            <span className="bg-[#282e33] text-[#9fadbc] text-[11px] font-bold px-[6px] py-[1px] rounded">
              {ticketInfo.length}
            </span>
          )}
        </div>
      </div>

      {/* Tickets List - Defined as Droppable Area */}
      <Droppable droppableId={categoryName}>
        {(provided) => (
          <div 
            className="flex flex-col space-y-2 flex-grow mb-1 min-h-[50px]"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {ticketInfo.map((ticket, idx) => (
              <TicketCard key={ticket.id || idx} index={idx} {...ticket} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Create Button */}
      {!isEmpty && (
        <button className="flex items-center space-x-2 text-[#9fadbc] hover:bg-[#282e33] p-1.5 rounded transition-colors text-[14px] font-medium w-full mt-1">
          <Plus className="w-5 h-5" />
          <span>Create</span>
        </button>
      )}
    </div>
  );
}
