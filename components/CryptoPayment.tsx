import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon, WalletIcon, LockIcon } from './icons';

interface CryptoPaymentProps {
  amount: number;
  onBack: () => void;
  onSuccess: (amount: number, total: number) => void;
}

const CRYPTO_OPTIONS = [
  { id: 'usdc', label: 'USDC', network: 'Solana' },
  { id: 'sol', label: 'SOL', network: 'Solana' },
  { id: 'eth', label: 'ETH', network: 'Ethereum' },
] as const;

const WALLET_OPTIONS = [
  { id: 'metamask', name: 'MetaMask', description: 'Browser extension' },
  { id: 'walletconnect', name: 'WalletConnect', description: 'Mobile or desktop' },
  { id: 'phantom', name: 'Phantom', description: 'Solana & Ethereum' },
  { id: 'coinbase', name: 'Coinbase Wallet', description: 'Coinbase app or extension' },
] as const;

const CryptoPayment: React.FC<CryptoPaymentProps> = ({ amount, onBack, onSuccess }) => {
  const [selected, setSelected] = useState<string>('usdc');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [authWallet, setAuthWallet] = useState<string | null>(null);

  const { networkFee, total } = useMemo(() => {
    const fee = amount * 0.005;
    return { networkFee: fee, total: amount + fee };
  }, [amount]);

  const handleWalletClick = (walletId: string) => {
    setAuthWallet(walletId);
  };

  const handleAuthApprove = async () => {
    if (!authWallet) return;
    setIsConnecting(true);
    await new Promise((r) => setTimeout(r, 1200));
    setConnectedWallet(authWallet);
    setAuthWallet(null);
    setIsConnecting(false);
  };

  const handleAuthCancel = () => {
    setAuthWallet(null);
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connectedWallet) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
    onSuccess(amount, total);
  };

  const walletName = connectedWallet
    ? WALLET_OPTIONS.find((w) => w.id === connectedWallet)?.name ?? 'Wallet'
    : '';

  const authWalletInfo = authWallet ? WALLET_OPTIONS.find((w) => w.id === authWallet) : null;

  return (
    <main className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 w-full space-y-5 transition-opacity duration-300 relative">
      <header className="flex items-center min-h-[36px]">
        <button
          type="button"
          onClick={onBack}
          className="shrink-0 p-1 -m-1 text-gray-600 hover:text-gray-900 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Back to payment method"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </button>
        <h1 className="text-lg sm:text-xl font-bold text-gray-900 ml-1">Pay with Crypto</h1>
      </header>

      {authWalletInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" aria-modal="true" role="dialog" aria-labelledby="auth-title">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden">
            <div className="p-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <WalletIcon className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h2 id="auth-title" className="text-lg font-bold text-gray-900">Log in to {authWalletInfo.name}</h2>
                  <p className="text-xs text-gray-500">Connect your wallet to continue</p>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-600">
                This site is requesting to connect to your {authWalletInfo.name} wallet. You’ll be asked to authorize the connection.
              </p>
              <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 space-y-3">
                <p className="text-xs font-medium text-gray-700">Unlock your wallet</p>
                <input
                  type="password"
                  placeholder="Password"
                  disabled
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-white placeholder:text-gray-400"
                  aria-label="Wallet password"
                />
                <p className="text-[11px] text-gray-500">Enter your wallet password to authorize.</p>
              </div>
            </div>
            <div className="p-5 pt-0 flex gap-3">
              <button
                type="button"
                onClick={handleAuthCancel}
                disabled={isConnecting}
                className="flex-1 py-2.5 px-4 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAuthApprove}
                disabled={isConnecting}
                className="flex-1 py-2.5 px-4 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {isConnecting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Connecting…
                  </>
                ) : (
                  'Connect'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {!connectedWallet ? (
        <>
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-800">Connect your wallet</p>
            <p className="text-xs text-gray-600">
              Authorize your wallet to pay with USDC, SOL, or ETH. You approve each payment—we never take custody of your funds.
            </p>
          </div>

          <div className="space-y-2">
            {WALLET_OPTIONS.map((wallet) => (
              <button
                key={wallet.id}
                type="button"
                onClick={() => handleWalletClick(wallet.id)}
                className="flex items-center w-full p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
                  <WalletIcon className="w-5 h-5 text-gray-600" />
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900">{wallet.name}</p>
                  <p className="text-xs text-gray-500">{wallet.description}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-600">
            <LockIcon className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>Connection is secure. You’ll sign once to authorize; we never see your private keys.</span>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-green-100 rounded-lg">
                <WalletIcon className="w-5 h-5 text-green-700" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">Connected</p>
                <p className="text-xs text-gray-600 truncate">{walletName}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDisconnect}
              className="shrink-0 text-xs font-medium text-gray-500 hover:text-gray-700 underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
            >
              Disconnect
            </button>
          </div>

          <form id="crypto-payment-form" onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs font-medium text-gray-700">Select currency</p>
            <div className="grid grid-cols-3 gap-2">
              {CRYPTO_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className={`py-2.5 px-3 rounded-lg border text-sm font-medium transition-colors ${
                    selected === opt.id
                      ? 'border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="block">{opt.label}</span>
                  <span className="block text-xs font-normal text-gray-500">{opt.network}</span>
                </button>
              ))}
            </div>

            <div className="space-y-1.5 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-xs text-gray-600">
                <span>Amount</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>Network fee</span>
                <span>${networkFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-900 text-sm">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-gray-600">
              <LockIcon className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span>You’ll confirm this payment in your wallet. No custody of your funds.</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all min-h-[44px]"
            >
              {isSubmitting ? (
                <span className="inline-flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden>
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Confirming in wallet…
                </span>
              ) : (
                `Pay $${total.toFixed(2)}`
              )}
            </button>
          </form>
        </>
      )}
    </main>
  );
};

export default CryptoPayment;
