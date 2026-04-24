import React from 'react';
import { Calendar, CheckSquare, MoreHorizontal, SquarePen } from 'lucide-react';
import { Draggable } from '@hello-pangea/dnd';

export default function TicketCard({ 
    id, 
    index,
    title, 
    description, 
    issueType, 
    priority, 
    status, 
    reporter, 
    assignee, 
    dueDate, 
    createdAt, 
    updatedAt,
    onClick
}) {
    // Safely format an ISO date string to Jira's "19 Apr 2026" standard
    const formatDate = (dateString) => {
        if (!dateString) return null;
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
        } catch {
            return dateString;
        }
    };

    // Automatically generate a profile icon initial mathematically based on the assignee string
    const assigneeInitials = assignee ? assignee.charAt(0).toUpperCase() : '?';

    return (
        <Draggable draggableId={String(id)} index={index}>
            {(provided, snapshot) => (
                <div 
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={onClick}
                    className={`bg-[#22272b] p-3 rounded-[8px] border border-[#4c9aff] flex flex-col cursor-pointer transition-colors ${snapshot.isDragging ? 'bg-[#282e33] shadow-[0_5px_15px_rgba(0,0,0,0.7)] rotate-2 z-50' : 'shadow-[0_1px_2px_rgba(0,0,0,0.3)] hover:bg-[#282e33]'}`}
                >
                    {/* Title Row */}
                    <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2 overflow-hidden pr-2">
                <span className="text-[#c7d1db] text-[14px] font-medium leading-tight truncate" title={title}>
                  {title}
                </span>
                <SquarePen className="w-4 h-4 text-[#9fadbc] shrink-0" />
              </div>
              <button className="text-[#9fadbc] hover:bg-[#a6c5e229] p-0.5 rounded transition-colors shrink-0">
                <MoreHorizontal className="w-[18px] h-[18px]" strokeWidth={2.5}/>
              </button>
            </div>

            {/* Date Badge */}
            {dueDate && (
                <div className="flex items-center space-x-1.5 border border-[#8c9bab]/20 text-[#9fadbc] rounded-[4px] text-[12px] px-1.5 py-[2px] w-fit mb-3">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(dueDate)}</span>
                </div>
            )}

            {/* Footer Row */}
            <div className="flex items-center justify-between mt-auto">
              {/* Left Side: ID & Issue Type/Priority flags could go here */}
              <div className="flex items-center space-x-2 text-[#9fadbc]">
                <CheckSquare className="w-4 h-4 text-[#579dff] bg-[#1d2125] rounded-[3px]" />
                <span className="text-[12px] font-medium text-[#c7d1db]">KAN-{id}</span>
              </div>
              
              {/* Right Side: Assignee Profile Initial Box */}
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-[#1d2125] font-bold text-[10px] bg-[#00a3bf]" 
                title={`Assignee: ${assignee}`}
              >
                {assigneeInitials}
              </div>
            </div>
        </div>
            )}
        </Draggable>
    );
}
