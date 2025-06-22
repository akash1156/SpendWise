import React, { useState } from 'react';
import { Plus, DollarSign, FileText, Calendar, Tag } from 'lucide-react';

const TransactionForm = ({ onAddTransaction, categories = [] }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    type: 'expense',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Default categories if none provided
  const defaultCategories = {
    expense: ['Food', 'Transportation', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Other'],
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Bonus', 'Other']
  };

  const currentCategories = categories.length > 0 ? categories : defaultCategories[formData.type];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (parseFloat(formData.amount) > 1000000) {
      newErrors.amount = 'Amount cannot exceed ₹10,00,000';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      type,
      category: '' // Reset category when type changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        id: Date.now(), // Will be overridden by parent component
        timestamp: new Date().toISOString()
      };

      await onAddTransaction(transactionData);

      // Reset form
      setFormData({
        description: '',
        amount: '',
        type: 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0]
      });
      setErrors({});

    } catch (error) {
      console.error('Error adding transaction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-white text-xl font-semibold">Add New Transaction</h2>
      </div>
      
      <div className="space-y-5">
        {/* Description Field */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            <FileText className="w-4 h-4 inline mr-2" />
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter transaction description..."
            className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
              errors.description ? 'border-red-400' : 'border-white/20'
            }`}
            maxLength={100}
          />
          {errors.description && (
            <p className="text-red-300 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Amount Field */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            <DollarSign className="w-4 h-4 inline mr-2" />
            Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            max="1000000"
            className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
              errors.amount ? 'border-red-400' : 'border-white/20'
            }`}
          />
          {errors.amount && (
            <p className="text-red-300 text-sm mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Date Field */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            <Calendar className="w-4 h-4 inline mr-2" />
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            max={new Date().toISOString().split('T')[0]}
            className={`w-full bg-white/10 border rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all ${
              errors.date ? 'border-red-400' : 'border-white/20'
            }`}
          />
          {errors.date && (
            <p className="text-red-300 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        {/* Category Field */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            <Tag className="w-4 h-4 inline mr-2" />
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
          >
            <option value="" className="bg-gray-800">Select category</option>
            {currentCategories.map((category) => (
              <option key={category} value={category} className="bg-gray-800">
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Transaction Type */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-3">
            Transaction Type
          </label>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => handleTypeChange('expense')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all flex-1 ${
                formData.type === 'expense' 
                  ? 'bg-red-500/30 border border-red-400 text-white' 
                  : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${
                formData.type === 'expense' ? 'bg-red-400' : 'bg-white/50'
              }`}></div>
              <span className="font-medium">Expense</span>
            </button>
            
            <button
              type="button"
              onClick={() => handleTypeChange('income')}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all flex-1 ${
                formData.type === 'income' 
                  ? 'bg-green-500/30 border border-green-400 text-white' 
                  : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              <div className={`w-3 h-3 rounded-full ${
                formData.type === 'income' ? 'bg-green-400' : 'bg-white/50'
              }`}></div>
              <span className="font-medium">Income</span>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full font-semibold py-3 px-6 rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent ${
            isSubmitting
              ? 'bg-gray-500 cursor-not-allowed text-white/70'
              : 'bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Adding...</span>
            </div>
          ) : (
            'Add Transaction'
          )}
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;