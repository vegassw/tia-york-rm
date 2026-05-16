# Helados York Santiago — Mockup Visual

## Problem Statement (resumen)
Cliente vendedor de helados ("Helados York") en Valparaíso (Playa Ancha) quiere expandirse
a Santiago RM y zona norte de Chile (Coquimbo, Atacama, Antofagasta, Tarapacá, Arica).
Necesita un mockup visual estático (NO funcional) para presentación al cliente.
Token budget muy ajustado (≈20 créditos).

## Stack
Frontend-only React (CRA + Tailwind + shadcn). Sin backend custom necesario.
Sin auth, sin pagos reales, sin DB.

## Implementado (Dic 2025)
- Landing single-page con secciones:
  - Top marquee + Navbar sticky (logo, productos, mayorista, cómo pedir, redes)
  - Hero (logo del cliente + CTA WhatsApp + CTA Ver productos)
  - Catálogo: Caja de Leche $17.000 / Caja de Agua $13.500 con "Agregar al carrito"
  - Sabores surtidos (8 paletas estilizadas CSS)
  - Sección Mayorista Norte (mapa estilizado de Chile con regiones)
  - Cómo pedir (3 pasos)
  - Tabs Detalle vs Mayorista
  - Testimonios (3 reviews)
  - Redes sociales (TikTok @yorkloverssantiago, WhatsApp, mock IG)
  - Footer con CTA WhatsApp +56 9 8775 6938
  - Botón flotante de WhatsApp
- Carrito: mock visual — al "enviar pedido" abre WhatsApp con mensaje pre-armado.
- Estética: amarillo/rojo York, comic/halftone, fuentes Bowlby One + Fredoka + Caveat Brush.

## Datos de contacto (cliente)
- WhatsApp: +56 9 8775 6938
- TikTok: @yorkloverssantiago

## Mocked / No funcional
- TODOS los flujos son visuales. No hay backend, ni pagos, ni base de datos.
- "Agregar al carrito" → notification + abre WhatsApp con resumen.

## Backlog (P1/P2)
- P1: Convertir catálogo a real con CMS o lista editable
- P1: Galería de fotos reales del cliente
- P2: Backend con pedidos persistentes + panel admin
- P2: Integración Stripe / Mercado Pago / WebPay para checkout real
- P2: Programa "Distribuidor del Norte" con formulario y CRM
- P2: SEO + Open Graph + Google Business

## Next Action Items
- Validar diseño con el cliente
- Solicitar fotos reales del producto y de la sucursal
- Definir si avanzamos a versión funcional con checkout
