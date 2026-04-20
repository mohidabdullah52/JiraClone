import {
    Grid,
    Search,
    Bell,
    HelpCircle,
    Settings,
    PanelLeft,
    Gem,
    Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header({ isSidebarOpen, setIsSidebarOpen }) {
    return (
        <header className="flex items-center justify-between px-4 py-2 bg-[#1d2125] border-b border-[#22272b] text-white h-14 w-full text-sm">
            {/* Left side */}
            <div className="flex items-center space-x-3 w-full">
                {!isSidebarOpen && (
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-1 hover:bg-[#282e33] rounded group border border-[#8c9bab]/30 flex items-center justify-center transition-colors">
                        <PanelLeft className="w-5 h-5 text-[#9fadbc]" />
                    </button>
                )}

                {!isSidebarOpen && (
                    <button className="p-1 hover:bg-[#282e33] rounded text-[#9fadbc] transition-colors">
                        <Grid className="w-5 h-5" />
                    </button>
                )
                }

                <div className="flex items-center space-x-1 font-bold text-xl text-white ml-2 mr-2 cursor-pointer">
                    <div className="w-6 h-6 bg-[#2684ff] rounded-sm flex items-center justify-center mr-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 12l10 10 10-10L12 2z" fill="white" />
                        </svg>
                    </div>
                    <span className="tracking-tight text-[1.15rem]">Jira</span>
                </div>

                <div className="relative flex items-center w-[300px]">
                    <Search className="w-4 h-4 absolute left-3 text-[#9fadbc]" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-9 pr-4 py-1.5 bg-[#22272b] border border-[#738496] rounded hover:bg-[#282e33] focus:bg-[#22272b] focus:border-[#4c9aff] focus:ring-1 focus:ring-[#4c9aff] outline-none text-[#9fadbc] placeholder-[#9fadbc] transition-all"
                    />
                </div>

                <button className="bg-[#579dff] hover:bg-[#85b8ff] text-[#1d2125] px-3 py-1.5 rounded font-medium transition-colors flex items-center ml-2">
                    <Plus className="w-4 h-4 mr-0.5" />
                    <span>Create</span>
                </button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4 pl-4 flex-shrink-0">

                <div className="flex items-center space-x-1">
                    <button className="p-1.5 hover:bg-[#282e33] rounded-full relative text-[#9fadbc] transition-colors">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-0 right-0 bg-[#579dff] text-[#1d2125] text-[10px] font-bold px-[3px] rounded flex items-center justify-center transform translate-x-0.5 -translate-y-0.5">
                            3+
                        </span>
                    </button>

                    <button className="p-1.5 hover:bg-[#282e33] rounded-full text-[#9fadbc] transition-colors">
                        <HelpCircle className="w-5 h-5" />
                    </button>

                    <button className="p-1.5 hover:bg-[#282e33] rounded-full text-[#9fadbc] transition-colors">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>

                <button className="w-7 h-7 rounded-full bg-[#00a3bf] text-[#1d2125] flex items-center justify-center text-xs font-bold ml-1 hover:opacity-90 transition-opacity">
                    M
                </button>
            </div>
        </header>
    );
}
