import React, { useState } from 'react';
import { Calendar, Home, Settings, Users, Wallet, HelpCircle, User } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TasksPage from './components/tasks/TasksPage';
import HouseFund from './components/fund/HouseFund';
import Sidebar from './components/Sidebar';
import UserMenu from './components/UserMenu';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main className="flex-1">
        <div className="p-8">
          <div className="flex justify-end mb-8">
            <UserMenu />
          </div>
          {currentPage === 'dashboard' && <Dashboard />}
          {currentPage === 'tasks' && <TasksPage />}
          {currentPage === 'fund' && <HouseFund />}
        </div>
      </main>
    </div>
  );
}

export default App;