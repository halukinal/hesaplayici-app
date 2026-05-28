interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
}

export default function FaqSection({items}: Props) {
  return (
    <section aria-label="Sık Sorulan Sorular" className="mt-8 space-y-4">
      <h2 className="text-xl font-bold text-[#0F172A]">Sık Sorulan Sorular</h2>
      <dl className="space-y-4">
        {items.map(({question, answer}, i) => (
          <div key={i}>
            <dt className="font-semibold text-[#0F172A]">{question}</dt>
            <dd className="text-[#64748B] mt-1">{answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
