# DESIGN-SYSTEM.md — Tasarım Sistemi

> Hedef kitle 30+ yaş, teknolojiyle arası sınırlı. "Anneme bile kolay gelmeli."
> Her tasarım kararı bu süzgeçten geçer.

---

## 1. RENK PALETİ (Sadece Açık Mod — D7, D8)

Sıcak & güvenilir his. Yumuşak mavi + yeşil + nötr griler.

| Rol | Renk | Hex | Kullanım |
|---|---|---|---|
| Primary (güven) | Sıcak mavi | `#2563EB` | Ana butonlar, başlıklar, vurgu |
| Primary-hover | Koyu mavi | `#1D4ED8` | Hover/active |
| Success (sonuç) | Yumuşak yeşil | `#10B981` | Sonuç kartı, başarı, onay |
| Background | Beyaz | `#FFFFFF` | Ana arka plan |
| Surface | Açık gri-mavi | `#F8FAFC` | Kartlar, bölümler |
| Border | Açık gri | `#E2E8F0` | Çizgiler, ayraçlar |
| Text-primary | Koyu lacivert | `#0F172A` | Ana metin |
| Text-secondary | Orta gri | `#64748B` | İkincil metin |
| Error | Yumuşak kırmızı | `#EF4444` | Hata mesajları |

Kurallar:
- Bol beyaz boşluk. Sıkışık tasarım yasak.
- Yüksek kontrast (WCAG AA minimum, AAA hedef).
- Renk tek başına bilgi taşımaz (renk körlüğü); ikon/metin ile desteklenir.

---

## 2. TİPOGRAFİ

- **Taban font boyutu: 18px** (16 değil — yaşlı kullanıcı için).
- Font: Inter veya sistem fontu (hızlı yükleme).
- Başlık hiyerarşisi net: h1 > h2 > h3 belirgin boyut farkıyla.
- Satır yüksekliği rahat (1.6).
- Sonuç sayısı **çok büyük** (örn. 48px+), kaçırılması imkansız.
- Tüm metin seçilebilir/kopyalanabilir (sonuç dahil).

---

## 3. DOKUNMA & ETKİLEŞİM

- Minimum dokunma hedefi: **48x48px**.
- Butonlar arası yeterli boşluk (yanlış dokunmayı önler).
- Ana eylem butonu büyük, renkli, ekranda öne çıkar ("Hesapla").
- Sayı girişleri `inputMode="decimal"` / `type="number"` → mobilde sayı klavyesi.
- Haptic feedback (titreşim) destekleniyorsa kullan (hesapla anında hafif).
- Hover durumları masaüstü için; dokunmatik için active/pressed durumları net.

---

## 4. LAYOUT & APP-LIKE HİSSİ (D10, D12)

- **Mobile-first.** Tasarım önce 360-400px genişlikte çalışır.
- **Mobil alt navigasyon (BottomNav):** Sabit, 4 sekme:
  Ana Sayfa / Kategoriler / Kayıtlarım / Favoriler. Büyük ikon + etiket.
- **Masaüstü:** Üst header + içerik ortada (max-width ~720px hesaplayıcı için).
  Geniş ekranda yan reklam alanı olabilir.
- **Safe area:** `env(safe-area-inset-*)` ile çentikli telefon desteği.
- **PWA standalone:** Tarayıcı çubuğu olmadan tam ekran açılır.
- **Geçişler:** Sayfa geçişleri yumuşak, native app hissi (View Transitions API).

---

## 5. HESAPLAYICI EKRAN DÜZENİ (standart)

Yukarıdan aşağı:
1. Başlık + kısa açıklama (1 cümle)
2. Girdi alanları (büyük, etiketli, gruplu)
3. Büyük "Hesapla" butonu
4. **Sonuç kartı** (yeşil vurgu, devasa sayı)
5. (varsa) Kaydet butonu + favori ikonu
6. Reklam alanı (sonuçtan SONRA — hesaplama alanına asla)
7. Açıklayıcı içerik + SSS (scroll ile)

---

## 6. ERİŞİLEBİLİRLİK (Zorunlu)

- Lighthouse Accessibility skoru: **100 hedef**.
- Tüm etkileşimli öğeler klavyeyle erişilebilir.
- ARIA etiketleri, anlamlı `alt` metinleri.
- Form hataları açık, ekran okuyucu uyumlu.
- Odak (focus) görünür ve net.
- Dil değişiminde `lang` attribute güncellenir.

---

## 7. İKONLAR

- Kategori ve hesaplayıcı ikonları büyük, net, evrensel anlaşılır.
- Lucide ikon seti (tutarlı, açık kaynak).
- İkon + her zaman metin etiket (sadece ikon yasak — yaşlı kullanıcı).

---

## 8. YAPMA LİSTESİ (Anti-patterns)

- ❌ Küçük yazı, sıkışık layout
- ❌ Sadece ikon, etiketsiz buton
- ❌ Hesaplama alanına reklam
- ❌ Karmaşık çok adımlı sihirbazlar (mümkünse tek ekran)
- ❌ Otomatik açılan pop-up'lar (install promptu hariç, o da nazik)
- ❌ Koyu mod (Faz 1'de yok)
- ❌ Gereksiz animasyon/dikkat dağıtıcı öğeler
