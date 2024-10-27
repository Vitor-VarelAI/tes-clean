import React from 'react';
import { X, ArrowLeftRight } from 'lucide-react';

interface TaskSwapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwap: (taskId: number, newAssignee: string) => void;
  currentTask: any;
  housemates: string[];
}

const TaskSwapModal: React.FC<TaskSwapModalProps> = ({ 
  isOpen, 
  onClose, 
  onSwap, 
  currentTask, 
  housemates 
}) => {
  if (!isOpen || !currentTask) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Swap Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">{currentTask.title}</h3>
          <p className="text-sm text-gray-600">
            Currently assigned to: {currentTask.assignee}
          </p>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          onSwap(currentTask.id, form.newAssignee.value);
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Swap with
            </label>
            <select
              name="newAssignee"
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            >
              {housemates.filter(mate => mate !== currentTask.assignee).map(mate => (
                <option key={mate} value={mate}>{mate}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary flex items-center space-x-2"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Request Swap</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskSwapModal;