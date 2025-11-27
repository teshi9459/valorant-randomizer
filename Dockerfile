# --- Build/Deps Stage ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# --- Runtime Stage ---
FROM node:20-alpine
ENV NODE_ENV=production
ENV PORT=8080
WORKDIR /app

# Create non-root user
RUN addgroup -S nodegrp && adduser -S nodeusr -G nodegrp
COPY --from=deps /app/node_modules ./node_modules
COPY server.js ./server.js
COPY public ./public

USER nodeusr
EXPOSE 22101
HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
CMD ["node", "server.js"]
