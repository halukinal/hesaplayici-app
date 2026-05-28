# BURADAN BAŞLA — Hızlı Kılavuz

Merhaba! Bu paket, hesaplama PWA projeni VS Code'da Gemini CLI veya Claude Code
ile sıfırdan kurman için gereken her şeyi içerir.

## DOSYALAR NE İŞE YARAR?

| Dosya | Ne işe yarar |
|---|---|
| `BURADAN-BASLA.md` | Bu dosya — ilk okuyacağın |
| `WORKFLOW.md` | ⭐ ASIL DOSYA: adım adım ne yapacağın + kopyalayıp yapıştıracağın komutlar |
| `AGENTS.md` | Ajan kuralları (genel) |
| `CLAUDE.md` | Claude Code'un otomatik okuduğu kurallar (AGENTS ile aynı) |
| `GEMINI.md` | Gemini CLI'nin otomatik okuduğu kurallar (AGENTS ile aynı) |
| `docs/` | Detaylı referans (mimari, tasarım, güvenlik, SEO, PWA, hesaplayıcı reçetesi) |

## 3 ADIMDA BAŞLA

### 1) Proje klasörünü kur
```bash
mkdir hesaplayici-app && cd hesaplayici-app
git init
```

### 2) Bu paketteki TÜM dosyaları bu klasöre kopyala
Şöyle görünmeli:
```
hesapla-projesi/
├── AGENTS.md
├── CLAUDE.md
├── GEMINI.md
├── WORKFLOW.md
├── BURADAN-BASLA.md
└── docs/
    ├── ARCHITECTURE.md
    ├── CALCULATOR-RECIPE.md
    ├── DESIGN-SYSTEM.md
    ├── PWA.md
    ├── SECURITY.md
    └── SEO-GEO.md
```

### 3) CLI'yı aç ve WORKFLOW.md'yi takip et
```bash
# Claude Code için:
npm install -g @anthropic-ai/claude-code
claude

# VEYA Gemini CLI için:
npm install -g @google/gemini-cli
gemini
```

Sonra `WORKFLOW.md` dosyasını aç, "ADIM 0"dan başla. Her adımdaki PROMPT
bloğunu kopyalayıp CLI'ya yapıştır. Bir adım bitmeden sonrakine geçme.

## EN ÖNEMLİ KURAL

Ajana ASLA "tüm projeyi yap" deme. Her seferinde TEK adım ver, çıktıyı kontrol
et, sonra devam et. Bu, kaliteli ve hatasız kod için en kritik alışkanlık.

## SIRA ÖZETİ

1. ADIM 0 → Boş PWA iskeleti
2. ADIM 1 → KDV hesaplayıcı (şablon)
3. ADIM 2 → Kalori/BMI (geçmiş + grafik)
4. ADIM 3 → Örgü maliyet (niş, kapsamlı)
5. ADIM 4 → Yasal + güvenlik + SEO (yayın hazırlığı)
6. ADIM 5 → Vercel'e deploy
7. Sonra → Haftada 2-3 yeni hesaplayıcı (aynı kalıp)

## İSİM / DOMAIN

Şimdilik geçici ad: "hesapla-projesi". Marka ismi koda gömülü DEĞİL.
İsme sonra karar verince: domain al → Vercel'de bağla → manifest.ts'teki
isim ve URL'leri güncelle. Tek konfigürasyon, 10 dakikalık iş.

Kolay gelsin! Takıldığın yerde kodu Claude'a (sohbete) yapıştır,
review-agent gözüyle bakar.
