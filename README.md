# Helados York Santiago — Mockup

Mockup visual estático para **Helados York Santiago** — venta de paletas artesanales al detalle y por mayor, con despacho en Santiago RM y zona norte de Chile.

> ⚠️ Este es un mockup visual. No hay backend, ni pagos reales, ni base de datos. Todos los "pedidos" abren WhatsApp con un mensaje pre-armado.

**Contacto del negocio:** WhatsApp +56 9 8775 6938 · TikTok [@yorkloverssantiago](https://www.tiktok.com/@yorkloverssantiago)

---

## Stack

- React 19 (Create React App / craco)
- TailwindCSS + shadcn/ui
- React Router (HashRouter para compatibilidad con GitHub Pages)
- Lucide icons + Sonner toasts

## Estructura

```
.
├── frontend/                # App React (lo único que se despliega)
│   ├── public/
│   ├── src/
│   │   ├── pages/Home.jsx   # Toda la landing está aquí
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.css
│   └── package.json
└── .github/workflows/
    └── deploy.yml           # Deploy automático a GitHub Pages
```

## Desarrollo local

```bash
cd frontend
yarn install
yarn start
```

Abre http://localhost:3000

## Build de producción

```bash
cd frontend
yarn build
```

El resultado queda en `frontend/build/` listo para servir como sitio estático.

---

## Deploy en GitHub Pages — paso a paso

### 1. Crear el repositorio en GitHub

```bash
cd /app
git init
git add .
git commit -m "Helados York Santiago mockup"
git branch -M main
git remote add origin https://github.com/<TU_USUARIO>/<TU_REPO>.git
git push -u origin main
```

### 2. Activar GitHub Pages

En tu repo en GitHub:

1. Ve a **Settings → Pages**
2. En **Source** elige **GitHub Actions**
3. Guarda

### 3. Listo — deploy automático

Cada `git push` a `main` ejecutará el workflow `.github/workflows/deploy.yml` que:

1. Instala dependencias en `frontend/`
2. Corre `yarn build`
3. Publica el contenido de `frontend/build/` en GitHub Pages

Tu sitio quedará en:

```
https://<TU_USUARIO>.github.io/<TU_REPO>/
```

> El proyecto ya usa `HashRouter` y `"homepage": "."` en `package.json`, así que funciona sin importar el path del repo.

---

## Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Productos / precios | `frontend/src/pages/Home.jsx` → constante `BOXES` |
| Sabores | `frontend/src/pages/Home.jsx` → constante `FLAVORS` |
| Regiones del norte | `frontend/src/pages/Home.jsx` → constante `NORTH_REGIONS` |
| Testimonios | `frontend/src/pages/Home.jsx` → constante `TESTIMONIOS` |
| WhatsApp | `frontend/src/pages/Home.jsx` → constante `WHATSAPP` |
| Logo | `frontend/src/pages/Home.jsx` → constante `LOGO_URL` |
| Título / SEO | `frontend/public/index.html` |

---

## Notas

- Sin backend / sin DB → no requiere variables de entorno para correr en producción.
- El "carrito" es solo visual: arma un mensaje y abre WhatsApp Web/App.
- Pensado para presentar al cliente. Cuando se valide, se puede evolucionar a versión funcional con checkout real (Stripe / WebPay / Mercado Pago).
