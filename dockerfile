# Use uma imagem oficial do PHP com o Apache
FROM php:8.2-apache

# Instale dependências do sistema e extensões PHP necessárias
RUN apt-get update && apt-get install -y \
    libzip-dev \
    unzip \
    && docker-php-ext-install zip pdo pdo_mysql

# Instale o Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copie os arquivos do Laravel para o container
COPY . /var/www/html

# Defina o diretório de trabalho
WORKDIR /var/www/html

# Instale as dependências do Laravel
RUN composer install

# Dê permissão para a pasta de storage e cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Habilite o mod_rewrite do Apache
RUN a2enmod rewrite

# Copie o arquivo de configuração do Apache
COPY ./nginx.conf /var/www/html/nginx.conf

# Exponha a porta 80
EXPOSE 80

CMD ["php artisan", "serve", "--host=0.0.0.0", "--port=80"]
