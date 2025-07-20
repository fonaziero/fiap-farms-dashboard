// src/components/Sidebar.tsx
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {
  LayoutDashboard,
  BarChart,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import clsx from 'clsx';
import { getTheme } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const handleNavigate = (route: string) => {
    navigate(route)
  }

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', route: '/dashboard' },
    { icon: BarChart, label: 'Relatórios', route: '/dashboard' },
    { icon: Settings, label: 'Configurações', route: '/settings' },
  ];

  const theme = getTheme();

  const NavList = ({ onItemClick }: { onItemClick?: () => void }) => (
    <nav className="space-y-2 px-4 pt-4">
      {navItems.map((item, i) => (
        <button
          key={i}
          onClick={() => {
            handleNavigate(item.route);
            onItemClick?.();
          }}
          className={`flex items-center gap-3  w-full p-2 rounded-md transition-colors hover:bg-secondary/80 ${theme === 'dark' ? 'bg-card ' : 'bg-primary '} `}
        >
          <item.icon size={20} />
          <span className="text-sm font-medium">{item.label}</span>
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* Sidebar fixo (desktop) */}
      <aside className={`hidden md:flex flex-col w-64 h-screen  bg-primary fixed left-0 top-0 z-30  ${theme === 'dark' ? 'text-foreground ' : 'text-primary-foreground'}`}>
        <div className="p-6 font-bold text-xl border-b border-border">🌾 FIAP Farms</div>
        <NavList />
        <div className="mt-auto p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 hover:bg-destructive text-destructive-foreground bg-destructive p-2 rounded-md w-full"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>

      </aside>

      {/* Drawer lateral (mobile) */}
      <div
        className={clsx(
          'fixed inset-0 z-40 transition-transform duration-300 md:hidden ',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        ) + ` ${theme === 'dark' ? 'text-foreground ' : 'text-primary-foreground'} `}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />

        {/* Conteúdo da sidebar mobile */}
        <div className="relative w-64  bg-primary  h-full flex flex-col z-50 shadow-lg">
          <div className="flex justify-between items-center px-4 py-4 border-b border-border">
            <span className="font-bold text-xl">🌾 FIAP Farms</span>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
          <NavList onItemClick={onClose} />
          <div className="mt-auto p-4 border-t border-green-600">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 text-foreground hover:bg-background p-2 rounded-md w-full   ${theme === 'dark' ? 'text-foreground ' : 'text-primary-foreground'} `}
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
