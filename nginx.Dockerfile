web-app/nginx.Dockerfile

FROM duluca/minimal-nginx-web-server:1-alphine

COPY dist/lemon-mart /var/www

CMD 'nginx'
