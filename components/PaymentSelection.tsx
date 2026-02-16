
import React, { useState, useEffect } from 'react';
import { BankIcon, CreditCardIcon, WalletIcon, ChevronRightIcon, ApplePayIcon, GooglePayIcon, CoinflowIcon } from './icons';
import { View } from '../App';

interface PaymentOptionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ icon, title, subtitle, onClick }) => (
  <button onClick={onClick} className="flex items-center w-full p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
      {icon}
    </div>
    <div className="ml-4 text-left">
      <p className="font-semibold text-gray-800">{title}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
    <div className="ml-auto">
      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </div>
  </button>
);

interface PaymentSelectionProps {
    initialAmount: number;
    setView: (view: View) => void;
    onAmountChange: (amount: number) => void;
}

const PaymentSelection: React.FC<PaymentSelectionProps> = ({ initialAmount, setView, onAmountChange }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);

  useEffect(() => {
      onAmountChange(displayAmount);
  }, [selectedAmount, customAmount, isCustom]);

  const amounts = [10, 25, 50];

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setIsCustom(false);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = parseFloat(value);
    setCustomAmount(value);
    setIsCustom(true);
    if (!isNaN(numericValue) && numericValue > 0) {
      setSelectedAmount(numericValue);
    } else {
      setSelectedAmount(0);
    }
  };
  
  const handleCustomInputFocus = () => {
      setIsCustom(true);
      if (customAmount) {
          setSelectedAmount(parseFloat(customAmount) || 0);
      } else {
          setSelectedAmount(0);
      }
  };

  const displayAmount = isCustom ? (parseFloat(customAmount) || 0) : selectedAmount;

  return (
    <main className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-2xl space-y-8 mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Secure Checkout</h1>
      
      <div className="bg-[#1e295b] text-white p-6 rounded-2xl">
        <p className="text-gray-300">Total Amount</p>
        <p className="text-4xl sm:text-5xl font-bold tracking-tight">
          ${displayAmount.toFixed(2)}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Select Amount</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAmountSelect(amount)}
              className={`py-3 px-4 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                !isCustom && selectedAmount === amount
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ${amount}
            </button>
          ))}
          <div className="relative col-span-2 md:col-span-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
            <input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              onFocus={handleCustomInputFocus}
              placeholder="Custom"
              className={`w-full py-3 pl-7 pr-4 rounded-lg border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center ${
                  isCustom 
                  ? 'border-blue-500 bg-white'
                  : 'border-gray-300 bg-white text-gray-700'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Select Payment Method</h2>
        <div className="space-y-3">
          <PaymentOption 
            icon={<BankIcon className="w-6 h-6 text-gray-600" />}
            title="Bank Account"
            subtitle="ACH / Direct Deposit"
            onClick={() => alert('Bank Account flow not implemented.')}
          />
          <PaymentOption 
            icon={<CreditCardIcon className="w-6 h-6 text-gray-600" />}
            title="Credit or Debit Card"
            subtitle="Instant confirmation"
            onClick={() => setView('card')}
          />
          <PaymentOption 
            icon={<WalletIcon className="w-6 h-6 text-gray-600" />}
            title="Crypto Wallet"
            subtitle="USDC, SOL, ETH"
            onClick={() => alert('Crypto Wallet flow not implemented.')}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-4 text-xs font-medium text-gray-400 uppercase">OR EXPRESS CHECKOUT</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="flex items-center justify-center w-full bg-black text-white py-3.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            <ApplePayIcon className="h-6" />
          </button>
          <button className="flex items-center justify-center w-full bg-black text-white py-3.5 rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
            <GooglePayIcon className="h-6" />
          </button>
        </div>
      </div>
      
      <footer className="text-center text-xs text-gray-500 space-y-4 pt-4">
          <p>
              This payment will appear on your statement as <span className="font-semibold text-blue-600">COINFLOW</span>. For support, please contact <a href="mailto:support@coinflow.cash" className="font-semibold text-blue-600 hover:underline">support@coinflow.cash</a>
          </p>
          <div className="flex items-center justify-center space-x-4">
               <div className="flex items-center space-x-1.5">
                  <span className="text-gray-400">Powered by</span>
                  <CoinflowIcon className="h-4" />
               </div>
               <span className="text-gray-300">|</span>
               <a href="#" className="hover:underline">Terms</a>
               <span className="text-gray-300">|</span>
               <a href="#" className="hover:underline">Refunds</a>
               <span className="text-gray-300">|</span>
               <a href="#" className="hover:underline">Privacy</a>
          </div>
      </footer>
    </main>
  );
};

export default PaymentSelection;
