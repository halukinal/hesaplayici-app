# AGENTS.md — Yapay Zeka Ajanları İçin Proje Kuralları

> Bu dosya Claude Code ve Gemini CLI tarafından otomatik okunur.
> (Claude Code için ayrıca CLAUDE.md, Gemini CLI için GEMINI.md olarak da kopyala —
> içerikleri aynıdır.)
> KOD YAZMADAN ÖNCE bu dosyayı ve `docs/` klasöründeki ilgili dökümanı oku.

---

## PROJE NEDİR

Günlük hayatta sık kullanılan hesaplamaları (kalori, KDV, faiz, örgü maliyeti vb.)
teknolojiden anlamayan kullanıcıların bile kolayca yapabileceği, hızlı, ücretsiz,
çok dilli bir PWA (Progressive Web App).

Hedef kitle: 30+ yaş, teknolojiyle arası sınırlı kullanıcılar. "Anneme bile kolay
gelmeli" testi her kararda geçerlidir.

Geçici çalışma adı: **hesapla-projesi** (marka ismi sonra eklenecek, koda gömme).

---

## ALTIN KURALLAR (ASLA İHLAL ETME)

1. **Önce oku, sonra yaz.** İlgili `docs/*.md` dosyasını okumadan kod üretme.
2. **Basitlik kutsaldır.** Her hesaplayıcı tek işe odaklı, tek ekrana sığar.
3. **Her hesaplayıcı = ayrı sayfa.** Asla tek sayfaya birden çok hesaplayıcı koyma.
4. **Mobile-first.** Önce mobil (~390px), sonra masaüstü.
5. **Büyük dokunma hedefleri (min 48px), büyük yazı (taban 18px).**
6. **Hiçbir kişisel veri sunucuda tutulmaz.** Veri cihazda (IndexedDB/localStorage).
   IP adresi ASLA saklanmaz.
7. **Tüm girdiler Zod ile doğrulanır.** `dangerouslySetInnerHTML` YASAK.
8. **Hard-coded metin YASAK.** Tüm görünür metin çeviri dosyasından (next-intl).
9. **Tek hesaplayıcı = tek reçete.** Her hesaplayıcı `docs/CALCULATOR-RECIPE.md`
   içindeki 6 adımı aynen izler.
10. **Küçük adımlar.** "Tüm projeyi yap" deme; verilen tek görevi yap, sonra dur.

---

## TEKNOLOJİ YIĞINI (DEĞİŞTİRME)

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS 4 + shadcn/ui
- next-intl (i18n, Faz 1: tr + en, her dil kendi slug'ı)
- Zod (doğrulama)
- Dexie.js (IndexedDB — geçmiş, favoriler)
- Recharts (grafikler)
- Serwist (PWA, çevrimdışı, ana ekrana ekle)
- Vercel (hosting hedefi)
- Sadece AÇIK MOD tema (koyu mod YOK)

Renkler: primary `#2563EB` (mavi), success `#10B981` (yeşil), bg `#FFFFFF`,
surface `#F8FAFC`, text `#0F172A`.

---

## ÇALIŞMA AKIŞI (her görevde)

1. Görevi oku. Belirsizlik varsa SOR, varsayma.
2. İlgili `docs/*.md` dosyasını oku.
3. Plan yap (hangi dosyalar değişecek/eklenecek), kısaca özetle.
4. Kodu yaz.
5. `npm run lint` ve `npm run build` ile doğrula.
6. Ne yaptığını kısa özetle. Sonraki adımı ÖNERME, kullanıcının komutunu bekle.

---

## YAPMA LİSTESİ

- ❌ Koyu mod ekleme (Faz 1'de yok)
- ❌ Sunucuya kişisel veri yazma / IP saklama
- ❌ Hesaplama alanına reklam koyma (reklam sadece sonuçtan sonra)
- ❌ Hard-coded metin (her şey i18n'den)
- ❌ İstenmeyen kütüphane ekleme (yığın sabit)
- ❌ Birden çok hesaplayıcıyı tek görevde toplama
- ❌ Karar verirken "docs"u görmezden gelme

---

## İKİ ARAÇ KULLANIMI (ÖNEMLİ)

Bu projede iki CLI kullanılır: **Claude Code = KOD**, **Gemini CLI = İÇERİK**.
Her araç sadece kendi bölgesindeki dosyalara yazar. Ayrıntılar: `ROLLER.md`.
- Claude Code bölgesi: `src/**`, yapılandırma, PWA, build.
- Gemini CLI bölgesi: `content/**`, `messages/*.json`, `public/llms.txt`.
- Diğer aracın bölgesindeki dosyaları sadece OKU, değiştirme.
- Her görev bitince `git commit` yap. Aynı dosyaya iki araç aynı anda dokunmaz.

## REFERANS DÖKÜMANLAR (docs/ klasörü)

- `ARCHITECTURE.md` — mimari, kararlar, klasör yapısı, routing, registry
- `CALCULATOR-RECIPE.md` — yeni hesaplayıcı ekleme 6 adımı
- `DESIGN-SYSTEM.md` — renkler, tipografi, UX, erişilebilirlik
- `SEO-GEO.md` — SEO/GEO kuralları, schema, içerik
- `SECURITY.md` — güvenlik, KVKK, sorumluluk redleri
- `PWA.md` — PWA, çevrimdışı, ana ekrana ekleme

---

## TANIM: BİTTİ KABUL EDİLİR Mİ? (Definition of Done)

Bir görev şu şartları sağlamadan "bitti" sayılmaz:
- `npm run build` hatasız geçiyor
- `npm run lint` temiz
- Mobilde test edildi (responsive)
- İlgili docs kurallarına uygun
- Görünür her metin i18n'den geliyor (tr + en)
