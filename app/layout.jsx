import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EscortShop Paraguay - Encuentra Escorts y Acompañantes en Todo el País 🇵🇾",
  description: "Anuncios de escorts, acompañantes y servicios para adultos en todos los departamentos de Paraguay: Asunción, Central, Alto Paraná, Itapúa, Caaguazú, San Pedro, Cordillera, Concepción, Guairá, Paraguarí, Misiones, Ñeembucú, Amambay, Canindeyú, Presidente Hayes, Alto Paraguay, Boquerón. Publica y encuentra anuncios de mujeres, trans, gay y parejas.",
  keywords: [
    "escorts Paraguay",
    "acompañantes Paraguay",
    "escorts Asunción",
    "escorts Central",
    "escorts CDE",
    "escorts Ciudad del Este",
    "escorts Encarnación",
    "escorts Salto del Guairá",
    "escorts Caacupé",
    "escorts Caaguazú",
    "escorts Villa Hayes",
    "escorts Coronel Oviedo",
    "escorts Villarrica",
    "escorts Pedro Juan Caballero",
    "escorts Pilar",
    "escorts San Pedro",
    "escorts Paraguarí",
    "escorts Concepción",
    "anuncios adultos Paraguay",
    "mujeres escorts",
    "trans Paraguay",
    "gay escorts",
    "parejas swingers",
    "acompañantes VIP",
    "masajistas Paraguay"
  ].join(", "),
  authors: [{ name: "EscortShop Paraguay" }],
  creator: "EscortShop Paraguay",
  publisher: "EscortShop Paraguay",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://escortshoppy.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "EscortShop Paraguay - La Mayor Plataforma de Escorts",
    description: "Encuentra anuncios de escorts en todos los departamentos de Paraguay. Publica gratis y encuentra compañía.",
    url: "https://escortshoppy.com",
    siteName: "EscortShop Paraguay",
    locale: "es_PY",
    type: "website",
    images: [
      {
        url: "/logo_escorts.jpg",
        width: 800,
        height: 600,
        alt: "EscortShop Paraguay - Plataforma de anuncios para adultos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EscortShop Paraguay - Encuentra Escorts en Todo el País",
    description: "La plataforma de anuncios para adultos más completa de Paraguay",
    images: ["/logo_escorts.jpg"],
    creator: "@escortshoppy",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "KK8suhuGYZHA4x4hIS-PYiq-qgX1NZF1qDP3",
  },
  category: "Adult Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Structured Data (JSON-LD) para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "EscortShop Paraguay",
              "alternateName": ["EscortShoppy", "EscortShop PY"],
              "url": "https://escortshoppy.com",
              "description": "Plataforma de anuncios de escorts y acompañantes en los 17 departamentos de Paraguay",
              "keywords": "escorts Paraguay, acompañantes, anuncios adultos",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://escortshoppy.com/buscar?q={search_term_string}",
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "EscortShop Paraguay",
                "url": "https://escortshoppy.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://escortshoppy.com/logo_escorts.jpg"
                }
              },
              "areaServed": {
                "@type": "Country",
                "name": "Paraguay"
              },
              // En el JSON-LD de tu layout.jsx, cambia:
              "serviceArea": [
                "Asuncion",        // Antes: "Asunción"
                "Central",
                "Alto Parana",     // Antes: "Alto Paraná"
                "Itapua",          // Antes: "Itapúa"
                "Caaguazu",        // Antes: "Caaguazú"
                "San Pedro",
                "Cordillera",
                "Concepcion",      // Antes: "Concepción"
                "Guaira",          // Antes: "Guairá"
                "Paraguari",       // Antes: "Paraguarí"
                "Misiones",
                "Neembucu",        // Antes: "Ñeembucú"
                "Amambay",
                "Canindeyu",       // Antes: "Canindeyú"
                "Presidente Hayes",
                "Alto Paraguay",
                "Boqueron"         // Antes: "Boquerón"
              ]
            })
          }}
        />

        {/* Google Analytics (opcional - añade después) */}
        {/* <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script> */}

        {/* Favicon mejorado */}
        <link rel="icon" href="/logo_escorts.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo_escorts.jpg" />
        <meta name="theme-color" content="#ec4899" />

        {/* Viewport para mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        {/* Script adicional para SEO */}
        <Script id="seo-script" strategy="afterInteractive">
          {`
            // Script para mejorar métricas de usuario
            if (typeof window !== 'undefined') {
              // Marcar que el usuario es mayor de edad
              if (!localStorage.getItem('adult-verified')) {
                localStorage.setItem('adult-verified', 'true');
              }
              
              // Prevenir zoom en mobile
              document.addEventListener('touchmove', function (event) {
                if (event.scale !== 1) { event.preventDefault(); }
              }, { passive: false });
            }
          `}
        </Script>
      </body>
    </html>
  );
}