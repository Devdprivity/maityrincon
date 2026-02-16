#!/bin/bash

# Script de preparación para despliegue en producción
# Ejecutar antes de subir archivos al servidor (Hostinger)

echo "🚀 Iniciando preparación para despliegue..."

# 1. Compilación de Assets (Frontend)
echo "📦 1. Compilando assets de Vite..."
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Build exitoso."
else
    echo "❌ Error en npm run build. Verifica la salida."
    exit 1
fi

# 2. Limpieza de Cachés (Backend)
# Es vital limpiar la caché local para no subir rutas absolutas incorrectas
echo "🧹 2. Limpiando cachés de Laravel..."
php artisan optimize:clear
if [ $? -eq 0 ]; then
    echo "✅ Caché limpiada."
else
    echo "⚠️ Advertencia: 'php artisan optimize:clear' falló o se congeló."
    echo "   Esto puede deberse a que DB_HOST=127.0.0.1 no es accesible localmente con APP_ENV=production."
    echo "   Asegúrate de que no haya archivos en bootstrap/cache/ (excepto .gitignore) antes de subir."
fi

echo "--------------------------------------------------------"
echo "🎉 Preparación local finalizada."
echo "--------------------------------------------------------"
echo "📝 Siguientes pasos:"
echo "1. Sube los archivos al servidor (incluyendo 'public/build')."
echo "2. En el servidor (SSH/Terminal), ejecuta:"
echo "   composer install --optimize-autoloader --no-dev"
echo "   php artisan migrate --force"
echo "   php artisan config:cache"
echo "   php artisan route:cache"
echo "   php artisan view:cache"
echo "--------------------------------------------------------"
