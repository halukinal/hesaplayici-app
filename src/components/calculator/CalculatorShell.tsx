import {type ReactNode} from 'react';

interface Props {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function CalculatorShell({title, description, children}: Props) {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 pb-28 md:pb-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-[#0F172A]">{title}</h1>
        {description && (
          <p className="mt-1 text-[#64748B] text-base">{description}</p>
        )}
      </header>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
