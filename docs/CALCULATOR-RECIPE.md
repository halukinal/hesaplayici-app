# CALCULATOR-RECIPE.md — Yeni Hesaplayıcı Ekleme Reçetesi

> Her yeni hesaplayıcı bu 6 adımı **aynen** izler. Bu tutarlılık,
> agent'ların öngörülebilir kod üretmesini ve sitenin bakımının kolay
> kalmasını sağlar. Adımları atlama, sırayı bozma.

---

## ÖN HAZIRLIK

Başlamadan önce şunları netleştir:
- Hesaplayıcının `id`'si (kebab-case, İngilizce): örn. `loan-interest`
- Kategorisi: saglik | para | mutfak | el-sanatlari | genel | zaman
- Geçmiş kaydı tutacak mı? (`hasHistory`) — sadece zaman içinde takip edilen
  veriler için (kalori, kilo). Anlık hesaplar (KDV, yüzde) için `false`.
- Formülün resmi/güvenilir kaynağı (SEO ve güven için linkleneck)

---

## ADIM 1 — Saf Hesaplama Mantığı

Dosya: `lib/calculators/{id}.ts`

Kurallar:
- **Sadece matematik.** Hiç UI, hiç React, hiç DOM.
- Girdi ve çıktı için açık TypeScript tipleri tanımla.
- Saf fonksiyon: aynı girdi → aynı çıktı, yan etki yok.
- Ondalık/yuvarlama kararlarını açıkça belirt (para = 2 hane, vb.).
- Sıfıra bölme, negatif değer gibi uç durumları ele al.

```ts
export interface CalorieInput {
  age: number;
  weightKg: number;
  heightCm: number;
  sex: 'male' | 'female';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
}
export interface CalorieResult {
  bmr: number;   // bazal metabolizma
  tdee: number;  // günlük toplam ihtiyaç
}
export function calculateCalories(input: CalorieInput): CalorieResult {
  // Mifflin-St Jeor denklemi (kaynak content dosyasında linklenir)
  // ... saf hesaplama ...
}
```

---

## ADIM 2 — Zod Doğrulama Şeması

Dosya: `lib/validation/{id}.ts`

Kurallar:
- Her sayısal girdi için min/max ve tip kontrolü.
- Mantıksız değerleri reddet (negatif yaş, 300kg, vb.) ama kullanıcı dostu
  hata mesajı ver (çeviri anahtarıyla).
- Bu şema hem form doğrulamasında hem (ileride) API'de kullanılır.

```ts
import { z } from 'zod';
export const calorieSchema = z.object({
  age: z.number().int().min(1).max(120),
  weightKg: z.number().min(2).max(400),
  heightCm: z.number().min(30).max(260),
  sex: z.enum(['male', 'female']),
  activityLevel: z.enum(['sedentary','light','moderate','active','veryActive']),
});
```

---

## ADIM 3 — Sayfa Bileşeni

Dosya: `app/[locale]/{kategori-slug}/{hesaplayici-slug}/page.tsx`

Kurallar:
- `CalculatorShell` bileşenini kullan (başlık, açıklama, sonuç, reklam, SSS
  yerleşimini standartlaştırır).
- Girdiler için `NumberInput` / `CurrencyInput` kullan (mobil klavye, büyük hedef).
- Sonucu `ResultCard` ile göster (devasa, net).
- `hasHistory` ise `SaveButton` ekle.
- `FavoriteToggle` her hesaplayıcıda bulunur.
- Form state'i client-side; hesaplama anlık (her değişimde veya "Hesapla"
  butonuyla — yaşlı kullanıcı için açık bir "Hesapla" butonu tercih edilir).
- Sayfa metadata'sı (title, description, openGraph) `generateMetadata` ile,
  registry'den beslenir.

---

## ADIM 4 — Açıklayıcı İçerik (MDX)

Dosya: `content/{locale}/{id}.mdx` (her dil için)

İçermesi gerekenler (SEO + GEO için kritik):
- 300+ kelime özgün açıklama
- "X nasıl hesaplanır?" konuşma dilinde başlık
- Formülün açıklaması ve **resmi kaynak linki**
- **SSS bölümü** (en az 4-5 soru-cevap) → FAQPage schema'sına dönüşür
- Pratik örnek(ler)
- Sorumluluk reddi (sağlık → tıbbi tavsiye değil; finans → yatırım tavsiyesi değil)

---

## ADIM 5 — Çeviriler

Dosya: `messages/{locale}.json`

- Tüm UI metinleri (etiketler, butonlar, hata mesajları) çeviri anahtarıyla.
- Hard-coded metin YASAK. Her görünür metin çeviri dosyasından gelir.
- Faz 1: tr.json + en.json zorunlu. Yerel-özel hesaplayıcılar (örn. Türk
  vergi dilimi) sadece tr olabilir; registry'de `availableLocales` ile belirtilir.

---

## ADIM 6 — Kayıt Defterine Ekle

Dosya: `lib/registry.ts`

```ts
{
  id: 'calorie',
  category: 'saglik',
  icon: CalorieIcon,
  slugs: { tr: 'saglik/kalori-hesaplayici', en: 'health/calorie-calculator' },
  titleKey: 'calorie.title',
  descriptionKey: 'calorie.description',
  keywords: ['kalori hesaplama','günlük kalori','tdee','bmr'],
  hasHistory: true,
  availableLocales: ['tr','en'],
  status: 'live',
}
```
Bu kayıt otomatik olarak şunları besler: ana sayfa ızgarası, sitemap,
navigasyon, arama, hreflang, JSON-LD.

---

## BİTİRME KONTROL LİSTESİ

- [ ] Saf mantık birim testleri yazıldı (uç durumlar dahil)
- [ ] Zod şeması mantıksız girdileri reddediyor
- [ ] Mobilde tek elle kullanılabiliyor, klavye doğru açılıyor
- [ ] Sonuç kartı net ve büyük
- [ ] Çevrimdışı çalışıyor (internet kapalı test edildi)
- [ ] İçerik 300+ kelime, SSS var, kaynak linki var, sorumluluk reddi var
- [ ] Her iki dilde çeviri tam, hard-coded metin yok
- [ ] Registry'ye eklendi, ana sayfada görünüyor
- [ ] JSON-LD doğrulandı (Google Rich Results Test)
- [ ] Lighthouse: Performance / A11y / SEO yeşil
- [ ] Favori ekle/çıkar çalışıyor
