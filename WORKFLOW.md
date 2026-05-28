# WORKFLOW.md — Adım Adım İş Akışı (Gemini CLI & Claude Code)

> Bu dosya projeyi sıfırdan kurarken hangi komutu hangi sırayla vereceğini gösterir.
> Her adımdaki "PROMPT" bloğunu kopyalayıp CLI'ya (terminalde) yapıştır.
> Bir adım bitmeden diğerine geçme. Her adımdan sonra çıktıyı kontrol et.

═══════════════════════════════════════════════════════════════════
## HAZIRLIK (CLI kurulumu — sadece bir kez)
═══════════════════════════════════════════════════════════════════

### Claude Code kurulumu
```bash
npm install -g @anthropic-ai/claude-code
# Proje klasöründe:
claude
```

### Gemini CLI kurulumu
```bash
npm install -g @google/gemini-cli
# Proje klasöründe:
gemini
```

### Docker ile Çalıştırma (Önerilen)
Proje Dockerize edilmiştir. Yerel bağımlılıklarla uğraşmamak için:
```bash
docker-compose up --build
```
Bu komut uygulamayı `http://localhost:3000` adresinde başlatır.

### Proje klasörünü hazırla
```bash
mkdir hesapla-projesi && cd hesapla-projesi
git init
```

Sonra bu paketteki dosyaları yerleştir:
- `AGENTS.md` → proje köküne
- `CLAUDE.md` → proje köküne (AGENTS.md ile aynı içerik — Claude Code okur)
- `GEMINI.md` → proje köküne (AGENTS.md ile aynı içerik — Gemini CLI okur)
- `docs/` klasörü (6 md dosyası) → proje köküne

> NOT: AGENTS.md, CLAUDE.md, GEMINI.md aynı içeriktedir. Üçünü de koy ki
> hangi CLI'yı kullanırsan kullan kuralları otomatik okusun.

═══════════════════════════════════════════════════════════════════
## ADIM 0 — PROJE İSKELETİ (Faz 0)
═══════════════════════════════════════════════════════════════════

Amaç: Çalışan boş bir Next.js + PWA iskeleti. Henüz hesaplayıcı YOK.

PROMPT:
-------------------------------------------------------------------
docs/ARCHITECTURE.md, docs/DESIGN-SYSTEM.md ve docs/PWA.md dosyalarını oku.

Görev: Faz 0 iskeletini kur. SADECE şunları yap, hesaplayıcı EKLEME:

1. Next.js 15 projesini App Router + TypeScript + Tailwind CSS 4 ile kur
   (mevcut klasörün içine, src dizini kullan).
2. shadcn/ui kurulumunu yap, temel bileşenleri ekle (button, input, card).
3. next-intl kur, tr ve en dillerini ayarla. Localized pathnames altyapısını
   kur (her dil kendi slug'ı). messages/tr.json ve messages/en.json oluştur.
4. ARCHITECTURE.md bölüm 5'teki klasör yapısını birebir oluştur (boş dosyalar
   ve klasörler dahil: components/, lib/, content/, public/icons/).
5. lib/registry.ts dosyasını BOŞ bir kayıt dizisiyle oluştur (tip tanımı dahil).
6. Tasarım sistemini Tailwind config'e ve global CSS'e işle (DESIGN-SYSTEM.md'deki
   renkler, 18px taban font).
7. Ortak bileşen iskeletlerini oluştur (içleri basit ama çalışır):
   - components/layout/Header.tsx, Footer.tsx, BottomNav.tsx, CategoryGrid.tsx
   - components/calculator/CalculatorShell.tsx, NumberInput.tsx,
     CurrencyInput.tsx, ResultCard.tsx, SaveButton.tsx, FavoriteToggle.tsx
8. Serwist ile PWA kur: manifest.ts (isim: "Hesapla", tema #2563EB, ikonlar,
   shortcuts placeholder), service worker, çevrimdışı desteği.
9. lib/storage/db.ts: Dexie ile favoriler ve kayıtlar için tablo şeması.
10. app/[locale]/page.tsx: ana sayfa — boş registry'den beslenen CategoryGrid
    (şimdilik kategori kartları görünsün, hesaplayıcı listesi boş olabilir).
11. Yasal sayfa placeholder'ları: gizlilik, kullanim-sartlari, cerez-politikasi,
    iletisim (içerik sonra doldurulacak).

Bitince: `npm run dev` ile çalıştığını doğrula, `npm run build` hatasız geçsin.
Mobilde (390px) düzgün görünmeli. Sonraki adımı önerme, dur.
-------------------------------------------------------------------

KONTROL: Tarayıcıda localhost:3000/tr açılıyor mu? Kategori kartları görünüyor
mu? Mobil görünüm düzgün mü? Build geçiyor mu?

═══════════════════════════════════════════════════════════════════
## ADIM 1 — İLK PİLOT: KDV HESAPLAYICI (en basit, şablon)
═══════════════════════════════════════════════════════════════════

Amaç: Tüm kalıbı oturtan ilk hesaplayıcı. Diğerleri buna benzeyecek.

PROMPT:
-------------------------------------------------------------------
docs/CALCULATOR-RECIPE.md ve docs/SECURITY.md dosyalarını oku.

Görev: KDV hesaplayıcısını CALCULATOR-RECIPE.md'deki 6 adımı izleyerek ekle.

Özellikler:
- KDV ekle (net → brüt) ve KDV çıkar (brüt → net) iki mod.
- KDV oranı seçilebilir (varsayılan %20, ayrıca %1, %10 ve özel oran girişi).
- id: "vat", kategori: "para", hasHistory: false.
- Slug: tr "para/kdv-hesaplayici", en "money/vat-calculator".
- CurrencyInput kullan (₺ varsayılan). ResultCard ile büyük net sonuç.
- Sorumluluk reddi: resmi işlemler için yetkili kuruma danışın notu.
- content/tr/vat.mdx ve content/en/vat.mdx: 300+ kelime, SSS (4-5 soru),
  KDV nasıl hesaplanır açıklaması, kaynak.
- messages/*.json'a çevirileri ekle.
- registry.ts'e kaydı ekle, ana sayfada görünsün.
- JSON-LD (WebApplication + FAQPage) ekle.

Bitince build + lint kontrol et, mobilde test et, dur.
-------------------------------------------------------------------

KONTROL: KDV hesaplama doğru mu (elle kontrol et: 100 + %20 = 120)?
Ana sayfada görünüyor mu? Çevrimdışı çalışıyor mu? Her iki dilde de açılıyor mu?

═══════════════════════════════════════════════════════════════════
## ADIM 2 — İKİNCİ PİLOT: KALORİ/BMI (geçmiş kaydı + grafik)
═══════════════════════════════════════════════════════════════════

PROMPT:
-------------------------------------------------------------------
docs/CALCULATOR-RECIPE.md, docs/SECURITY.md ve docs/DESIGN-SYSTEM.md oku.

Görev: Kalori (BMR/TDEE) hesaplayıcısını ekle. ADIM 1'deki KDV hesaplayıcısını
ŞABLON olarak kullan, aynı yapıyı izle.

Özellikler:
- Mifflin-St Jeor denklemi ile BMR + aktivite çarpanıyla TDEE.
- Girdiler: yaş, cinsiyet, boy (cm), kilo (kg), aktivite seviyesi (5 seçenek).
- id: "calorie", kategori: "saglik", hasHistory: TRUE.
- hasHistory true olduğu için: SaveButton ile sonucu cihaza kaydet
  (Dexie), Recharts ile zaman içindeki kayıtların grafiği.
- Sorumluluk reddi: tıbbi tavsiye değildir, doktora danışın.
- BMI'yi de aynı ekranda göster (bonus bilgi) veya ayrı hesaplayıcı olarak
  ekle (kararı sor).
- content + çeviri + registry + JSON-LD (ADIM 1 ile aynı standart).

Bitince build + lint, mobil test, çevrimdışı test, dur.
-------------------------------------------------------------------

KONTROL: Kayıt ekle/sil çalışıyor mu? Grafik görünüyor mu? Veri tarayıcı
kapanıp açılınca duruyor mu (IndexedDB)?

═══════════════════════════════════════════════════════════════════
## ADIM 3 — ÜÇÜNCÜ PİLOT: ÖRGÜ MALİYET (kapsamlı, niş)
═══════════════════════════════════════════════════════════════════

PROMPT:
-------------------------------------------------------------------
docs/CALCULATOR-RECIPE.md oku. KDV ve Kalori hesaplayıcılarını şablon al.

Görev: Örgü maliyet & satış fiyatı hesaplayıcısını ekle.

Maliyet kalemleri (kullanıcı her birini girer, opsiyonel):
- İp maliyeti (miktar x birim fiyat)
- Aksesuar maliyeti (düğme, fermuar vb. — birden çok kalem eklenebilir)
- Kargo maliyeti
- İşçilik (saat x saatlik ücret) — opsiyonel
Hesaplanan çıktılar:
- Toplam maliyet
- İstenen kâr oranına göre önerilen satış fiyatı
- VEYA: satış fiyatı girilirse elde edilen kâr ve kâr oranı
- Mod seçimi: "satış fiyatı öner" / "kârımı hesapla"
- id: "knitting-cost", kategori: "el-sanatlari", hasHistory: false (veya
  kullanıcı isterse kaydet — kararı sor).
- Çok basit kullanım: büyük butonlar, kalem ekle/çıkar net.
- content + çeviri + registry + JSON-LD standart.

Not: Bu şablon ileride dikiş, takı, ev pastacılığı gibi diğer "ürün maliyet"
hesaplayıcılarına uyarlanacak — kodu yeniden kullanılabilir tasarla.

Bitince build + lint, mobil test, dur.
-------------------------------------------------------------------

KONTROL: Kalem ekle/çıkar çalışıyor mu? İki mod da doğru hesaplıyor mu?
Annene gösterip test et (gerçek kullanıcı testi).

═══════════════════════════════════════════════════════════════════
## ADIM 4 — YAYIN HAZIRLIĞI (yasal + güvenlik + SEO)
═══════════════════════════════════════════════════════════════════

PROMPT:
-------------------------------------------------------------------
docs/SECURITY.md ve docs/SEO-GEO.md oku.

Görev: Siteyi yayına hazırla.

1. Yasal sayfaları doldur: Gizlilik Politikası, Kullanım Şartları, Çerez
   Politikası, KVKK Aydınlatma Metni, İletişim (mail placeholder bırak).
2. CookieBanner: KVKK/GDPR uyumlu, rıza alınmadan analitik/reklam çerezi
   yüklenmez.
3. Güvenlik başlıkları: next.config'e CSP, HSTS, X-Frame-Options vb. ekle
   (SECURITY.md bölüm 3).
4. SEO: otomatik sitemap.ts (registry'den, hreflang dahil), robots.ts,
   public/llms.txt.
5. Tüm hesaplayıcılara JSON-LD ve doğru metadata olduğunu doğrula.
6. Lighthouse çalıştır: Performance, Accessibility, SEO, PWA skorlarını
   raporla, 90+ olmayanları düzelt.

Bitince build + lint, securityheaders kontrolü, Lighthouse raporu, dur.
-------------------------------------------------------------------

KONTROL: Lighthouse skorları yeşil mi? Cookie banner çalışıyor mu? Tüm yasal
sayfalar var mı?

═══════════════════════════════════════════════════════════════════
## ADIM 5 — DEPLOY (Vercel)
═══════════════════════════════════════════════════════════════════

```bash
# GitHub'a yükle
git add . && git commit -m "ilk surum" && git push

# Vercel'e bağla (vercel.com'da GitHub repo'yu import et)
# veya:
npm install -g vercel
vercel
```

Yayın sonrası:
- Geçici Vercel domain'i ile test et.
- Marka ismine karar verince: domain al, Vercel'de bağla, manifest.ts'teki
  isim ve URL'leri güncelle.
- Google Search Console'a ekle, sitemap gönder.
- AdSense başvurusu yap (birkaç hafta içerik/trafik birikince).

═══════════════════════════════════════════════════════════════════
## SONRAKİ HESAPLAYICILAR (sürekli, Faz 3)
═══════════════════════════════════════════════════════════════════

Her yeni hesaplayıcı için ADIM 1-3'teki kalıbı kullan. Genel prompt şablonu:

PROMPT:
-------------------------------------------------------------------
docs/CALCULATOR-RECIPE.md oku. [EN YAKIN MEVCUT HESAPLAYICI]'yı şablon al.

Görev: [HESAPLAYICI ADI] ekle.
- id: "...", kategori: "...", hasHistory: true/false
- Slug tr: "...", en: "..."
- Girdiler: ...
- Çıktılar: ...
- Formül kaynağı: ...
6 adımı eksiksiz uygula (mantık, zod, sayfa, içerik, çeviri, registry + JSON-LD).
Bitince build + lint + mobil test, dur.
-------------------------------------------------------------------

ÖNCELİK SIRASI (trafik potansiyeline göre öneri):
1. Faiz/kredi hesaplayıcı (yüksek arama hacmi)
2. Yüzde hesaplayıcı (çok aranır)
3. Yaş hesaplayıcı
4. İki tarih arası gün
5. Maaş net-brüt
6. Mutfak ölçü çevirici
7. Namaz vakitleri
... (GA4 verisine göre güncelle)

═══════════════════════════════════════════════════════════════════
## HANGİ CLI'YI NE ZAMAN?
═══════════════════════════════════════════════════════════════════

İki CLI da aynı kuralları (AGENTS/CLAUDE/GEMINI.md) okur, ikisi de iş görür.
Pratik öneri:
- Claude Code: karmaşık mimari, çok dosyalı refactor, hata ayıklama.
- Gemini CLI: büyük dosya tarama, içerik/çeviri üretimi, geniş bağlam.
İstediğini kullan; ikisi de docs kurallarına uyacak şekilde ayarlandı.

Önemli: Hangi CLI olursa olsun, her zaman TEK ADIM ver, bitince kontrol et,
sonra devam et. Asla "hepsini yap" deme.
