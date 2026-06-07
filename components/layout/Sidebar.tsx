"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, History, Rocket, Flame, 
  BarChart3, MessageSquare, Settings, BrainCircuit, ShieldAlert
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getCurrentUser, getCurrentUserInitials } from '@/lib/session';

const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Timeline', href: '/timeline', icon: History },
  { name: 'Deployments', href: '/deployments', icon: Rocket },
  { name: 'Incidents', href: '/incidents', icon: Flame },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'AI Chat', href: '/chat', icon: MessageSquare, badge: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [userName, setUserName] = useState('Arjun Mehta');
  const [userRole, setUserRole] = useState('Platform Team Lead');
  const [userInitials, setUserInitials] = useState('AM');

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUserName(user.name);
      setUserRole(user.role === 'owner' ? 'Platform Team Lead' : user.role === 'admin' ? 'Admin' : 'Platform Team Member');
      setUserInitials(getCurrentUserInitials());
    }
  }, []);

  return (
    <aside className="w-64 border-r border-[#2A2F45] bg-[#13161E] flex flex-col h-screen sticky top-0 z-50">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3 border-b border-[#2A2F45]/50 bg-[#0D0F14]/25">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-to-br from-[#4F7FFF] to-[#A78BFA] rounded-xl flex items-center justify-center shadow-lg shadow-[#4F7FFF]/20 group-hover:scale-105 transition-transform duration-200">
            <BrainCircuit className="text-[#0D0F14] w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-[#F0F2FF] group-hover:text-[#4F7FFF] transition-colors duration-200">PipelineIQ</span>
            <span className="text-[10px] text-[#8B91B5] font-semibold tracking-widest uppercase">DevOps Intelligence</span>
          </div>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                isActive 
                  ? "bg-gradient-to-r from-[#4F7FFF]/15 to-[#4F7FFF]/5 text-[#4F7FFF] font-semibold border border-[#4F7FFF]/25" 
                  : "text-[#8B91B5] hover:bg-[#1C2030]/60 hover:text-[#F0F2FF] border border-transparent"
              )}
            >
              {/* Active sidebar pill indicator */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-[#4F7FFF] rounded-r-md" />
              )}
              
              <item.icon className={cn(
                "w-5 h-5 transition-transform duration-200 group-hover:scale-105",
                isActive ? "text-[#4F7FFF]" : "text-[#8B91B5] group-hover:text-[#F0F2FF]"
              )} />
              <span className="text-xs font-medium">{item.name}</span>
              {item.badge && (
                <div className="ml-auto w-2 h-2 rounded-full bg-[#A78BFA] animate-pulse shadow-glow shadow-[#A78BFA]/50" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer Settings & profile */}
      <div className="p-4 border-t border-[#2A2F45]/80 bg-[#0D0F14]/20 space-y-3">
        <Link 
          href="/settings" 
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-[#8B91B5] hover:text-[#F0F2FF] hover:bg-[#1C2030]/50 border border-transparent transition-all",
            pathname === '/settings' && "bg-[#1C2030]/50 text-[#F0F2FF]"
          )}
        >
          <Settings className="w-5 h-5 text-[#8B91B5]" />
          <span className="text-xs font-medium">Settings</span>
        </Link>
        
        {/* User Card */}
        <div className="flex items-center gap-3 p-2 bg-[#1C2030]/30 rounded-xl border border-[#2A2F45]/50">
          <div className="w-8 h-8 rounded-lg bg-[#4F7FFF]/15 text-[#4F7FFF] flex items-center justify-center font-bold text-sm border border-[#4F7FFF]/20">
            {userInitials}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-[#F0F2FF] truncate">{userName}</span>
            <span className="text-[10px] text-[#8B91B5] truncate">{userRole}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
