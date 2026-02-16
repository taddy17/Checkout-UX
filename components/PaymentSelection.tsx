
import React, { useState, useEffect } from 'react';
import { BankIcon, CreditCardIcon, WalletIcon, ChevronRightIcon } from './icons';
import { View } from '../App';

interface PaymentOptionProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}

const PaymentOption: React.FC<PaymentOptionProps> = ({ icon, title, subtitle, onClick }) => (
  <button onClick={onClick} className="flex items-center w-full p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
    <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-gray-100 rounded-lg">
      {icon}
    </div>
    <div className="ml-3 text-left">
      <p className="font-semibold text-sm text-gray-800">{title}</p>
      <p className="text-xs text-gray-500">{subtitle}</p>
    </div>
    <div className="ml-auto">
      <ChevronRightIcon className="w-4 h-4 text-gray-400" />
    </div>
  </button>
);

interface PaymentSelectionProps {
    initialAmount: number;
    setView: (view: View) => void;
    onAmountChange: (amount: number) => void;
}

type ExpressConfirm = 'apple' | 'google' | null;

const PaymentSelection: React.FC<PaymentSelectionProps> = ({ initialAmount, setView, onAmountChange }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [expressConfirm, setExpressConfirm] = useState<ExpressConfirm>(null);
  const [isConfirming, setIsConfirming] = useState(false);

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

  const handleExpressConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setExpressConfirm(null);
      setIsConfirming(false);
      setView('card');
    }, 800);
  };

  const handleExpressCancel = () => {
    if (!isConfirming) setExpressConfirm(null);
  };

  return (
    <main className="bg-white rounded-2xl shadow-lg p-5 sm:p-6 md:p-8 w-full space-y-6 mx-auto relative">
      {expressConfirm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/40" onClick={handleExpressCancel} aria-modal="true" role="dialog">
          <div
            className="w-full max-w-sm overflow-hidden rounded-t-2xl sm:rounded-2xl shadow-xl bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {expressConfirm === 'apple' ? (
              <>
                <div className="p-6 pb-4 text-center border-b border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">Confirm with Face ID</p>
                  <p className="text-3xl font-semibold text-gray-900">${displayAmount.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-2">COINFLOW</p>
                </div>
                <div className="p-4 flex gap-3">
                  <button
                    type="button"
                    onClick={handleExpressCancel}
                    disabled={isConfirming}
                    className="flex-1 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors disabled:opacity-70"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleExpressConfirm}
                    disabled={isConfirming}
                    className="flex-1 py-3 text-sm font-semibold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-70 inline-flex items-center justify-center gap-2"
                  >
                    {isConfirming ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Paying…
                      </>
                    ) : (
                      'Pay'
                    )}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="p-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <img src="/google-pay.png" alt="" className="h-5 w-auto" aria-hidden />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-900">Google Pay</p>
                      <p className="text-xs text-gray-500">Pay with your saved card</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-sm text-gray-600">Amount</span>
                    <span className="text-xl font-semibold text-gray-900">${displayAmount.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">COINFLOW</p>
                </div>
                <div className="p-4 flex gap-3">
                  <button
                    type="button"
                    onClick={handleExpressCancel}
                    disabled={isConfirming}
                    className="flex-1 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-70"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleExpressConfirm}
                    disabled={isConfirming}
                    className="flex-1 py-3 text-sm font-semibold text-white rounded-lg disabled:opacity-70 inline-flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1a73e8]"
                    style={{ background: '#1a73e8' }}
                  >
                    {isConfirming ? (
                      <>
                        <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Paying…
                      </>
                    ) : (
                      'Pay'
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Secure Checkout</h1>
      
      <div
        className="text-white p-4 sm:p-5 rounded-xl"
        style={{ background: 'linear-gradient(to right, #152047 0%, #1e295b 50%, #2d3a6b 100%)' }}
      >
        <p className="text-gray-300 text-xs">Total Amount</p>
        <p className="text-3xl sm:text-4xl font-bold tracking-tight">
          ${displayAmount.toFixed(2)}
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">Select Amount</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {amounts.map((amount) => (
            <button
              key={amount}
              onClick={() => handleAmountSelect(amount)}
              className={`py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                !isCustom && selectedAmount === amount
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              ${amount}
            </button>
          ))}
          <div className="relative col-span-2 md:col-span-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
            <input
              type="number"
              value={customAmount}
              onChange={handleCustomAmountChange}
              onFocus={handleCustomInputFocus}
              placeholder="Custom"
              className={`w-full py-2.5 pl-6 pr-3 rounded-lg border text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-center ${
                  isCustom 
                  ? 'border-blue-500 bg-white'
                  : 'border-gray-300 bg-white text-gray-700'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-800">Select Payment Method</h2>
        <div className="space-y-2">
          <PaymentOption 
            icon={<BankIcon className="w-5 h-5 text-gray-600" />}
            title="Bank Account"
            subtitle="ACH / Direct Deposit"
            onClick={() => setView('bank')}
          />
          <PaymentOption 
            icon={<CreditCardIcon className="w-5 h-5 text-gray-600" />}
            title="Credit or Debit Card"
            subtitle="Instant confirmation"
            onClick={() => setView('card')}
          />
          <PaymentOption 
            icon={<WalletIcon className="w-5 h-5 text-gray-600" />}
            title="Crypto Wallet"
            subtitle="USDC, SOL, ETH"
            onClick={() => setView('crypto')}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-[10px] font-medium text-gray-400 uppercase tracking-wide">OR EXPRESS CHECKOUT</span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setExpressConfirm('apple')}
            className="group flex items-center justify-center w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <img src="/apple-pay.png" alt="Apple Pay" className="h-6 w-auto max-h-8 object-contain transition-opacity duration-200 group-hover:opacity-50" />
          </button>
          <button
            type="button"
            onClick={() => setExpressConfirm('google')}
            className="group flex items-center justify-center w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <img src="/google-pay.png" alt="Google Pay" className="h-6 w-auto max-h-8 object-contain transition-opacity duration-200 group-hover:opacity-50" />
          </button>
        </div>
      </div>
      
      <footer className="text-center text-[11px] text-gray-500 space-y-3 pt-3">
          <p>
              This payment will appear on your statement as <span className="font-semibold text-black">COINFLOW</span>. For support, please contact <a href="mailto:support@coinflow.cash" className="font-semibold text-black hover:underline">support@coinflow.cash</a>
          </p>
          <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1">
               <div className="flex items-center space-x-1.5">
                  <span className="text-gray-400">Powered by</span>
                  <span className="font-semibold text-black">COINFLOW</span>
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
