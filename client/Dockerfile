# ---------- Build Stage ----------
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---------- Runtime Stage ----------
FROM nginx:stable-alpine AS runner

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built frontend
COPY --from=builder /app/dist /usr/share/nginx/html

# COPY placeholder env.js (empty or dummy)
RUN echo "window._env_ = {};" > /usr/share/nginx/html/env.js

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]





# FROM node:22-alpine AS builder

# WORKDIR /urs/src/app

# ARG VITE_API_URI
# ARG VITE_RAZOR_PAY_KEY
# ARG VITE_SUBSCRIPTION_PRICE

# ENV VITE_API_URI=${VITE_API_URI}
# ENV VITE_RAZOR_PAY_KEY=${VITE_RAZOR_PAY_KEY}
# ENV VITE_SUBSCRIPTION_PRICE=${VITE_SUBSCRIPTION_PRICE}

# COPY package.json package-lock.json* ./

# RUN npm ci

# COPY . .

# RUN npm run build

# FROM nginx:stable-alpine AS runner

# #Remove default nginx static files
# RUN rm -rf /usr/share/nginx/html/*

# #Copy custom nginx config
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=builder /urs/src/app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD ["nginx","-g","daemon off;"]

