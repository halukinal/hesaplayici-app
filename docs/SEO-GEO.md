# SEO-GEO.md — Arama ve Üretken Motor Optimizasyonu

> Sitenin tek gerçek gelir kaynağı organik trafik. SEO + GEO birinci önceliktir.
> SEO = Google/Bing arama. GEO = ChatGPT/Perplexity/Gemini gibi AI motorları.

---

## 1. URL & DİL YAPISI (D9)

- Her dil kendi dilinde slug (`/tr/saglik/kalori-hesaplayici`,
  `/en/health/calorie-calculator`).
- Her dil ayrı indekslenir → her dil ayrı trafik kanalı.
- **hreflang** etiketleri her sayfa için otomatik (tüm dil çiftleri + x-default).
- Canonical URL her sayfada tanımlı.
- Slug'lar kısa, anahtar kelime içerir, tireyle ayrılır.

---

## 2. SAYFA META (her hesaplayıcı)

- Özgün `<title>` (anahtar kelime + marka).
- Özgün meta description (150-160 karakter, eylem çağrısı).
- Open Graph + Twitter Card (paylaşım görseli).
- `generateMetadata` ile registry'den otomatik üretim.

---

## 3. YAPILANDIRILMIŞ VERİ (JSON-LD) — GEO için kritik

Her hesaplayıcı sayfasında:
- **WebApplication** veya **SoftwareApplication** schema (ücretsiz araç).
- **FAQPage** schema (içerikteki SSS'den üretilir).
- **HowTo** schema (nasıl hesaplanır adımları).
- **BreadcrumbList** (kategori > hesaplayıcı).
Doğrulama: Google Rich Results Test'ten geçmeli.

---

## 4. İÇERİK KURALLARI — GEO için kritik

AI motorları kısa, zayıf içeriği görmezden gelir. Her sayfada:
- 300+ kelime özgün, değerli içerik.
- **Konuşma dili başlıklar:** "Kalori nasıl hesaplanır?", "KDV nasıl
  eklenir?" — kullanıcının AI'a soracağı şekilde.
- Net soru-cevap formatı (AI motorları bunu alıntılar).
- Pratik örnekler, gerçek senaryolar.
- Formülün kaynağı + resmi link (otorite/güven sinyali).
- İçerik özgün; kopya/ince içerik (thin content) yasak.

---

## 5. TEKNİK SEO

- **Otomatik sitemap.xml** (registry'den, tüm diller + hreflang).
- **robots.txt** (doğru yönergeler, sitemap referansı).
- **llms.txt** (`public/llms.txt`) — AI crawler'lara site yapısını ve
  hesaplayıcı listesini açıklar (GEO standardı).
- **Core Web Vitals yeşil:** Hesaplama istemcide olduğu için sayfa çok hızlı;
  LCP/CLS/INP optimize edilir. Görseller optimize, font preload.
- Statik üretim (SSG) mümkün olan her sayfada → maksimum hız.

---

## 6. SITE MİMARİSİ SEO

- Ana sayfa → kategori → hesaplayıcı net hiyerarşi.
- İç linkleme: ilgili hesaplayıcılar birbirine link verir
  (örn. kalori ↔ VKİ ↔ ideal kilo).
- Kategori sayfaları kendi içeriğine sahip (sadece liste değil).

---

## 7. GEO ÖZEL TAKTİKLER

- İçeriği AI'ın alıntılayabileceği "snippet"ler halinde yapılandır.
- Kesin sayılar, formüller, tanımlar açıkça belirtilir.
- "Bu araç şunu yapar" net ifadeler (AI bunu özetler).
- Güncel tut: AI motorları tazeliği önemser (yıl belirt: "2026").
- E-E-A-T sinyalleri: kaynak gösterimi, sorumluluk reddi, iletişim sayfası.

---

## 8. ÖLÇÜM

- GA4: hangi hesaplayıcı çok kullanılıyor, hangi dil, trafik kaynağı.
- Google Search Console: hangi aramalardan geliniyor, tıklama oranı.
- Microsoft Clarity: kullanıcı nerede takılıyor (heatmap).
- Bu verilerle yeni hesaplayıcı önceliklendirilir.
