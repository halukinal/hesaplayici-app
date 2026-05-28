# ARCHITECTURE.md — Proje Mimarisi ve Kararlar

> Bu döküman projenin **tek doğruluk kaynağıdır** (single source of truth).
> Tüm AI agent'lar ve geliştiriciler kod yazmadan önce bu dökümanı okumalıdır.
> Kararlar burada kayıtlıdır; "neden böyle yapıldı" sorularının cevabı buradadır.

---

## 1. PROJE ÖZETİ

Günlük hayatta sık kullanılan ama nasıl yapılacağı bilinmeyen hesaplamaları,
teknolojiden anlamayan kullanıcıların bile rahatça yapabileceği şekilde sunan;
hızlı, ücretsiz, çok dilli bir **PWA** (Progressive Web App).

**Hedef kitle:** 30+ yaş, teknolojiyle arası sınırlı kullanıcılar; ev hanımları,
esnaflar, el sanatçıları, büyükanne/büyükbabalar. "Anneme bile kolay gelmeli" testi.

**Gelir modeli:** Google AdSense (yan gelir / hobi beklentisi).

**Veri stratejisi:** Faz 1'de TÜM kullanıcı verisi cihazda kalır (sunucusuz).
Hiçbir kişisel veri sunucuda tutulmaz. IP saklanmaz (KVKK riski + güvenilmez).

---

## 2. TEMEL PRENSİPLER (İHLAL EDİLEMEZ)

1. **Basitlik kutsaldır.** Her hesaplayıcı tek işe odaklı, tek ekrana sığar,
   ideal olarak scroll gerektirmez (hesaplama alanı için).
2. **Her hesaplayıcı = ayrı sayfa.** Tek sayfaya birden çok hesaplayıcı sığdırılmaz.
3. **Büyük dokunma hedefleri.** Minimum 48px. Büyük yazı (taban 18px).
4. **Mobile-first.** Önce mobil tasarlanır, masaüstüne genişletilir.
5. **App-like hissi.** PWA standalone, alt navigasyon, çevrimdışı çalışma.
6. **Sıfır kafa karışıklığı.** Kullanıcı ne yapacağını düşünmek zorunda kalmaz.
7. **Güvenlik ve gizlilik varsayılan.** Veri cihazda, girdiler doğrulanır.
8. **AI-hazır ama AI-bağımsız.** Hesaplama mantığı AI olmadan çalışır;
   altyapı ileride AI yardımcı eklenebilecek şekilde modülerdir.

---

## 3. TEKNOLOJİ YIĞINI

| Katman | Teknoloji | Neden |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSR ile SEO, modern React |
| Dil | TypeScript | Tip güvenliği, hata önleme |
| Stil | Tailwind CSS 4 | Hızlı, tutarlı |
| Bileşenler | shadcn/ui | Erişilebilir, özelleştirilebilir |
| Çok dil | next-intl | i18n routing, çeviri |
| Doğrulama | Zod | Girdi güvenliği |
| Yerel veri | Dexie.js (IndexedDB) | Kalori/kilo geçmişi, favoriler |
| Grafik | Recharts | Kilo grafiği vb. |
| PWA | Serwist | Çevrimdışı, ana ekrana ekle |
| Hosting | Vercel | Ücretsiz, Next.js native |
| Analitik | GA4 + Microsoft Clarity | Ücretsiz, heatmap |
| Reklam | Google AdSense | Gelir |

---

## 4. KESİNLEŞEN KARARLAR (Karar Kütüğü)

| # | Konu | Karar | Tarih |
|---|---|---|---|
| D1 | Veri saklama | Sadece localStorage/IndexedDB (sunucusuz). IP saklanmaz. | onaylı |
| D2 | Mobil yaklaşım | PWA (native app değil) | onaylı |
| D3 | Gelir | AdSense, yan gelir beklentisi | onaylı |
| D4 | Çok dil | Faz 1: TR + EN. Sonra kademeli (AR, ES, DE...) | onaylı |
| D5 | AI | Faz 1'de YOK. Altyapı hazır. Sonra "sonucu yorumla" + arama. | onaylı |
| D6 | Pilot hesaplayıcılar | Kalori/BMI, KDV, Örgü Maliyet | onaylı |
| D7 | Tema | Sadece açık mod (basitlik) | onaylı |
| D8 | Renk paleti | Sıcak mavi (#2563EB) + yumuşak yeşil (#10B981) | onaylı |
| D9 | URL yapısı | Her dil kendi dilinde slug (en iyi SEO) | onaylı |
| D10 | Alt navigasyon | Mobilde sabit alt nav (uygulama hissi) | onaylı |
| D11 | Favori sistemi | Var (cihazda saklanır) | onaylı |
| D12 | Çevrimdışı | Hesaplayıcılar internetsiz çalışır | onaylı |
| D13 | Android widget | Gerçek native widget YOK (PWA sınırı). Yerine: ana ekrana kısayol + App Shortcuts (uzun basma menüsü). | onaylı |
| D14 | İşbirliği maili | İletişim sayfası + footer. Mail adresi sonra eklenecek (placeholder). | beklemede |
| D15 | Docker | Geliştirme ortamı Dockerize edildi (hot-reload destekli). | onaylı |

### Android Widget hakkında net açıklama (D13)
Gerçek Android ana ekran widget'ı (canlı bilgi kutusu) sadece native uygulamalarla
yapılabilir; PWA bunu işletim sistemi seviyesinde yapamaz. Bunun yerine:
- **Ana ekrana kısayol:** Kullanıcı bir hesaplayıcının ikonunu ana ekrana ekler,
  tıklayınca direkt o hesaplayıcı tam ekran açılır.
- **App Shortcuts:** PWA ikonuna uzun basınca çıkan hızlı kısayol menüsü (manifest).
- **PWA Widgets:** Deneysel standart; altyapı hazır tutulur ama garanti verilmez.
İleride gerçek widget şart olursa: React Native companion app (çok sonraki faz).

---

## 5. KLASÖR YAPISI

```
/
├── app/
│   ├── [locale]/                    # tr, en — i18n routing
│   │   ├── layout.tsx               # ortak layout (header, footer, alt nav)
│   │   ├── page.tsx                 # ANA SAYFA: kategori ızgarası
│   │   ├── (her dil kendi slug'ı)   # bkz. ROUTING bölümü
│   │   ├── saglik/kalori/page.tsx   # (TR örnek)
│   │   ├── saglik/vki/page.tsx
│   │   ├── para/kdv/page.tsx
│   │   ├── el-sanatlari/orgu-maliyet/page.tsx
│   │   ├── favoriler/page.tsx
│   │   ├── kayitlarim/page.tsx
│   │   ├── iletisim/page.tsx        # işbirliği maili
│   │   ├── gizlilik/page.tsx
│   │   ├── kullanim-sartlari/page.tsx
│   │   └── cerez-politikasi/page.tsx
│   ├── api/                         # (ileride AI endpoint'leri)
│   ├── sitemap.ts                   # otomatik sitemap
│   ├── robots.ts
│   └── manifest.ts                  # PWA manifest (shortcuts dahil)
│
├── components/
│   ├── ui/                          # shadcn bileşenleri
│   ├── calculator/                  # ORTAK hesaplayıcı parçaları
│   │   ├── CalculatorShell.tsx      # her hesaplayıcının çerçevesi
│   │   ├── NumberInput.tsx          # büyük, mobil-dostu sayı girişi
│   │   ├── CurrencyInput.tsx        # para girişi (₺/$/€)
│   │   ├── ResultCard.tsx           # devasa, net sonuç kartı
│   │   ├── SaveButton.tsx           # cihaza kaydet
│   │   └── FavoriteToggle.tsx       # favori işaretle
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── BottomNav.tsx            # mobil alt nav (Ana/Kategori/Kayıt/Favori)
│   │   └── CategoryGrid.tsx         # ana sayfa büyük ikon ızgarası
│   ├── pwa/
│   │   ├── InstallPrompt.tsx        # akıllı yükleme teşviki
│   │   ├── AddToHomeScreen.tsx      # platform-bilinçli kısayol
│   │   └── PlatformGuide.tsx        # Android/iOS özel rehber
│   ├── seo/
│   │   ├── JsonLd.tsx               # schema.org yapılandırılmış veri
│   │   └── FaqSection.tsx           # her sayfada SSS (SEO + GEO)
│   ├── ads/
│   │   └── AdSlot.tsx               # kontrollü reklam yerleşimi
│   └── consent/
│       └── CookieBanner.tsx         # KVKK/GDPR çerez onayı
│
├── lib/
│   ├── calculators/                 # SAF HESAPLAMA MANTIĞI (UI'dan ayrı, test edilebilir)
│   │   ├── calorie.ts
│   │   ├── bmi.ts
│   │   ├── vat.ts
│   │   └── knitting-cost.ts
│   ├── storage/
│   │   ├── db.ts                    # Dexie yapılandırması
│   │   ├── favorites.ts             # favori CRUD
│   │   └── records.ts               # kayıt geçmişi CRUD
│   ├── validation/                  # Zod şemaları (her hesaplayıcı için)
│   ├── i18n/                        # next-intl + slug haritaları
│   └── registry.ts                  # HESAPLAYICI KAYIT DEFTERİ (bkz. bölüm 7)
│
├── messages/                        # çeviriler
│   ├── tr.json
│   └── en.json
│
├── content/                         # her hesaplayıcının açıklayıcı metni (MDX)
│   ├── tr/
│   └── en/
│
├── docs/                            # AGENT REFERANS DÖKÜMANLARI
│   ├── ARCHITECTURE.md              # bu döküman
│   ├── CALCULATOR-RECIPE.md         # yeni hesaplayıcı ekleme reçetesi
│   ├── DESIGN-SYSTEM.md             # renkler, tipografi, UX kuralları
│   ├── SEO-GEO.md                   # SEO/GEO kuralları
│   ├── SECURITY.md                  # güvenlik kontrol listesi
│   ├── PWA.md                       # PWA, çevrimdışı, ana ekrana ekleme
│   └── cultural-notes.md            # kültürel adaptasyon notları
│
└── public/
    ├── icons/                       # PWA ikonları (her boyut)
    └── llms.txt                     # AI crawler dosyası (GEO)
```

---

## 6. ROUTING — Her Dil Kendi Slug'ı (D9)

next-intl ile "localized pathnames" kullanılır. Her hesaplayıcının her dilde
**farklı, anlamlı slug'ı** olur. Bu en iyi SEO sonucunu verir.

Örnek slug haritası (`lib/i18n/pathnames.ts`):
```
kalori-hesaplayici:
  tr: /tr/saglik/kalori-hesaplayici
  en: /en/health/calorie-calculator
kdv-hesaplayici:
  tr: /tr/para/kdv-hesaplayici
  en: /en/money/vat-calculator
orgu-maliyet:
  tr: /tr/el-sanatlari/orgu-maliyet-hesaplayici
  en: /en/crafts/knitting-cost-calculator
```
Kurallar:
- Slug'lar kısa, anahtar kelime içerir, tire ile ayrılır.
- hreflang etiketleri otomatik üretilir (her dil çifti için).
- Varsayılan dil yönlendirmesi tarayıcı diline göre ama kullanıcı seçimi saklanır.

---

## 7. HESAPLAYICI KAYIT DEFTERİ (registry.ts)

Tüm hesaplayıcılar merkezi bir kayıt defterinde tanımlanır. Ana sayfa ızgarası,
sitemap, navigasyon, arama — hepsi bu defterden beslenir. Yeni hesaplayıcı
eklemek = deftere bir kayıt + reçeteyi izlemek.

Her kayıt şunları içerir:
- `id` (örn. "calorie")
- `category` (saglik | para | mutfak | el-sanatlari | genel | zaman ...)
- `icon` (büyük, net ikon)
- `slugs` (dil → slug haritası)
- `titles` / `descriptions` (dil → metin, çeviri anahtarı)
- `keywords` (SEO)
- `hasHistory` (kayıt geçmişi var mı? örn. kalori = evet, KDV = hayır)
- `status` (live | draft)

---

## 8. "TEK HESAPLAYICI = TEK REÇETE" (özet)

Her hesaplayıcı aynı 6 adımı izler (detay: CALCULATOR-RECIPE.md):
1. **Saf mantık** — `lib/calculators/X.ts` (sadece matematik, UI yok, %100 test edilebilir)
2. **Zod şeması** — `lib/validation/X.ts` (girdi güvenliği)
3. **Sayfa** — `app/[locale]/.../page.tsx` (`CalculatorShell` kullanır)
4. **İçerik** — `content/{locale}/X.mdx` (açıklama + SSS + formül kaynağı)
5. **Çeviri** — `messages/*.json` (UI metinleri)
6. **Kayıt** — `lib/registry.ts` (deftere ekle) + JSON-LD otomatik

---

## 9. KATEGORİLER (Ana Sayfa Izgarası)

Büyük, ikonlu, dokunması kolay kartlar:
- 🏥 **Sağlık** — kalori, VKİ, ideal kilo, su, gebelik, çocuk büyüme...
- 💰 **Para** — KDV, faiz, kredi, enflasyon, maaş, kâr marjı, döviz...
- 🍳 **Mutfak** — ölçü çevirici, fırın sıcaklığı, tarif porsiyon...
- 🧶 **El Sanatları & Küçük İşletme** — örgü maliyet, dikiş, takı, satış fiyatı...
- 🔢 **Genel Matematik** — yüzde, oran, alan/hacim, yakıt...
- 📅 **Zaman & Tarih** — yaş, tarih farkı, namaz vakitleri...

---

## 10. YOL HARİTASI

- **Faz 0 (Hafta 1):** İskelet + tasarım sistemi + ortak bileşenler + i18n + PWA + alt nav + favori altyapısı
- **Faz 1 (Hafta 2):** 3 pilot hesaplayıcı (Kalori, KDV, Örgü) — uçtan uca, şablon niteliğinde
- **Faz 2 (Hafta 3):** Yasal sayfalar + cookie consent + analitik + AdSense başvurusu + YAYIN
- **Faz 3 (Sürekli):** Haftada 2-3 yeni hesaplayıcı; gerçek kullanıcı testi (örgü → anne)
- **Faz 4 (Sonra):** AI yardımcı ("sonucu yorumla", akıllı arama); ek diller; magic-link yedekleme

---

## 11. AGENT KULLANIM REHBERİ

Önerilen agent ayrımı (her biri ilgili docs dosyasını okur):
- **architect-agent** → ARCHITECTURE.md + DESIGN-SYSTEM.md (planlama, iskelet)
- **feature-agent** → CALCULATOR-RECIPE.md (yeni hesaplayıcı ekleme)
- **review-agent** → SECURITY.md (güvenlik, KVKK, kod kalitesi denetimi)
- **seo-agent** → SEO-GEO.md (meta, schema, içerik, sitemap)

**Kültürel adaptasyon:** Ayrı bir "sosyolog agent" KULLANILMAZ. Kültürel kararlar
insan + Claude sohbetinde alınır, `docs/cultural-notes.md` dosyasına yazılır,
coding agent'lar bu dosyayı referans alır. Karar insanın, kodlama agent'ın.
