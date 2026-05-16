import React, { useState } from "react";
import {
  Phone,
  MessageCircle,
  ShoppingCart,
  MapPin,
  Truck,
  Star,
  Instagram,
  Snowflake,
  Heart,
  CheckCircle2,
  ChevronRight,
  Music2,
  Package,
  Sun,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { toast, Toaster } from "sonner";

const WHATSAPP = "56987756938";
const LOGO_URL =
  "https://customer-assets.emergentagent.com/job_b8e56e60-17b7-4a9d-892f-40048e3a7410/artifacts/ne2sqm86_Image2.jpeg";
const FLYER_URL =
  "https://customer-assets.emergentagent.com/job_b8e56e60-17b7-4a9d-892f-40048e3a7410/artifacts/xnu6r3uj_Image1.jpeg";

const waLink = (msg) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const FLAVORS = [
  { name: "Frutilla", color: "#E11D48", emoji: "🍓" },
  { name: "Piña", color: "#FACC15", emoji: "🍍" },
  { name: "Mora", color: "#7C3AED", emoji: "🫐" },
  { name: "Mango", color: "#F97316", emoji: "🥭" },
  { name: "Coco", color: "#F5F5F4", emoji: "🥥" },
  { name: "Chocolate", color: "#78350F", emoji: "🍫" },
  { name: "Vainilla", color: "#FDE68A", emoji: "🍦" },
  { name: "Limón", color: "#A3E635", emoji: "🍋" },
];

const BOXES = [
  {
    id: "leche",
    title: "Caja de Leche",
    subtitle: "El cremoso porteño",
    price: 17000,
    unitPrice: 261,
    count: 65,
    accent: "#DC2626",
    bgFrom: "#FFF7CC",
    bgTo: "#FFD60A",
    paletas: ["#FCE7A0", "#F5F5F4", "#FCD7B6", "#F8CACA", "#E8C7E1"],
    bullets: ["65 paletas surtidas", "5 sabores cremosos", "Base láctea artesanal"],
  },
  {
    id: "agua",
    title: "Caja de Agua",
    subtitle: "Frutal y refrescante",
    price: 13500,
    unitPrice: 207,
    count: 65,
    accent: "#1D4ED8",
    bgFrom: "#DBEAFE",
    bgTo: "#93C5FD",
    paletas: ["#E11D48", "#F97316", "#7C3AED", "#A3E635", "#FACC15"],
    bullets: ["65 paletas surtidas", "5 sabores frutales", "100% pulpa natural"],
  },
];

const NORTH_REGIONS = [
  { name: "Coquimbo", city: "La Serena" },
  { name: "Atacama", city: "Copiapó" },
  { name: "Antofagasta", city: "Antofagasta" },
  { name: "Tarapacá", city: "Iquique" },
  { name: "Arica y Parinacota", city: "Arica" },
  { name: "Valparaíso", city: "Viña / Valpo" },
];

const STEPS = [
  {
    n: "01",
    title: "Elige tu caja",
    text: "Caja de leche, de agua o un mix de sabores. Para tu casa o tu negocio.",
    icon: Package,
  },
  {
    n: "02",
    title: "Escríbenos al WhatsApp",
    text: "Coordinamos sabores, cantidad y dirección. Te confirmamos en minutos.",
    icon: MessageCircle,
  },
  {
    n: "03",
    title: "Recibe tu pedido frío",
    text: "Despacho en Santiago RM y envíos al norte de Chile manteniendo la cadena de frío.",
    icon: Truck,
  },
];

const TESTIMONIOS = [
  {
    nombre: "Camila R.",
    ciudad: "Ñuñoa, Santiago",
    texto: "Me llegaron los helados súper bien empacados. Los de frutilla son una locura, sabor real.",
    estrellas: 5,
  },
  {
    nombre: "Almacén Don Pepe",
    ciudad: "La Serena",
    texto: "Pedimos al por mayor para el almacén. Excelente margen y los clientes los aman.",
    estrellas: 5,
  },
  {
    nombre: "Javier M.",
    ciudad: "Maipú",
    texto: "Mis hijos crecieron comiendo York en Valpo, increíble que llegue ahora a Santiago.",
    estrellas: 5,
  },
];

const fmtCLP = (n) =>
  "$" + n.toLocaleString("es-CL");

export default function Home() {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((c) => ({ ...c, [item.id]: (c[item.id] || 0) + 1 }));
    toast.success(`${item.title} agregada al pedido`, {
      description: "Tu pedido se enviará por WhatsApp",
      duration: 1800,
    });
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, q]) => {
    const it = BOXES.find((b) => b.id === id);
    return sum + (it ? it.price * q : 0);
  }, 0);

  const sendCartWA = () => {
    if (cartCount === 0) {
      toast("Tu pedido está vacío", { description: "Agrega al menos una caja" });
      return;
    }
    const lines = Object.entries(cart).map(([id, q]) => {
      const it = BOXES.find((b) => b.id === id);
      return `• ${q} x ${it.title} (${fmtCLP(it.price * q)})`;
    });
    const msg = `¡Hola Helados York Santiago! 🍦\n\nQuiero hacer este pedido:\n${lines.join(
      "\n"
    )}\n\nTotal estimado: ${fmtCLP(cartTotal)}\n\n¿Me confirman disponibilidad y despacho?`;
    window.open(waLink(msg), "_blank");
  };

  return (
    <div className="min-h-screen bg-[#FFD60A] overflow-x-hidden" data-testid="home-root">
      <Toaster position="top-center" richColors />

      {/* TOP MARQUEE */}
      <div className="bg-[#DC2626] text-[#FFD60A] py-2 overflow-hidden font-display text-sm border-b-4 border-black">
        <div className="marquee-track gap-12 whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-12 px-6">
              <span>🍦 EL HELADO DE PLAYA ANCHA AHORA EN SANTIAGO</span>
              <span>★</span>
              <span>📦 VENTA POR MAYOR Y AL DETALLE</span>
              <span>★</span>
              <span>🚚 DESPACHO A LA ZONA NORTE DE CHILE</span>
              <span>★</span>
              <span>🤍 PORTEÑO DE CORAZÓN</span>
              <span>★</span>
            </div>
          ))}
        </div>
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-40 bg-[#FFD60A] border-b-4 border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3" data-testid="nav-logo">
            <div className="w-12 h-12 rounded-full bg-white border-4 border-[#DC2626] overflow-hidden grid place-items-center sticker">
              <img src={LOGO_URL} alt="York" className="w-full h-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-[#DC2626] text-lg">HELADOS YORK</div>
              <div className="font-script text-black text-base -mt-1">Santiago</div>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-7 font-display text-sm">
            <a href="#productos" className="hover:text-[#DC2626] transition" data-testid="nav-productos">PRODUCTOS</a>
            <a href="#mayorista" className="hover:text-[#DC2626] transition" data-testid="nav-mayorista">MAYORISTA</a>
            <a href="#como" className="hover:text-[#DC2626] transition" data-testid="nav-como">CÓMO PEDIR</a>
            <a href="#redes" className="hover:text-[#DC2626] transition" data-testid="nav-redes">REDES</a>
          </div>
          <div className="flex items-center gap-2">
            <Button
              data-testid="nav-cart-btn"
              onClick={sendCartWA}
              variant="outline"
              className="border-2 border-black bg-white hover:bg-[#DC2626] hover:text-white font-display rounded-full"
            >
              <ShoppingCart className="w-4 h-4 mr-1" /> {cartCount}
            </Button>
            <a
              href={waLink("¡Hola! Quiero información sobre los helados.")}
              target="_blank"
              rel="noreferrer"
              data-testid="nav-wa-btn"
            >
              <Button className="bg-[#25D366] hover:bg-[#1da851] text-white border-2 border-black rounded-full font-display">
                <MessageCircle className="w-4 h-4 mr-1" /> WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="relative halftone-bg overflow-hidden">
        {/* Sun rays */}
        <div className="pointer-events-none absolute -top-32 -right-32 w-[640px] h-[640px] rounded-full bg-[#FFB703]/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 w-[520px] h-[520px] rounded-full bg-[#DC2626]/20 blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-20 grid lg:grid-cols-12 gap-10 items-center relative">
          <div className="lg:col-span-7 relative z-10">
            <Badge className="bg-[#DC2626] text-[#FFD60A] border-2 border-black rounded-full font-display px-4 py-1 tilt-l" data-testid="hero-badge">
              🎉 NUEVA SUCURSAL EN SANTIAGO RM
            </Badge>

            <h1
              className="font-display mt-6 text-[#DC2626] text-stroke-white text-5xl sm:text-6xl lg:text-7xl leading-[0.95]"
              data-testid="hero-title"
            >
              EL HELADO <br />
              MÁS QUERIDO <br />
              <span className="text-black">DE PLAYA ANCHA</span> <br />
              <span className="font-script text-black text-stroke-white text-6xl">ahora en tu barrio</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-black/80 font-medium" data-testid="hero-sub">
              Paletas artesanales hechas con pasión, sabor real y mucho corazón porteño.
              Pide al detalle o por mayor — despachamos en toda Santiago y al norte de Chile.
            </p>

            <div className="mt-8 flex flex-wrap gap-3" data-testid="hero-ctas">
              <a href="#productos">
                <Button
                  className="bg-[#DC2626] hover:bg-[#b91c1c] text-white border-4 border-black rounded-full font-display text-base px-7 py-6 shadow-[6px_6px_0_0_#000]"
                  data-testid="hero-ver-productos"
                >
                  VER PRODUCTOS <ChevronRight className="w-5 h-5 ml-1" />
                </Button>
              </a>
              <a
                href={waLink("¡Hola! Quiero hacer un pedido de Helados York 🍦")}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  className="bg-white hover:bg-black hover:text-white text-black border-4 border-black rounded-full font-display text-base px-7 py-6 shadow-[6px_6px_0_0_#DC2626]"
                  data-testid="hero-pedir-wa"
                >
                  <MessageCircle className="w-5 h-5 mr-2" /> PEDIR POR WHATSAPP
                </Button>
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#DC2626]" />
                Despacho RM mismo día
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#DC2626]" />
                Cadena de frío garantizada
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#DC2626]" />
                65 paletas por caja
              </div>
            </div>
          </div>

          {/* Right - logo flyer */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -top-6 -left-6 spin-slow">
                <div className="burst font-display text-center text-xs leading-tight">
                  HELADOS<br/>ARTESANALES
                </div>
              </div>
              <div className="absolute -bottom-4 -right-6 z-20 floaty">
                <div className="bg-[#DC2626] text-[#FFD60A] font-display rounded-2xl border-4 border-black px-4 py-3 tilt-r shadow-[6px_6px_0_0_#000]">
                  <div className="text-xs">DESDE</div>
                  <div className="text-3xl">$13.500</div>
                  <div className="text-xs">la caja</div>
                </div>
              </div>
              <img
                src={LOGO_URL}
                alt="Helados York Santiago"
                className="w-full rounded-3xl border-[6px] border-black shadow-[12px_12px_0_0_#DC2626] sticker"
                data-testid="hero-logo-img"
              />
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <svg className="wave-divider text-white" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path fill="currentColor" d="M0,30 Q120,60 240,30 T480,30 T720,30 T960,30 T1200,30 T1440,30 V60 H0 Z" />
        </svg>
      </header>

      {/* PRODUCTOS */}
      <section id="productos" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-12">
            <div>
              <Badge className="bg-black text-[#FFD60A] rounded-full font-display border-2 border-black" data-testid="prod-badge">
                NUESTRO CATÁLOGO
              </Badge>
              <h2 className="font-display text-5xl sm:text-6xl text-[#DC2626] text-stroke-white mt-3" data-testid="prod-title">
                ELIGE TU CAJA
              </h2>
              <p className="text-black/70 max-w-xl mt-2">
                Cajas de 65 paletas con 5 sabores surtidos. Perfectas para almacenes, kioscos,
                colegios, cumpleaños o para llenar el freezer de casa.
              </p>
            </div>
            <div className="flex items-center gap-2 font-script text-2xl text-black">
              <Snowflake className="w-6 h-6 text-[#1D4ED8]" />
              Mantén la cadena de frío
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8" data-testid="boxes-grid">
            {BOXES.map((box) => (
              <Card
                key={box.id}
                className="product-card relative overflow-hidden rounded-[28px] border-[5px] border-black shadow-[10px_10px_0_0_#000] bg-white"
                data-testid={`box-card-${box.id}`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-2"
                  style={{ background: box.accent }}
                />
                <CardContent className="p-0">
                  <div className="grid grid-cols-5 gap-0">
                    <div
                      className="col-span-2 relative aspect-square overflow-hidden flex items-end justify-center pb-4"
                      style={{
                        background: `linear-gradient(160deg, ${box.bgFrom} 0%, ${box.bgTo} 100%)`,
                      }}
                    >
                      {/* CSS Paletas */}
                      <div className="flex items-end gap-1 sm:gap-2">
                        {box.paletas.map((c, i) => (
                          <div
                            key={i}
                            className="relative"
                            style={{
                              transform: `rotate(${(i - 2) * 6}deg) translateY(${
                                Math.abs(i - 2) * 4
                              }px)`,
                            }}
                          >
                            <div
                              className="w-7 sm:w-9 h-20 sm:h-24 rounded-t-[18px] rounded-b-md border-[3px] border-black"
                              style={{ background: c }}
                            />
                            <div className="w-1.5 h-7 bg-amber-900 mx-auto -mt-1 rounded-b-sm border border-black/30" />
                          </div>
                        ))}
                      </div>
                      <div
                        className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-display border-2 border-black"
                        style={{ background: box.accent, color: "white" }}
                      >
                        {box.id === "leche" ? "BASE LECHE" : "BASE AGUA"}
                      </div>
                    </div>
                    <div className="col-span-3 p-6 flex flex-col">
                      <div className="font-script text-xl text-black/60">{box.subtitle}</div>
                      <h3
                        className="font-display text-3xl"
                        style={{ color: box.accent }}
                        data-testid={`box-title-${box.id}`}
                      >
                        {box.title}
                      </h3>

                      <ul className="mt-3 space-y-1 text-sm text-black/80">
                        {box.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-2">
                            <CheckCircle2
                              className="w-4 h-4"
                              style={{ color: box.accent }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex items-end justify-between gap-3">
                        <div>
                          <div
                            className="font-display text-4xl"
                            style={{ color: box.accent }}
                            data-testid={`box-price-${box.id}`}
                          >
                            {fmtCLP(box.price)}
                          </div>
                          <div className="text-xs text-black/60">
                            ≈ {fmtCLP(box.unitPrice)} c/paleta
                          </div>
                        </div>
                        <Button
                          onClick={() => addToCart(box)}
                          className="rounded-full font-display border-[3px] border-black shadow-[4px_4px_0_0_#000] hover:translate-y-[-2px] transition"
                          style={{ background: box.accent, color: "white" }}
                          data-testid={`box-add-${box.id}`}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" /> AGREGAR
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cart strip */}
          {cartCount > 0 && (
            <div
              className="mt-8 bg-black text-[#FFD60A] rounded-2xl border-4 border-[#DC2626] p-5 flex flex-wrap justify-between items-center gap-4 shadow-[8px_8px_0_0_#DC2626]"
              data-testid="cart-strip"
            >
              <div className="font-display">
                🛒 TIENES {cartCount} {cartCount === 1 ? "CAJA" : "CAJAS"} · TOTAL {fmtCLP(cartTotal)}
              </div>
              <Button
                onClick={sendCartWA}
                className="bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-display border-2 border-white"
                data-testid="cart-send-wa"
              >
                <MessageCircle className="w-4 h-4 mr-1" /> ENVIAR PEDIDO POR WHATSAPP
              </Button>
            </div>
          )}

          {/* Sabores */}
          <div className="mt-20">
            <h3 className="font-display text-4xl text-black" data-testid="flavors-title">
              SABORES <span className="text-[#DC2626]">SURTIDOS</span>
            </h3>
            <p className="text-black/70 mt-1">
              Cada caja viene con un mix selecto. ¿Tienes un sabor favorito? Pídelo en tu mensaje.
            </p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4" data-testid="flavors-grid">
              {FLAVORS.map((f) => (
                <div
                  key={f.name}
                  className="group relative aspect-square rounded-2xl border-[3px] border-black bg-white p-3 flex flex-col items-center justify-center text-center shadow-[5px_5px_0_0_#000] hover:-translate-y-1 transition"
                  data-testid={`flavor-${f.name.toLowerCase()}`}
                >
                  <div
                    className="w-14 h-20 rounded-t-full rounded-b-md mb-2 wobble border-2 border-black"
                    style={{ background: f.color }}
                  >
                    <div className="w-1.5 h-6 bg-amber-900 mx-auto mt-[60px] rounded" />
                  </div>
                  <div className="font-display text-sm">{f.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAYORISTA NORTE */}
      <section id="mayorista" className="relative bg-[#DC2626] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.5) 1.2px, transparent 1.2px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Badge className="bg-[#FFD60A] text-black rounded-full font-display border-2 border-black" data-testid="mayor-badge">
                <Truck className="w-4 h-4 mr-1" /> DESPACHO AL NORTE DE CHILE
              </Badge>
              <h2 className="font-display text-5xl sm:text-6xl mt-4 text-[#FFD60A] text-stroke-white" data-testid="mayor-title">
                ¿TIENES UN ALMACÉN <br /> EN EL NORTE?
              </h2>
              <p className="mt-4 text-white/90 max-w-xl text-lg">
                Conviértete en distribuidor oficial de Helados York Santiago.
                Precios mayoristas, márgenes ricos y la marca porteña que todos
                quieren probar — ahora llegando a tu región.
              </p>

              <div className="mt-7 grid sm:grid-cols-2 gap-3">
                {NORTH_REGIONS.map((r) => (
                  <div
                    key={r.name}
                    className="bg-black/30 backdrop-blur rounded-xl border-2 border-[#FFD60A]/40 px-4 py-3 flex items-center gap-3"
                    data-testid={`region-${r.name.toLowerCase().replace(/\s/g, "-")}`}
                  >
                    <MapPin className="w-5 h-5 text-[#FFD60A] shrink-0" />
                    <div>
                      <div className="font-display text-sm text-[#FFD60A]">{r.name}</div>
                      <div className="text-xs text-white/70">{r.city}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={waLink(
                  "¡Hola! Estoy en la zona norte y me interesa vender Helados York en mi negocio. ¿Me cuentas precios mayoristas?"
                )}
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  className="mt-8 bg-[#FFD60A] hover:bg-[#FFB703] text-black border-4 border-black rounded-full font-display text-base px-7 py-6 shadow-[6px_6px_0_0_#000]"
                  data-testid="mayor-cta-wa"
                >
                  <MessageCircle className="w-5 h-5 mr-2" /> QUIERO SER DISTRIBUIDOR
                </Button>
              </a>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Stylized Chile map representation */}
                <div className="absolute inset-0 grid place-items-center">
                  <div className="relative w-56 h-[420px]">
                    <div className="absolute inset-0 bg-[#FFD60A] rounded-[40%_60%_60%_40%_/_30%_30%_70%_70%] opacity-90 border-4 border-black sticker" />
                    {[
                      { top: "8%", label: "Arica" },
                      { top: "20%", label: "Iquique" },
                      { top: "32%", label: "Antofagasta" },
                      { top: "44%", label: "Copiapó" },
                      { top: "56%", label: "La Serena" },
                      { top: "68%", label: "Valpo" },
                      { top: "78%", label: "Santiago", santiago: true },
                    ].map((p, i) => (
                      <div
                        key={p.label}
                        className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2"
                        style={{ top: p.top }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full border-2 border-black ${
                            p.santiago ? "bg-[#DC2626]" : "bg-white"
                          }`}
                        />
                        <span className={`font-display text-xs ${p.santiago ? "text-[#DC2626] bg-black px-2 rounded-full" : "text-black"}`}>
                          {p.label}
                        </span>
                      </div>
                    ))}
                    <Truck className="absolute -right-6 top-1/3 w-12 h-12 text-black floaty" />
                    <Sun className="absolute -left-8 top-6 w-10 h-10 text-[#FFD60A] spin-slow drop-shadow" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CÓMO PEDIR */}
      <section id="como" className="bg-[#FFD60A] py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-black text-[#FFD60A] rounded-full font-display border-2 border-black" data-testid="how-badge">
              FÁCIL Y RÁPIDO
            </Badge>
            <h2 className="font-display text-5xl sm:text-6xl mt-3 text-[#DC2626] text-stroke-white" data-testid="how-title">
              CÓMO PEDIR
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <Card
                key={s.n}
                className={`rounded-3xl border-[5px] border-black bg-white shadow-[8px_8px_0_0_#000] product-card ${
                  i % 2 === 0 ? "tilt-l" : "tilt-r"
                }`}
                data-testid={`step-${s.n}`}
              >
                <CardContent className="p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-6xl text-[#DC2626]/20">{s.n}</span>
                    <div className="w-14 h-14 rounded-2xl bg-[#DC2626] text-white grid place-items-center border-4 border-black">
                      <s.icon className="w-7 h-7" />
                    </div>
                  </div>
                  <h3 className="font-display text-2xl mt-2">{s.title}</h3>
                  <p className="text-black/70 mt-2">{s.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TABS: Detalle vs Mayorista */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-display text-4xl sm:text-5xl text-center text-[#DC2626] text-stroke-white" data-testid="tabs-title">
            ¿DETALLE O POR MAYOR?
          </h2>
          <p className="text-center text-black/70 mt-2 mb-8">Te damos buen precio en cualquiera de los dos.</p>

          <Tabs defaultValue="detalle" className="w-full" data-testid="tabs-wrap">
            <TabsList className="grid w-full grid-cols-2 bg-[#FFD60A] border-4 border-black rounded-full p-1 h-auto">
              <TabsTrigger
                value="detalle"
                className="font-display rounded-full data-[state=active]:bg-[#DC2626] data-[state=active]:text-white"
                data-testid="tab-detalle"
              >
                AL DETALLE
              </TabsTrigger>
              <TabsTrigger
                value="mayor"
                className="font-display rounded-full data-[state=active]:bg-[#DC2626] data-[state=active]:text-white"
                data-testid="tab-mayor"
              >
                POR MAYOR
              </TabsTrigger>
            </TabsList>

            <TabsContent value="detalle">
              <Card className="mt-6 rounded-3xl border-[4px] border-black shadow-[8px_8px_0_0_#FFD60A]">
                <CardContent className="p-7 grid sm:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="font-display text-3xl">PARA TU CASA 🏠</h3>
                    <p className="text-black/70 mt-2">
                      Pide 1 o más cajas para el freezer. Coordina horario y dirección
                      en Santiago RM. Entrega refrigerada.
                    </p>
                    <ul className="mt-4 space-y-1 text-sm">
                      <li>✓ Mínimo 1 caja</li>
                      <li>✓ Pago por transferencia o efectivo</li>
                      <li>✓ Entrega en 24-48 horas</li>
                    </ul>
                  </div>
                  <div className="bg-[#FFD60A] rounded-2xl p-6 border-4 border-black text-center">
                    <div className="font-script text-xl">desde</div>
                    <div className="font-display text-5xl text-[#DC2626]">$13.500</div>
                    <div className="text-sm">por caja de 65 paletas</div>
                    <a
                      href={waLink("Hola, quiero comprar al detalle para mi casa 🏠")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button className="mt-4 bg-black text-[#FFD60A] hover:bg-[#DC2626] hover:text-white rounded-full font-display" data-testid="tab-detalle-cta">
                        <MessageCircle className="w-4 h-4 mr-1" /> PEDIR AHORA
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mayor">
              <Card className="mt-6 rounded-3xl border-[4px] border-black shadow-[8px_8px_0_0_#FFD60A]">
                <CardContent className="p-7 grid sm:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="font-display text-3xl">PARA TU NEGOCIO 🏪</h3>
                    <p className="text-black/70 mt-2">
                      Almacenes, kioscos, ferias, colegios y carros heladeros.
                      Precios especiales desde 5 cajas. Despacho al norte coordinado.
                    </p>
                    <ul className="mt-4 space-y-1 text-sm">
                      <li>✓ Desde 5 cajas — descuento</li>
                      <li>✓ Coordinación de cadena de frío</li>
                      <li>✓ Facturación disponible</li>
                    </ul>
                  </div>
                  <div className="bg-[#FFD60A] rounded-2xl p-6 border-4 border-black text-center">
                    <div className="font-script text-xl">precios</div>
                    <div className="font-display text-5xl text-[#DC2626]">MAYORISTAS</div>
                    <div className="text-sm">cotiza por WhatsApp</div>
                    <a
                      href={waLink("Hola, quiero precios mayoristas. Mi negocio: ____ Región: ____")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button className="mt-4 bg-black text-[#FFD60A] hover:bg-[#DC2626] hover:text-white rounded-full font-display" data-testid="tab-mayor-cta">
                        <MessageCircle className="w-4 h-4 mr-1" /> COTIZAR MAYORISTA
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section className="bg-[#FFD60A] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <Badge className="bg-black text-[#FFD60A] rounded-full font-display border-2 border-black" data-testid="rev-badge">
              <Heart className="w-4 h-4 mr-1 text-[#DC2626] fill-[#DC2626]" /> AMADO POR LA GENTE
            </Badge>
            <h2 className="font-display text-5xl mt-3 text-[#DC2626] text-stroke-white" data-testid="rev-title">
              LO QUE DICEN <br/> NUESTROS CLIENTES
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIOS.map((t, i) => (
              <Card
                key={t.nombre}
                className={`rounded-3xl border-[4px] border-black bg-white shadow-[8px_8px_0_0_#DC2626] product-card ${
                  i === 1 ? "md:-translate-y-4" : ""
                }`}
                data-testid={`testi-${i}`}
              >
                <CardContent className="p-6">
                  <div className="flex gap-1">
                    {Array.from({ length: t.estrellas }).map((_, k) => (
                      <Star key={k} className="w-4 h-4 fill-[#FFD60A] text-[#DC2626]" />
                    ))}
                  </div>
                  <p className="mt-3 text-black/85 italic">"{t.texto}"</p>
                  <div className="mt-4 flex items-center gap-3 pt-4 border-t border-black/10">
                    <div className="w-10 h-10 rounded-full bg-[#DC2626] text-white grid place-items-center font-display border-2 border-black">
                      {t.nombre[0]}
                    </div>
                    <div>
                      <div className="font-display text-sm">{t.nombre}</div>
                      <div className="text-xs text-black/60">{t.ciudad}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* REDES SOCIALES */}
      <section id="redes" className="bg-black text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "linear-gradient(45deg, transparent 49%, #FFD60A 49% 51%, transparent 51%)",
            backgroundSize: "30px 30px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="bg-[#FFD60A] text-black rounded-full font-display border-2 border-white" data-testid="social-badge">
                SÍGUENOS
              </Badge>
              <h2 className="font-display text-5xl sm:text-6xl mt-3 text-[#FFD60A] text-stroke-white" data-testid="social-title">
                CONÉCTATE CON <br /> @yorkloverssantiago
              </h2>
              <p className="text-white/80 mt-4 max-w-md">
                Mira videos, sabores nuevos, promos y los lugares donde puedes
                encontrar nuestras paletas frías.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href="https://www.tiktok.com/@yorkloverssantiago"
                  target="_blank"
                  rel="noreferrer"
                  data-testid="tiktok-link"
                >
                  <Button className="bg-[#FFD60A] hover:bg-white text-black rounded-full font-display border-4 border-white shadow-[6px_6px_0_0_#DC2626] px-6 py-6">
                    <Music2 className="w-5 h-5 mr-2" /> SEGUIR EN TIKTOK
                  </Button>
                </a>
                <a
                  href={waLink("¡Hola! Quiero pedir Helados York 🍦")}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="social-wa-link"
                >
                  <Button className="bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-display border-4 border-white px-6 py-6">
                    <MessageCircle className="w-5 h-5 mr-2" /> WHATSAPP DIRECTO
                  </Button>
                </a>
                <a href="#" data-testid="social-ig-link">
                  <Button variant="outline" className="bg-transparent text-white hover:bg-white hover:text-black rounded-full font-display border-4 border-white px-6 py-6">
                    <Instagram className="w-5 h-5 mr-2" /> INSTAGRAM
                  </Button>
                </a>
              </div>
            </div>

            {/* Phone mockup with TikTok preview */}
            <div className="relative mx-auto">
              <div className="relative w-[280px] h-[560px] mx-auto bg-black rounded-[40px] border-[10px] border-[#FFD60A] shadow-[12px_12px_0_0_#DC2626] overflow-hidden">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full border border-white/20 z-20" />
                <img
                  src={FLYER_URL}
                  alt="TikTok preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-16 text-white">
                  <div className="font-display text-sm">@yorkloverssantiago</div>
                  <div className="text-xs text-white/80 mt-1">🍦 El helado más rico de Playa Ancha ahora en Santiago #helados #santiago</div>
                </div>
                <div className="absolute right-3 bottom-20 flex flex-col gap-4 items-center text-white">
                  <Heart className="w-7 h-7 fill-[#DC2626] text-[#DC2626]" />
                  <MessageCircle className="w-7 h-7" />
                  <Music2 className="w-7 h-7" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER / CTA FINAL */}
      <footer className="bg-[#DC2626] text-white pt-16 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="bg-[#FFD60A] text-black rounded-3xl border-[6px] border-black p-8 sm:p-12 shadow-[10px_10px_0_0_#000] grid lg:grid-cols-3 gap-6 items-center" data-testid="footer-cta">
            <div className="lg:col-span-2">
              <h3 className="font-display text-4xl sm:text-5xl text-[#DC2626] text-stroke-white">
                ¿LISTO PARA <br/> ENDULZAR EL DÍA? 🍦
              </h3>
              <p className="mt-3 text-black/80 max-w-lg">
                Escríbenos al WhatsApp y armamos tu pedido. Atendemos todos los días.
              </p>
            </div>
            <a
              href={waLink("¡Hola Helados York! Quiero hacer un pedido 🍦")}
              target="_blank"
              rel="noreferrer"
              className="lg:justify-self-end"
            >
              <Button className="bg-[#25D366] hover:bg-[#1da851] text-white rounded-full font-display border-4 border-black text-lg px-8 py-7 shadow-[6px_6px_0_0_#000]" data-testid="footer-wa-cta">
                <MessageCircle className="w-6 h-6 mr-2" /> +56 9 8775 6938
              </Button>
            </a>
          </div>

          <div className="mt-12 grid sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-white border-4 border-black overflow-hidden">
                  <img src={LOGO_URL} alt="logo" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-display text-2xl text-[#FFD60A]">HELADOS YORK</div>
                  <div className="font-script text-xl -mt-1">Santiago</div>
                </div>
              </div>
              <p className="mt-3 text-white/80 text-sm">
                Porteño de corazón 🤍❤️ · Atendemos Santiago RM y zona norte de Chile.
              </p>
            </div>

            <div>
              <div className="font-display text-[#FFD60A] mb-3">CONTACTO</div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> +56 9 8775 6938
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Santiago, Región Metropolitana
                </li>
                <li className="flex items-center gap-2">
                  <Truck className="w-4 h-4" /> Despacho al norte coordinado
                </li>
              </ul>
            </div>

            <div>
              <div className="font-display text-[#FFD60A] mb-3">SÍGUENOS</div>
              <div className="flex gap-3">
                <a href="https://www.tiktok.com/@yorkloverssantiago" target="_blank" rel="noreferrer"
                  className="w-12 h-12 bg-black rounded-full grid place-items-center border-2 border-[#FFD60A] hover:bg-[#FFD60A] hover:text-black transition" data-testid="footer-tiktok">
                  <Music2 className="w-5 h-5" />
                </a>
                <a href={waLink("Hola!")} target="_blank" rel="noreferrer"
                  className="w-12 h-12 bg-[#25D366] rounded-full grid place-items-center border-2 border-white" data-testid="footer-wa">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="#"
                  className="w-12 h-12 bg-black rounded-full grid place-items-center border-2 border-[#FFD60A] hover:bg-[#FFD60A] hover:text-black transition" data-testid="footer-ig">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/20 flex flex-wrap justify-between gap-3 text-xs text-white/70">
            <div>© {new Date().getFullYear()} Helados York Santiago · Porteño de corazón</div>
            <div>Mockup visual — sin transacciones reales</div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href={waLink("¡Hola Helados York! 🍦")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-50"
        data-testid="floating-wa"
      >
        <div className="w-16 h-16 bg-[#25D366] rounded-full grid place-items-center border-4 border-white shadow-[6px_6px_0_0_#000] hover:scale-110 transition floaty">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
      </a>
    </div>
  );
}
