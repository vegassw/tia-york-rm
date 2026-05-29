import React, { useState } from "react";
import {
  MessageCircle,
  ShoppingCart,
  MapPin,
  Truck,
  Snowflake,
  Music2,
  ChevronRight,
  X,
  CreditCard,
  HandCoins,
  Wallet,
  Check,
  Store,
  Building2,
  Cookie,
  Box,
  School,
  Package,
  ImageOff,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../components/ui/dialog";
import { toast, Toaster } from "sonner";

const WHATSAPP = "56987756938";
const BRAND_FULL = "La Tía York · Santiago";

const waLink = (msg) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const fmtCLP = (n) => "$" + n.toLocaleString("es-CL");

// Resolve image with public-url prefix so it works under /repo/ on GH Pages
const img = (name) => `${process.env.PUBLIC_URL || ""}/img/products/${name}`;

const PRODUCTS = [
  {
    id: "caja-leche",
    title: "Caja de Leche",
    subtitle: "65 paletas de leche · sabores surtidos",
    short: "El cremoso porteño. Caja artesanal con 65 paletas en 5 sabores.",
    description:
      "Caja artesanal de 65 paletas a base de leche, en 5 sabores cremosos surtidos. Hechas con receta porteña tradicional, perfectas para tu freezer, para almacenes, kioscos o eventos. Mantenemos la cadena de frío durante el despacho.",
    price: 18000,
    priceMayor: 15000,
    unit: "caja",
    stock: "En stock",
    badge: "BASE LECHE",
    badgeColor: "#DC2626",
    images: ["caja-leche-01.jpg", "caja-leche-02.jpg", "caja-leche-03.jpg"],
    available: true,
    bullets: [
      "65 paletas por caja",
      "5 sabores cremosos surtidos",
      "Base láctea artesanal",
      "Despacho refrigerado en Santiago",
    ],
  },
  {
    id: "caja-agua",
    title: "Caja de Agua",
    subtitle: "65 paletas de agua · sabores frutales",
    short: "Frutal y refrescante. Caja artesanal con 65 paletas en 5 sabores.",
    description:
      "Caja artesanal de 65 paletas a base de agua, en 5 sabores frutales surtidos. Pulpa de fruta natural, perfectas para verano. Ideal para almacenes, kioscos, colegios y carros heladeros.",
    price: 14000,
    priceMayor: 12500,
    unit: "caja",
    stock: "En stock",
    badge: "BASE AGUA",
    badgeColor: "#1D4ED8",
    images: ["caja-agua-01.jpg", "caja-agua-02.jpg"],
    available: true,
    bullets: [
      "65 paletas por caja",
      "5 sabores frutales surtidos",
      "Pulpa natural",
      "Despacho refrigerado en Santiago",
    ],
  },
  {
    id: "paleta-doble",
    title: "Paleta Doble",
    subtitle: "50 unidades · simple o doble",
    short: "Formato grande para revender al detalle. 50 unidades por pack.",
    description:
      "Paletas dobles, formato pensado para revender al detalle en almacenes y kioscos. Pack con 50 unidades surtidas. Foto del producto próximamente.",
    price: 18000,
    priceMayor: 15000,
    unit: "pack",
    stock: "Foto próximamente",
    badge: "DOBLE",
    badgeColor: "#7C3AED",
    images: ["paletas-mix-01.jpg", "paletas-mix-02.jpg", "paletas-mix-03.jpg"],
    available: true,
    pending: true,
    bullets: [
      "50 unidades por pack",
      "Formato simple o doble",
      "Pensada para revender",
      "Pendiente foto oficial del producto",
    ],
  },
];

const DISTRIBUTOR_TYPES = [
  { name: "Almacenes", icon: Store },
  { name: "Distribuidoras", icon: Truck },
  { name: "Confiterías", icon: Cookie },
  { name: "Kioscos", icon: Box },
  { name: "Kioscos en colegios", icon: School },
  { name: "Liquidadoras", icon: Building2 },
];

const DISTRIBUTOR_BENEFITS = [
  {
    title: "Congeladora",
    text: "Te entregamos la congeladora para que arranques sin invertir en equipo.",
  },
  {
    title: "Publicidad y material",
    text: "Pendones, gigantografías y stickers para tu local. Marca lista para vender.",
  },
  {
    title: "Acompañamiento",
    text: "Te apoyamos en todo el proceso: pedidos, manejo de producto y reposición.",
  },
];

const COMUNAS = [
  "Cerrillos",
  "Cerro Navia",
  "Conchalí",
  "Estación Central",
  "Huechuraba",
  "Independencia",
  "La Cisterna",
  "La Florida",
  "La Granja",
  "Valle Grande",
  "Lo Prado",
  "Maipú",
  "Ñuñoa",
  "Peñalolén",
  "Providencia",
  "Pudahuel",
  "Quilicura",
  "Quinta Normal",
  "Recoleta",
  "Renca",
  "San Joaquín",
  "Santiago",
  "Vitacura",
];

const PAYMENT_METHODS = [
  {
    title: "Pago en línea",
    text: "Transferencia, link de pago o tarjeta. Confirmas y se despacha.",
    icon: CreditCard,
  },
  {
    title: "Pago acordado",
    text: "Para clientes recurrentes y distribuidores. Coordinamos crédito y plazos.",
    icon: HandCoins,
  },
  {
    title: "Pago al recibir",
    text: "Efectivo o transferencia al momento de la entrega en tu local.",
    icon: Wallet,
  },
];

/* ---------- Reusable: Brand sticker overlay ---------- */
const BrandSticker = ({ small = false }) => (
  <div
    className={`absolute z-10 ${
      small ? "top-2 right-2" : "top-3 right-3"
    } pointer-events-none select-none`}
  >
    <div
      className={`rounded-full bg-[#FFD60A] border-[3px] border-[#DC2626] shadow-[3px_3px_0_0_#000] flex items-center gap-2 ${
        small ? "px-2.5 py-1" : "px-3 py-1.5"
      }`}
    >
      <span
        className={`font-display ${
          small ? "text-[10px]" : "text-xs"
        } text-[#DC2626] tracking-wide`}
      >
        LA TÍA YORK
      </span>
      <span
        className={`font-script ${
          small ? "text-[11px]" : "text-sm"
        } text-black -mt-0.5`}
      >
        Santiago
      </span>
    </div>
  </div>
);

/* ---------- Product Card ---------- */
const ProductCard = ({ product, onView, onAdd }) => {
  return (
    <Card
      className="group relative rounded-2xl border-[3px] border-black bg-white overflow-hidden shadow-[6px_6px_0_0_#000] hover:shadow-[8px_8px_0_0_#DC2626] hover:-translate-y-1 transition-all"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative aspect-square bg-[#FFF7CC] overflow-hidden">
        <BrandSticker />
        {product.pending && (
          <div className="absolute top-3 left-3 z-10 bg-black text-[#FFD60A] font-display text-[10px] px-2 py-1 rounded-full border-2 border-[#FFD60A]">
            FOTO PRÓXIMAMENTE
          </div>
        )}
        <img
          src={img(product.images[0])}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div
          className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-display border-2 border-black text-white"
          style={{ background: product.badgeColor }}
        >
          {product.badge}
        </div>
      </div>

      <CardContent className="p-4 sm:p-5">
        <h3
          className="font-display text-xl sm:text-2xl text-[#DC2626] leading-tight"
          data-testid={`product-title-${product.id}`}
        >
          {product.title}
        </h3>
        <p className="text-xs sm:text-sm text-black/60 mt-0.5">
          {product.subtitle}
        </p>

        <div className="mt-3 flex items-end justify-between">
          <div>
            <div
              className="font-display text-2xl sm:text-3xl text-black"
              data-testid={`product-price-${product.id}`}
            >
              {fmtCLP(product.price)}
            </div>
            <div className="text-[10px] sm:text-xs text-black/50 uppercase tracking-wide">
              por {product.unit} · detalle
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] sm:text-xs text-black/50 uppercase">
              mayorista
            </div>
            <div className="font-display text-sm sm:text-base text-[#1D4ED8]">
              {fmtCLP(product.priceMayor)}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            onClick={() => onView(product)}
            variant="outline"
            className="flex-1 border-2 border-black bg-white hover:bg-black hover:text-white font-display text-xs sm:text-sm rounded-full h-10"
            data-testid={`product-view-${product.id}`}
          >
            VER PRODUCTO
          </Button>
          <Button
            onClick={() => onAdd(product)}
            className="bg-[#DC2626] hover:bg-[#b91c1c] text-white font-display text-xs sm:text-sm rounded-full h-10 px-4 border-2 border-black shadow-[3px_3px_0_0_#000]"
            data-testid={`product-add-${product.id}`}
          >
            <ShoppingCart className="w-4 h-4 sm:mr-1" />
            <span className="hidden sm:inline">AÑADIR</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

/* ---------- Product Detail Dialog ---------- */
const ProductDialog = ({ product, open, onClose, onAdd }) => {
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);

  React.useEffect(() => {
    setActive(0);
    setQty(1);
  }, [product]);

  if (!product) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-4xl w-[95vw] max-h-[92vh] overflow-y-auto p-0 rounded-3xl border-[3px] border-black bg-white"
        data-testid="product-dialog"
      >
        <DialogTitle className="sr-only">{product.title}</DialogTitle>
        <div className="grid md:grid-cols-2 gap-0">
          {/* Gallery */}
          <div className="bg-[#FFF7CC] p-4 sm:p-6 relative">
            <BrandSticker />
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-black bg-white">
              <img
                src={img(product.images[active])}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              {product.pending && (
                <div className="absolute bottom-3 left-3 bg-black text-[#FFD60A] font-display text-xs px-3 py-1.5 rounded-full border-2 border-[#FFD60A] flex items-center gap-1.5">
                  <ImageOff className="w-3.5 h-3.5" />
                  FOTO PRÓXIMAMENTE
                </div>
              )}
            </div>
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {product.images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition ${
                    active === i
                      ? "border-[#DC2626] shadow-[3px_3px_0_0_#000]"
                      : "border-black/30 hover:border-black"
                  }`}
                >
                  <img
                    src={img(src)}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="p-5 sm:p-7 relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white border-2 border-black hover:bg-black hover:text-white grid place-items-center transition"
              data-testid="dialog-close"
            >
              <X className="w-4 h-4" />
            </button>

            <Badge
              className="text-white border-2 border-black rounded-full font-display"
              style={{ background: product.badgeColor }}
            >
              {product.badge}
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl text-[#DC2626] mt-3 leading-tight">
              {product.title}
            </h2>
            <p className="text-sm text-black/60 mt-1">{product.subtitle}</p>

            <div className="mt-5 p-4 bg-[#FFF7CC] rounded-2xl border-2 border-black">
              <div className="flex items-end justify-between flex-wrap gap-2">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-black/60">
                    Precio al detalle
                  </div>
                  <div className="font-display text-3xl sm:text-4xl text-black">
                    {fmtCLP(product.price)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase tracking-wider text-black/60">
                    Desde 30 cajas
                  </div>
                  <div className="font-display text-xl sm:text-2xl text-[#1D4ED8]">
                    {fmtCLP(product.priceMayor)}
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-5 text-sm text-black/80 leading-relaxed">
              {product.description}
            </p>

            <ul className="mt-4 grid grid-cols-1 gap-2">
              {product.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm">
                  <Check
                    className="w-4 h-4 shrink-0"
                    style={{ color: product.badgeColor }}
                  />
                  {b}
                </li>
              ))}
            </ul>

            {/* Qty selector */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex items-center border-2 border-black rounded-full overflow-hidden">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 grid place-items-center hover:bg-black hover:text-white transition"
                  data-testid="qty-minus"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="w-12 text-center font-display text-lg" data-testid="qty-value">
                  {qty}
                </div>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 grid place-items-center hover:bg-black hover:text-white transition"
                  data-testid="qty-plus"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                onClick={() => {
                  onAdd(product, qty);
                  onClose();
                }}
                className="flex-1 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-display rounded-full h-12 border-2 border-black shadow-[4px_4px_0_0_#000]"
                data-testid="dialog-add-cart"
              >
                <ShoppingCart className="w-5 h-5 mr-2" /> AÑADIR AL PEDIDO
              </Button>
            </div>

            <a
              href={waLink(
                `Hola, me interesa el producto "${product.title}". ¿Me das más info?`
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block"
            >
              <Button
                variant="outline"
                className="w-full border-2 border-black hover:bg-[#25D366] hover:text-white hover:border-[#25D366] font-display rounded-full h-11"
                data-testid="dialog-wa"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Consultar por WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

/* ---------- Page ---------- */
export default function Home() {
  const [cart, setCart] = useState({});
  const [openProduct, setOpenProduct] = useState(null);

  const addToCart = (product, qty = 1) => {
    setCart((c) => ({ ...c, [product.id]: (c[product.id] || 0) + qty }));
    toast.success(`${qty} × ${product.title} añadido`, {
      description: "Tu pedido se enviará por WhatsApp",
      duration: 1800,
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, q]) => {
    const it = PRODUCTS.find((b) => b.id === id);
    return sum + (it ? it.price * q : 0);
  }, 0);

  const sendCartWA = () => {
    if (cartCount === 0) {
      toast("Tu pedido está vacío", {
        description: "Agrega al menos un producto",
      });
      return;
    }
    const lines = Object.entries(cart).map(([id, q]) => {
      const it = PRODUCTS.find((b) => b.id === id);
      return `• ${q} × ${it.title} — ${fmtCLP(it.price * q)}`;
    });
    const msg = `Hola La Tía York Santiago!\n\nQuiero hacer este pedido:\n${lines.join(
      "\n"
    )}\n\nTotal estimado: ${fmtCLP(cartTotal)}\n\n¿Me confirman disponibilidad y despacho?`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <div
      className="min-h-screen bg-white overflow-x-hidden w-full"
      data-testid="home-root"
    >
      <Toaster position="top-center" richColors />

      {/* TOP PROMO BAR */}
      <div className="bg-[#DC2626] text-[#FFD60A] py-2 text-center font-display text-[11px] sm:text-sm border-b-2 border-black">
        <span className="px-3">🚚 Despacho en Santiago RM</span>
        <span className="hidden sm:inline text-[#FFD60A]/60">·</span>
        <span className="hidden sm:inline px-3">
          📦 Precios mayoristas desde 30 cajas
        </span>
        <span className="text-[#FFD60A]/60">·</span>
        <span className="px-3">🤍 La Tía York en Santiago</span>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2">
          <a
            href="#top"
            className="flex items-center gap-2 sm:gap-3 min-w-0"
            data-testid="nav-logo"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD60A] border-[3px] border-[#DC2626] overflow-hidden shrink-0">
              <img
                src={img("logo-tia.jpg")}
                alt="La Tía York"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-tight min-w-0">
              <div className="font-display text-[#DC2626] text-sm sm:text-lg truncate">
                LA TÍA YORK
              </div>
              <div className="font-script text-black text-sm sm:text-base -mt-1">
                Santiago
              </div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-7 font-display text-sm">
            <a
              href="#productos"
              className="hover:text-[#DC2626] transition"
              data-testid="nav-productos"
            >
              PRODUCTOS
            </a>
            <a
              href="#distribuidores"
              className="hover:text-[#DC2626] transition"
              data-testid="nav-distribuidores"
            >
              DISTRIBUIDORES
            </a>
            <a
              href="#comunas"
              className="hover:text-[#DC2626] transition"
              data-testid="nav-comunas"
            >
              COBERTURA
            </a>
            <a
              href="#pagos"
              className="hover:text-[#DC2626] transition"
              data-testid="nav-pagos"
            >
              PAGOS
            </a>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Button
              data-testid="nav-cart-btn"
              onClick={sendCartWA}
              variant="outline"
              className="border-2 border-black bg-white hover:bg-[#DC2626] hover:text-white font-display rounded-full px-2.5 sm:px-4 h-9 sm:h-10 relative"
            >
              <ShoppingCart className="w-4 h-4 sm:mr-1" />
              <span>{cartCount}</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#DC2626] rounded-full border-2 border-white animate-pulse" />
              )}
            </Button>
            <a
              href={waLink("Hola! Quiero información sobre los helados.")}
              target="_blank"
              rel="noreferrer"
              data-testid="nav-wa-btn"
            >
              <Button className="bg-[#25D366] hover:bg-[#1da851] text-white border-2 border-black rounded-full font-display px-2.5 sm:px-4 h-9 sm:h-10">
                <MessageCircle className="w-4 h-4 sm:mr-1" />
                <span className="hidden sm:inline">WhatsApp</span>
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header
        id="top"
        className="relative bg-[#FFD60A] halftone-bg overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-20 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative z-10">
            <Badge className="bg-[#DC2626] text-[#FFD60A] border-2 border-black rounded-full font-display px-3 py-1">
              🍦 HELADOS ARTESANALES · PORTEÑO DE CORAZÓN
            </Badge>
            <h1
              className="font-display mt-5 text-[#DC2626] text-stroke-white-thin sm:text-stroke-white text-4xl sm:text-6xl lg:text-7xl leading-[0.95]"
              data-testid="hero-title"
            >
              LA TÍA YORK <br />
              AHORA EN <br />
              <span className="text-black">SANTIAGO</span>
            </h1>
            <p className="mt-5 max-w-xl text-base sm:text-lg text-black/80 font-medium">
              El helado de Playa Ancha llega a tu comuna. Vende en tu negocio
              con el respaldo de la marca más querida: te entregamos producto,
              congeladora y publicidad.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#productos">
                <Button
                  className="bg-[#DC2626] hover:bg-[#b91c1c] text-white border-[3px] border-black rounded-full font-display text-sm sm:text-base px-6 py-5 sm:py-6 shadow-[5px_5px_0_0_#000]"
                  data-testid="hero-ver-productos"
                >
                  VER PRODUCTOS <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </a>
              <a href="#distribuidores">
                <Button
                  variant="outline"
                  className="bg-white hover:bg-black hover:text-white text-black border-[3px] border-black rounded-full font-display text-sm sm:text-base px-6 py-5 sm:py-6"
                  data-testid="hero-distribuidor"
                >
                  QUIERO SER DISTRIBUIDOR
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative">
              <BrandSticker />
              <img
                src={img("camion.jpg")}
                alt="Camión Helados York Santiago"
                className="w-full rounded-3xl border-[5px] border-black shadow-[10px_10px_0_0_#DC2626]"
              />
              <div className="absolute -bottom-4 -left-4 bg-white border-[3px] border-black rounded-2xl px-4 py-3 shadow-[4px_4px_0_0_#000]">
                <div className="font-display text-xs text-black/60">
                  SÍGUENOS EN
                </div>
                <a
                  href="https://www.tiktok.com/@yorkloverssantiago"
                  target="_blank"
                  rel="noreferrer"
                  className="font-display text-[#DC2626] text-sm flex items-center gap-1.5"
                >
                  <Music2 className="w-3.5 h-3.5" />
                  @yorkloverssantiago
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* PRODUCTOS */}
      <section id="productos" className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <div>
              <Badge className="bg-black text-[#FFD60A] rounded-full font-display border-2 border-black">
                NUESTRO CATÁLOGO
              </Badge>
              <h2
                className="font-display text-3xl sm:text-5xl text-[#DC2626] text-stroke-white-thin sm:text-stroke-white mt-3"
                data-testid="prod-title"
              >
                PRODUCTOS
              </h2>
              <p className="text-black/70 mt-1 max-w-xl text-sm sm:text-base">
                Compra al detalle para tu casa o por mayor para tu negocio.
                Todos los productos son artesanales con receta porteña.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-black/60">
              <Snowflake className="w-4 h-4 text-[#1D4ED8]" />
              Cadena de frío garantizada
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {PRODUCTS.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onView={setOpenProduct}
                onAdd={addToCart}
              />
            ))}
          </div>

          {cartCount > 0 && (
            <div
              className="mt-8 bg-black text-[#FFD60A] rounded-2xl border-[3px] border-[#DC2626] p-4 sm:p-5 flex flex-wrap justify-between items-center gap-3 shadow-[6px_6px_0_0_#DC2626]"
              data-testid="cart-strip"
            >
              <div className="font-display text-sm sm:text-base">
                🛒 {cartCount} {cartCount === 1 ? "producto" : "productos"} ·
                Total {fmtCLP(cartTotal)}
              </div>
              <Button
                onClick={sendCartWA}
                className="bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-display border-2 border-white text-xs sm:text-sm"
                data-testid="cart-send-wa"
              >
                <MessageCircle className="w-4 h-4 mr-1" /> ENVIAR PEDIDO POR
                WHATSAPP
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* DISTRIBUIDORES */}
      <section
        id="distribuidores"
        className="relative bg-[#DC2626] text-white py-16 sm:py-20 overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.5) 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 items-start">
            <div className="lg:col-span-7">
              <Badge className="bg-[#FFD60A] text-black rounded-full font-display border-2 border-black">
                <Package className="w-4 h-4 mr-1" /> PROGRAMA DISTRIBUIDOR
              </Badge>
              <h2
                className="font-display text-3xl sm:text-5xl lg:text-6xl mt-4 text-[#FFD60A] text-stroke-white-thin sm:text-stroke-white"
                data-testid="distri-title"
              >
                VENDE LA TÍA YORK <br />
                EN TU NEGOCIO
              </h2>
              <p className="mt-4 text-white/90 max-w-xl text-sm sm:text-base">
                Si tienes un almacén, kiosco, confitería o distribuidora en
                Santiago, conviértete en punto oficial. Llevamos producto,
                congeladora y publicidad — tú solo te preocupas de vender.
              </p>

              <div className="mt-6 grid sm:grid-cols-2 gap-3">
                {DISTRIBUTOR_TYPES.map((t) => (
                  <div
                    key={t.name}
                    className="bg-black/30 backdrop-blur rounded-xl border-2 border-[#FFD60A]/40 px-4 py-3 flex items-center gap-3"
                    data-testid={`distri-type-${t.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <div className="w-10 h-10 bg-[#FFD60A] text-black rounded-full grid place-items-center border-2 border-black shrink-0">
                      <t.icon className="w-5 h-5" />
                    </div>
                    <div className="font-display text-sm sm:text-base text-[#FFD60A]">
                      {t.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-7 bg-white text-black rounded-2xl border-[3px] border-black p-5 shadow-[6px_6px_0_0_#000]">
                <div className="font-display text-[#DC2626] text-sm">
                  PRECIOS MAYORISTAS · DESDE 30 CAJAS
                </div>
                <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-display text-black">
                      Caja de Leche
                    </span>
                    <div className="text-xs text-black/60">
                      paleta simple o doble
                    </div>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl text-[#DC2626] text-right">
                    {fmtCLP(15000)}
                  </div>
                  <div>
                    <span className="font-display text-black">
                      Caja de Agua
                    </span>
                    <div className="text-xs text-black/60">
                      paletas frutales
                    </div>
                  </div>
                  <div className="font-display text-2xl sm:text-3xl text-[#1D4ED8] text-right">
                    {fmtCLP(12500)}
                  </div>
                </div>
              </div>

              <a
                href={waLink(
                  "Hola! Tengo un negocio en Santiago y me interesa ser distribuidor de La Tía York. Mi negocio es: ____ Comuna: ____"
                )}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  className="mt-6 bg-[#FFD60A] hover:bg-white text-black border-[3px] border-black rounded-full font-display text-sm sm:text-base px-6 py-5 sm:py-6 shadow-[5px_5px_0_0_#000]"
                  data-testid="distri-cta-wa"
                >
                  <MessageCircle className="w-5 h-5 mr-2" /> QUIERO SER
                  DISTRIBUIDOR
                </Button>
              </a>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white text-black rounded-3xl border-[4px] border-black overflow-hidden shadow-[8px_8px_0_0_#FFD60A]">
                <BrandSticker />
                <img
                  src={img("banner-distribuidor.jpg")}
                  alt="Vende Helados York en tu negocio"
                  className="w-full aspect-square sm:aspect-[4/3] object-cover"
                />
              </div>
              <div className="grid gap-3">
                {DISTRIBUTOR_BENEFITS.map((b) => (
                  <div
                    key={b.title}
                    className="bg-black/30 backdrop-blur rounded-2xl border-2 border-[#FFD60A]/40 p-4"
                    data-testid={`benefit-${b.title.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-[#FFD60A] shrink-0" />
                      <div className="font-display text-[#FFD60A]">
                        {b.title}
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-white/80 mt-1 pl-7">
                      {b.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMUNAS */}
      <section id="comunas" className="bg-[#FFD60A] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-black text-[#FFD60A] rounded-full font-display border-2 border-black">
              <MapPin className="w-4 h-4 mr-1" /> COBERTURA SANTIAGO RM
            </Badge>
            <h2
              className="font-display text-3xl sm:text-5xl mt-3 text-[#DC2626] text-stroke-white-thin sm:text-stroke-white"
              data-testid="comunas-title"
            >
              DESPACHAMOS EN <br className="sm:hidden" /> {COMUNAS.length} COMUNAS
            </h2>
            <p className="text-black/70 mt-2 text-sm sm:text-base">
              Si tu comuna no está en la lista, escríbenos igual — coordinamos
              caso a caso.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
            {COMUNAS.map((c) => (
              <div
                key={c}
                className="bg-white rounded-xl border-2 border-black px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-[#DC2626] hover:text-white transition group cursor-default"
                data-testid={`comuna-${c.toLowerCase().replace(/\s/g, "-")}`}
              >
                <MapPin className="w-4 h-4 text-[#DC2626] group-hover:text-white shrink-0" />
                <span className="font-display text-xs sm:text-sm truncate">
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PAGOS */}
      <section id="pagos" className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-black text-[#FFD60A] rounded-full font-display border-2 border-black">
              MÉTODOS DE PAGO
            </Badge>
            <h2
              className="font-display text-3xl sm:text-5xl mt-3 text-[#DC2626] text-stroke-white-thin sm:text-stroke-white"
              data-testid="pagos-title"
            >
              PAGA COMO TE ACOMODE
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            {PAYMENT_METHODS.map((p) => (
              <Card
                key={p.title}
                className="rounded-2xl border-[3px] border-black bg-white shadow-[6px_6px_0_0_#000] hover:-translate-y-1 transition"
                data-testid={`pago-${p.title.toLowerCase().replace(/\s/g, "-")}`}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFD60A] grid place-items-center border-[3px] border-black">
                    <p.icon className="w-7 h-7 text-[#DC2626]" />
                  </div>
                  <h3 className="font-display text-xl mt-4">{p.title}</h3>
                  <p className="text-sm text-black/70 mt-1">{p.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE GALLERY */}
      <section className="bg-[#FFF7CC] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-[#DC2626] text-[#FFD60A] rounded-full font-display border-2 border-black">
              EN LAS CALLES DE SANTIAGO
            </Badge>
            <h2 className="font-display text-3xl sm:text-5xl mt-3 text-[#DC2626] text-stroke-white-thin sm:text-stroke-white">
              YA NOS VIERON
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { src: "local.jpg", label: "En tu local" },
              { src: "lifestyle-tv.jpg", label: "En tu casa" },
              { src: "produccion.jpg", label: "Hechos a mano" },
              { src: "local-02.jpg", label: "Listos para repartir" },
            ].map((it, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-2xl overflow-hidden border-[3px] border-black shadow-[5px_5px_0_0_#000]"
                data-testid={`gallery-${i}`}
              >
                <BrandSticker small />
                <img
                  src={img(it.src)}
                  alt={it.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <div className="font-display text-white text-xs sm:text-sm">
                    {it.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER / CTA FINAL */}
      <footer className="bg-[#DC2626] text-white pt-14 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className="bg-[#FFD60A] text-black rounded-3xl border-[5px] border-black p-7 sm:p-10 shadow-[8px_8px_0_0_#000] grid lg:grid-cols-3 gap-6 items-center"
            data-testid="footer-cta"
          >
            <div className="lg:col-span-2">
              <h3 className="font-display text-2xl sm:text-4xl text-[#DC2626] text-stroke-white-thin sm:text-stroke-white">
                ¿LISTO PARA <br /> PROBAR LA TÍA YORK?
              </h3>
              <p className="mt-3 text-black/80 max-w-lg text-sm sm:text-base">
                Escríbenos al WhatsApp y armamos tu pedido. Atendemos todos los
                días.
              </p>
            </div>
            <a
              href={waLink(
                "Hola La Tía York! Quiero hacer un pedido o más info."
              )}
              target="_blank"
              rel="noreferrer"
              className="lg:justify-self-end"
            >
              <Button
                className="bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-display border-[3px] border-black text-base sm:text-lg px-6 sm:px-8 py-6 shadow-[5px_5px_0_0_#000]"
                data-testid="footer-wa-cta"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> +56 9 8775 6938
              </Button>
            </a>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#FFD60A] border-[3px] border-black overflow-hidden">
                  <img
                    src={img("logo-tia.jpg")}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-display text-xl text-[#FFD60A]">
                    LA TÍA YORK
                  </div>
                  <div className="font-script text-lg -mt-1">Santiago</div>
                </div>
              </div>
              <p className="mt-3 text-white/80 text-xs sm:text-sm">
                Porteño de corazón. Atendemos toda Santiago RM y abrimos
                programa de distribuidores con producto, congeladora y
                publicidad incluida.
              </p>
            </div>

            <div>
              <div className="font-display text-[#FFD60A] mb-3">CONTACTO</div>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" /> +56 9 8775 6938
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Santiago, Región Metropolitana
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="w-4 h-4" /> Despacho a {COMUNAS.length}{" "}
                  comunas
                </li>
              </ul>
            </div>

            <div>
              <div className="font-display text-[#FFD60A] mb-3">SÍGUENOS</div>
              <div className="flex gap-3">
                <a
                  href="https://www.tiktok.com/@yorkloverssantiago"
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 bg-black rounded-full grid place-items-center border-2 border-[#FFD60A] hover:bg-[#FFD60A] hover:text-black transition"
                  data-testid="footer-tiktok"
                >
                  <Music2 className="w-5 h-5" />
                </a>
                <a
                  href={waLink("Hola!")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 bg-[#25D366] rounded-full grid place-items-center border-2 border-white"
                  data-testid="footer-wa"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
              <p className="text-xs text-white/60 mt-3">@yorkloverssantiago</p>
            </div>
          </div>

          <div className="mt-10 pt-5 border-t border-white/20 flex flex-wrap justify-between gap-3 text-[11px] sm:text-xs text-white/70">
            <div>
              © {new Date().getFullYear()} La Tía York Santiago · Porteño de
              corazón
            </div>
            <div>Mockup visual · sin transacciones reales</div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={waLink("Hola La Tía York!")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50"
        data-testid="floating-wa"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full grid place-items-center border-[3px] border-white shadow-[5px_5px_0_0_#000] hover:scale-110 transition">
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </div>
      </a>

      {/* PRODUCT DIALOG */}
      <ProductDialog
        product={openProduct}
        open={!!openProduct}
        onClose={() => setOpenProduct(null)}
        onAdd={addToCart}
      />
    </div>
  );
}
