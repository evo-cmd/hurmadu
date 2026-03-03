FROM alpine:latest

RUN apk add --no-cache dnsmasq bind-tools

COPY check-dns.sh /usr/local/bin/check-dns
RUN chmod +x /usr/local/bin/check-dns

EXPOSE 53/udp 53/tcp

CMD ["dnsmasq", "-k"]
