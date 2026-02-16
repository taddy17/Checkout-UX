import React from 'react';

interface CheckoutSuccessProps {
  amount: number;
  total: number;
  email?: string;
  onDone: () => void;
  onViewReceipt?: () => void;
}

const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({
  amount,
  total,
  email,
  onDone,
  onViewReceipt,
}) => {
  const displayEmail = email && email.trim() ? email.trim() : 'you';

  return (
    <main className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full text-center animate-fade-in">
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-blue-600 flex items-center justify-center">
          <svg
            className="w-9 h-9 sm:w-11 sm:h-11 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Purchase Complete</h1>
      <p className="text-sm text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
        Your purchase for <span className="font-semibold text-gray-900">${total.toFixed(2)}</span> was
        completed successfully. Your receipt has been emailed to{' '}
        <span className="font-semibold text-gray-900">{displayEmail}</span>.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
        {onViewReceipt && (
          <button
            type="button"
            onClick={onViewReceipt}
            className="w-full sm:w-auto min-w-[180px] rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition-colors"
          >
            View Receipt
          </button>
        )}
        <button
          type="button"
          onClick={onDone}
          className={`w-full sm:w-auto min-w-[180px] rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors ${!onViewReceipt ? 'sm:min-w-0' : ''}`}
        >
          Close
        </button>
      </div>
    </main>
  );
};

export default CheckoutSuccess;
