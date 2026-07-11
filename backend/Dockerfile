FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    unzip \
    git \
    zip \
    sqlite3 \
    libsqlite3-dev

RUN docker-php-ext-install pdo pdo_sqlite

# Ambil composer dari image resmi
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY composer.json composer.lock ./

RUN composer install --no-interaction --no-plugins --no-scripts --prefer-dist

 COPY . .

# Berikan izin akses (permission) ke folder storage Laravel
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 8000

# Pastikan ada perintah CMD untuk menjalankan server Laravel
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
