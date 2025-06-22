import React from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const Balance = ({ balance, previousBalance = null, showTrend = true }) => {
  // Calculate trend if previous balance is provided
  const getTrend = () => {
    if (!previousBalance || previousBalance === balance) return null;
    return balance > previousBalance ? 'up' : 'down';
  };

  const getTrendPercentage = () => {
    if (!previousBalance || previousBalance === 0) return 0;
    const change = balance - previousBalance;
    return ((change / Math.abs(previousBalance)) * 100).toFixed(1);
  };

  const trend = getTrend();
  const trendPercentage = getTrendPercentage();

  const formatCurrency = (amount) => {
    return amount.toLocaleString('en-IN', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-white/80 text-lg font-medium">Your Balance</h2>
        </div>
        
        {showTrend && trend && (
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' 
              ? 'bg-green-500/20 text-green-300' 
              : 'bg-red-500/20 text-red-300'
          }`}>
            {trend === 'up' ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span>{trendPercentage}%</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        <div className={`text-4xl font-bold mb-2 ${
          balance >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          ₹{formatCurrency(Math.abs(balance))}
        </div>
        
        {balance < 0 && (
          <div className="text-red-300 text-sm font-medium">
            Negative Balance
          </div>
        )}
      </div>

      {/* Balance Status Indicator */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            balance >= 10000 ? 'bg-green-400' :
            balance >= 5000 ? 'bg-yellow-400' :
            balance >= 0 ? 'bg-orange-400' : 'bg-red-400'
          }`}></div>
          <span className="text-white/60 text-sm">
            {balance >= 10000 ? 'Excellent' :
             balance >= 5000 ? 'Good' :
             balance >= 0 ? 'Fair' : 'Critical'}
          </span>
        </div>
        
        <div className="text-white/40 text-xs">
          {new Date().toLocaleDateString('en-IN', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric' 
          })}
        </div>
      </div>

      {/* Progress Bar for Visual Representation */}
      <div className="mt-4">
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-500 ${
              balance >= 0 ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-red-400'
            }`}
            style={{ 
              width: balance >= 0 ? `${Math.min((balance / 25000) * 100, 100)}%` : '0%' 
            }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-white/40 text-xs">₹0</span>
          <span className="text-white/40 text-xs">₹25,000+</span>
        </div>
      </div>
    </div>
  );
};

export default Balance;