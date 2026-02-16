import React from 'react';

interface ReceiptProps {
  amount: number;
  total: number;
  email?: string;
  onClose: () => void;
}

const Receipt: React.FC<ReceiptProps> = ({ amount, total, email, onClose }) => {
  const fee = total - amount;
  const receiptDate = new Date();
  const dateStr = receiptDate.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  const timeStr = receiptDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  const receiptId = `RCP-${Date.now().toString(36).toUpperCase().slice(-8)}`;
  const displayEmail = email?.trim() || '—';

  return (
    <main className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-md mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">Receipt</h1>
        <span className="text-xs text-gray-500 font-mono">{receiptId}</span>
      </div>

      <div className="space-y-4 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Date</span>
          <span className="text-gray-900">{dateStr}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Time</span>
          <span className="text-gray-900">{timeStr}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Email</span>
          <span className="text-gray-900 break-all">{displayEmail}</span>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Fees</span>
          <span>${fee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-900 pt-2 border-t border-gray-100">
          <span>Total paid</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-500 text-center">
        This receipt was sent to {displayEmail}. Thank you for your purchase.
      </p>

      <div className="mt-8">
        <button
          type="button"
          onClick={onClose}
          className="w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors"
        >
          Close
        </button>
      </div>
    </main>
  );
};

export default Receipt;
