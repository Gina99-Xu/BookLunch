FROM node:18-alpine AS builder
WORKDIR /app

# Define build arguments for secrets
ARG NEXT_PUBLIC_SUPABASE_API_URL
ARG NEXT_PUBLIC_SUPABASE_API_KEY
ARG AUTH_GOOGLE_ID
ARG AUTH_SECRET
ARG SMTP_USER
ARG SMTP_PASS
ARG SMTP_HOST
ARG SMTP_PORT
ARG AUTH_URL
ARG AUTH_TRUST_HOST

# Copy package files first for better caching
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source files
COPY . .

# Create public directory if it doesn't exist
RUN mkdir -p public

# Build the application
RUN npm run build

# Production image
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only necessary files from builder
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Create public directory in the runner stage
RUN mkdir -p public

# Copy public directory if it exists (won't fail if empty)
COPY --from=builder /app/public ./public


EXPOSE 3000

# Use the standalone output from Next.js
CMD ["npm", "run", "start"]