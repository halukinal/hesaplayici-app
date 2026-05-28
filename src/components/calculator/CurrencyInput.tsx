'use client';

import {useState, forwardRef} from 'react';
import NumberInput from './NumberInput';

const CURRENCIES = [
  {value: 'TRY', symbol: '₺'},
  {value: 'USD', symbol: '$'},
  {value: 'EUR', symbol: '€'},
];

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
  defaultCurrency?: string;
  onCurrencyChange?: (currency: string) => void;
}

const CurrencyInput = forwardRef<HTMLInputElement, Props>(
  ({label, error, defaultCurrency = 'TRY', onCurrencyChange, ...props}, ref) => {
    const [currency, setCurrency] = useState(defaultCurrency);
    const symbol = CURRENCIES.find((c) => c.value === currency)?.symbol ?? '₺';

    function handleCurrencyChange(e: React.ChangeEvent<HTMLSelectElement>) {
      setCurrency(e.target.value);
      onCurrencyChange?.(e.target.value);
    }

    return (
      <div className="space-y-1">
        <NumberInput ref={ref} label={label} unit={symbol} error={error} {...props} />
        <div className="flex gap-2">
          {CURRENCIES.map(({value, symbol: sym}) => (
            <button
              key={value}
              type="button"
              onClick={() => {
                setCurrency(value);
                onCurrencyChange?.(value);
              }}
              className={`px-3 py-1 rounded-lg text-sm font-medium border transition-colors min-h-0 h-8 ${
                currency === value
                  ? 'bg-[#2563EB] text-white border-[#2563EB]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB]'
              }`}
              aria-pressed={currency === value}
              aria-label={`Para birimi: ${value}`}
            >
              {sym} {value}
            </button>
          ))}
        </div>
        {/* Hidden select for accessibility */}
        <select
          value={currency}
          onChange={handleCurrencyChange}
          className="sr-only"
          aria-label="Para birimi seç"
          tabIndex={-1}
        >
          {CURRENCIES.map(({value}) => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
    );
  },
);

CurrencyInput.displayName = 'CurrencyInput';
export default CurrencyInput;
