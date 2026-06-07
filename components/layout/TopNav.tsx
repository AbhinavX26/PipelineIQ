"use client";
import { usePathname } from 'next/navigation';
import { Search, Bell, ChevronRight, User, Settings, LogOut, ShieldAlert } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser, getCurrentUserInitials, getCurrentUserShortName } from '@/lib/session';

export default function TopNav() {
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userName, setUserName] = useState('Arjun');
  const [userFullName, setUserFullName] = useState('Arjun Mehta');
  const [userRole, setUserRole] = useState('Platform SRE lead');
  const [userInitials, setUserInitials] = useState('AM');

  // Parse segments for breadcrumbs
  const segments = pathname.split('/').filter(Boolean);
  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUserName(getCurrentUserShortName());
      setUserFullName(user.name);
      setUserInitials(getCurrentUserInitials());
      setUserRole(user.role === 'owner' ? 'Platform SRE lead' : user.role === 'admin' ? 'Admin' : 'Platform Team Member');
    }
  }, []);

  return (
    <header className="h-16 border-b border-[#2A2F45] bg-[#0D0F14]/70 backdrop-blur-md sticky top-0 z-40 px-8 flex items-center justify-between">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm">
        <Link href="/dashboard" className="text-[#8B91B5] hover:text-[#F0F2FF] transition-colors font-medium">
          PipelineIQ
        </Link>
        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          const display = segment.includes('[') || segment.match(/^[a-z0-9-]{6,}$/i)
            ? segment // Leave dynamic IDs as-is or format them
            : capitalize(segment.replace(/-/g, ' '));

          return (
            <div key={href} className="flex items-center gap-2">
              <ChevronRight size={14} className="text-[#4A5070]" />
              {isLast ? (
                <span className="text-[#F0F2FF] font-semibold">{display}</span>
              ) : (
                <Link href={href} className="text-[#8B91B5] hover:text-[#F0F2FF] transition-colors font-medium">
                  {display}
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* Center: Search Bar */}
      <div className="hidden md:flex items-center relative w-96">
        <Search className="absolute left-3 w-4 h-4 text-[#8B91B5]" />
        <input
          type="text"
          placeholder="Search services, deployments, incidents..."
          className="w-full bg-[#13161E] border border-[#2A2F45] rounded-lg pl-10 pr-4 py-1.5 text-xs text-[#F0F2FF] placeholder-[#4A5070] focus:outline-none focus:border-[#4F7FFF] transition-colors"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4 relative">
        {/* Notifications */}
        <button 
          onClick={() => { setShowNotifications(!showNotifications); setShowProfileMenu(false); }}
          className="p-2 text-[#8B91B5] hover:text-[#F0F2FF] rounded-lg hover:bg-[#1C2030] transition-all relative"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full animate-pulse" />
        </button>

        {showNotifications && (
          <div className="absolute right-12 top-12 w-80 bg-[#13161E] border border-[#2A2F45] rounded-xl shadow-2xl overflow-hidden z-50 animate-fade-in">
            <div className="px-4 py-3 border-b border-[#2A2F45] flex justify-between items-center bg-[#1C2030]/50">
              <span className="font-semibold text-xs text-[#F0F2FF]">Alert Ingestion Stream</span>
              <span className="text-[10px] text-[#A78BFA] font-bold">3 UNREAD</span>
            </div>
            <div className="divide-y divide-[#2A2F45] max-h-64 overflow-y-auto">
              <div className="p-3 hover:bg-[#1C2030] transition-colors flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#F0F2FF] font-medium">Critical incident detected in payment-service</p>
                  <span className="text-[10px] text-[#8B91B5]">P1 Latency Spike • 2 hours ago</span>
                </div>
              </div>
              <div className="p-3 hover:bg-[#1C2030] transition-colors flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#EAB308] mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#F0F2FF]">High Risk deploy logged for auth-service</p>
                  <span className="text-[10px] text-[#8B91B5]">Risk Score: 67 • 4 hours ago</span>
                </div>
              </div>
              <div className="p-3 hover:bg-[#1C2030] transition-colors flex gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />
                <div>
                  <p className="text-xs text-[#F0F2FF]">Build failure in pipeline pipeline-gateway-pr-12</p>
                  <span className="text-[10px] text-[#8B91B5]">Failed at test stage • 5 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="relative">
          <button 
            onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotifications(false); }}
            className="flex items-center gap-2 p-1 pl-2 pr-3 bg-[#13161E] hover:bg-[#1C2030] border border-[#2A2F45] rounded-lg transition-colors group"
          >
            <div className="w-6 h-6 rounded-full bg-[#4F7FFF] flex items-center justify-center text-xs text-white font-bold">
              {userInitials}
            </div>
            <span className="text-xs font-semibold text-[#8B91B5] group-hover:text-[#F0F2FF] transition-colors hidden sm:inline">
              {userName}
            </span>
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 top-10 w-48 bg-[#13161E] border border-[#2A2F45] rounded-xl shadow-2xl py-1 z-50 animate-fade-in">
              <div className="px-4 py-2 border-b border-[#2A2F45]">
                <p className="text-xs font-semibold text-[#F0F2FF]">{userFullName}</p>
                <p className="text-[10px] text-[#8B91B5]">{userRole}</p>
              </div>
              <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-xs text-[#8B91B5] hover:text-[#F0F2FF] hover:bg-[#1C2030] transition-colors">
                <User size={14} /> Profile Settings
              </Link>
              <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-xs text-[#8B91B5] hover:text-[#F0F2FF] hover:bg-[#1C2030] transition-colors">
                <Settings size={14} /> Organization setup
              </Link>
              <Link href="/" className="flex items-center gap-2 px-4 py-2 text-xs text-[#EF4444] hover:bg-red-500/10 transition-colors border-t border-[#2A2F45]">
                <LogOut size={14} /> Sign out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
