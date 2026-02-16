
import React, { useState, useMemo } from 'react';
import { ArrowLeftIcon, LockIcon, VisaIcon, MastercardIcon, AmexIcon, DiscoverIcon, CreditCardIcon } from './icons';

interface CardPaymentProps {
    amount: number;
    onBack: () => void;
}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, error, ...props }) => (
    <div className="relative">
        <input
            id={id}
            className={`block px-3 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border ${error ? 'border-red-500' : 'border-gray-300'} appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
            {...props}
        />
        <label
            htmlFor={id}
            className={`absolute text-sm ${error ? 'text-red-500' : 'text-gray-500'} duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1`}
        >
            {label}
        </label>
    </div>
);


const CardPayment: React.FC<CardPaymentProps> = ({ amount, onBack }) => {
    const [saveInfo, setSaveInfo] = useState(true);

    const { serviceFee, total } = useMemo(() => {
        const fee = amount * 0.029 + 0.30; // Example fee calculation
        return {
            serviceFee: fee,
            total: amount + fee,
        };
    }, [amount]);

    return (
        <main className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-2xl space-y-6 animate-fade-in mx-auto">
            <header className="flex items-center relative justify-center">
                <button onClick={onBack} className="absolute left-0 text-gray-600 hover:text-gray-900 transition-colors">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Secure Checkout</h1>
            </header>

            <div>
                <label htmlFor="existing-card" className="text-sm font-medium text-gray-700">Select an Existing Card</label>
                <div className="relative mt-1">
                    <select id="existing-card" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-3 appearance-none">
                        <option>No Existing Cards</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-4 text-xs font-medium text-gray-400 uppercase">OR</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="space-y-4">
                <h2 className="text-sm font-medium text-gray-700">Add a New Card</h2>
                <form className="space-y-4">
                    <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <CreditCardIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" id="card-number" className="block w-full rounded-lg border border-gray-300 bg-transparent py-3 pl-10 pr-24 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" placeholder="0000 0000 0000 0000" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 space-x-1">
                            <VisaIcon className="h-6"/>
                            <MastercardIcon className="h-6"/>
                            <AmexIcon className="h-6"/>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" id="expiry" className="block w-full rounded-lg border border-gray-300 bg-transparent py-3 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" placeholder="MM / YY" />
                        <input type="text" id="cvc" className="block w-full rounded-lg border border-gray-300 bg-transparent py-3 px-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" placeholder="CVV" />
                    </div>

                    <InputField id="email" label="Email *" type="email" defaultValue="johndoe@gmail.com" />
                    <InputField id="name-on-card" label="Name on card *" type="text" defaultValue="John Appleseed" />
                    <InputField id="address" label="Address *" type="text" defaultValue="123 Main St, New York, NY 10001" />

                </form>
            </div>

            <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>${amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>Service fees</span>
                    <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center">
                    <input
                        id="save-info"
                        name="save-info"
                        type="checkbox"
                        checked={saveInfo}
                        onChange={(e) => setSaveInfo(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                    />
                    <label htmlFor="save-info" className="ml-3 block text-sm font-medium text-gray-700">
                        Save my info for 1-click checkout
                    </label>
                    <span className="ml-3 inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        <LockIcon className="w-3 h-3 mr-1 text-blue-600" />
                        Encrypted
                    </span>
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                >
                    Confirm Purchase of ${total.toFixed(2)}
                </button>
            </div>
        </main>
    );
};

export default CardPayment;
