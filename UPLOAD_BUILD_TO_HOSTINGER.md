# 📤 Cómo Subir los Assets Compilados a Hostinger

## ⚠️ Problema
El error `Vite manifest not found` ocurre porque la carpeta `public/build/` no está en el servidor de Hostinger.

## ✅ Solución: Subir la carpeta `public/build/`

### Opción 1: Usando File Manager de Hostinger (MÁS FÁCIL)

1. **Ve al File Manager de Hostinger**
   - Accede a tu panel de Hostinger
   - Ve a "File Manager" o "Administrador de Archivos"

2. **Navega a la carpeta correcta**
   - Ve a: `public_html/public/`
   - Si no existe la carpeta `public`, créala primero

3. **Sube la carpeta `build`**
   - En tu computadora local, ve a: `E:\DesarrolloWeb\maityrincon\public\build\`
   - Selecciona TODA la carpeta `build` (incluyendo `manifest.json` y la carpeta `assets/`)
   - Arrástrala o súbela al File Manager de Hostinger en: `public_html/public/`
   - La ruta final debe ser: `public_html/public/build/`

4. **Verifica que se subió correctamente**
   - Debe existir: `public_html/public/build/manifest.json`
   - Debe existir: `public_html/public/build/assets/` (con todos los archivos)

### Opción 2: Usando FTP (FileZilla, WinSCP, etc.)

1. **Conecta por FTP a Hostinger**
   - Host: `ftp.psicomaityrincon.com` (o el que te proporcionó Hostinger)
   - Usuario y contraseña: Los de tu cuenta Hostinger

2. **Navega a la carpeta remota**
   - Ve a: `/public_html/public/`

3. **Sube la carpeta local**
   - Carpeta local: `E:\DesarrolloWeb\maityrincon\public\build\`
   - Sube toda la carpeta `build` con su contenido

### Opción 3: Compilar en el Servidor (si Hostinger tiene Node.js)

Si Hostinger permite ejecutar comandos Node.js:

1. **Conecta por SSH a Hostinger**
2. **Navega al directorio del proyecto:**
   ```bash
   cd ~/domains/psicomaityrincon.com/public_html
   ```

3. **Instala dependencias (solo la primera vez):**
   ```bash
   npm install --production
   ```

4. **Compila los assets:**
   ```bash
   npm run build
   ```

## 📋 Checklist de Verificación

Después de subir, verifica que existan estos archivos en Hostinger:

- ✅ `public_html/public/build/manifest.json`
- ✅ `public_html/public/build/assets/app-*.css`
- ✅ `public_html/public/build/assets/app-*.js`
- ✅ `public_html/public/build/assets/` (con todos los archivos JS y CSS)

## 🔄 Para Futuros Deploys

**Opción A: Compilar localmente y subir**
1. Ejecuta: `npm run build`
2. Sube la carpeta `public/build/` a Hostinger

**Opción B: Configurar build automático en Hostinger**
En la configuración de deploy de Hostinger, agrega:
```bash
npm install --production && npm run build
```

## ⚡ Solución Rápida (Ahora)

1. Abre File Manager de Hostinger
2. Ve a `public_html/public/`
3. Sube la carpeta `build` completa desde: `E:\DesarrolloWeb\maityrincon\public\build\`
4. Espera a que termine la subida
5. Recarga tu sitio web

¡Listo! El error debería desaparecer.

