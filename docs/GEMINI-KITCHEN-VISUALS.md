# Gemini Görevi: Mutfak Ölçü Görselleri

> **Hedef kitle:** Claude Code bu dosyayı okumaz, bu dosya yalnızca Gemini CLI içindir.
> Bu görev tamamen `public/images/kitchen/` klasörüne SVG dosyaları oluşturmaktır.
> Kod dosyalarına (`src/**`) dokunma.

---

## Genel Stil Rehberi

Bu görseller `/mutfak/olcu-birimi-donusturucu` sayfasında kullanılacaktır.

- **Renk paleti:**
  - Arkaplan: `#F8FAFC` (açık gri)
  - Çizgi/kenar: `#E2E8F0`
  - Vurgu mavi: `#2563EB`
  - Koyu metin: `#0F172A`
  - Orta gri: `#64748B`
- **Stil:** Düz (flat) illüstrasyon, ince çizgiler, yuvarlak köşeler. Minimalist ama sıcak.
- **Font:** SVG içinde font kullanılacaksa `system-ui, sans-serif`. Her iki dilde de anlaşılır olması için Türkçe etiketler kullan.

---

## Görev 1: Ana Ölçü Cetveli — `olcu-cetveli.svg`

**Dosya:** `public/images/kitchen/olcu-cetveli.svg`
**Boyut:** 600×320px viewBox

### Görselin İçeriği

Yatay bir "cetvel" şeklinde, soldaki en küçük ölçü biriminden sağdaki en büyüğüne doğru ilerleme gösteren çizimli karşılaştırma.

```
Soldan sağa sıralama (boyutla orantılı):

[Çay Kaşığı]  [Tatlı Kaşığı]  [Yemek Kaşığı]  [Çay Bardağı]  [Su Bardağı]  [½ Litre]  [1 Litre]
    5ml             10ml            15ml             100ml          200ml         500ml      1000ml
```

### Her birim için çizim:

1. **Çay Kaşığı (5ml)** — küçük ovalin içi dolu kaşık çizimi
2. **Tatlı Kaşığı (10ml)** — biraz daha büyük kaşık
3. **Yemek Kaşığı (15ml)** — servis kaşığı, belirgin yuvarlak kafa
4. **Çay Bardağı (100ml)** — ince uzun Türk çay bardağı (bilye şeklinde)
5. **Su Bardağı (200ml)** — standart silindirik bardak
6. **½ Litre (500ml)** — dolu yarı su şişesi veya büyük bardak
7. **1 Litre (1000ml)** — litre kap

### Her birimin altında gösterilecek etiket:
- İsim: kalın, `#0F172A`
- ml değeri: küçük, `#64748B`
- Orantılı büyüklük: her çizim gerçek hacmine orantılı küçük/büyük olsun

### Oranlı dolum çizgisi:
Tüm kap çizimlerinin yanına veya altına, maksimum 1 litre baz alınarak orantılı mavi dolum çubuğu ekle.

---

## Görev 2: Eşdeğerlik Tablosu Görseli — `esdeğerlik.svg`

**Dosya:** `public/images/kitchen/esdegerlik.svg`
**Boyut:** 600×400px viewBox

### Görselin İçeriği

"1 Su Bardağı kaç tane?" sorusunu görsel olarak yanıtlayan tablo:

```
┌─────────────────────────────────────────────────────────┐
│  🥤 1 Su Bardağı (200ml) =                              │
├─────────────────────────────────────────────────────────┤
│  ☕  2 Çay Bardağı          [iki çay bardağı çizimi]    │
│  🥄  13⅓ Yemek Kaşığı      [kaşık simgeleri satırı]    │
│  🥄  20 Tatlı Kaşığı        [kaşık simgeleri satırı]    │
│  🫖  40 Çay Kaşığı          [kaşık simgeleri satırı]    │
│  💧  200 ml                                              │
└─────────────────────────────────────────────────────────┘
```

Kaşık simgeleri satırında, kaşıkları tek tek sıralama yerine "×13" gibi çarpma gösterimi kullan ve bir örnek kaşık çizimi ekle.

**Sol kenar:** Büyük su bardağı çizimi (ölçü çizgileriyle, yarı dolu görünüm)
**Arkaplan rengi:** `#F8FAFC`, çerçeve: `#E2E8F0` 2px
**Başlık arkaplanı:** `#EFF6FF` (açık mavi), başlık metni: `#2563EB`

---

## Görev 3: Malzeme Gramaj Tablosu — `malzeme-gramaj.svg`

**Dosya:** `public/images/kitchen/malzeme-gramaj.svg`
**Boyut:** 600×360px viewBox

### Görselin İçeriği

"1 Su Bardağı = kaç gram?" tablosu, en sık kullanılan 8 malzeme için:

| Malzeme | 1 Su Bardağı |
|---------|-------------|
| Su | 200 g |
| Süt | 206 g |
| Un | 120 g |
| Şeker | 170 g |
| Pudra Şekeri | 112 g |
| Tuz | 240 g |
| Tereyağı | 182 g |
| Pirinç | 170 g |

### Görsel format:
- Her satır: ikon (emoji veya basit çizim) + malzeme adı + yatay bar grafik + gram değeri
- Bar grafiğinde maksimum değer (Tuz: 240g) = tam genişlik
- Bar rengi: `#2563EB` (mavi), arka plan: `#E2E8F0`
- Satır arkaplanları dönüşümlü: `#FFFFFF` ve `#F8FAFC`

---

## Görev 4: Kaşık Boyutları Detay Görseli — `kasik-boyutlari.svg`

**Dosya:** `public/images/kitchen/kasik-boyutlari.svg`
**Boyut:** 400×200px viewBox

### Görselin İçeriği

Yan yana 3 kaşık çizimi (gerçekçi oran):

```
[Çay Kaşığı]   [Tatlı Kaşığı]   [Yemek Kaşığı]
    5ml              10ml              15ml
    ████             ████████          ████████████
    (en küçük)       (orta)            (en büyük)
```

- Kaşıkların kafa kısmı oval, sap kısmı ince çizgi
- Altında ml etiketi
- Altında orantılı mavi dolum çubuğu
- Arka plan: beyaz, ince `#E2E8F0` çerçeve

---

## Teknik Gereksinimler

- Tüm dosyalar geçerli SVG XML olmalı
- `xmlns="http://www.w3.org/2000/svg"` attribute zorunlu
- Her SVG'de `viewBox` tanımlanmış olmalı, `width`/`height` belirtilmemeli (responsive)
- Erişilebilirlik: `<title>` ve `<desc>` tag'leri ekle
- Dosya boyutu: her SVG maksimum 30KB (optimize edilmiş, gereksiz boşluk olmadan)

## Çıktı Dizini

```
public/images/kitchen/
├── olcu-cetveli.svg      ← Görev 1 (sayfada zaten referans ediliyor)
├── esdegerlik.svg        ← Görev 2
├── malzeme-gramaj.svg    ← Görev 3
└── kasik-boyutlari.svg   ← Görev 4
```

## Önemli Not

`public/images/kitchen/olcu-cetveli.svg` dosyası halihazırda `src/app/[locale]/mutfak/olcu-birimi-donusturucu/page.tsx` içinde referans ediliyor. Bu dosya oluşturulmadan sayfa bir kırık resim gösterecektir. **Önce bu dosyayı tamamla.**
