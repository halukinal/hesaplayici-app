# SECURITY.md — Güvenlik ve Gizlilik

> Bu sitede kullanıcı girişi, ödeme, kişisel veri toplama YOK (Faz 1).
> "Çok ciddi güvenlik" burada şu anlama gelir: girdi güvenliği, gizlilik-öncelikli
> mimari, KVKK/GDPR uyumu ve ileride eklenecek AI endpoint'inin korunması.

---

## 1. GİZLİLİK-ÖNCELİKLİ MİMARİ (D1)

- **Hiçbir kişisel veri sunucuda tutulmaz.** Tüm kullanıcı verisi (kalori
  geçmişi, favoriler, kayıtlar) cihazda IndexedDB/localStorage'da kalır.
- **IP adresi saklanmaz** (KVKK'da kişisel veri + güvenilmez kimliklendirme).
- Sunucu tarafı veritabanı yok → veri sızıntısı riski yok.
- Kullanıcı verisini istediği an cihazından temizleyebilir (ayar + buton).

---

## 2. GİRDİ GÜVENLİĞİ

- **Tüm girdiler Zod ile doğrulanır.** Sayı bekleniyorsa sadece geçerli sayı.
- Min/max sınırları, tip kontrolü, mantıksız değer reddi.
- `dangerouslySetInnerHTML` **YASAK** (XSS önleme).
- Kullanıcı girdisi asla doğrudan DOM'a/HTML'e enjekte edilmez.
- React'in varsayılan kaçışına güven; bypass etme.

---

## 3. HTTP GÜVENLİK BAŞLIKLARI

`next.config` içinde tanımlanır:
- `Content-Security-Policy` (script/style kaynaklarını kısıtla; AdSense ve
  analitik domain'lerine izin ver, başka her şeyi engelle).
- `Strict-Transport-Security` (HTTPS zorla).
- `X-Frame-Options: DENY` (clickjacking önleme).
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` (gereksiz API'leri kapat).
Vercel çoğunu kolaylaştırır; CSP'yi AdSense/GA için dikkatli yapılandır.

---

## 4. KVKK / GDPR UYUMU

- **Çerez onay banner'ı (CookieBanner):** AdSense ve analitik çerezleri için
  açık rıza. IAB TCF v2.2 uyumlu olmalı (AdSense gereği).
- Rıza alınmadan reklam/analitik çerezi yüklenmez.
- **Yasal sayfalar (zorunlu):** Gizlilik Politikası, Kullanım Şartları,
  Çerez Politikası, KVKK Aydınlatma Metni, İletişim.
- Veri sende olmadığı için VERBİS kaydı muhtemelen gerekmez; yine de yasal
  metinler eksiksiz olmalı. (Mail toplama eklenirse durum değişir → o zaman
  aydınlatma + açık rıza + silme hakkı süreçleri gerekir.)

---

## 5. SORUMLULUK REDLERİ (Yasal Koruma)

- Sağlık hesaplayıcıları: "Bu sonuç tıbbi tavsiye değildir, doktorunuza
  danışın."
- Finans hesaplayıcıları: "Bu sonuç yatırım/mali tavsiye değildir."
- Vergi/resmi hesaplar: "Resmi işlemler için yetkili kuruma danışın;
  formül {kaynak} tarihli mevzuata göredir."
- Hesaplama doğruluğu için "olabildiğince doğru, garanti verilmez" notu.

---

## 6. BAĞIMLILIK GÜVENLİĞİ

- `npm audit` düzenli çalıştırılır; yüksek/kritik açıklar kapatılır.
- GitHub Dependabot açık.
- Minimum bağımlılık prensibi; gereksiz paket eklenmez.
- Paketler güvenilir/bakımlı olmalı.

---

## 7. İLERİDE: AI ENDPOINT GÜVENLİĞİ (Faz 4)

AI yardımcı eklendiğinde (server-side API):
- **Rate limiting:** IP/fingerprint başına istek limiti (örn. Upstash Redis).
- **Günlük kota:** Kullanıcı başına günlük 5-10 sorgu (maliyet kontrolü).
- **Girdi/çıktı filtreleme:** Prompt injection ve kötüye kullanıma karşı.
- **API anahtarı sadece sunucuda:** İstemciye asla sızdırılmaz.
- **Maliyet alarmı:** Beklenmedik kullanımda uyarı.
- En ucuz model (Gemini Flash / Claude Haiku) ile başla.

---

## 8. GÜVENLİK KONTROL LİSTESİ (her yayın öncesi)

- [ ] Tüm formlarda Zod doğrulaması aktif
- [ ] CSP ve güvenlik başlıkları çalışıyor (securityheaders.com testi)
- [ ] HTTPS zorlanıyor
- [ ] Cookie banner rıza olmadan çerez yüklemiyor
- [ ] Tüm yasal sayfalar mevcut ve güncel
- [ ] Sorumluluk redleri ilgili hesaplayıcılarda var
- [ ] `npm audit` temiz
- [ ] Hiçbir API anahtarı/sır client bundle'da değil
- [ ] dangerouslySetInnerHTML kullanımı yok
