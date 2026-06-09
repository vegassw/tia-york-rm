import React, { useState } from "react";
import {
  MessageCircle,
  ShoppingCart,
  MapPin,
  Truck,
  Snowflake,
  Music2,
  Instagram,
  ChevronRight,
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
  Trash2,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "../components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../components/ui/sheet";
import { toast, Toaster } from "sonner";

const WHATSAPP = "56987756938";
const INSTAGRAM = "https://www.instagram.com/latiayork_santiago";
const TIKTOK = "https://www.tiktok.com/@yorkloverssantiago";
const BRAND_FULL = "Helados York · Santiago";

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
    images: ["caja-leche-03.jpg", "lifestyle-tv.jpg", "produccion.jpg"],
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
    images: ["caja-agua-real.jpg", "paletas-mix-01.jpg", "paletas-mix-03.jpg"],
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
    subtitle: "50 unidades · formato grande",
    short: "Formato grande para revender al detalle. 50 unidades por pack.",
    description:
      "Paletas dobles Helados York, formato pensado para revender al detalle en almacenes y kioscos. Pack con 50 unidades surtidas. Mayor margen por venta y muy demandada por el consumidor final.",
    price: 18000,
    priceMayor: 15000,
    unit: "pack",
    stock: "En stock",
    badge: "DOBLE",
    badgeColor: "#7C3AED",
    images: ["paleta-doble-real.jpg", "paletas-mix-03.jpg", "paletas-mix-01.jpg"],
    available: true,
    bullets: [
      "50 unidades por pack",
      "Formato grande, mayor margen",
      "Pensada para revender",
      "Despacho refrigerado en Santiago",
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
    title: "Congeladora sin costo",
    text: "Para Distribuidoras, Confiterías y Liquidadoras: te entregamos la congeladora en comodato para que arranques sin invertir en equipo.",
  },
  {
    title: "Afiches y pendones York",
    text: "Te damos afiches, pendones y stickers de Helados York para que tu negocio se vea como punto oficial.",
  },
  {
    title: "Reposición coordinada",
    text: "Te visitamos para reponer producto y manejar la cadena de frío. Sin quiebres de stock.",
  },
  {
    title: "Asesoría y acompañamiento",
    text: "Te apoyamos con precios sugeridos, márgenes y consejos para que vendas más rápido.",
  },
];

const SELLING_FEATURES = [
  { title: "Producto de calidad", text: "Receta porteña artesanal", icon: Package },
  { title: "Sabores irresistibles", text: "5 sabores que enamoran", icon: Snowflake },
  { title: "Atención personalizada", text: "Te acompañamos siempre", icon: HandCoins },
  { title: "Despacho a todo Santiago", text: "Cadena de frío garantizada", icon: Truck },
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

/* ---------- Reusable: Brand sticker overlay (bottom-left, sutil) ---------- */
const BrandSticker = ({ small = false }) => (
  <div
    className={`absolute z-10 ${
      small ? "bottom-2 left-2" : "bottom-3 left-3"
    } pointer-events-none select-none`}
  >
    <div
      className={`rounded-md bg-white/95 backdrop-blur-sm border border-[#DC2626]/30 shadow-sm flex items-center gap-1.5 ${
        small ? "px-2 py-1" : "px-2.5 py-1.5"
      }`}
    >
      <span
        className={`inline-block w-1.5 h-1.5 rounded-full bg-[#DC2626]`}
      />
      <span
        className={`font-display ${
          small ? "text-[9px]" : "text-[10px]"
        } text-[#DC2626] tracking-wider uppercase`}
      >
        Helados York · Santiago
      </span>
    </div>
  </div>
);

/* ---------- Product Card ---------- */
const ProductCard = ({ product, onView, onAdd }) => {
  return (
    <Card
      className="group relative rounded-2xl border border-black/10 bg-white overflow-hidden shadow-soft-lg hover:shadow-brand hover:-translate-y-1 transition-all"
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
          className="absolute bottom-3 left-3 rounded-full px-3 py-1 text-[11px] font-display border border-black/15 text-white"
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
            className="flex-1 border border-black/15 bg-white hover:bg-black hover:text-white font-display text-xs sm:text-sm rounded-full h-10"
            data-testid={`product-view-${product.id}`}
          >
            VER PRODUCTO
          </Button>
          <Button
            onClick={() => onAdd(product)}
            className="bg-[#DC2626] hover:bg-[#b91c1c] text-white font-display text-xs sm:text-sm rounded-full h-10 px-4 border border-black/15 shadow-soft"
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
        className="max-w-4xl w-[95vw] max-h-[92vh] overflow-y-auto overflow-x-hidden p-0 rounded-3xl border border-black/10 bg-white touch-pan-y"
        data-testid="product-dialog"
      >
        <DialogTitle className="sr-only">{product.title}</DialogTitle>
        <div className="grid md:grid-cols-2 gap-0 max-w-full overflow-hidden">
          {/* Gallery */}
          <div className="bg-[#FFF7CC] p-4 sm:p-6 relative overflow-hidden">
            <BrandSticker />
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-black/15 bg-white max-w-full">
              <img
                src={img(product.images[active])}
                alt={product.title}
                className="w-full h-full object-cover"
                draggable="false"
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
                      ? "border-[#DC2626] shadow-soft"
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
          <div className="p-5 sm:p-7 pt-14 sm:pt-7 relative min-w-0">
            <Badge
              className="text-white border border-black/15 rounded-full font-display"
              style={{ background: product.badgeColor }}
            >
              {product.badge}
            </Badge>
            <h2 className="font-display text-3xl sm:text-4xl text-[#DC2626] mt-3 leading-tight">
              {product.title}
            </h2>
            <p className="text-sm text-black/60 mt-1">{product.subtitle}</p>

            <div className="mt-5 p-4 bg-[#FFF7CC] rounded-2xl border border-black/15">
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
                    Desde 25 cajas
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
              <div className="flex items-center border border-black/15 rounded-full overflow-hidden">
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
                className="flex-1 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-display rounded-full h-12 border border-black/15 shadow-soft"
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
                className="w-full border border-black/15 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] font-display rounded-full h-11"
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
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product, qty = 1) => {
    setCart((c) => ({ ...c, [product.id]: (c[product.id] || 0) + qty }));
    toast.success(`${qty} × ${product.title} añadido`, {
      description: "Abre el carrito para revisar tu pedido",
      duration: 1800,
    });
  };

  const updateQty = (id, qty) => {
    setCart((c) => {
      const next = { ...c };
      if (qty <= 0) delete next[id];
      else next[id] = qty;
      return next;
    });
  };

  const removeItem = (id) => {
    setCart((c) => {
      const next = { ...c };
      delete next[id];
      return next;
    });
    toast("Producto eliminado del pedido");
  };

  const clearCart = () => {
    setCart({});
    toast("Carrito vaciado");
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, q]) => {
    const it = PRODUCTS.find((b) => b.id === id);
    return sum + (it ? it.price * q : 0);
  }, 0);

  const openCart = () => setCartOpen(true);

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
    const msg = `Hola Helados York Santiago!\n\nQuiero hacer este pedido:\n${lines.join(
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
      <div className="bg-[#DC2626] text-[#FFD60A] py-2 text-center font-display text-[11px] sm:text-sm tracking-wide">
        <span className="px-3">Despacho en Santiago RM</span>
        <span className="hidden sm:inline text-[#FFD60A]/50">·</span>
        <span className="hidden sm:inline px-3">
          Precios mayoristas desde 25 cajas
        </span>
        <span className="text-[#FFD60A]/50">·</span>
        <span className="px-3">Helados York en Santiago</span>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-black/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2">
          <a
            href="#top"
            className="flex items-center gap-2 sm:gap-3 min-w-0"
            data-testid="nav-logo"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFD60A] border-2 border-[#DC2626]/30 overflow-hidden shrink-0">
              <img
                src={img("logo-tia.jpg")}
                alt="Helados York"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="leading-tight min-w-0">
              <div className="font-display text-[#DC2626] text-sm sm:text-lg truncate">
                HELADOS YORK
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
              href="#quiero-vender"
              className="hover:text-[#DC2626] transition"
              data-testid="nav-distribuidores"
            >
              QUIERO VENDER
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
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:grid w-10 h-10 place-items-center rounded-full border border-black/15 hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] transition"
              data-testid="nav-ig-btn"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <Button
              data-testid="nav-cart-btn"
              onClick={openCart}
              variant="outline"
              className="border border-black/15 bg-white hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] font-display rounded-full px-2.5 sm:px-4 h-9 sm:h-10 relative tracking-wide text-xs"
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
              <Button className="bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-display px-2.5 sm:px-4 h-9 sm:h-10 tracking-wide text-xs">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-20 grid lg:grid-cols-12 gap-6 lg:gap-2 items-center">
          <div className="lg:col-span-5 relative z-10">
            <Badge className="bg-[#DC2626] text-[#FFD60A] border border-black/15 rounded-full font-display px-3 py-1">
              🍦 HELADOS ARTESANALES · PORTEÑO DE CORAZÓN
            </Badge>
            <h1
              className="font-display mt-5 text-[#DC2626] text-stroke-white-thin sm:text-stroke-white text-4xl sm:text-6xl lg:text-7xl leading-[0.95]"
              data-testid="hero-title"
            >
              HELADOS YORK <br />
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
                  className="bg-[#DC2626] hover:bg-[#b91c1c] text-white border border-black/10 rounded-full font-display text-sm sm:text-base px-6 py-5 sm:py-6 shadow-soft-lg"
                  data-testid="hero-ver-productos"
                >
                  VER PRODUCTOS <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </a>
              <a href="#quiero-vender">
                <Button
                  variant="outline"
                  className="bg-white hover:bg-black hover:text-white text-black border border-black/10 rounded-full font-display text-sm sm:text-base px-6 py-5 sm:py-6"
                  data-testid="hero-distribuidor"
                >
                  QUIERO VENDER EN MI NEGOCIO
                </Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="relative group [perspective:1200px] lg:-mr-12">
              {/* Glow multicolor pulsante detrás */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 sm:-inset-8 rounded-[40px] pulse-glow"
                style={{
                  background:
                    "conic-gradient(from 0deg at 50% 50%, #DC2626, #FFD60A, #1D4ED8, #DC2626)",
                  filter: "blur(48px)",
                  opacity: 0.55,
                  zIndex: 0,
                }}
              />

              {/* Halo radial suave */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-[36px] bg-white/40 blur-2xl"
                style={{ zIndex: 0 }}
              />

              {/* Snowflake girando arriba derecha */}
              <div className="absolute -top-6 -right-2 sm:-top-8 sm:-right-4 z-20 spin-med">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-soft-lg grid place-items-center border-2 border-[#1D4ED8]/20">
                  <Snowflake className="w-7 h-7 sm:w-9 sm:h-9 text-[#1D4ED8]" strokeWidth={2.5} />
                </div>
              </div>

              {/* Badge flotante "Despachamos hoy" */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-5 z-20 floaty-badge">
                <div className="bg-[#DC2626] text-[#FFD60A] font-display text-[11px] sm:text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-soft-lg whitespace-nowrap tracking-wider">
                  🚚 DESPACHAMOS HOY
                </div>
              </div>

              {/* Sparkles decorativos */}
              <span className="absolute top-1/4 -right-5 sm:-right-6 z-20 text-[#FFD60A] text-2xl sparkle sparkle-d1 drop-shadow" aria-hidden="true">✦</span>
              <span className="absolute bottom-1/3 -left-4 sm:-left-6 z-20 text-[#DC2626] text-xl sparkle sparkle-d2 drop-shadow" aria-hidden="true">✦</span>
              <span className="absolute top-2/3 right-1/4 z-20 text-white text-lg sparkle sparkle-d3 drop-shadow" aria-hidden="true">✦</span>
              <span className="absolute bottom-12 right-6 z-20 text-[#FFD60A] text-xl sparkle drop-shadow" aria-hidden="true">✦</span>

              {/* Container con float sutil + hover tilt */}
              <div className="relative floaty-subtle transition-transform duration-500 group-hover:scale-[1.03] group-hover:-rotate-1 will-change-transform lg:scale-[1.35] lg:origin-center">
                <BrandSticker />

                <div className="relative rounded-3xl overflow-hidden border border-black/15 shadow-brand">
                  <img
                    src={img("camion-2.png")}
                    alt="Camión Helados York en Santiago"
                    className="w-full block"
                    draggable="false"
                  />
                  {/* Vignette superior para legibilidad del badge si se sobrepone */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-transparent to-black/20 pointer-events-none" />
                  {/* Shimmer recorriendo la imagen */}
                  <div className="absolute inset-0 shimmer-overlay" />
                </div>
              </div>

              {/* Card flotante "Síguenos" */}
              <div className="absolute -bottom-5 -right-3 sm:-right-5 z-20 bg-white border border-black/10 rounded-2xl px-4 py-3 shadow-soft-lg">
                <div className="font-display text-[10px] tracking-wider text-black/50 uppercase">
                  Síguenos
                </div>
                <div className="mt-1 flex items-center gap-2.5">
                  <a
                    href={INSTAGRAM}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-[#DC2626] text-xs sm:text-sm flex items-center gap-1.5 hover:text-black transition"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    @latiayork_santiago
                  </a>
                  <span className="text-black/30">·</span>
                  <a
                    href={TIKTOK}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-black/70 text-xs flex items-center gap-1 hover:text-[#DC2626] transition"
                    aria-label="TikTok"
                  >
                    <Music2 className="w-3.5 h-3.5" />
                    TikTok
                  </a>
                </div>
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
              <Badge className="bg-black text-[#FFD60A] rounded-full font-display border border-black/15">
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
              className="mt-8 bg-black text-[#FFD60A] rounded-2xl border-[3px] border-[#DC2626] p-4 sm:p-5 flex flex-wrap justify-between items-center gap-3 shadow-brand"
              data-testid="cart-strip"
            >
              <div className="font-display text-sm sm:text-base">
                🛒 {cartCount} {cartCount === 1 ? "producto" : "productos"} ·
                Total {fmtCLP(cartTotal)}
              </div>
              <Button
                onClick={openCart}
                className="bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-display border-2 border-white text-xs sm:text-sm"
                data-testid="cart-send-wa"
              >
                <ShoppingCart className="w-4 h-4 mr-1" /> VER CARRITO Y ENVIAR
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* QUIERO VENDER */}
      <section
        id="quiero-vender"
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
              <Badge className="bg-[#FFD60A] text-black rounded-full font-display border border-black/15">
                <Package className="w-4 h-4 mr-1" /> PROGRAMA PARA NEGOCIOS
              </Badge>
              <h2
                className="font-display text-3xl sm:text-5xl lg:text-6xl mt-4 text-[#FFD60A]"
                data-testid="distri-title"
              >
                ¿QUIERES VENDER <br />
                HELADOS YORK EN <br />
                TU NEGOCIO?
              </h2>
              <p className="mt-4 text-white/95 max-w-xl text-sm sm:text-base leading-relaxed">
                Haz que tu negocio sea la <strong className="text-[#FFD60A]">sensación del barrio</strong> vendiendo los famosos Helados York.
                Si tienes un almacén, kiosco, confitería, distribuidora o liquidadora en Santiago, te ayudamos a vender desde el día uno.
                <span className="block mt-2 font-display text-[#FFD60A] text-xs sm:text-sm tracking-wider">
                  NOSOTROS NOS ENCARGAMOS DE TODO PARA QUE TÚ SOLO TE DEDIQUES A VENDER.
                </span>
              </p>

              <div className="mt-6">
                <div className="font-display text-[#FFD60A] text-sm tracking-wider mb-3">
                  PARA QUIÉN ES:
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {DISTRIBUTOR_TYPES.map((t) => (
                    <div
                      key={t.name}
                      className="bg-black/30 backdrop-blur rounded-xl border border-[#FFD60A]/30 px-4 py-3 flex items-center gap-3"
                      data-testid={`distri-type-${t.name.toLowerCase().replace(/\s/g, "-")}`}
                    >
                      <div className="w-10 h-10 bg-[#FFD60A] text-[#DC2626] rounded-full grid place-items-center shrink-0">
                        <t.icon className="w-5 h-5" />
                      </div>
                      <div className="font-display text-sm sm:text-base text-[#FFD60A]">
                        {t.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-7 bg-white text-black rounded-2xl border border-black/10 p-5 shadow-soft-lg">
                <div className="font-display text-[#DC2626] text-sm tracking-wider">
                  PRECIOS MAYORISTAS · DESDE 25 CAJAS
                </div>
                <div className="text-[11px] text-black/60 mt-1">
                  Pueden ser surtidas, combinadas como elijas (leche + agua).
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 items-center">
                  <div>
                    <span className="font-display text-black text-base">
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
                    <span className="font-display text-black text-base">
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
                  "Hola! Quiero vender Helados York en mi negocio. Mi negocio es: ____ Comuna: ____"
                )}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  className="mt-6 bg-[#FFD60A] hover:bg-white text-black rounded-full font-display text-sm sm:text-base px-6 py-5 sm:py-6 shadow-soft-lg"
                  data-testid="distri-cta-wa"
                >
                  <MessageCircle className="w-5 h-5 mr-2" /> QUIERO VENDER EN MI
                  NEGOCIO
                </Button>
              </a>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white text-black rounded-3xl border border-black/10 overflow-hidden shadow-soft-lg">
                <img
                  src={img("congeladora.jpg")}
                  alt="Congeladora Helados York para tu negocio"
                  className="w-full aspect-square sm:aspect-[4/3] object-cover"
                />
              </div>
              <div>
                <div className="font-display text-[#FFD60A] text-sm tracking-wider mb-3">
                  TE DAMOS TODO PARA QUE VENDAS:
                </div>
                <div className="grid gap-3">
                  {DISTRIBUTOR_BENEFITS.map((b) => (
                    <div
                      key={b.title}
                      className="bg-black/30 backdrop-blur rounded-2xl border border-[#FFD60A]/30 p-4"
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

          {/* SELLING FEATURES STRIP (estilo flyer) */}
          <div className="mt-10 sm:mt-14 bg-white text-black rounded-2xl border border-black/10 shadow-soft-lg overflow-hidden">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-black/10">
              {SELLING_FEATURES.map((f) => (
                <div
                  key={f.title}
                  className="p-4 sm:p-5 flex items-center gap-3"
                  data-testid={`feature-${f.title.toLowerCase().replace(/\s/g, "-")}`}
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FFF7CC] grid place-items-center shrink-0">
                    <f.icon className="w-5 h-5 text-[#DC2626]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-[11px] sm:text-sm text-[#DC2626] tracking-wide uppercase leading-tight">
                      {f.title}
                    </div>
                    <div className="text-[10px] sm:text-xs text-black/60 mt-0.5">
                      {f.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMUNAS */}
      <section id="comunas" className="bg-[#FFD60A] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <Badge className="bg-black text-[#FFD60A] rounded-full font-display border border-black/15">
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
                className="bg-white rounded-xl border border-black/15 px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 hover:bg-[#DC2626] hover:text-white transition group cursor-default"
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
            <Badge className="bg-black text-[#FFD60A] rounded-full font-display border border-black/15">
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
                className="rounded-2xl border border-black/10 bg-white shadow-soft-lg hover:-translate-y-1 transition"
                data-testid={`pago-${p.title.toLowerCase().replace(/\s/g, "-")}`}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFD60A] grid place-items-center border border-black/10">
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
            <Badge className="bg-[#DC2626] text-[#FFD60A] rounded-full font-display border border-black/15">
              EN LAS CALLES DE SANTIAGO
            </Badge>
            <h2 className="font-display text-3xl sm:text-5xl mt-3 text-[#DC2626] text-stroke-white-thin sm:text-stroke-white">
              YA NOS VIERON
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              { src: "cajas-helado.jpg", label: "Stock para tu negocio" },
              { src: "lifestyle-tv.jpg", label: "En tu casa" },
              { src: "produccion.jpg", label: "Hechos a mano" },
              { src: "carro-caricatura.jpg", label: "La caricatura más querida" },
            ].map((it, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-2xl overflow-hidden border border-black/10 shadow-soft-lg"
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
            className="bg-[#FFD60A] text-black rounded-3xl border border-black/15 p-7 sm:p-10 shadow-soft-lg grid lg:grid-cols-3 gap-6 items-center"
            data-testid="footer-cta"
          >
            <div className="lg:col-span-2">
              <h3 className="font-display text-2xl sm:text-4xl text-[#DC2626] text-stroke-white-thin sm:text-stroke-white">
                ¿LISTO PARA <br /> PROBAR HELADOS YORK?
              </h3>
              <p className="mt-3 text-black/80 max-w-lg text-sm sm:text-base">
                Escríbenos al WhatsApp y armamos tu pedido. Atendemos todos los
                días.
              </p>
            </div>
            <a
              href={waLink(
                "Hola Helados York! Quiero hacer un pedido o más info."
              )}
              target="_blank"
              rel="noreferrer"
              className="lg:justify-self-end"
            >
              <Button
                className="bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-display border border-black/10 text-base sm:text-lg px-6 sm:px-8 py-6 shadow-soft-lg"
                data-testid="footer-wa-cta"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> +56 9 8775 6938
              </Button>
            </a>
          </div>

          <div className="mt-10 grid sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-[#FFD60A] border border-black/10 overflow-hidden">
                  <img
                    src={img("logo-tia.jpg")}
                    alt="logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-display text-xl text-[#FFD60A]">
                    HELADOS YORK
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
              <div className="font-display text-[#FFD60A] mb-3 text-sm tracking-wider">SÍGUENOS</div>
              <div className="flex gap-3">
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 bg-white text-[#DC2626] rounded-full grid place-items-center hover:bg-[#FFD60A] transition"
                  data-testid="footer-ig"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={TIKTOK}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 bg-black rounded-full grid place-items-center border border-[#FFD60A]/40 hover:bg-[#FFD60A] hover:text-black transition"
                  data-testid="footer-tiktok"
                  aria-label="TikTok"
                >
                  <Music2 className="w-5 h-5" />
                </a>
                <a
                  href={waLink("Hola!")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-11 h-11 bg-[#25D366] rounded-full grid place-items-center hover:opacity-90 transition"
                  data-testid="footer-wa"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
              </div>
              <p className="text-xs text-white/70 mt-3">
                Instagram <span className="text-[#FFD60A]">@latiayork_santiago</span>
              </p>
              <p className="text-xs text-white/60">
                TikTok <span className="text-[#FFD60A]">@yorkloverssantiago</span>
              </p>
            </div>
          </div>

          <div className="mt-10 pt-5 border-t border-white/20 flex flex-wrap justify-between gap-3 text-[11px] sm:text-xs text-white/70">
            <div>
              © {new Date().getFullYear()} Helados York Santiago · Porteño de
              corazón
            </div>
            <div>Despacho en Región Metropolitana</div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={waLink("Hola Helados York!")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-4 right-4 z-50"
        data-testid="floating-wa"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full grid place-items-center border-2 border-white shadow-soft-lg hover:scale-110 transition">
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

      {/* CART SHEET */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 flex flex-col bg-white"
          data-testid="cart-sheet"
        >
          <SheetHeader className="px-5 pt-6 pb-4 border-b border-black/10">
            <SheetTitle className="font-display text-2xl text-[#DC2626] flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Mi pedido
              {cartCount > 0 && (
                <span className="text-sm text-black/50 font-normal">
                  ({cartCount} {cartCount === 1 ? "producto" : "productos"})
                </span>
              )}
            </SheetTitle>
          </SheetHeader>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {cartCount === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-10">
                <div className="w-20 h-20 rounded-full bg-[#FFF7CC] grid place-items-center mb-4">
                  <ShoppingCart className="w-9 h-9 text-[#DC2626]/40" />
                </div>
                <p className="font-display text-lg text-black/70">
                  Tu carrito está vacío
                </p>
                <p className="text-sm text-black/50 mt-1">
                  Agrega productos desde el catálogo
                </p>
                <Button
                  onClick={() => setCartOpen(false)}
                  className="mt-6 bg-[#DC2626] hover:bg-[#b91c1c] text-white rounded-full font-display"
                  data-testid="cart-empty-cta"
                >
                  Ver productos
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(cart).map(([id, qty]) => {
                  const p = PRODUCTS.find((x) => x.id === id);
                  if (!p) return null;
                  return (
                    <div
                      key={id}
                      className="flex gap-3 p-3 rounded-2xl border border-black/10 bg-[#FAFAFA]"
                      data-testid={`cart-item-${id}`}
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#FFF7CC] shrink-0">
                        <img
                          src={img(p.images[0])}
                          alt={p.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <div className="font-display text-[#DC2626] text-sm sm:text-base leading-tight truncate">
                              {p.title}
                            </div>
                            <div className="text-[11px] text-black/50 mt-0.5">
                              {fmtCLP(p.price)} × {qty}
                            </div>
                          </div>
                          <button
                            onClick={() => removeItem(id)}
                            className="shrink-0 w-7 h-7 rounded-full grid place-items-center text-black/40 hover:bg-[#DC2626] hover:text-white transition"
                            data-testid={`cart-remove-${id}`}
                            aria-label="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <div className="flex items-center border border-black/15 rounded-full overflow-hidden">
                            <button
                              onClick={() => updateQty(id, qty - 1)}
                              className="w-7 h-7 grid place-items-center hover:bg-black hover:text-white transition"
                              data-testid={`cart-minus-${id}`}
                              aria-label="Restar"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <div className="w-8 text-center font-display text-sm">
                              {qty}
                            </div>
                            <button
                              onClick={() => updateQty(id, qty + 1)}
                              className="w-7 h-7 grid place-items-center hover:bg-black hover:text-white transition"
                              data-testid={`cart-plus-${id}`}
                              aria-label="Sumar"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <div className="font-display text-black text-sm sm:text-base">
                            {fmtCLP(p.price * qty)}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <button
                  onClick={clearCart}
                  className="w-full mt-2 text-xs text-black/50 hover:text-[#DC2626] transition flex items-center justify-center gap-1.5 py-2"
                  data-testid="cart-clear"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Vaciar carrito
                </button>
              </div>
            )}
          </div>

          {/* Footer with total + CTA */}
          {cartCount > 0 && (
            <div className="border-t border-black/10 p-5 bg-white">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-black/50">
                    Total estimado
                  </div>
                  <div className="font-display text-3xl text-[#DC2626]">
                    {fmtCLP(cartTotal)}
                  </div>
                </div>
                <div className="text-[10px] text-black/50 text-right max-w-[50%]">
                  Confirmamos disponibilidad y despacho por WhatsApp
                </div>
              </div>
              <Button
                onClick={sendCartWA}
                className="w-full bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-display h-12 shadow-soft-lg"
                data-testid="cart-checkout"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                ENVIAR PEDIDO POR WHATSAPP
              </Button>
              <button
                onClick={() => setCartOpen(false)}
                className="w-full mt-2 text-xs text-black/50 hover:text-black transition py-1"
                data-testid="cart-continue"
              >
                Seguir comprando
              </button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
