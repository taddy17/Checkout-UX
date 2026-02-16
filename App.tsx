
import React, { useState } from 'react';
import PaymentSelection from './components/PaymentSelection';
import CardPayment from './components/CardPayment';

export type View = 'selection' | 'card' | 'bank' | 'crypto';

const App: React.FC = () => {
  const [view, setView] = useState<View>('selection');
  const [amount, setAmount] = useState<number>(10);

  const renderView = () => {
    switch (view) {
      case 'card':
        return <CardPayment amount={amount} onBack={() => setView('selection')} />;
      case 'selection':
      default:
        return <PaymentSelection initialAmount={amount} setView={setView} onAmountChange={setAmount} />;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 font-sans bg-gray-100">
      {renderView()}
    </div>
  );
};

export default App;
