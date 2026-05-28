# PWA.md — Progressive Web App, Çevrimdışı, Ana Ekrana Ekleme

> Hedef: Web sitesi yüklemeden uygulama gibi hissettirsin. Kullanıcı (özellikle
> Android) sık kullandığı hesaplayıcıyı ana ekrana kestirme olarak eklesin.

---

## 1. ANDROID WIDGET — NET GERÇEK (D13)

**Gerçek Android ana ekran widget'ı (canlı bilgi kutusu) PWA ile YAPILAMAZ.**
Bu özellik sadece native uygulamalara (Play Store / React Native / Kotlin) özeldir.
Bu bir tarayıcı/işletim sistemi sınırıdır, kod ile aşılamaz.

PWA ile yapılabilen ve kullanıcı deneyimi olarak çok yakın olan şeyler:
- **Ana ekrana kısayol:** Her hesaplayıcının ikonu ana ekrana eklenir,
  tıklayınca direkt o hesaplayıcı tam ekran açılır.
- **App Shortcuts:** PWA ikonuna uzun basınca hızlı kısayol menüsü.
- **PWA Widgets:** Deneysel; bazı yeni cihazlarda çalışır, garanti yok.

İleride gerçek widget kesin gerekirse → React Native companion app (Faz 4+).

---

## 2. PWA TEMELLERİ

- **Serwist** ile service worker.
- **manifest.ts:** isim, kısa isim, ikonlar (tüm boyutlar: 192, 512, maskable),
  `display: standalone`, tema rengi (#2563EB), arka plan rengi.
- Standalone modda açılır → tarayıcı çubuğu yok, tam ekran, uygulama hissi.
- Yüklenebilir olmalı (Chrome "Uygulamayı yükle" çıkarır).

---

## 3. APP SHORTCUTS (manifest)

Manifest'e en popüler hesaplayıcılar shortcut olarak eklenir:
```
shortcuts: [
  { name: "Kalori Hesapla", url: "/tr/saglik/kalori-hesaplayici", icons:[...] },
  { name: "KDV Hesapla",   url: "/tr/para/kdv-hesaplayici", icons:[...] },
  { name: "Örgü Maliyet",  url: "/tr/el-sanatlari/orgu-maliyet-hesaplayici" },
]
```
Kullanıcı PWA ikonuna uzun basınca bu kısayollar çıkar (widget'a en yakın deneyim).

---

## 4. ÇEVRİMDIŞI ÇALIŞMA (D12)

- Hesaplayıcı mantığı tamamen istemcide → internet olmadan çalışır.
- Serwist ile uygulama kabuğu (app shell) ve ziyaret edilen hesaplayıcılar
  önbelleğe alınır.
- Çevrimdışıyken: ziyaret edilmiş hesaplayıcılar tam çalışır; ziyaret
  edilmemişler için nazik bir "çevrimdışısınız" sayfası.
- Kullanıcı verisi (IndexedDB) zaten çevrimdışı erişilebilir.
- Strateji: statik varlıklar için cache-first, sayfalar için
  stale-while-revalidate.

---

## 5. "ANA EKRANA EKLE" TEŞVİKİ

Hedef kitle teknolojiden anlamadığı için bu deneyim çok nazik ve rehberli olmalı.

- **InstallPrompt:** Akıllı zamanlama — kullanıcıyı ilk saniyede rahatsız etme.
  2. ziyarette veya bir hesaplama tamamlandıktan sonra nazikçe göster.
- **Platform-bilinçli (PlatformGuide):**
  - Android/Chrome: native `beforeinstallprompt` yakalanır, tek tık yükleme.
  - iOS/Safari: native prompt yok → görsel rehber ("Paylaş → Ana Ekrana Ekle").
  - Masaüstü: adres çubuğundaki yükle ikonunu işaret et.
- Her hesaplayıcı sayfasında küçük, kapatılabilir bir "Bu hesaplayıcıyı ana
  ekrana ekle" ipucu.
- Reddedilirse ısrar etme (rahatsız edici değil).

---

## 6. APP-LIKE DETAYLAR

- View Transitions API ile yumuşak sayfa geçişleri.
- Safe area insets (çentikli ekran).
- Tema rengi status bar ile uyumlu.
- Pull-to-refresh davranışı kontrollü.
- Splash screen (manifest'ten otomatik).
- BottomNav standalone modda native alt nav gibi davranır.

---

## 7. KONTROL LİSTESİ

- [ ] Manifest geçerli (Lighthouse PWA denetimi)
- [ ] Yüklenebilir (Chrome install prompt çıkıyor)
- [ ] Standalone modda tarayıcı çubuğu yok
- [ ] Çevrimdışı: ziyaret edilen hesaplayıcı çalışıyor
- [ ] App Shortcuts uzun basmada görünüyor (Android)
- [ ] iOS rehberi doğru gösteriliyor
- [ ] İkonlar tüm boyutlarda + maskable mevcut
- [ ] Install prompt nazik zamanlamada, ısrarcı değil
