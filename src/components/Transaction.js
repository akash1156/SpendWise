import React, { useState } from 'react';

const Transaction = ({ transaction, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTransaction, setEditedTransaction] = useState({
    description: transaction.description || '',
    amount: transaction.amount || 0,
    type: transaction.type || 'expense',
    date: transaction.date || new Date().toISOString().split('T')[0]
  });

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(transaction.id, editedTransaction);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTransaction({
      description: transaction.description || '',
      amount: transaction.amount || 0,
      type: transaction.type || 'expense',
      date: transaction.date || new Date().toISOString().split('T')[0]
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      onDelete(transaction.id);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedTransaction(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatAmount = (amount, type) => {
    const prefix = type === 'income' ? '+' : '';
    return `${prefix}₹${Math.abs(amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  if (isEditing) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              value={editedTransaction.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Enter transaction description..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
            <input
              type="number"
              value={editedTransaction.amount}
              onChange={(e) => handleInputChange('amount', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              step="0.01"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="expense"
                  checked={editedTransaction.type === 'expense'}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-4 h-4 text-red-500 focus:ring-red-500"
                />
                <span className="ml-2 text-sm text-gray-700">Expense</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="income"
                  checked={editedTransaction.type === 'income'}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-4 h-4 text-green-500 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-700">Income</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={editedTransaction.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button 
              onClick={handleSave} 
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Save Changes
            </button>
            <button 
              onClick={handleCancel} 
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            transaction.type === 'income' 
              ? 'bg-green-100 text-green-600' 
              : 'bg-red-100 text-red-600'
          }`}>
            <div className={`w-3 h-3 rounded-full ${
              transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'
            }`}></div>
          </div>
          
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 text-lg">
              {transaction.description}
            </h4>
            <p className="text-sm text-gray-500 mt-1">
              {transaction.type === 'income' ? 'Income' : 'Expense'} • {formatDate(transaction.date)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className={`text-xl font-bold ${
            transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
          }`}>
            {formatAmount(transaction.amount, transaction.type)}
          </div>
          
          <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button 
              onClick={handleEdit} 
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="Edit transaction"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button 
              onClick={handleDelete} 
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete transaction"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Transaction List Component
export const TransactionList = ({ transactions = [], onEdit, onDelete }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'all') return true;
    return transaction.type === filter;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'amount':
        comparison = Math.abs(a.amount) - Math.abs(b.amount);
        break;
      case 'description':
        comparison = a.description.localeCompare(b.description);
        break;
      default:
        comparison = 0;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const totalTransactions = transactions.length;
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-5">
        <div className="flex justify-between items-center">
          <div className="text-white">
            <h3 className="text-xl font-bold">Recent Transactions</h3>
            <p className="text-blue-100 text-sm mt-1">{totalTransactions} transactions</p>
          </div>
          
          <div className="flex space-x-3">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-white/30 transition-colors"
            >
              <option value="all" className="text-gray-900">All Transactions</option>
              <option value="income" className="text-gray-900">Income Only</option>
              <option value="expense" className="text-gray-900">Expenses Only</option>
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm rounded-lg px-3 py-2 focus:ring-2 focus:ring-white/30 transition-colors"
            >
              <option value="date" className="text-gray-900">Sort by Date</option>
              <option value="amount" className="text-gray-900">Sort by Amount</option>
              <option value="description" className="text-gray-900">Sort by Description</option>
            </select>
            
            <button 
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="bg-white/10 backdrop-blur-sm border border-white/20 text-white px-3 py-2 rounded-lg hover:bg-white/20 transition-colors"
              title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-0 border-b border-gray-200">
        <div className="p-6 text-center border-r border-gray-200">
          <p className="text-sm text-gray-500 font-medium mb-2">TOTAL INCOME</p>
          <p className="text-2xl font-bold text-green-600">+₹{totalIncome.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-6 text-center border-r border-gray-200">
          <p className="text-sm text-gray-500 font-medium mb-2">TOTAL EXPENSES</p>
          <p className="text-2xl font-bold text-red-600">-₹{totalExpenses.toLocaleString('en-IN')}</p>
        </div>
        <div className="p-6 text-center">
          <p className="text-sm text-gray-500 font-medium mb-2">NET BALANCE</p>
          <p className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            ₹{(totalIncome - totalExpenses).toLocaleString('en-IN')}
          </p>
        </div>
      </div>

      {/* Transaction List */}
      <div className="p-6">
        {sortedTransactions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h4>
            <p className="text-gray-500">Add your first transaction to get started with tracking your finances</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sortedTransactions.map(transaction => (
              <Transaction
                key={transaction.id}
                transaction={transaction}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;