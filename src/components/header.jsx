import {
    Grid,
    Search,
    Bell,
    HelpCircle,
    Settings,
    PanelLeft,
    Plus
} from 'lucide-react';
import Button from './common/Button';
import Input from './common/Input';

export default function Header({ isSidebarOpen, setIsSidebarOpen, userEmail }) {
    const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : '?';

    return (
        <header className="flex items-center justify-between px-4 py-2 bg-[#1d2125] border-b border-[#22272b] text-white h-14 w-full text-sm">
            {/* Left side */}
            <div className="flex items-center space-x-3 w-full">
                {!isSidebarOpen && (
                    <Button
                        variant="icon"
                        onClick={() => setIsSidebarOpen(true)}
                        className="border border-[#8c9bab]/30"
                        icon={PanelLeft}
                    />
                )}

                {!isSidebarOpen && (
                    <Button
                        variant="icon"
                        icon={Grid}
                    />
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

                <div className="w-[300px]">
                    <Input
                        type="text"
                        placeholder="Search"
                        icon={Search}
                        className="py-1.5 hover:bg-[#282e33] focus:bg-[#22272b]"
                    />
                </div>

                <Button
                    variant="primary"
                    className="ml-2"
                    icon={Plus}
                >
                    Create
                </Button>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4 pl-4 flex-shrink-0">

                <div className="flex items-center space-x-1">
                    <div className="relative">
                        <Button variant="icon" icon={Bell} className="rounded-full p-1.5" />
                        <span className="absolute top-0 right-0 bg-[#579dff] text-[#1d2125] text-[10px] font-bold px-[3px] rounded flex items-center justify-center transform translate-x-0.5 -translate-y-0.5 pointer-events-none">
                            3+
                        </span>
                    </div>

                    <Button variant="icon" icon={HelpCircle} className="rounded-full p-1.5" />

                    <Button variant="icon" icon={Settings} className="rounded-full p-1.5" />
                </div>

                <div className="flex items-center space-x-2 pl-2">
                    {userEmail && (
                        <span className="text-[#9fadbc] text-xs font-medium truncate max-w-[120px] hidden md:block">
                            {userEmail}
                        </span>
                    )}
                    <button
                        className="w-7 h-7 rounded-full bg-[#00a3bf] text-[#1d2125] flex items-center justify-center text-xs font-bold hover:opacity-90 transition-opacity shrink-0"
                        title={userEmail || "Profile"}
                    >
                        {userInitial}
                    </button>
                </div>
            </div>
        </header>
    );
}
