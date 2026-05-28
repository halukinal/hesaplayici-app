interface Props {
  slot: string;
  className?: string;
}

// Reklam alanı — hesaplama alanından SONRA yerleştirilir (DESIGN-SYSTEM.md §5)
export default function AdSlot({slot, className}: Props) {
  return (
    <div
      className={className}
      data-ad-slot={slot}
      aria-hidden="true"
      role="presentation"
    >
      {/* AdSense kodu Faz 2'de eklenecek */}
    </div>
  );
}
