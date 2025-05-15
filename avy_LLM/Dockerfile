# Этап 1: Сборка приложения
# Использование образа Node.js для сборки React приложения
FROM node:21.2.0 as build
LABEL authors="zsvalevsandor"
# Установка рабочей директории в контейнере. Здесь используется та же структура, что и в вашем проекте
WORKDIR /avy-frontend

# Копирование файлов package.json и package-lock.json (или yarn.lock) в /avy-frontend
COPY package*.json ./

# Установка зависимостей
RUN npm install

# Копирование всего остального содержимого директории avy-frontend в /avy-frontend
COPY src ./src
COPY public ./public
COPY .env ./

# Запуск скрипта сборки для создания продакшн-версии приложения
RUN npm run build

# Этап 2: Настройка сервера Nginx для обслуживания собранных файлов
FROM nginx:alpine

# Копирование собранных файлов из /avy-frontend/build в директорию, которую обслуживает Nginx
COPY --from=build /avy-frontend/build /usr/share/nginx/html

# Открытие порта 80
EXPOSE 80

# Запуск Nginx
CMD ["nginx", "-g", "daemon off;"]