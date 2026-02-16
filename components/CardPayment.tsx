import React, { useState, useMemo, useRef, useCallback } from 'react';
import { ArrowLeftIcon, LockIcon, CreditCardIcon } from './icons';

interface CardPaymentProps {
  amount: number;
  onBack: () => void;
  onSuccess: (amount: number, total: number, email?: string) => void;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  id: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, error, ...props }) => (
  <div className="relative">
    <input
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`block px-3 pb-2 pt-3.5 w-full text-sm text-gray-900 bg-transparent rounded-lg border appearance-none focus:outline-none focus:ring-0 peer transition-colors ${
        error ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-blue-600'
      }`}
      placeholder=" "
      {...props}
    />
    <label
      htmlFor={id}
      className={`absolute text-xs duration-300 transform -translate-y-3.5 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 ${
        error ? 'text-red-500' : 'text-gray-500 peer-focus:text-blue-600'
      } peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-3.5 start-1`}
    >
      {label}
    </label>
    {error && (
      <p id={`${id}-error`} className="mt-1 text-xs text-red-500" role="alert">
        {error}
      </p>
    )}
  </div>
);

// Luhn check for card number validation
function luhnCheck(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  if (digits.length < 13 || digits.length > 19) return false;
  let sum = 0;
  let isEven = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let n = parseInt(digits[i], 10);
    if (isEven) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 19);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

function parseExpiry(formatted: string): { month: number; year: number } | null {
  const digits = formatted.replace(/\D/g, '');
  if (digits.length !== 4) return null;
  const month = parseInt(digits.slice(0, 2), 10);
  const year = 2000 + parseInt(digits.slice(2), 10);
  if (month < 1 || month > 12) return null;
  return { month, year };
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

const SAVED_CARDS: Record<string, { cardNumber: string; expiry: string; cvc: string; email: string; nameOnCard: string; address: string }> = {
  'visa-4242': {
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/28',
    cvc: '123',
    email: 'alex.johnson@email.com',
    nameOnCard: 'Alex Johnson',
    address: '456 Oak Ave, San Francisco, CA 94102',
  },
  'mc-5555': {
    cardNumber: '5555 5555 5555 4444',
    expiry: '09/27',
    cvc: '456',
    email: 'sam.williams@email.com',
    nameOnCard: 'Sam Williams',
    address: '789 Pine St, Seattle, WA 98101',
  },
};

const CardPayment: React.FC<CardPaymentProps> = ({ amount, onBack, onSuccess }) => {
  const [selectedCard, setSelectedCard] = useState<string>('');
  const [saveInfo, setSaveInfo] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [email, setEmail] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [address, setAddress] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const applySavedCard = useCallback((key: string) => {
    const card = SAVED_CARDS[key];
    if (card) {
      setCardNumber(card.cardNumber);
      setExpiry(card.expiry);
      setCvc(card.cvc);
      setEmail(card.email);
      setNameOnCard(card.nameOnCard);
      setAddress(card.address);
      setTouched({});
      setSubmitAttempted(false);
    } else {
      setCardNumber('');
      setExpiry('');
      setCvc('');
      setEmail('');
      setNameOnCard('');
      setAddress('');
      setTouched({});
    }
  }, []);

  const cardNumberRef = useRef<HTMLInputElement>(null);
  const expiryRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);

  const { serviceFee, total } = useMemo(() => {
    const fee = amount * 0.029 + 0.3;
    return { serviceFee: fee, total: amount + fee };
  }, [amount]);

  const cardDigits = cardNumber.replace(/\D/g, '');
  const expiryParsed = parseExpiry(expiry);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const expiryValid =
    expiryParsed &&
    (expiryParsed.year > currentYear || (expiryParsed.year === currentYear && expiryParsed.month >= currentMonth));

  const errors = useMemo(() => {
    const e: Record<string, string> = {};
    if (cardDigits.length < 13 || cardDigits.length > 19) {
      e.cardNumber = 'Enter a valid card number (13–19 digits)';
    } else if (!luhnCheck(cardNumber)) {
      e.cardNumber = 'Card number is invalid';
    }
    if (!expiryParsed) {
      e.expiry = 'Use MM/YY';
    } else if (!expiryValid) {
      e.expiry = 'Card has expired';
    }
    if (cvc.replace(/\D/g, '').length < 3) {
      e.cvc = 'Enter 3 or 4 digits';
    }
    if (!email.trim()) {
      e.email = 'Email is required';
    } else if (!validateEmail(email)) {
      e.email = 'Enter a valid email';
    }
    if (!nameOnCard.trim()) {
      e.nameOnCard = 'Name is required';
    }
    if (!address.trim()) {
      e.address = 'Address is required';
    }
    return e;
  }, [cardNumber, cardDigits, expiry, expiryParsed, expiryValid, cvc, email, nameOnCard, address]);

  const showError = useCallback(
    (field: string) => (submitAttempted || touched[field]) && errors[field],
    [submitAttempted, touched, errors]
  );

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 19);
    const formatted = formatCardNumber(raw);
    setCardNumber(formatted);
    if (raw.length >= 19 && expiryRef.current) {
      expiryRef.current.focus();
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    setExpiry(formatted);
    if (formatted.length >= 5 && cvcRef.current) {
      cvcRef.current.focus();
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCvc(digits);
    if (digits.length >= 4) {
      document.getElementById('email')?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitAttempted(true);
    if (Object.keys(errors).length > 0) {
      const firstKey = Object.keys(errors)[0];
      const idMap: Record<string, string> = {
        cardNumber: 'card-number',
        expiry: 'expiry',
        cvc: 'cvc',
        email: 'email',
        nameOnCard: 'name-on-card',
        address: 'address',
      };
      const el = document.getElementById(idMap[firstKey]);
      if (el && 'focus' in el) (el as HTMLInputElement).focus();
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setIsSubmitting(false);
    onSuccess(amount, total, email.trim() || undefined);
  };

  return (
    <main className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full min-w-0 space-y-5 transition-opacity duration-300">
      <header className="flex items-center gap-4 min-h-[36px]">
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 p-1 -m-1 text-gray-600 hover:text-gray-900 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Back to payment method"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="flex-1 text-center text-lg sm:text-xl font-bold text-gray-900 min-w-0">Secure Checkout</h1>
      </header>

      <div>
        <label htmlFor="existing-card" className="text-xs font-medium text-gray-700">
          Select an existing card
        </label>
        <div className="relative mt-1">
          <select
            id="existing-card"
            value={selectedCard}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedCard(value);
              applySavedCard(value);
            }}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-2.5 appearance-none"
            aria-label="Existing cards"
          >
            <option value="">Select a card</option>
            <option value="visa-4242">Visa •••• 4242</option>
            <option value="mc-5555">Mastercard •••• 5555</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
            <svg className="fill-current h-4 w-4" viewBox="0 0 20 20" aria-hidden>
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-200" />
        <span className="flex-shrink mx-3 text-[10px] font-medium text-gray-400 uppercase">Or manually enter a card</span>
        <div className="flex-grow border-t border-gray-200" />
      </div>

      <form id="card-payment-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="card-number" className="block text-xs font-medium text-gray-700 mb-1">
            Card number
          </label>
          <div
            className={`relative rounded-lg border bg-transparent transition-colors ${
              showError('cardNumber') ? 'border-red-500' : 'border-gray-300 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-blue-600'
            }`}
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <CreditCardIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              ref={cardNumberRef}
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              id="card-number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              onBlur={() => setTouched((t) => ({ ...t, cardNumber: true }))}
              className="block w-full rounded-lg border-0 bg-transparent py-2.5 pl-10 pr-20 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-0"
              placeholder="0000 0000 0000 0000"
              aria-invalid={!!showError('cardNumber')}
              aria-describedby={showError('cardNumber') ? 'card-number-error' : undefined}
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <img src="/card-brands.png" alt="Visa, Mastercard, Amex, Discover" className="h-6 w-auto object-contain" aria-hidden />
            </div>
          </div>
          {showError('cardNumber') && (
            <p id="card-number-error" className="mt-1 text-xs text-red-500" role="alert">
              {errors.cardNumber}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label htmlFor="expiry" className="block text-xs font-medium text-gray-700 mb-1">
              Expiry
            </label>
            <input
              ref={expiryRef}
              type="text"
              inputMode="numeric"
              autoComplete="cc-exp"
              id="expiry"
              value={expiry}
              onChange={handleExpiryChange}
              onBlur={() => setTouched((t) => ({ ...t, expiry: true }))}
              className={`block w-full rounded-lg border py-2.5 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset transition-colors ${
                showError('expiry') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
              }`}
              placeholder="MM/YY"
              maxLength={5}
              aria-invalid={!!showError('expiry')}
              aria-describedby={showError('expiry') ? 'expiry-error' : undefined}
            />
            {showError('expiry') && (
              <p id="expiry-error" className="mt-1 text-xs text-red-500" role="alert">
                {errors.expiry}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="cvc" className="block text-xs font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              ref={cvcRef}
              type="text"
              inputMode="numeric"
              autoComplete="cc-csc"
              id="cvc"
              value={cvc}
              onChange={handleCvcChange}
              onBlur={() => setTouched((t) => ({ ...t, cvc: true }))}
              className={`block w-full rounded-lg border py-2.5 px-3 text-sm text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset transition-colors ${
                showError('cvc') ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-600'
              }`}
              placeholder="123"
              maxLength={4}
              aria-invalid={!!showError('cvc')}
              aria-describedby={showError('cvc') ? 'cvc-error' : undefined}
            />
            {showError('cvc') && (
              <p id="cvc-error" className="mt-1 text-xs text-red-500" role="alert">
                {errors.cvc}
              </p>
            )}
          </div>
        </div>

        <InputField
          id="email"
          label="Email *"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          error={showError('email') ? errors.email : undefined}
        />
        <InputField
          id="name-on-card"
          label="Name on card *"
          type="text"
          autoComplete="cc-name"
          value={nameOnCard}
          onChange={(e) => setNameOnCard(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, nameOnCard: true }))}
          error={showError('nameOnCard') ? errors.nameOnCard : undefined}
        />
        <InputField
          id="address"
          label="Address *"
          type="text"
          autoComplete="street-address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, address: true }))}
          error={showError('address') ? errors.address : undefined}
        />
      </form>

      <div className="space-y-1.5 border-t border-gray-200 pt-4">
        <div className="flex justify-between text-xs text-gray-600">
          <span>Subtotal</span>
          <span>${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>Service fee</span>
          <span>${serviceFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-semibold text-gray-900 text-sm">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <input
            id="save-info"
            name="save-info"
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
            aria-describedby="save-info-label"
          />
          <label id="save-info-label" htmlFor="save-info" className="flex-1 block text-xs text-gray-700">
            <span className="font-medium">Save my info for 1-click checkout</span>
            <span className="ml-2 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              <LockIcon className="w-3 h-3 mr-1 inline text-blue-600" aria-hidden />
              Encrypted
            </span>
          </label>
        </div>

        <button
          type="submit"
          form="card-payment-form"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 min-h-[44px]"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Processing…
            </span>
          ) : (
            `Pay ${total.toFixed(2)}`
          )}
        </button>
      </div>
    </main>
  );
};

export default CardPayment;