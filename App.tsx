import React, { useState } from 'react';
import PaymentSelection from './components/PaymentSelection';
import CardPayment from './components/CardPayment';
import BankPayment from './components/BankPayment';
import CryptoPayment from './components/CryptoPayment';
import CheckoutSuccess from './components/CheckoutSuccess';
import Receipt from './components/Receipt';

export type View = 'selection' | 'card' | 'bank' | 'crypto' | 'success' | 'receipt';

const App: React.FC = () => {
  const [view, setView] = useState<View>('selection');
  const [amount, setAmount] = useState<number>(10);
  const [successTotal, setSuccessTotal] = useState<number>(10);
  const [successEmail, setSuccessEmail] = useState<string | undefined>(undefined);

  const handleSuccess = (subtotal: number, total: number, email?: string) => {
    setSuccessTotal(total);
    setSuccessEmail(email);
    setView('success');
  };

  const renderView = () => {
    switch (view) {
      case 'card':
        return <CardPayment amount={amount} onBack={() => setView('selection')} onSuccess={handleSuccess} />;
      case 'bank':
        return <BankPayment amount={amount} onBack={() => setView('selection')} onSuccess={handleSuccess} />;
      case 'crypto':
        return <CryptoPayment amount={amount} onBack={() => setView('selection')} onSuccess={handleSuccess} />;
      case 'success':
        return (
          <CheckoutSuccess
            amount={amount}
            total={successTotal}
            email={successEmail}
            onDone={() => setView('selection')}
            onViewReceipt={() => setView('receipt')}
          />
        );
      case 'receipt':
        return (
          <Receipt
            amount={amount}
            total={successTotal}
            email={successEmail}
            onClose={() => setView('selection')}
          />
        );
      case 'selection':
      default:
        return <PaymentSelection initialAmount={amount} setView={setView} onAmountChange={setAmount} />;
    }
  };

  return (
    <div className="min-h-screen p-4 min-[375px]:p-5 sm:p-6 md:p-8 font-sans bg-gray-100 text-[15px]">
      <div className="w-full max-w-3xl min-w-0 mx-auto">
        {renderView()}
      </div>
    </div>
  );
};

export default App;
