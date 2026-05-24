"use client";

import Image from "next/image";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Menu,
  Camera,
  Phone,
  Utensils,
  X,
} from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";

type MenuItem = {
  name: string;
  price: string;
  description?: string;
};

type MenuSection = {
  title: string;
  note?: string;
  items: MenuItem[];
  details?: {
    entrada?: string[];
    platosDeFondo?: string[];
    postre?: string[];
  };
};

type Hour = {
  day: string;
  time: string;
};

const restaurant = {
  name: "Café del Pintor",
  subtitle: "Cerro Alegre · Valparaíso",
  address: "Urriola 652, Cerro Alegre, Valparaíso, Chile",
  email: "cafedelpintor@hotmail.com",
  phones: ["+56 32 363 3037", "+56 32 223 7023"],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Cafe%20del%20Pintor%20Urriola%20652%20Valparaiso",
  mapsEmbed:
    "https://www.google.com/maps?q=Cafe%20del%20Pintor%20Urriola%20652%20Valparaiso&output=embed",
  instagramUrl: "https://www.instagram.com/cafedelpintor/?hl=es-la",
};

const WHATSAPP_NUMBER = "56945919063";

const navItems = [
  { label: "Inicio", href: "#inicio" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Carta", href: "#carta" },
  { label: "Reserva", href: "#reserva" },
  { label: "Horario", href: "#horario" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Contacto", href: "#contacto" },
];

const hours: Hour[] = [
  { day: "Lunes", time: "13:00 - 22:00" },
  { day: "Martes", time: "13:00 - 22:00" },
  { day: "Miércoles", time: "13:00 - 22:00" },
  { day: "Jueves", time: "13:00 - 23:45" },
  { day: "Viernes", time: "13:00 - 23:45" },
  { day: "Sábado", time: "13:00 - 23:45" },
  { day: "Domingo", time: "13:00 - 23:45" },
];

const menuSections: MenuSection[] = [
  {
    title: "Menú",
    note: "Incluye entrada, plato de fondo y postre.",
    items: [
      {
        name: "Menú Café del Pintor",
        price: "$14.990",
        description:
          "Entrada a elección, plato de fondo a elección y postre.",
      },
    ],
    details: {
      entrada: ["Crema de Vegetales", "Ensalada Mixta"],
      platosDeFondo: [
        "Pastel de Choclo",
        "Merluza austral/Reineta al limón con Arroz a la Valenciana",
        "Chupe de Mariscos",
        "Carne al Jugo con Puré Rústico",
        "Suprema de Ave con reducción de Merlot y Verduras al Wok",
        "Fetuccini en salsa de Salmón Ahumado",
        "Lomito de cerdo en salsa de Champiñones con Puré a la Crema",
        "Fetuccini Vegetariano",
        "Couscous al curry con Champiñones y verduras salteadas",
      ],
      postre: ["Mousse de Maracuyá", "Café de Grano"],
    },
  },
  {
    title: "Ensaladas",
    items: [
      {
        name: "Griega",
        price: "$11.500",
        description: "Ensalada de tomate, lechuga y queso blanco.",
      },
      {
        name: "Pacífico",
        price: "$11.500",
        description:
          "Ensalada de lechuga, tomate, atún desmenuzado, camarones y cebolla.",
      },
    ],
  },
  {
    title: "Empanadas",
    items: [
      {
        name: "Tabla de 3 empanadas fritas",
        price: "$14.000",
        description:
          "Combínalas como tú quieras: mariscos, queso y camarón, o queso.",
      },
    ],
  },
  {
    title: "Para picar",
    items: [
      {
        name: "Alitas BBQ",
        price: "$13.900",
        description:
          "Tabla de 8 trutos de alitas, papas fritas, aros de cebolla y 3 salsas.",
      },
      {
        name: "Tabla queso, jamón y sevillanas",
        price: "$9.800",
        description: "Tabla para compartir.",
      },
      {
        name: "Nuggets",
        price: "$10.500",
        description:
          "Tabla de 8 nuggets, papas fritas con salsa de ajo o bigmac.",
      },
    ],
  },
  {
    title: "Platos de fondo",
    items: [
      {
        name: "Lomo liso con papas salteadas",
        price: "$13.900",
        description:
          "Lomo liso con papas salteadas al ajillo y merkén con reducción de Merlot.",
      },
      {
        name: "Salmón con couscous de champiñones",
        price: "$13.900",
        description:
          "Salmón con salsa de naranja y couscous al curry con champiñones.",
      },
      {
        name: "Quiché de pollo",
        price: "$12.900",
        description: "Quiché de pollo, pimentón y queso con ensalada mixta.",
      },
      {
        name: "Fetuccini vegetariano",
        price: "$12.900",
        description: "Fetuccini con verduras al wok a la crema o aceite de oliva.",
      },
      {
        name: "Quiché de brócoli",
        price: "$12.900",
        description: "Quiché de brócoli, espinaca y queso con ensalada mixta.",
      },
      {
        name: "Couscous con verduras al wok",
        price: "$12.900",
        description: "Couscous al curry con champiñones y verduras salteadas.",
      },
    ],
  },
  {
    title: "Hamburguesas",
    items: [
      {
        name: "Gringo Burger",
        price: "$10.990",
        description:
          "2 hamburguesas de 100 grs de carne de vacuno, lechuga, tomate, aros de cebolla, pepinillos, cheddar y tocino, acompañadas de papas fritas.",
      },
      {
        name: "Camarón Burger",
        price: "$10.990",
        description:
          "2 hamburguesas de 100 grs de carne de vacuno, lechuga, tomate, aros de cebolla, pepinillos, cheddar y camarones, acompañadas de papas fritas.",
      },
      {
        name: "Queen Burger",
        price: "$11.500",
        description:
          "2 hamburguesas de 100 grs de carne de vacuno, lechuga, tomate, aros de cebolla, pepinillos, cheddar, tocino y camarones, acompañadas de papas fritas.",
      },
    ],
  },
  {
    title: "Para los niños",
    note: "Incluye postre.",
    items: [
      {
        name: "Fetuccini con suprema de ave",
        price: "$10.500",
        description: "Fetuccini a la mantequilla con suprema de ave.",
      },
      {
        name: "Puré con suprema de ave",
        price: "$10.500",
        description: "Puré a la crema con suprema de ave.",
      },
      {
        name: "Papas fritas con suprema de ave",
        price: "$10.500",
        description: "Papas fritas con suprema de ave.",
      },
    ],
  },
  {
    title: "Con papas",
    items: [
      {
        name: "Lomo liso con papas fritas",
        price: "$13.900",
        description: "Lomo liso con papas fritas y salsa de ajo o bigmac.",
      },
      {
        name: "Salmón con papas fritas",
        price: "$13.900",
        description: "Salmón con papas fritas y salsa de ajo o bigmac.",
      },
      {
        name: "Carne al jugo con papas fritas",
        price: "$13.900",
        description: "Carne al jugo con papas fritas y salsa de ajo o bigmac.",
      },
      {
        name: "Lomito con papas fritas",
        price: "$13.900",
        description:
          "Lomito de cerdo en salsa de champiñones con papas fritas y salsa de ajo o bigmac.",
      },
      {
        name: "Suprema de ave con papas",
        price: "$13.900",
        description: "Suprema de ave con papas fritas y salsa de ajo o bigmac.",
      },
      {
        name: "Papas fritas",
        price: "$6.000",
        description: "Porción de 500 gramos de papas con salsa de ajo o bigmac.",
      },
    ],
  },
  {
    title: "Sin alcohol",
    items: [
      {
        name: "Gaseosa",
        price: "$2.500",
        description: "Coca-Cola, Fanta o Sprite.",
      },
      {
        name: "Jugos",
        price: "$3.500",
        description: "Jugo de frutas de estación.",
      },
      {
        name: "Agua mineral",
        price: "$2.500",
        description: "Agua mineral con o sin gas.",
      },
      {
        name: "Mojito sin alcohol",
        price: "$4.500",
        description: "Base de mojito sin alcohol.",
      },
      {
        name: "Cerveza Zero 330cc",
        price: "$3.500",
        description: "Botellín de cerveza ZERO alcohol.",
      },
    ],
  },
  {
    title: "Cervezas",
    items: [
      {
        name: "Austral Calafate 500cc",
        price: "$5.500",
        description: "Schop de cerveza Austral Calafate de 500cc.",
      },
      {
        name: "Austral Calafate 330cc",
        price: "$4.500",
        description: "Schop de cerveza Austral Calafate de 330cc.",
      },
      {
        name: "Royal Guard 500cc",
        price: "$5.500",
        description: "Schop de cerveza Royal Guard de 500cc.",
      },
      {
        name: "Royal Guard 330cc",
        price: "$4.500",
        description: "Schop de cerveza Royal Guard de 330cc.",
      },
    ],
  },
  {
    title: "Copas de vino",
    items: [
      {
        name: "Copa de vino tinto",
        price: "$3.800",
        description: "Carmenere o Cabernet Sauvignon.",
      },
      {
        name: "Copa de vino blanco",
        price: "$3.800",
        description: "Chardonnay o Sauvignon Blanc.",
      },
    ],
  },
  {
    title: "Vino tinto",
    note: "Carmenere & Cabernet Sauvignon.",
    items: [
      {
        name: "Aliwen Undurraga",
        price: "$10.600",
        description:
          "Botella de 750cc de vino Aliwen Undurraga, Valle del Rapel.",
      },
      {
        name: "Medalla Real Reserva",
        price: "$11.800",
        description:
          "Botella de 750cc de vino Medalla Real Reserva, Valle del Rapel.",
      },
      {
        name: "120 Santa Rita Reserva Especial",
        price: "$11.800",
        description:
          "Botella de 750cc de vino 120 Santa Rita Reserva Especial, Valle Central.",
      },
      {
        name: "Carmen Gran Reserva",
        price: "$13.000",
        description:
          "Botella de 750cc de vino Carmen Gran Reserva, Valle Colchagua.",
      },
      {
        name: "Errazuriz Max",
        price: "$16.000",
        description:
          "Botella de 750cc de vino Errazuriz Max, Valle del Aconcagua.",
      },
    ],
  },
  {
    title: "Vino blanco",
    items: [
      {
        name: "Aliwen Undurraga Chardonnay",
        price: "$10.600",
        description:
          "Botella de 750cc de vino Aliwen Undurraga, Valle del Maipo.",
      },
      {
        name: "Carmen Insigne Chardonnay",
        price: "$10.900",
        description:
          "Botella de 750cc de vino Carmen Insigne, Valle Central.",
      },
      {
        name: "Medalla Real Reserva Chardonnay",
        price: "$11.800",
        description:
          "Botella de 750cc de vino Medalla Real Reserva, Valle de Limarí.",
      },
      {
        name: "Errazuriz Max Chardonnay",
        price: "$16.000",
        description:
          "Botella de 750cc de vino Errazuriz Max, Valle del Aconcagua.",
      },
      {
        name: "Aliwen Sauvignon Blanc",
        price: "$10.600",
        description:
          "Botella de 750cc de vino Aliwen, Valle del Maipo / San Antonio.",
      },
      {
        name: "Carmen Insigne Sauvignon Blanc",
        price: "$10.900",
        description:
          "Botella de 750cc de vino Carmen Insigne, Valle Central.",
      },
      {
        name: "Medalla Real Reserva Sauvignon Blanc",
        price: "$11.800",
        description:
          "Botella de 750cc de vino Medalla Real Reserva, Valle de Casablanca.",
      },
      {
        name: "Errazuriz Max Sauvignon Blanc",
        price: "$16.000",
        description:
          "Botella de 750cc de vino Errazuriz Max, Valle del Aconcagua.",
      },
    ],
  },
  {
    title: "Coctelería",
    items: [
      { name: "Pisco Sour", price: "$4.500", description: "" },
      { name: "Chardonnay Sour", price: "$4.500", description: "" },
      { name: "Aperol Spritz", price: "$6.000", description: "" },
      { name: "Ramazzotti Spritz", price: "$6.000", description: "" },
      { name: "Gin Tonic", price: "$6.000", description: "" },
      { name: "Mojito tradicional", price: "$5.000", description: "" },
      { name: "Mojito sabores", price: "$6.000", description: "Maracuyá." },
      { name: "Mojito Calafate 500cc", price: "$6.500", description: "" },
      {
        name: "Whisky Johnnie Walker Red Label",
        price: "$5.000",
        description: "",
      },
      {
        name: "Whisky Johnnie Walker Black Label",
        price: "$7.000",
        description: "",
      },
    ],
  },
  {
    title: "Combinados",
    items: [
      { name: "Pisco Mistral 35º", price: "$5.500", description: "" },
      { name: "Pisco Mistral 40º", price: "$6.000", description: "" },
      { name: "Ron Bacardi Blanco", price: "$6.000", description: "" },
      { name: "Vodka Stolichnaya", price: "$6.000", description: "" },
      { name: "Vodka Absolut", price: "$6.000", description: "" },
    ],
  },
];

function toTelHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#8B3A28]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-5xl font-normal leading-[1.02] text-[#1C130B] sm:text-6xl">
        {title}
      </h2>
      {children ? (
        <div className="mt-5 text-base font-light leading-8 text-[#7A6755] sm:text-lg">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function LogoMark() {
  return (
    <Image
      src="/logo-cafe-del-pintor.svg"
      alt="Café del Pintor"
      width={64}
      height={64}
      className="h-14 w-14 object-contain sm:h-16 sm:w-16"
    />
  );
}

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#8B3A28]/15 bg-[#FBF6EC]/88 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Navegación principal"
      >
        <a href="#inicio" className="inline-flex items-center" aria-label="Café del Pintor, inicio">
          <LogoMark />
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs font-medium uppercase tracking-[0.14em] text-[#7A6755] transition-colors hover:text-[#8B3A28]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="#reserva"
            className="inline-flex items-center gap-2 rounded-[4px] bg-[#8B3A28] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#FBF6EC] transition-colors hover:bg-[#A94E3A]"
          >
            Reservar
            <ChevronRight className="size-4" aria-hidden="true" />
          </a>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[4px] border border-[#8B3A28]/20 bg-[#FBF6EC] text-[#1C130B] lg:hidden"
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileMenuOpen ? (
        <div className="fixed inset-x-0 top-[68px] border-t border-[#8B3A28]/15 bg-[#FBF6EC] px-4 py-8 shadow-2xl shadow-[#1C130B]/10 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-serif text-3xl font-normal text-[#1C130B] transition-colors hover:text-[#8B3A28]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#reserva"
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#8B3A28] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#FBF6EC]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Reservar
              <ChevronRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center overflow-hidden px-4 pb-16 pt-28 sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 fine-noise opacity-70" aria-hidden="true" />
      <div
        className="absolute -right-28 top-1/2 hidden size-[520px] -translate-y-1/2 rounded-full border border-[#8B3A28]/15 lg:block"
        aria-hidden="true"
      >
        <div className="absolute inset-10 rounded-full border border-[#8B3A28]/10" />
        <div className="absolute inset-20 rounded-full border border-[#8B3A28]/10" />
      </div>
      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-[720px]">
          <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-[#8B3A28]">
            Urriola 652 · Cerro Alegre · Valparaíso
          </p>
          <h1 className="font-serif text-[4rem] font-light leading-[0.88] tracking-normal text-[#1C130B] sm:text-8xl lg:text-[7.5rem]">
            Café
            <br />
            <span className="italic text-[#8B3A28]">del Pintor</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg font-light leading-8 text-[#7A6755]">
            Un rincón pintoresco para comer en Cerro Alegre. Cocina chilena,
            ambiente familiar y muros intervenidos por artistas chilenos y
            extranjeros.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#carta"
              className="inline-flex items-center justify-center gap-3 rounded-[4px] bg-[#8B3A28] px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#FBF6EC] transition-colors hover:bg-[#A94E3A]"
            >
              Ver la carta
              <Utensils className="size-4" aria-hidden="true" />
            </a>
            <a
              href="#reserva"
              className="inline-flex items-center justify-center gap-3 rounded-[4px] border border-[#8B3A28]/20 px-7 py-4 text-xs font-medium uppercase tracking-[0.12em] text-[#1C130B] transition-colors hover:border-[#8B3A28] hover:text-[#8B3A28]"
            >
              Hacer una reserva
              <CalendarDays className="size-4" aria-hidden="true" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

function NosotrosSection() {
  return (
    <section id="nosotros" className="bg-[#F6EDD9] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.04fr_0.96fr]">
        <div>
          <span className="mb-4 block text-xs font-medium uppercase tracking-[0.24em] text-[#8B3A28]">
            Nuestra historia
          </span>
          <h2 className="max-w-2xl font-serif text-5xl font-normal leading-[1.02] text-[#1C130B] sm:text-6xl">
            Arte y sabor en{" "}
            <span className="italic text-[#8B3A28]">Cerro Alegre</span>
          </h2>
          <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-[#7A6755]">
            Café del Pintor es un restaurant familiar de Valparaíso, conocido
            por su cocina chilena, su ambiente acogedor y sus muros pintados por
            artistas.
          </p>
          <p className="mt-4 max-w-2xl text-lg font-light leading-8 text-[#7A6755]">
            La experiencia mezcla mesa casera, barrio patrimonial y una mirada
            artística del puerto.
          </p>

          <a
            href="#ubicacion"
            className="mt-10 inline-flex items-center gap-3 rounded-[4px] border border-[#8B3A28]/20 px-6 py-4 text-xs font-medium uppercase tracking-[0.12em] text-[#1C130B] transition-colors hover:border-[#8B3A28] hover:text-[#8B3A28]"
          >
            Cómo llegar
            <MapPin className="size-4" aria-hidden="true" />
          </a>
        </div>

        <div className="relative min-h-[360px] lg:min-h-[520px]">
          <div className="absolute inset-x-0 top-0 bottom-12 rounded-[6px] bg-gradient-to-br from-[#C9A882] to-[#8B6B52] shadow-2xl shadow-[#1C130B]/15" />
          <div className="absolute inset-x-8 top-10 bottom-24 flex items-center justify-center rounded-[4px] border border-[#FBF6EC]/25 bg-[#1C130B]/10 p-8 text-center">
            <p className="font-serif text-4xl font-light italic leading-tight text-[#FBF6EC]/80">
              “Un rincón pintoresco para comer en Cerro Alegre.”
            </p>
          </div>
          <div className="absolute bottom-0 right-0 flex size-40 flex-col items-center justify-center rounded-[6px] bg-[#2B483E] p-6 text-center shadow-xl shadow-[#1C130B]/20">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#FBF6EC]/55">
              Dirección
            </span>
            <span className="mt-3 font-serif text-3xl font-light leading-none text-[#FBF6EC]">
              Urriola
            </span>
            <span className="font-serif text-5xl font-light leading-none text-[#BF9130]">
              652
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function CartaSection() {
  const [activeMenuSection, setActiveMenuSection] = useState(menuSections[0].title);
  const activeSection =
    menuSections.find((section) => section.title === activeMenuSection) ??
    menuSections[0];

  return (
    <section id="carta" className="bg-[#FBF6EC] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Carta completa" title="Carta Café del Pintor">
          <p>
            Sabores caseros, cocina chilena, bebidas y coctelería en Cerro
            Alegre.
          </p>
        </SectionHeading>

        <div className="border-y border-[#8B3A28]/20 py-8">
          <div
            className="flex gap-0 overflow-x-auto border-b border-[#8B3A28]/20"
            role="tablist"
            aria-label="Categorías de la carta"
          >
            {menuSections.map((section) => {
              const selected = activeMenuSection === section.title;

              return (
                <button
                  key={section.title}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`mb-[-1px] shrink-0 border-b-2 px-5 py-4 text-xs font-medium uppercase tracking-[0.12em] transition-colors ${
                    selected
                      ? "border-[#8B3A28] text-[#8B3A28]"
                      : "border-transparent text-[#7A6755] hover:text-[#1C130B]"
                  }`}
                  onClick={() => setActiveMenuSection(section.title)}
                >
                  {section.title}
                </button>
              );
            })}
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="paper-texture rounded-[6px] border border-[#8B3A28]/20 bg-[#F6EDD9] p-7">
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[#8B3A28]">
                Selección
              </p>
              <h3 className="mt-3 font-serif text-5xl font-normal text-[#2B483E]">
                {activeSection.title}
              </h3>
              {activeSection.note ? (
                <p className="mt-3 text-base font-light leading-7 text-[#7A6755]">
                  {activeSection.note}
                </p>
              ) : null}
              <p className="mt-7 text-sm font-light leading-6 text-[#7A6755]">
                Valores referenciales según carta entregada. Sujetos a cambios
                por el restaurant.
              </p>
            </div>

            <div className="grid overflow-hidden rounded-[6px] border border-[#8B3A28]/20 bg-[#8B3A28]/20 md:grid-cols-2">
              {activeSection.items.map((item) => (
                <article
                  key={`${activeSection.title}-${item.name}`}
                  className="bg-[#FBF6EC] p-7 transition-colors hover:bg-[#F6EDD9]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h4 className="font-serif text-2xl font-medium leading-tight text-[#1C130B]">
                      {item.name}
                    </h4>
                    <span className="shrink-0 text-sm font-semibold text-[#8B3A28]">
                      {item.price}
                    </span>
                  </div>
                  {item.description ? (
                    <p className="mt-3 text-sm font-light leading-7 text-[#7A6755]">
                      {item.description}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>

          {activeSection.details ? (
            <div className="mt-8 grid gap-px overflow-hidden rounded-[6px] border border-[#8B3A28]/20 bg-[#8B3A28]/20 lg:grid-cols-3">
              {[
                { title: "Entrada", values: activeSection.details.entrada },
                {
                  title: "Plato de fondo",
                  values: activeSection.details.platosDeFondo,
                },
                { title: "Postre", values: activeSection.details.postre },
              ].map((group) =>
                group.values ? (
                  <div
                    key={group.title}
                    className="bg-[#FBF6EC] p-6"
                  >
                    <h4 className="font-serif text-2xl font-medium text-[#2B483E]">
                      {group.title}
                    </h4>
                    <ul className="mt-4 space-y-3 text-sm font-light leading-6 text-[#1C130B]">
                      {group.values.map((value) => (
                        <li key={value} className="flex gap-2">
                          <span
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-[#BF9130]"
                            aria-hidden="true"
                          />
                          <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null,
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ReservaSection() {
  function handleReservationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const nombre = String(formData.get("nombre") || "");
    const telefono = String(formData.get("telefono") || "");
    const fecha = String(formData.get("fecha") || "");
    const hora = String(formData.get("hora") || "");
    const personas = String(formData.get("personas") || "");
    const comentario = String(formData.get("comentario") || "");

    const message = `
Hola Café del Pintor, quiero solicitar una reserva.

Nombre: ${nombre}
Teléfono: ${telefono}
Fecha: ${fecha}
Hora: ${hora}
Personas: ${personas}
Comentario: ${comentario}

Quedo atento/a a la confirmación. Muchas gracias.
    `.trim();

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="reserva" className="bg-[#1C130B] px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.24em] text-[#BF9130]">
            Reserva
          </p>
          <h2 className="font-serif text-5xl font-normal leading-[1.02] text-[#F6EDD9] sm:text-6xl">
            Reserva tu <span className="italic text-[#BF9130]">mesa</span>
          </h2>
          <p className="mt-6 text-lg font-light leading-8 text-[#F6EDD9]/65">
            Solicita una reserva por WhatsApp y el equipo de Café del Pintor
            podrá confirmar disponibilidad directamente por ese canal.
          </p>
          <p className="mt-6 border-l-2 border-[#8B3A28] bg-[#F6EDD9]/5 p-5 text-sm font-light leading-6 text-[#F6EDD9]/65">
            La reserva queda sujeta a confirmación del restaurant.
          </p>
        </div>

        <form
          onSubmit={handleReservationSubmit}
          className="rounded-[6px] border border-[#F6EDD9]/10 bg-[#F6EDD9]/5 p-5 shadow-2xl shadow-black/20 sm:p-8"
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#F6EDD9]/50">
              Nombre
              <input
                name="nombre"
                required
                className="rounded-[3px] border border-[#F6EDD9]/15 bg-[#F6EDD9]/8 px-4 py-3 text-sm font-light normal-case tracking-normal text-[#F6EDD9] outline-none transition-colors placeholder:text-[#F6EDD9]/25 focus:border-[#F6EDD9]/35"
                placeholder="Tu nombre"
              />
            </label>
            <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#F6EDD9]/50">
              Teléfono
              <input
                name="telefono"
                required
                type="tel"
                className="rounded-[3px] border border-[#F6EDD9]/15 bg-[#F6EDD9]/8 px-4 py-3 text-sm font-light normal-case tracking-normal text-[#F6EDD9] outline-none transition-colors placeholder:text-[#F6EDD9]/25 focus:border-[#F6EDD9]/35"
                placeholder="+56 9 1234 5678"
              />
            </label>
            <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#F6EDD9]/50">
              Fecha
              <input
                name="fecha"
                required
                type="date"
                className="rounded-[3px] border border-[#F6EDD9]/15 bg-[#F6EDD9]/8 px-4 py-3 text-sm font-light normal-case tracking-normal text-[#F6EDD9] outline-none transition-colors focus:border-[#F6EDD9]/35"
              />
            </label>
            <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#F6EDD9]/50">
              Hora
              <input
                name="hora"
                required
                type="time"
                className="rounded-[3px] border border-[#F6EDD9]/15 bg-[#F6EDD9]/8 px-4 py-3 text-sm font-light normal-case tracking-normal text-[#F6EDD9] outline-none transition-colors focus:border-[#F6EDD9]/35"
              />
            </label>
            <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#F6EDD9]/50">
              Cantidad de personas
              <input
                name="personas"
                required
                type="number"
                min="1"
                className="rounded-[3px] border border-[#F6EDD9]/15 bg-[#F6EDD9]/8 px-4 py-3 text-sm font-light normal-case tracking-normal text-[#F6EDD9] outline-none transition-colors placeholder:text-[#F6EDD9]/25 focus:border-[#F6EDD9]/35"
                placeholder="2"
              />
            </label>
            <label className="grid gap-2 text-xs font-medium uppercase tracking-[0.14em] text-[#F6EDD9]/50 md:col-span-2">
              Comentario
              <textarea
                name="comentario"
                rows={4}
                className="resize-none rounded-[3px] border border-[#F6EDD9]/15 bg-[#F6EDD9]/8 px-4 py-3 text-sm font-light normal-case tracking-normal text-[#F6EDD9] outline-none transition-colors placeholder:text-[#F6EDD9]/25 focus:border-[#F6EDD9]/35"
                placeholder="Cuéntanos si necesitas algo especial."
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-[4px] bg-[#8B3A28] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#F6EDD9] transition-colors hover:bg-[#A94E3A] sm:w-auto"
          >
            Reservar por WhatsApp
            <MessageCircle className="size-4" aria-hidden="true" />
          </button>
          <p className="mt-4 border-l-2 border-[#BF9130] bg-[#BF9130]/10 p-4 text-sm font-light leading-6 text-[#F6EDD9]">
            La reserva queda sujeta a confirmación del restaurant por WhatsApp.
          </p>
        </form>
      </div>
    </section>
  );
}

function HorarioSection() {
  return (
    <section id="horario" className="bg-[#F6EFE4] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Atención" title="Horario de atención" />
        <div className="grid gap-3 rounded-[2rem] border border-[#24170F]/10 bg-[#FFF8EE] p-4 shadow-xl shadow-[#24170F]/10 sm:p-6">
          {hours.map((hour) => (
            <div
              key={hour.day}
              className="flex items-center justify-between gap-4 rounded-2xl bg-white px-4 py-4"
            >
              <span className="font-bold text-[#24170F]">{hour.day}</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#266553]/10 px-3 py-1 text-sm font-extrabold text-[#266553]">
                <Clock3 className="size-4" aria-hidden="true" />
                {hour.time}
              </span>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-5 max-w-2xl text-center text-sm leading-6 text-[#6B4A36]">
          Horarios referenciales. Se recomienda confirmar por teléfono antes de
          visitar.
        </p>
      </div>
    </section>
  );
}

function UbicacionSection() {
  return (
    <section id="ubicacion" className="bg-[#FFF8EE] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Cerro Alegre" title="Ubicación">
          <p>Encuéntranos en Urriola 652, Cerro Alegre, Valparaíso.</p>
        </SectionHeading>

        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="rounded-[2rem] border border-[#24170F]/10 bg-white p-6 shadow-xl shadow-[#24170F]/10">
            <div className="inline-flex size-12 items-center justify-center rounded-full bg-[#B43F2F]/10 text-[#B43F2F]">
              <MapPin className="size-6" aria-hidden="true" />
            </div>
            <h3 className="mt-5 font-serif text-3xl font-bold text-[#24170F]">
              {restaurant.address}
            </h3>
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#24170F] px-5 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.01]"
            >
              Abrir en Google Maps
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[#24170F]/10 bg-white shadow-2xl shadow-[#24170F]/10">
            <iframe
              title="Mapa Café del Pintor"
              src={restaurant.mapsEmbed}
              width="100%"
              height="420"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[340px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactoSection() {
  const actions = [
    {
      label: "Llamar",
      detail: restaurant.phones[0],
      href: toTelHref(restaurant.phones[0]),
      icon: Phone,
    },
    {
      label: "Enviar correo",
      detail: restaurant.email,
      href: `mailto:${restaurant.email}`,
      icon: Mail,
    },
    {
      label: "Escribir por WhatsApp",
      detail: "+56 9 4591 9063",
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      icon: MessageCircle,
      external: true,
    },
    {
      label: "Instagram",
      detail: "@cafedelpintor",
      href: restaurant.instagramUrl,
      icon: Camera,
      external: true,
    },
  ];

  return (
    <section id="contacto" className="bg-[#F6EFE4] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Contacto" title="Hablemos">
          <p>
            Llama, escribe o revisa la carta antes de visitar Café del Pintor.
          </p>
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {actions.map(({ label, detail, href, icon: Icon, external }) => (
            <a
              key={`${label}-${detail}`}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noreferrer" : undefined}
              className="group rounded-3xl border border-[#24170F]/10 bg-[#FFF8EE] p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#24170F]/10"
            >
              <div className="mb-5 inline-flex size-12 items-center justify-center rounded-full bg-[#266553]/10 text-[#266553] transition-colors group-hover:bg-[#266553] group-hover:text-white">
                <Icon className="size-6" aria-hidden="true" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#24170F]">
                {label}
              </h3>
              <p className="mt-2 break-words text-sm leading-6 text-[#6B4A36]">
                {detail}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#24170F]/10 bg-[#24170F] px-4 py-10 text-[#FFF8EE] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-2xl font-bold">© Café del Pintor</p>
          <p className="mt-1 text-sm text-[#FFF8EE]/70">
            Restaurant en Cerro Alegre, Valparaíso
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm font-bold text-[#FFF8EE]/80">
          {[
            { label: "Carta", href: "#carta" },
            { label: "Reserva", href: "#reserva" },
            { label: "Ubicación", href: "#ubicacion" },
            { label: "Contacto", href: "#contacto" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NosotrosSection />
        <CartaSection />
        <ReservaSection />
        <HorarioSection />
        <UbicacionSection />
        <ContactoSection />
      </main>
      <Footer />
    </>
  );
}
