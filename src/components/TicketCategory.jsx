import React from 'react';
import { Calendar, CheckSquare, Plus, MoreHorizontal, SquarePen } from 'lucide-react';

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

      {/* Tickets List */}
      <div className="flex flex-col space-y-2 flex-grow mb-1">
        {ticketInfo.map((ticket, idx) => (
          <div 
            key={idx}
            className="bg-[#22272b] p-3 rounded-[8px] border border-[#4c9aff] shadow-[0_1px_2px_rgba(0,0,0,0.3)] flex flex-col cursor-pointer hover:bg-[#282e33] transition-colors"
          >
            {/* Title Row */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2 overflow-hidden pr-2">
                <span className="text-[#c7d1db] text-[14px] font-medium leading-tight truncate">
                  {ticket.title}
                </span>
                <SquarePen className="w-4 h-4 text-[#9fadbc] shrink-0" />
              </div>
              <button className="text-[#9fadbc] hover:bg-[#a6c5e229] p-0.5 rounded transition-colors shrink-0">
                <MoreHorizontal className="w-[18px] h-[18px]" strokeWidth={2.5}/>
              </button>
            </div>

            {/* Date Badge */}
            {ticket.date && (
                <div className="flex items-center space-x-1.5 border border-[#8c9bab]/20 text-[#9fadbc] rounded-[4px] text-[12px] px-1.5 py-[2px] w-fit mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{ticket.date}</span>
                </div>
            )}

            {/* Footer Row */}
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center space-x-2 text-[#9fadbc]">
                <CheckSquare className="w-4 h-4 text-[#579dff] bg-[#1d2125] rounded-[3px]" />
                <span className="text-[12px] font-medium text-[#c7d1db]">{ticket.id}</span>
              </div>
              
              {ticket.assigneeInitials && (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[#1d2125] font-bold text-[10px] ${ticket.assigneeColor || 'bg-[#00a3bf]'}`}>
                  {ticket.assigneeInitials}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

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
