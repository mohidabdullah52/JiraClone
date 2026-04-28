import React from 'react';
import {
  UserCircle,
  Clock,
  Star,
  AppWindow,
  Layers,
  Globe,
  Plus,
  MoreHorizontal,
  ChevronRight,
  PanelLeftClose,
  Menu,
  Rocket,
  FolderOpen,
  CloudUpload,
  Grid
} from 'lucide-react';
import Button from './common/Button';

const IconMapper = {
  rocket: Rocket,
  menu: Menu,
  folder: FolderOpen,
  cloud: CloudUpload
};

const defaultWorkspaces = [
  {
    section: 'Recent',
    items: [
      { name: 'My Software Team', active: true, id: 2 },
      { name: 'More spaces', iconName: 'menu', hasChevron: true, id: 3 }
    ]
  }
];

export default function Sidebar({ workspaces = defaultWorkspaces, setIsSidebarOpen }) {
  return (
    <div className="w-[260px] bg-[#1d2125] text-[#9fadbc] h-screen flex flex-col border-r border-[#22272b] py-3 overflow-y-auto shrink-0 transition-all">
      {/* Top App Header */}
      <div className="flex items-center justify-between px-4 mb-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" icon={Grid} />
          <div className="flex items-center space-x-2">
            <div className="w-[22px] h-[22px] bg-[#2684ff] rounded-sm flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 12l10 10 10-10L12 2z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-white text-[16px] tracking-tight">Jira</span>
          </div>
        </div>
        <Button 
          variant="ghost" 
          icon={PanelLeftClose} 
          onClick={() => setIsSidebarOpen(false)}
        />
      </div>

      <nav className="flex flex-col px-3 space-y-0.5">
        <NavItem icon={UserCircle} label="For you" />
        <NavItem icon={Clock} label="Recent" hasChevron />
        <NavItem icon={Star} label="Starred" hasChevron />
        <NavItem icon={AppWindow} label="Apps" />
        <NavItem icon={Layers} label="Plans" />
      </nav>

      <div className="mt-6 px-3 flex flex-col">
        <div className="flex items-center justify-between px-2 py-1.5 rounded group cursor-pointer hover:bg-[#282e33] transition-colors mb-2">
          <div className="flex items-center space-x-3 text-[#9fadbc] font-semibold text-[14px]">
            <Globe className="w-[18px] h-[18px]" strokeWidth={2.5} />
            <span>Spaces</span>
          </div>
          <div className="flex items-center space-x-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" icon={Plus} className="p-1 hover:bg-[#a6c5e229]" />
            <Button variant="ghost" icon={MoreHorizontal} className="p-1 hover:bg-[#a6c5e229]" />
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {workspaces.map((section, index) => (
            <div key={index} className="flex flex-col">
              {section.section && (
                <div className="text-[11px] font-bold text-[#9fadbc] uppercase tracking-wider px-2 mb-1.5 mt-1">
                  {section.section}
                </div>
              )}
              <div className="flex flex-col space-y-0.5">
                {section.items.map((item, idx) => (
                  <WorkspaceItem key={idx} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

function NavItem({ icon: Icon, label, hasChevron }) {
  return (
    <Button 
        variant="ghost" 
        className="justify-between px-2 py-1.5 w-full group"
    >
      <div className="flex items-center space-x-3 text-[#9fadbc] group-hover:text-[#c7d1db]">
        <Icon className="w-5 h-5" strokeWidth={2} />
        <span className="text-[14px] font-medium">{label}</span>
      </div>
      {hasChevron && <ChevronRight className="w-4 h-4 text-[#9fadbc] opacity-0 group-hover:opacity-100 transition-opacity" />}
    </Button>
  );
}

function WorkspaceItem({ item }) {
  const isActive = item.active;
  const SpecificIcon = IconMapper[item.iconName];

  return (
    <Button 
        variant="ghost"
        className={`justify-between px-2 py-[7px] w-full group ${isActive ? 'bg-[#1c2b41] text-[#579dff] hover:bg-[#1c2b41]' : ''}`}
    >
      <div className="flex items-center space-x-3 w-full overflow-hidden">
        <div className="w-[20px] h-[20px] rounded flex items-center justify-center shrink-0">
          {SpecificIcon ? (
            <SpecificIcon className={`w-4 h-4 ${isActive ? 'text-[#579dff]' : 'text-[#9fadbc]'}`} />
          ) : (
            <div className="w-[20px] h-[20px] rounded bg-gradient-to-br from-[#00b8d9] to-[#0052cc] flex items-center justify-center overflow-hidden">
              <img src="https://img.icons8.com/color/48/000000/jira.png" alt="" className="w-full h-full object-cover opacity-80 mix-blend-screen" />
            </div>
          )}
        </div>
        <span className={`text-[14px] truncate font-medium ${isActive ? 'text-[#579dff]' : 'group-hover:text-[#c7d1db]'}`}>
          {item.name}
        </span>
      </div>

      <div className="flex items-center shrink-0 pl-2">
        {item.badge && (
          <span className="text-[10px] font-bold border border-[#c084fc] text-[#c084fc] rounded-[3px] px-[5px] bg-[#282236]">
            {item.badge}
          </span>
        )}
        {item.hasChevron && <ChevronRight className="w-4 h-4 text-[#9fadbc] opacity-0 group-hover:opacity-100 transition-opacity" />}
      </div>
    </Button>
  );
}
