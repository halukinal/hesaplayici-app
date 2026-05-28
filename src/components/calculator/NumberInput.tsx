import {forwardRef} from 'react';
import {cn} from '@/lib/utils';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  error?: string;
}

const NumberInput = forwardRef<HTMLInputElement, Props>(
  ({label, unit, error, className, id, ...props}, ref) => {
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="space-y-1">
        <label htmlFor={inputId} className="block font-medium text-[#0F172A] text-base">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type="number"
            inputMode="decimal"
            className={cn(
              'w-full h-14 px-4 rounded-xl border-2 text-lg font-medium',
              'border-[#E2E8F0] bg-white text-[#0F172A]',
              'focus:outline-none focus:border-[#2563EB]',
              'placeholder:text-[#64748B]',
              error && 'border-[#EF4444]',
              unit && 'pr-16',
              className,
            )}
            aria-describedby={error ? `${inputId}-error` : undefined}
            aria-invalid={!!error}
            {...props}
          />
          {unit && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748B] font-medium pointer-events-none">
              {unit}
            </span>
          )}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-[#EF4444] text-sm" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  },
);

NumberInput.displayName = 'NumberInput';
export default NumberInput;
