'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import {ClipboardList, Trash2, ArrowRight} from 'lucide-react';
import {getAllRecords, deleteRecord} from '@/lib/storage/records';
import {type CalculationRecord} from '@/lib/storage/db';
import {calculatorRegistry} from '@/lib/registry';

export default function RecordsList() {
  const t = useTranslations();
  const [records, setRecords] = useState<CalculationRecord[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getAllRecords().then((data) => {
      setRecords(data);
      setLoaded(true);
    });
  }, []);

  async function handleDelete(id: number) {
    await deleteRecord(id);
    setRecords((prev) => prev.filter((r) => r.id !== id));
  }

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="w-8 h-8 border-4 border-[#2563EB] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <ClipboardList size={48} className="text-[#E2E8F0]" />
        <p className="text-[#64748B] text-lg">{t('records.empty')}</p>
        <Link
          href="/"
          className="text-[#2563EB] font-medium flex items-center gap-1 hover:underline"
        >
          {t('common.backToHome')} <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {records.map((rec) => {
        if (!rec.id) return null;
        const calc = calculatorRegistry.find((c) => c.id === rec.calculatorId);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const calcTitle = calc ? t(calc.titleKey as any) : rec.calculatorId;
        const savedAt = new Date(rec.savedAt).toLocaleString();

        // En önemli sonuç değerini bul
        const resultEntries = Object.entries(rec.result);
        const primaryEntry = resultEntries[0];
        const primaryValue = primaryEntry
          ? `${String(primaryEntry[1])}`
          : '';

        return (
          <div
            key={rec.id}
            className="bg-white border border-[#E2E8F0] rounded-2xl p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-[#0F172A]">{calcTitle}</p>
                <p className="text-xs text-[#94A3B8] mt-0.5">{savedAt}</p>
                {primaryEntry && (
                  <p className="text-sm text-[#475569] mt-2">
                    <span className="font-medium">{primaryEntry[0]}:</span> {primaryValue}
                  </p>
                )}
                {resultEntries.slice(1, 3).map(([key, val]) => (
                  <p key={key} className="text-sm text-[#475569]">
                    <span className="font-medium">{key}:</span> {String(val)}
                  </p>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleDelete(rec.id!)}
                aria-label={t('records.delete')}
                className="p-2 rounded-xl hover:bg-[#FFF1F2] text-[#94A3B8] hover:text-[#EF4444] transition-colors shrink-0"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
