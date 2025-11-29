FROM node:22-alpine AS builder

WORKDIR /urs/src/app

# Accept build-time variables 
ARG VITE_API_URI
ARG VITE_RAZOR_PAY_KEY
ARG VITE_SUBSCRIPTION_PRICE

# Make them available to the build environment so Vite picks them up
ENV VITE_API_URI=${VITE_API_URI}
ENV VITE_RAZOR_PAY_KEY=${VITE_RAZOR_PAY_KEY}
ENV VITE_SUBSCRIPTION_PRICE=${VITE_SUBSCRIPTION_PRICE}

COPY package.json package-lock.json* ./

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable-alpine AS runner

#Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

#Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /urs/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

