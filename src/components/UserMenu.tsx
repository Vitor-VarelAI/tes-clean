import React, { useState, useRef, useEffect } from 'react';
import { Settings, User, HelpCircle, LogOut } from 'lucide-react';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { icon: <User className="w-4 h-4" />, label: 'Manage Account' },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings' },
    { icon: <HelpCircle className="w-4 h-4" />, label: 'Help' },
    { icon: <LogOut className="w-4 h-4" />, label: 'Sign Out' },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 focus:outline-none"
      >
        <span className="text-sm font-medium text-gray-700">Alex Smith</span>
        <img
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=32&h=32&fit=crop&crop=faces"
          alt="User avatar"
          className="w-8 h-8 rounded-full ring-2 ring-white"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-1 z-50">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={() => setIsOpen(false)}
              className={`w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2
                ${index === menuItems.length - 1 ? 'border-t border-gray-100' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu;