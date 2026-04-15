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

export default function ProjectHeader({ teamName = "My Software Team" }) {
  return (
    <div className="bg-[#1d2125] text-[#9fadbc] px-8 pt-4 flex flex-col w-full border-b border-[#22272b]">
      {/* Breadcrumbs */}
      <div className="text-xs mb-3 hover:underline cursor-pointer w-fit text-[#9fadbc]">
        Spaces
      </div>

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

          <button className="p-1.5 hover:bg-[#282e33] rounded flex items-center justify-center transition-colors border border-transparent hover:border-[#8c9bab]/20 ml-2">
            <Users className="w-4 h-4 text-[#9fadbc]" />
          </button>

          <button className="p-1 hover:bg-[#282e33] rounded flex items-center justify-center transition-colors">
            <MoreHorizontal className="w-5 h-5 text-[#9fadbc]" />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-1.5 hover:bg-[#282e33] rounded border border-[#8c9bab]/20 flex items-center justify-center transition-colors group">
            <Share2 className="w-4 h-4 text-[#9fadbc] group-hover:text-[#c7d1db]" />
          </button>
          <button className="p-1.5 hover:bg-[#282e33] rounded border border-[#8c9bab]/20 flex items-center justify-center transition-colors group">
            <Zap className="w-4 h-4 text-[#9fadbc] group-hover:text-[#c7d1db]" />
          </button>
          <button className="p-1.5 hover:bg-[#282e33] rounded border border-[#8c9bab]/20 flex items-center justify-center transition-colors group">
            <ExternalLink className="w-4 h-4 text-[#9fadbc] group-hover:text-[#c7d1db]" />
          </button>
          <button className="p-1.5 hover:bg-[#282e33] rounded border border-[#8c9bab]/20 flex items-center justify-center transition-colors group">
            <Maximize2 className="w-4 h-4 text-[#9fadbc] group-hover:text-[#c7d1db]" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1.5 mt-2">
        <TabItem icon={Globe} label="Summary" />
        <TabItem icon={List} label="List" active />
        <TabItem icon={Kanban} label="Board" />
        <TabItem icon={Code} label="Code" />
        <TabItem icon={FileText} label="Forms" />
        <TabItem icon={AlignLeft} label="Timeline" />
        <TabItem icon={File} label="Pages" />
        <button className="p-1.5 hover:bg-[#282e33] rounded flex items-center justify-center transition-colors ml-2 text-[#9fadbc]">
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function TabItem({ icon: Icon, label, active }) {
  return (
    <button
      className={`flex items-center space-x-1.5 px-3 py-2 text-[14px] font-medium border-b-2 transition-colors relative top-[1px]
        ${active
          ? 'border-[#579dff] text-[#579dff]'
          : 'border-transparent text-[#9fadbc] hover:bg-[#282e33] hover:text-[#c7d1db] rounded-t'
        }
      `}
    >
      <Icon className="w-[18px] h-[18px]" />
      <span>{label}</span>
    </button>
  );
}
