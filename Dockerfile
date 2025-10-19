# Stable Node base
FROM node:20-bullseye

WORKDIR /app

# Helpful envs for CI-like, deterministic behavior
ENV CI=1
ENV NPM_CONFIG_FUND=false
ENV NPM_CONFIG_AUDIT=false
ENV UV_THREADPOOL_SIZE=1

# System deps that Playwright may rely on (fonts, etc.)
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    fonts-liberation \
    libatk-bridge2.0-0 \
    libnss3 \
    libgtk-3-0 \
    libx11-xcb1 \
    libdrm2 \
    libgbm1 \
    libasound2 \
    && rm -rf /var/lib/apt/lists/*

# Copy manifests and install deps
COPY package.json package-lock.json* ./
RUN npm ci --foreground-scripts --no-audit --no-fund

# Install Playwright browsers + OS deps in image
# (chromium is enough for your tests; use 'npx playwright install --with-deps' for all)
RUN npx playwright install --with-deps chromium

# Copy the rest of your project
COPY . .

# Default command: run your specified feature
CMD ["npx", "cucumber-js"]


