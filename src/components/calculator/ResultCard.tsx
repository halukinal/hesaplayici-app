import {type ReactNode} from 'react';
import {cn} from '@/lib/utils';

interface ResultRow {
  label: string;
  value: ReactNode;
  primary?: boolean;
}

interface Props {
  title?: string;
  rows: ResultRow[];
  className?: string;
}

export default function ResultCard({title, rows, className}: Props) {
  return (
    <div
      className={cn(
        'rounded-2xl bg-[#F0FDF4] border-2 border-[#10B981] p-5 space-y-3',
        className,
      )}
      role="region"
      aria-label={title ?? 'Hesaplama sonucu'}
    >
      {title && (
        <h2 className="font-semibold text-[#059669] text-base">{title}</h2>
      )}
      {rows.map(({label, value, primary}, i) => (
        <div key={i} className={primary ? 'py-2' : ''}>
          <span className="text-[#64748B] text-sm block">{label}</span>
          <span
            className={cn(
              'font-bold text-[#0F172A] select-all',
              primary ? 'text-5xl leading-none' : 'text-2xl',
            )}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}
