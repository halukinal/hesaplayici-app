# ============================================================================
# Dockerfile — Üretim (production) için optimize edilmiş çok aşamalı build
# Next.js 15 standalone output kullanır. Küçük, güvenli, hızlı imaj üretir.
# Bu dosya proje KÖKÜNE konur (calc-pwa/Dockerfile).
# ============================================================================

# ---- AŞAMA 0: Temel imaj ----
FROM node:22-alpine AS base
# Alpine'de bazı native modüllerin çalışması için gerekli
RUN apk add --no-cache libc6-compat
ENV NEXT_TELEMETRY_DISABLED=1

# ---- AŞAMA 1: Bağımlılıklar ----
FROM base AS deps
WORKDIR /app
# Önce sadece bağımlılık dosyalarını kopyala (Docker layer cache için)
COPY package.json package-lock.json* ./
RUN npm ci

# ---- AŞAMA 2: Build ----
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# next.config'de output: 'standalone' AÇIK OLMALI (bkz. ROLLER/NOTLAR)
RUN npm run build

# ---- AŞAMA 3: Çalışma (runner) — son, küçük imaj ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Güvenlik: root olmayan kullanıcı oluştur ve onunla çalış
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

# Sadece çalışması için gereken dosyaları kopyala (standalone sayesinde minik)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Standalone modun ürettiği sunucu
CMD ["node", "server.js"]
