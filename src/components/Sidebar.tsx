import React from 'react';
import { Calendar, Home, Settings, Users, Wallet } from 'lucide-react';

interface SidebarProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentPage }) => {
  return (
    <aside className="w-64 bg-indigo-600 text-white p-6">
      <div className="flex items-center space-x-3 mb-8">
        <Home className="w-8 h-8" />
        <h1 className="text-xl font-bold">HouseHarmony</h1>
      </div>
      
      <nav className="space-y-2">
        <NavItem 
          icon={<Home className="w-5 h-5" />} 
          label="Dashboard" 
          active={currentPage === 'dashboard'}
          onClick={() => onNavigate('dashboard')}
        />
        <NavItem 
          icon={<Calendar className="w-5 h-5" />} 
          label="Tasks" 
          active={currentPage === 'tasks'}
          onClick={() => onNavigate('tasks')}
        />
        <NavItem 
          icon={<Wallet className="w-5 h-5" />} 
          label="House Fund" 
          active={currentPage === 'fund'}
          onClick={() => onNavigate('fund')}
        />
        <NavItem 
          icon={<Users className="w-5 h-5" />} 
          label="Housemates" 
          active={currentPage === 'housemates'}
          onClick={() => onNavigate('housemates')}
        />
        <NavItem 
          icon={<Settings className="w-5 h-5" />} 
          label="Settings" 
          active={currentPage === 'settings'}
          onClick={() => onNavigate('settings')}
        />
      </nav>
      
      <div className="mt-auto pt-8">
        <div className="bg-indigo-700 rounded-lg p-4">
          <h3 className="font-semibold mb-2">House Fund</h3>
          <p className="text-2xl font-bold">$420.69</p>
          <p className="text-sm text-indigo-200">Next Goal: $500</p>
        </div>
      </div>
    </aside>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors
        ${active ? 'bg-indigo-700' : 'hover:bg-indigo-700/50'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

export default Sidebar;