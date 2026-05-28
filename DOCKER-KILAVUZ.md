# DOCKER-KILAVUZ.md — Docker Kurulumu ve Sunucuya Geçiş

> Amaç: Site her ortamda (senin bilgisayarın, Vercel, herhangi bir VPS) aynı
> şekilde çalışsın. Bu kılavuz hem Docker'ı doğru kurmanı hem de ileride
> sunucuya sorunsuz taşımanı sağlar.

═══════════════════════════════════════════════════════════════════
## ÖNEMLİ: VERCEL Mİ, KENDİ SUNUCUN MU?
═══════════════════════════════════════════════════════════════════

Bu kurulum HER İKİSİNE de hazırdır:
- **Vercel'e push edersen:** Vercel Docker dosyalarını GÖRMEZDEN gelir, kendi
  sistemiyle deploy eder. Docker dosyaları repo'da zararsız bekler.
- **Kendi VPS'ine geçersen:** Docker dosyaları hazırdır, tek komutla çalışır.

Yani Docker eklemek Vercel'i engellemez. İki kapı da açık kalır. ✅

═══════════════════════════════════════════════════════════════════
## DOSYALARIN YERİ (proje köküne taşınır)
═══════════════════════════════════════════════════════════════════

Bu paketteki `docker/` klasöründeki dosyaları proje KÖKÜNE taşı:
```
calc-pwa/
├── Dockerfile              (docker/Dockerfile buraya)
├── Dockerfile.dev          (docker/Dockerfile.dev buraya)
├── docker-compose.yml      (docker/docker-compose.yml buraya)
├── .dockerignore           (docker/.dockerignore buraya)
├── next.config.ts          (AŞAĞIDAKİ AYAR EKLENMELİ)
└── ...
```

═══════════════════════════════════════════════════════════════════
## KRİTİK AYAR: next.config'de "standalone" (ZORUNLU)
═══════════════════════════════════════════════════════════════════

Dockerfile'ın çalışması için next.config dosyasına şu satır EKLENMELİ.
Bu olmadan Docker imajı devasa olur veya `server.js` bulunamaz hatası verir.

next.config.ts içinde:
```ts
const nextConfig = {
  output: 'standalone',   // <-- Docker için ZORUNLU
  // ... diğer ayarların (i18n, vb.)
};
```

Bu ayar Vercel'e zarar VERMEZ (Vercel görmezden gelir). Yani her zaman açık kalabilir.

═══════════════════════════════════════════════════════════════════
## ORTAM DEĞİŞKENLERİ (.env dosyaları)
═══════════════════════════════════════════════════════════════════

Proje kökünde şu dosyalar olmalı (ASLA git'e gönderilmez — .gitignore'da):
- `.env.local` — geliştirme için (senin bilgisayarın)
- `.env.production` — üretim için (sunucu)

Örnek bir `.env.example` (bunu git'e koyabilirsin, içi sırsız):
```
# Genel
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Analitik (sonra doldurulacak)
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_CLARITY_ID=

# AdSense (sonra doldurulacak)
NEXT_PUBLIC_ADSENSE_ID=

# İleride AI eklersen (sırlar — sadece sunucuda, public DEĞİL)
# AI_API_KEY=
```

KURAL: `NEXT_PUBLIC_` ile başlayanlar tarayıcıya gider (sır OLMAMALI).
Sırlar (API anahtarları) `NEXT_PUBLIC_` OLMADAN, sadece sunucuda kalır.

═══════════════════════════════════════════════════════════════════
## GÜNLÜK KULLANIM KOMUTLARI
═══════════════════════════════════════════════════════════════════

Geliştirme (hot-reload, kod değişince yenilenir):
```bash
docker compose up dev
# tarayıcı: http://localhost:3000
```

Üretim imajını yerelde test et (sunucuya gitmeden önce):
```bash
docker compose up prod --build
# tarayıcı: http://localhost:3000
```

Durdur:
```bash
docker compose down
```

Sadece imaj build et (test için):
```bash
docker build -t calc-pwa .
```

═══════════════════════════════════════════════════════════════════
## SUNUCUYA GEÇİŞ KONTROL LİSTESİ (ileride VPS'e geçince)
═══════════════════════════════════════════════════════════════════

VPS aldığında (Hetzner, DigitalOcean, Contabo vb.):

1. [ ] Sunucuya Docker ve Docker Compose kur.
2. [ ] Projeyi sunucuya çek: `git clone <repo>` veya dosyaları kopyala.
3. [ ] `.env.production` dosyasını sunucuda oluştur (sırları gir).
       NOT: Bu dosya git'te OLMADIĞI için elle oluşturman gerekir.
4. [ ] `docker compose up prod --build -d` ile başlat (-d = arka planda).
5. [ ] Reverse proxy kur: **Caddy** (en kolay, otomatik HTTPS) veya Nginx.
       Caddy domaini görür görmez ücretsiz SSL sertifikası alır.
6. [ ] Domaini sunucunun IP'sine yönlendir (DNS A kaydı).
7. [ ] Güvenlik duvarı (firewall): sadece 80, 443 ve SSH portları açık.
8. [ ] Otomatik yeniden başlatma: compose'da `restart: unless-stopped` zaten var.
9. [ ] Yedekleme: kullanıcı verisi cihazda olduğu için sunucuda kritik veri yok,
       ama yine de kod/config yedeği al (git zaten yedek).
10.[ ] İzleme: basit bir uptime kontrolü (UptimeRobot ücretsiz).

═══════════════════════════════════════════════════════════════════
## REVERSE PROXY: CADDY ÖRNEĞİ (en kolay HTTPS)
═══════════════════════════════════════════════════════════════════

İleride lazım olunca, sunucuda bir `Caddyfile`:
```
senin-domainin.com {
    reverse_proxy localhost:3000
}
```
Caddy gerisini (HTTPS sertifikası dahil) otomatik halleder. Domain kararı
verince bunu eklersin.

═══════════════════════════════════════════════════════════════════
## İLERİDE AI MODELİ (hazır altyapı)
═══════════════════════════════════════════════════════════════════

docker-compose.yml içinde yorum satırı olarak Ollama servisi örneği bıraktım.
Kendi modelini çalıştırmak istersen o bloğu açarsın. AMA hatırlatma:
- Kendi model çalıştırmak GPU ister, VPS maliyeti ciddi artar (aylık 200$+).
- Başlangıçta API (Gemini Flash / Claude Haiku) çok daha ucuz ve kolay.
- Bu yüzden AI'ı Faz 4'e bırak, altyapı hazır beklesin.

═══════════════════════════════════════════════════════════════════
## ÖZET: ŞİMDİ NE EKLENMELİ?
═══════════════════════════════════════════════════════════════════

Ajana (Claude Code) verilecek görev:
1. docker/ klasöründeki 4 dosyayı proje köküne taşı.
2. next.config'e `output: 'standalone'` ekle.
3. `.env.example` oluştur, `.gitignore`'a .env dosyalarını ekle.
4. `docker compose up dev` ile çalıştığını doğrula.

Bu kadarı bugün için yeterli. Geri kalanı (reverse proxy, VPS) domain ve
hosting kararı verince yapılır.
