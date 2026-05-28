# ROLLER.md — İki Yapay Zeka Aracı Arasında İş Bölümü

> Bu projede iki CLI aracı KULLANILIR ama ASLA aynı anda aynı dosyaya dokunmaz.
> Çakışmayı önlemek için her aracın kendi bölgesi (klasörleri) vardır.
> Claude Code ve Gemini CLI bu dosyayı okur ve kendi bölgesinde kalır.

═══════════════════════════════════════════════════════════════════
## TEMEL KURAL
═══════════════════════════════════════════════════════════════════

İki araç aynı klasörde açık olabilir, AMA:
- Her araç sadece KENDİ bölgesindeki dosyaları değiştirir.
- Diğer aracın bölgesindeki dosyaları sadece OKUYABİLİR, değiştiremez.
- Her görev bitince `git add . && git commit` yapılır (çakışmayı önler).
- Aynı anda iki araca aynı dosya üzerinde görev VERİLMEZ.

═══════════════════════════════════════════════════════════════════
## CLAUDE CODE'UN BÖLGESİ — "KOD"
═══════════════════════════════════════════════════════════════════

Sorumlu olduğu klasör ve dosyalar:
- `src/app/**` — sayfalar, layout, routing (MDX içerik HARİÇ)
- `src/components/**` — tüm React bileşenleri
- `src/lib/**` — hesaplama mantığı, validation, storage, registry, i18n config
- `next.config.*`, `tailwind.config.*`, `tsconfig.json`, `package.json`
- `public/manifest`, service worker, PWA yapılandırması
- Hata ayıklama, refactor, build düzeltme

Claude Code'a verilecek işler:
- Proje iskeleti kurulumu (Faz 0)
- Hesaplayıcı mantığı (lib/calculators)
- Zod şemaları (lib/validation)
- Sayfa ve bileşen kodu
- Registry kayıtları
- PWA / güvenlik / yapılandırma
- Build/lint hatalarını çözme
- JSON-LD ve teknik SEO (sitemap.ts, robots.ts kodu)

Claude Code DOKUNMAZ:
- `messages/*.json` (çeviri metinleri) → Gemini'nin bölgesi
- `content/**/*.mdx` (açıklayıcı içerik metinleri) → Gemini'nin bölgesi

İSTİSNA: Claude bir hesaplayıcı eklerken messages/content dosyalarının
ANAHTARLARINI (boş placeholder) oluşturabilir, ama METİNLERİ Gemini doldurur.

═══════════════════════════════════════════════════════════════════
## GEMINI CLI'NİN BÖLGESİ — "İÇERİK"
═══════════════════════════════════════════════════════════════════

Sorumlu olduğu klasör ve dosyalar:
- `content/**/*.mdx` — her hesaplayıcının açıklayıcı metinleri, SSS
- `messages/*.json` — tüm UI çevirileri (tr, en, sonra diğer diller)
- `public/llms.txt` — AI crawler içeriği
- SEO metin içeriği (meta description metinleri, başlık önerileri)

Gemini CLI'ya verilecek işler:
- Hesaplayıcı açıklama metinleri yazma (300+ kelime, SSS dahil)
- Çeviri üretimi ve diller arası tutarlılık
- SEO/GEO odaklı metin yazımı
- Büyük dosya/klasör tarama ve özetleme
- İçerik tutarlılık kontrolü

Gemini CLI DOKUNMAZ:
- `src/**` (kod) → Claude'un bölgesi
- Yapılandırma dosyaları → Claude'un bölgesi
- Build/teknik işler → Claude'un bölgesi

═══════════════════════════════════════════════════════════════════
## TİPİK İŞ AKIŞI (bir hesaplayıcı eklerken)
═══════════════════════════════════════════════════════════════════

1. CLAUDE CODE: Hesaplayıcının mantığını, sayfasını, validation'ını,
   registry kaydını ve JSON-LD'sini yazar. content/messages için BOŞ
   placeholder anahtarları bırakır. → commit
2. GEMINI CLI: content/*.mdx açıklama metnini ve messages/*.json
   çevirilerini doldurur. → commit
3. CLAUDE CODE: build + lint çalıştırır, her şeyin bağlandığını doğrular,
   varsa hatayı düzeltir. → commit

Bu sırayla çakışma OLMAZ çünkü her araç farklı dosyalara yazar ve aralarda
commit vardır.

═══════════════════════════════════════════════════════════════════
## ÇAKIŞMA OLURSA NE YAPMALI
═══════════════════════════════════════════════════════════════════

- Git "merge conflict" derse: panik yok. Hangi dosyada olduğuna bak.
- Genelde sebep: iki araca aynı dosya verilmiştir → bir daha yapma.
- Çözüm: `git status` ile çakışan dosyayı gör, doğru sürümü seç, commit et.
- Önlem: HER görevden sonra commit. Aynı anda aynı dosyaya iki araç YOK.
