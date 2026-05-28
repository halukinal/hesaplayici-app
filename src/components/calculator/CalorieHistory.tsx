'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {getRecordsByCalculator} from '@/lib/storage/records';
import type {CalculationRecord} from '@/lib/storage/db';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  calculatorId: string;
  refreshKey?: number;
}

interface ChartDataPoint {
  date: string;
  weight: number;
  tdee: number;
}

export default function CalorieHistory({calculatorId, refreshKey}: Props) {
  const t = useTranslations('calorie');
  const [data, setData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    async function loadHistory() {
      const records = await getRecordsByCalculator(calculatorId);
      const chartData: ChartDataPoint[] = records
        .map((r: CalculationRecord) => ({
          date: new Date(r.savedAt).toLocaleDateString(),
          weight: parseFloat(String(r.inputs.weight).replace(',', '.')),
          tdee: (r.result as {tdee: number}).tdee,
        }))
        .reverse();
      setData(chartData);
    }
    loadHistory();
  }, [calculatorId, refreshKey]);

  if (data.length < 2) return null;

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 space-y-4">
      <h3 className="font-bold text-[#0F172A] text-lg">{t('historyTitle')}</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
            <XAxis
              dataKey="date"
              tick={{fontSize: 10, fill: '#64748B'}}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              hide
              domain={['dataMin - 5', 'dataMax + 5']}
            />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#2563EB"
              strokeWidth={3}
              dot={{fill: '#2563EB', r: 4}}
              activeDot={{r: 6, strokeWidth: 0}}
              name={t('weightLabel')}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-xs text-[#64748B] text-center italic">
        * Son kayıtlarınıza göre kilo değişimi grafiği
      </p>
    </div>
  );
}
