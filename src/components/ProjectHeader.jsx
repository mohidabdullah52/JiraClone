import React, { useState } from 'react';
import {
  Users,
  MoreHorizontal,
  Share2,
  Zap,
  ExternalLink,
  Maximize2,
  Globe,
  List,
  Kanban,
  Code,
  FileText,
  AlignLeft,
  File,
  Plus
} from 'lucide-react';
import Button from './common/Button';

export default function ProjectHeader({ teamName = "My Software Team" }) {
  const [activeTab, setActiveTab] = useState('Board');

  return (
    <div className="bg-[#1d2125] text-[#9fadbc] px-8 pt-4 flex flex-col w-full border-b border-[#22272b]">
      {/* Breadcrumbs */}
      <Button 
        variant="link" 
        className="text-xs mb-3 w-fit text-[#9fadbc] hover:no-underline"
      >
        Spaces
      </Button>

      {/* Title area */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Team Icon */}
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#00b8d9] to-[#0052cc] flex items-center justify-center text-white">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
          </div>

          <h1 className="text-[1.35rem] font-bold text-[#c7d1db] tracking-tight">{teamName}</h1>

          <Button variant="ghost" icon={Users} className="ml-2 border border-transparent hover:border-[#8c9bab]/20" />
          <Button variant="ghost" icon={MoreHorizontal} className="p-1" />
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" icon={Share2} className="border border-[#8c9bab]/20 group" />
          <Button variant="ghost" icon={Zap} className="border border-[#8c9bab]/20 group" />
          <Button variant="ghost" icon={ExternalLink} className="border border-[#8c9bab]/20 group" />
          <Button variant="ghost" icon={Maximize2} className="border border-[#8c9bab]/20 group" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1.5 mt-2">
        <TabItem icon={Globe} label="Summary" onClick={() => setActiveTab('Summary')} active={activeTab === 'Summary'} />
        <TabItem icon={List} label="List" onClick={() => setActiveTab('List')} active={activeTab === 'List'} />
        <TabItem icon={Kanban} label="Board" onClick={() => setActiveTab('Board')} active={activeTab === 'Board'} />
        <TabItem icon={Code} label="Code" onClick={() => setActiveTab('Code')} active={activeTab === 'Code'} />
        <TabItem icon={FileText} label="Forms" onClick={() => setActiveTab('Forms')} active={activeTab === 'Forms'} />
        <TabItem icon={AlignLeft} label="Timeline" onClick={() => setActiveTab('Timeline')} active={activeTab === 'Timeline'} />
        <TabItem icon={File} label="Pages" onClick={() => setActiveTab('Pages')} active={activeTab === 'Pages'} />
        <Button variant="ghost" icon={Plus} className="ml-2" />
      </div>
    </div>
  );
}

function TabItem({ icon: Icon, label, active, onClick }) {
  return (
    <Button
      variant="tab"
      onClick={onClick}
      className={
        active
          ? 'border-[#579dff] text-[#579dff]'
          : 'border-transparent text-[#9fadbc] hover:bg-[#282e33] hover:text-[#c7d1db] rounded-t'
      }
    >
      <Icon className="w-[18px] h-[18px]" />
      <span>{label}</span>
    </Button>
  );
}
