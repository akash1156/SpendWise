import React, { useState, useEffect } from 'react';
import { Search, User, ChevronDown, Diamond, Trash2 } from 'lucide-react';
import Header from './components/Header';
import Balance from './components/Balance';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
// Profile components
import Modal from './components/UI/Modal';
import ProfileDropdown from './components/Profile/ProfileDropdown';
import ProfileModal from './components/Profile/ProfileModal';
import SettingsModal from './components/Profile/SettingsModal';
import HelpModal from './components/Profile/HelpModal';

function App() {
  const [balance, setBalance] = useState(2200.00);
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      description: 'Salary',
      amount: 3000,
      type: 'income',
      date: '2025-06-20'
    },
    {
      id: 2,
      description: 'Groceries',
      amount: 450,
      type: 'expense',
      date: '2025-06-19'
    },
    {
      id: 3,
      description: 'Freelance Project',
      amount: 1200,
      type: 'income',
      date: '2025-06-18'
    },
    {
      id: 4,
      description: 'Electricity Bill',
      amount: 280,
      type: 'expense',
      date: '2025-06-17'
    },
    {
      id: 5,
      description: 'Fuel',
      amount: 150,
      type: 'expense',
      date: '2025-06-16'
    },
    {
      id: 6,
      description: 'Bonus',
      amount: 800,
      type: 'income',
      date: '2025-06-15'
    },
    {
      id: 7,
      description: 'Restaurant',
      amount: 320,
      type: 'expense',
      date: '2025-06-14'
    },
    {
      id: 8,
      description: 'Internet Bill',
      amount: 199,
      type: 'expense',
      date: '2025-06-13'
    }
  ]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  // Add user state for profile management
  const [currentUser, setCurrentUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    settings: {
      darkMode: false,
      notifications: true,
      emailNotifications: true,
      smsNotifications: false,
      language: 'en',
      currency: 'INR'
    }
  });

  // Transaction management functions
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    if (transaction.type === 'income') {
      setBalance(prev => prev + parseFloat(transaction.amount));
    } else {
      setBalance(prev => prev - parseFloat(transaction.amount));
    }
  };

  const deleteTransaction = (id) => {
    const transaction = transactions.find(t => t.id === id);
    if (transaction) {
      if (transaction.type === 'income') {
        setBalance(prev => prev - transaction.amount);
      } else {
        setBalance(prev => prev + transaction.amount);
      }
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  // Profile management functions
  const handleUpdateProfile = (updatedProfile) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedProfile
    }));
  };

  const handleUpdateSettings = (updatedSettings) => {
    setCurrentUser(prev => ({
      ...prev,
      settings: updatedSettings
    }));
  };

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
    // You can add your logout logic here like:
    // - Clear user data
    // - Redirect to login page
    // - Clear localStorage/sessionStorage
  };

  // Balance Component
  const Balance = ({ balance }) => {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <h2 className="text-gray-600 text-lg font-medium mb-2">Your Balance</h2>
        <div className="text-4xl font-bold text-green-600">
          ₹{balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
        </div>
      </div>
    );
  };

  // Transaction Form Component
  const TransactionForm = ({ onAddTransaction }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [type, setType] = useState('expense');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!description || !amount) return;

      onAddTransaction({
        description,
        amount: parseFloat(amount),
        type
      });

      setDescription('');
      setAmount('');
      setType('expense');
    };

    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <h2 className="text-gray-800 text-xl font-semibold mb-6">Add New Transaction</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter transaction description..."
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-3">
              Transaction Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="expense"
                  checked={type === 'expense'}
                  onChange={(e) => setType(e.target.value)}
                  className="sr-only"
                />
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  type === 'expense' 
                    ? 'bg-red-100 border border-red-300' 
                    : 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${type === 'expense' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                  <span className="text-gray-800 text-sm font-medium">Expense</span>
                </div>
              </label>
              
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  value="income"
                  checked={type === 'income'}
                  onChange={(e) => setType(e.target.value)}
                  className="sr-only"
                />
                <div className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                  type === 'income' 
                    ? 'bg-green-100 border border-green-300' 
                    : 'bg-gray-100 border border-gray-300 hover:bg-gray-200'
                }`}>
                  <div className={`w-3 h-3 rounded-full ${type === 'income' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className="text-gray-800 text-sm font-medium">Income</span>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Transaction
          </button>
        </form>
      </div>
    );
  };

  // Transaction List Component
  const TransactionList = ({ transactions, onDeleteTransaction }) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    };

    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-800 text-xl font-semibold">Recent Transactions</h2>
          <span className="text-gray-500 text-sm">{transactions.length} transactions</span>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No transactions yet</p>
            </div>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div>
                      <h3 className="text-gray-800 font-medium">{transaction.description}</h3>
                      <p className="text-gray-500 text-sm">
                        {transaction.type === 'income' ? 'Income' : 'Expense'} • {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                    </span>
                    <button
                      onClick={() => onDeleteTransaction(transaction.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        user={currentUser}
        onUpdateProfile={handleUpdateProfile}
        onUpdateSettings={handleUpdateSettings}
        onLogout={handleLogout}
      />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <Balance balance={balance} />
            <TransactionForm onAddTransaction={addTransaction} />
          </div>
          
          {/* Right Column */}
          <div className="space-y-6">
            <TransactionList 
              transactions={transactions} 
              onDeleteTransaction={deleteTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;