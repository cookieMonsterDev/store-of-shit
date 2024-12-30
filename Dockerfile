FROM python:3.13.1-alpine AS builder
WORKDIR /app
COPY requirements.txt .
RUN apk add --no-cache --virtual .build-deps gcc musl-dev python3-dev \
    && pip install --no-cache-dir -r requirements.txt \
    && apk del .build-deps
COPY . .
RUN python ./main.py

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /app/output_dir . 
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

