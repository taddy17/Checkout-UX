import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon, LockIcon, BankIcon } from './icons';

interface BankPaymentProps {
  amount: number;
  onBack: () => void;
  onSuccess: (amount: number, total: number) => void;
}

const BANK_TYPES = [
  { value: 'us', label: 'US wire transfer' },
  { value: 'euro', label: 'Euro bank' },
  { value: 'uk', label: 'UK bank' },
] as const;

const BankPayment: React.FC<BankPaymentProps> = ({ amount, onBack, onSuccess }) => {
  const [bankType, setBankType] = useState<string>('us');
  const [routing, setRouting] = useState('');
  const [account, setAccount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ routing: false, account: false });

  const { serviceFee, total } = useMemo(() => {
    const fee = amount * 0.01; // ACH typically lower fee
    return { serviceFee: fee, total: amount + fee };
  }, [amount]);

  const routingDigits = routing.replace(/\D/g, '').replace(/\s/g, '');
  const routingChars = routing.replace(/\s/g, '');
  const accountDigits = account.replace(/\D/g, '');
  const routingValid =
    bankType === 'us'
      ? routingDigits.length === 9
      : bankType === 'uk'
        ? routingDigits.length >= 6
        : routingChars.length >= 8;
  const accountValid = account.length >= 4 && account.length <= 34;
  const canSubmit = routingValid && accountValid;

  const handleRoutingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (bankType === 'us') {
      setRouting(val.replace(/\D/g, '').slice(0, 9));
    } else if (bankType === 'uk') {
      setRouting(val.replace(/\D/g, '').slice(0, 6));
    } else {
      setRouting(val.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 11));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1600));
    setIsSubmitting(false);
    onSuccess(amount, total);
  };

  return (
    <main className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full space-y-5 transition-opacity duration-300">
      <header className="flex items-center relative justify-center min-h-[36px]">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-0 p-1 -m-1 text-gray-600 hover:text-gray-900 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Back to payment method"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900">Pay with Bank Account</h1>
      </header>

      <form id="bank-payment-form" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="bank-type" className="block text-xs font-medium text-gray-700 mb-1">Bank type</label>
          <div className="relative">
            <select
              id="bank-type"
              value={bankType}
              onChange={(e) => setBankType(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 pr-9 appearance-none"
              aria-label="Select bank type"
            >
              {BANK_TYPES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-gray-500">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" aria-hidden>
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50">
          <BankIcon className="w-8 h-8 text-gray-600 flex-shrink-0" />
          <p className="text-sm text-gray-600">
            {bankType === 'us' && 'ACH / Wire. Funds typically arrive in 1–3 business days.'}
            {bankType === 'euro' && 'SEPA transfer. Funds typically arrive in 1–2 business days.'}
            {bankType === 'uk' && 'Faster Payment or BACS. Funds typically arrive within 1 business day.'}
          </p>
        </div>

        <div>
          <label htmlFor="routing" className="block text-xs font-medium text-gray-700 mb-1">
            {bankType === 'us' ? 'Routing number' : bankType === 'uk' ? 'Sort code' : 'BIC / SWIFT'}
          </label>
          <input
            id="routing"
            type="text"
            inputMode="numeric"
            value={routing}
            onChange={handleRoutingChange}
            onBlur={() => setTouched((t) => ({ ...t, routing: true }))}
            className={`block w-full rounded-lg border py-2.5 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
              touched.routing && !routingValid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
            }`}
            placeholder={bankType === 'us' ? '9 digits' : bankType === 'uk' ? 'e.g. 12-34-56' : '8–11 characters'}
            maxLength={bankType === 'us' ? 9 : 11}
          />
          {touched.routing && !routingValid && routing.length > 0 && (
            <p className="mt-1 text-xs text-red-500">
              {bankType === 'us' ? 'Routing number must be 9 digits' : 'Enter a valid value'}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="account" className="block text-xs font-medium text-gray-700 mb-1">
            {bankType === 'us' ? 'Account number' : 'IBAN / Account number'}
          </label>
          <input
            id="account"
            type="text"
            inputMode="numeric"
            value={account}
            onChange={(e) => {
              const v = e.target.value;
              setAccount(bankType === 'us' ? v.replace(/\D/g, '').slice(0, 17) : v.slice(0, 34));
            }}
            onBlur={() => setTouched((t) => ({ ...t, account: true }))}
            className={`block w-full rounded-lg border py-2.5 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset ${
              touched.account && !accountValid && account.length > 0 ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
            }`}
            placeholder={bankType === 'us' ? '4–17 digits' : 'Account or IBAN'}
          />
          {touched.account && account.length > 0 && !accountValid && (
            <p className="mt-1 text-xs text-red-500">Account number must be 4–17 digits</p>
          )}
        </div>
      </form>

      <div className="space-y-1.5 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Subtotal</span>
          <span>${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-900 text-sm">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-600">
        <LockIcon className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
        <span>Your details are encrypted and secure.</span>
      </div>

      <button
        type="submit"
        form="bank-payment-form"
        disabled={!canSubmit || isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all min-h-[44px]"
      >
        {isSubmitting ? (
          <span className="inline-flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Processing…
          </span>
        ) : (
          `Pay ${total.toFixed(2)}`
        )}
      </button>
    </main>
  );
};

export default BankPayment;
