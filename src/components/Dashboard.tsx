import React from 'react';
import { Calendar, CheckCircle, Clock, DollarSign, Plus, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Alex!</h1>
          <p className="text-gray-600">Here's what's happening in your house today</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={<CheckCircle className="w-8 h-8 text-green-500" />}
          label="Tasks Completed"
          value="12/15"
          color="bg-green-50"
          priority="high"
        />
        <StatCard
          icon={<Clock className="w-8 h-8 text-amber-500" />}
          label="Pending Tasks"
          value="3"
          color="bg-amber-50"
          priority="high"
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-blue-500" />}
          label="Your Contribution"
          value="$85.00"
          color="bg-blue-50"
          priority="normal"
        />
        <StatCard
          icon={<Calendar className="w-6 h-6 text-purple-500" />}
          label="Next Event"
          value="2d 15h"
          color="bg-purple-50"
          priority="normal"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Today's Tasks</h2>
              <button className="btn btn-primary flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Task</span>
              </button>
            </div>
            <TasksList />
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-4">House Fund Progress</h2>
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Current: $420.69</span>
                <span>Goal: $500.00</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: '84%' }}
                />
              </div>
            </div>
            <LeaderBoard />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color, priority = 'normal' }) => {
  return (
    <div className={`${color} p-6 rounded-xl transition-transform hover:scale-102`}>
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className={`${priority === 'high' ? 'text-3xl' : 'text-2xl'} font-bold text-gray-900`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

const TasksList = () => {
  const tasks = [
    { 
      id: 1, 
      title: 'Clean Kitchen', 
      assignee: 'You', 
      due: 'Today', 
      status: 'pending',
      urgent: true 
    },
    { 
      id: 2, 
      title: 'Take out Trash', 
      assignee: 'Sarah', 
      due: 'Tomorrow', 
      status: 'completed',
      urgent: false 
    },
    { 
      id: 3, 
      title: 'Vacuum Living Room', 
      assignee: 'Mike', 
      due: 'Today', 
      status: 'pending',
      urgent: true 
    },
  ];

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div 
          key={task.id} 
          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
        >
          <div className="flex items-center space-x-4">
            {task.status === 'completed' ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Clock className="w-5 h-5 text-amber-500" />
            )}
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600">Assigned to: {task.assignee}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1
              ${task.urgent ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
              <Calendar className="w-4 h-4" />
              <span>{task.due}</span>
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${task.status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-amber-100 text-amber-800'
              }`}>
              {task.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

const LeaderBoard = () => {
  const leaders = [
    { name: 'Sarah', points: 2500, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
    { name: 'Alex', points: 2100, avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36' },
    { name: 'Mike', points: 1900, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde' },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Top Contributors</h3>
      <div className="space-y-3">
        {leaders.map((leader, index) => (
          <div key={leader.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm
                ${index === 0 ? 'bg-yellow-100 text-yellow-800' :
                  index === 1 ? 'bg-gray-200 text-gray-800' :
                  'bg-amber-100 text-amber-800'}`}>
                {index + 1}
              </span>
              <img 
                src={`${leader.avatar}?w=32&h=32&fit=crop&crop=faces`} 
                alt={leader.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{leader.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="font-semibold">{leader.points}</span>
              <span className="text-sm text-gray-500">pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;