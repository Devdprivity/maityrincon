# Instrucciones de Deploy para Hostinger

## Problema: Vite manifest not found

Este error ocurre porque los assets no están compilados en el servidor.

## Solución Inmediata

### Opción 1: Subir carpeta build manualmente (RÁPIDO)

1. Compila los assets localmente:
   ```bash
   npm run build
   ```

2. Ve al File Manager de Hostinger
3. Navega a: `public_html/public/`
4. Sube la carpeta `build` completa desde tu proyecto local
   - Ruta local: `public/build/`
   - Ruta en Hostinger: `public_html/public/build/`

### Opción 2: Compilar en el servidor (si tienes Node.js)

1. Conecta por SSH a Hostinger
2. Navega al directorio del proyecto:
   ```bash
   cd ~/domains/psicomaityrincon.com/public_html
   ```
3. Instala dependencias (solo la primera vez):
   ```bash
   npm install --production
   ```
4. Compila los assets:
   ```bash
   npm run build
   ```

## Configuración Permanente

### Para que Hostinger compile automáticamente en cada deploy:

1. En el panel de Hostinger, busca la sección de "Deploy Settings" o "Build Commands"
2. Agrega estos comandos en el orden correcto:

```bash
# Instalar dependencias de Node.js
npm install --production

# Compilar assets
npm run build
```

### Nota importante:

- Asegúrate de que Hostinger tenga Node.js disponible
- Si no está disponible, siempre deberás compilar localmente y subir `public/build/`
- La carpeta `public/build/` NO debe estar en `.gitignore` si quieres que se suba automáticamente (pero esto no es recomendado)

## Verificación

Después de subir los archivos, verifica que exista:
- `/public_html/public/build/manifest.json`
- `/public_html/public/build/assets/` (con todos los archivos)

