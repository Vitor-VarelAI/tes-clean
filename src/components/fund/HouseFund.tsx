import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Wallet } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'contribution' | 'expense';
  amount: number;
  description: string;
  date: string;
  contributor: string;
}

const HouseFund: React.FC = () => {
  const [balance, setBalance] = useState(420.69);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      type: 'contribution',
      amount: 50,
      description: 'Monthly contribution',
      date: '2024-03-15',
      contributor: 'Sarah'
    },
    {
      id: 2,
      type: 'expense',
      amount: 30,
      description: 'Cleaning supplies',
      date: '2024-03-14',
      contributor: 'Mike'
    }
  ]);

  const [showAddFunds, setShowAddFunds] = useState(false);

  const handleAddFunds = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const amount = parseFloat(form.amount.value);
    const description = form.description.value;

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      type: 'contribution',
      amount,
      description,
      date: new Date().toISOString().split('T')[0],
      contributor: 'You'
    };

    setTransactions([newTransaction, ...transactions]);
    setBalance(prev => prev + amount);
    setShowAddFunds(false);
    form.reset();
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">House Fund</h1>
          <p className="text-gray-600">Track contributions and expenses</p>
        </div>
        <button 
          onClick={() => setShowAddFunds(true)}
          className="btn btn-primary flex items-center space-x-2"
        >
          <DollarSign className="w-5 h-5" />
          <span>Add Funds</span>
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          icon={<Wallet className="w-6 h-6 text-green-500" />}
          label="Current Balance"
          value={`$${balance.toFixed(2)}`}
          color="bg-green-50"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6 text-blue-500" />}
          label="Monthly Goal"
          value="$500.00"
          color="bg-blue-50"
        />
        <StatCard
          icon={<Users className="w-6 h-6 text-purple-500" />}
          label="Contributors"
          value="4"
          color="bg-purple-50"
        />
      </div>

      {showAddFunds && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add Funds</h2>
              <button 
                onClick={() => setShowAddFunds(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddFunds} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  name="amount"
                  step="0.01"
                  min="0"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  required
                  className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddFunds(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.map(transaction => (
            <div 
              key={transaction.id} 
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  transaction.type === 'contribution' 
                    ? 'bg-green-100' 
                    : 'bg-red-100'
                }`}>
                  {transaction.type === 'contribution' 
                    ? <TrendingUp className="w-5 h-5 text-green-600" />
                    : <DollarSign className="w-5 h-5 text-red-600" />
                  }
                </div>
                <div>
                  <p className="font-semibold">{transaction.description}</p>
                  <p className="text-sm text-gray-600">
                    By {transaction.contributor} • {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <span className={`font-semibold ${
                transaction.type === 'contribution'
                  ? 'text-green-600'
                  : 'text-red-600'
              }`}>
                {transaction.type === 'contribution' ? '+' : '-'}
                ${transaction.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => {
  return (
    <div className={`${color} p-6 rounded-xl`}>
      <div className="flex items-center space-x-4">
        {icon}
        <div>
          <p className="text-gray-600 text-sm">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default HouseFund;