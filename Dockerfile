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

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Create .env.production file using build arguments
RUN echo "NEXT_PUBLIC_SUPABASE_API_URL=$NEXT_PUBLIC_SUPABASE_API_URL\n\
NEXT_PUBLIC_SUPABASE_API_KEY=$NEXT_PUBLIC_SUPABASE_API_KEY\n\
AUTH_GOOGLE_ID=$AUTH_GOOGLE_ID\n\
AUTH_SECRET=$AUTH_SECRET\n\
SMTP_USER=$SMTP_USER\n\
SMTP_PASS=$SMTP_PASS\n\
SMTP_HOST=$SMTP_HOST\n\
SMTP_PORT=$SMTP_PORT\n\
AUTH_URL=$AUTH_URL\n\
AUTH_TRUST_HOST=$AUTH_TRUST_HOST\n\
NODE_ENV=production" > .env.production

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.env.production ./.env.production

EXPOSE 3000

CMD ["npm", "run", "start"]