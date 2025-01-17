# NGINX

Nginx - is an HTTP web server, reverse proxy, content cache, load balancer, TCP/UDP proxy server, and mail proxy server.

#  Quick start (linux debian)

1. Install nginx

```bash
sudo apt-get install nginx
```

2. Open configs

```bash
cd /etc/nginx
```

3. Create nginx config e.g:

```nginx
events {}

http {
  server {     
    listen 1234;

    server_name example.ubuntu.com;

    root /home;
    index index.html;

    location / {
      try_files $uri $uri/ =404;
    }     
  }
}
```

4. Run the nginx server

```bash
sudo systemctl restart nginx
```

# Load Balancer

# Cache