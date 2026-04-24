import React from 'react';
import { X, Calendar, User, AlignLeft, Activity } from 'lucide-react';

export default function TicketModal({ ticket, onClose }) {
  if (!ticket) return null;

  const formatDate = (dateString) => {
      if (!dateString) return null;
      try {
          const date = new Date(dateString);
          return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
      } catch {
          return dateString;
      }
  };

  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
    >
      <div 
        className="bg-[#22272b] w-full max-w-3xl max-h-[90vh] rounded-xl shadow-2xl flex flex-col border border-[#38414a] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[#38414a]">
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-3 text-[#9fadbc] text-sm font-medium">
              <span className="uppercase tracking-wider text-xs">{ticket.issueType || 'STORY'}</span>
              <span>•</span>
              <span className="text-[#579dff]">KAN-{ticket.id}</span>
            </div>
            <h2 className="text-[#c7d1db] text-2xl font-bold leading-tight mt-2">{ticket.title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-[#9fadbc] hover:bg-[#282e33] hover:text-[#c7d1db] p-1.5 rounded transition-colors shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col md:flex-row flex-grow overflow-y-auto">
          {/* Main Column */}
          <div className="flex-grow p-6 md:pr-5 md:border-r border-[#38414a] space-y-8">
            
            {/* Description Section */}
            <div>
              <div className="flex items-center space-x-2 text-[#c7d1db] text-base font-semibold mb-4">
                <AlignLeft className="w-5 h-5" />
                <span>Description</span>
              </div>
              <div className="text-[#9fadbc] text-[15px] leading-relaxed whitespace-pre-wrap pl-7">
                {ticket.description || "No description provided."}
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="w-full md:w-[320px] p-6 md:pl-5 bg-[#1d2125]/50 flex flex-col space-y-6 shrink-0">
            
            {/* Status Dropdown (Visual Only) */}
            <div className="flex flex-col space-y-2">
              <span className="text-[#9fadbc] text-xs font-bold uppercase tracking-wide">Status</span>
              <div className="bg-[#282e33] text-[#c7d1db] text-sm font-semibold px-4 py-2 rounded border border-[#38414a] cursor-pointer hover:bg-[#323940] w-fit flex items-center space-x-2 transition-colors">
                <span>{ticket.status}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-[#9fadbc]"><path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            </div>

            {/* Details Section */}
            <div className="flex flex-col space-y-4 pt-4 border-t border-[#38414a]">
              <div className="flex items-center justify-between text-[13px]">
                <div className="flex items-center space-x-2 text-[#9fadbc] w-24">
                  <User className="w-4 h-4" />
                  <span className="font-semibold">Assignee</span>
                </div>
                <div className="flex items-center space-x-2 text-[#c7d1db] flex-grow hover:bg-[#282e33] p-1 -ml-1 rounded cursor-pointer transition-colors w-fit">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#1d2125] font-bold text-[9px] bg-[#00a3bf]">
                    {ticket.assignee ? ticket.assignee.charAt(0).toUpperCase() : '?'}
                  </div>
                  <span>{ticket.assignee || 'Unassigned'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[13px]">
                <div className="flex items-center space-x-2 text-[#9fadbc] w-24">
                  <User className="w-4 h-4" />
                  <span className="font-semibold">Reporter</span>
                </div>
                <div className="flex items-center space-x-2 text-[#c7d1db] flex-grow hover:bg-[#282e33] p-1 -ml-1 rounded cursor-pointer transition-colors w-fit">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-[#1d2125] font-bold text-[9px] bg-[#ff8f73]">
                    {ticket.reporter ? ticket.reporter.charAt(0).toUpperCase() : '?'}
                  </div>
                  <span>{ticket.reporter || 'Unknown'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[13px] pt-1">
                <div className="flex items-center space-x-2 text-[#9fadbc] w-24">
                  <Activity className="w-4 h-4" />
                  <span className="font-semibold">Priority</span>
                </div>
                <span className="text-[#c7d1db] font-medium flex-grow px-1">{ticket.priority || 'MEDIUM'}</span>
              </div>

            </div>

            {/* Dates Section */}
            <div className="flex flex-col space-y-3 pt-6 border-t border-[#38414a]">
              <div className="flex flex-col space-y-2.5 text-[12px] text-[#9fadbc]">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Due: {formatDate(ticket.dueDate) || 'None'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Created: {formatDate(ticket.createdAt) || 'Unknown'}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
