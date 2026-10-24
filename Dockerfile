ARG IMAGE
FROM ${IMAGE}
RUN apk add --no-cache --upgrade 'nodejs>=24.22.1-r0' 'brotli-libs>=1.2.1-r0'
