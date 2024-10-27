import React, { useState } from 'react';
import { Plus, ArrowLeftRight } from 'lucide-react';
import TaskModal from './TaskModal';
import TaskSwapModal from './TaskSwapModal';
import AvailabilityCalendar from '../calendar/AvailabilityCalendar';

const TasksPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Clean Kitchen', assignee: 'You', dueDate: '2024-03-20', status: 'pending' },
    { id: 2, title: 'Take out Trash', assignee: 'Sarah', dueDate: '2024-03-21', status: 'completed' },
  ]);
  
  const [unavailableDates] = useState([
    new Date(2024, 2, 25),
    new Date(2024, 2, 26),
    new Date(2024, 2, 27),
  ]);

  const housemates = ['You', 'Sarah', 'Mike', 'Emma'];

  const handleTaskSubmit = (task: any) => {
    setTasks([...tasks, { ...task, id: tasks.length + 1, status: 'pending' }]);
    setIsModalOpen(false);
  };

  const handleSwapRequest = (taskId: number, newAssignee: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, assignee: newAssignee, status: 'pending' }
        : task
    ));
    setIsSwapModalOpen(false);
  };

  const handleDateSelect = (date: Date) => {
    console.log('Selected date:', date);
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks & Availability</h1>
          <p className="text-gray-600">Manage house tasks and mark your unavailable dates</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Task</span>
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Your Tasks</h2>
          <div className="space-y-4">
            {tasks.map(task => (
              <div 
                key={task.id} 
                className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between"
              >
                <div>
                  <h3 className="font-semibold">{task.title}</h3>
                  <p className="text-sm text-gray-600">
                    Assigned to: {task.assignee} • Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    task.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedTask(task);
                      setIsSwapModalOpen(true);
                    }}
                    className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                  >
                    <ArrowLeftRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-6">Availability Calendar</h2>
          <AvailabilityCalendar 
            onDateSelect={handleDateSelect}
            unavailableDates={unavailableDates}
          />
        </div>
      </div>

      <TaskModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleTaskSubmit}
      />

      <TaskSwapModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        onSwap={handleSwapRequest}
        currentTask={selectedTask}
        housemates={housemates}
      />
    </div>
  );
};

export default TasksPage;