import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EscortShop Paraguay - Escorts y Acompañantes en Todo el País 🇵🇾",
  description: "Encuentra escorts, acompañantes, trans, gay y servicios para adultos en Paraguay. Anuncios en Asunción, Ciudad del Este, Encarnación, Salto del Guairá y todas las ciudades. La plataforma líder de contactos para adultos.",
  keywords: "escorts paraguay, acompañantes paraguay, putas paraguay, prostitutas paraguay, meretrices paraguay, damas de compañia paraguay, trans paraguay, gay escorts paraguay, travestis paraguay, transexuales paraguay, shemale paraguay, escorts asuncion, putas asuncion, prostitutas asuncion, acompañantes asuncion, trans asuncion, gay asuncion, escorts ciudad del este, putas ciudad del este, prostitutas ciudad del este, acompañantes cde, trans ciudad del este, gay cde, escorts encarnacion, putas encarnacion, prostitutas encarnacion, acompañantes encarnacion, trans encarnacion, escorts caaguazu, putas caaguazu, prostitutas caaguazu, escorts san pedro, putas san pedro, escorts villarrica, putas villarrica, prostitutas villarrica, escorts concepcion, putas concepcion, escorts pedro juan caballero, putas pedro juan caballero, prostitutas pjc, trans pedro juan caballero, escorts salto del guaira, putas salto del guaira, prostitutas salto del guaira, acompañantes salto del guaira, trans salto del guaira, escorts katueté, putas katueté, escorts corpus christi, escorts ypehú, escorts itanará, escorts canindeyú, escorts coronel oviedo, putas coronel oviedo, escorts luque, putas luque, prostitutas luque, acompañantes luque, escorts fernando de la mora, putas fernando de la mora, prostitutas fernando de la mora, escorts lambare, putas lambare, escorts san lorenzo, putas san lorenzo, prostitutas san lorenzo, trans san lorenzo, escorts capiatá, putas capiatá, prostitutas capiatá, escorts ñemby, putas ñemby, escorts mariano roque alonso, putas mariano roque alonso, escorts itauguá, escorts villa elisa, escorts limpio, gay ciudad del este, gay encarnacion, gay asuncion, gay salto del guaira, parejas asuncion, parejas cde, parejas encarnacion, trios paraguay, swingers paraguay, anuncios adultos paraguay, anuncios eroticos paraguay, contactos adultos, avisos adultos paraguay, scorts py, escort independientes, acompañantes vip, masajes eroticos paraguay, masajes tantricos paraguay, masajistas paraguay, masajistas eroticas, scort, skokka paraguay, hot paraguay, lokanto paraguay, clasificados adultos, sexo paraguay, servicios sexuales, trabajadoras sexuales paraguay",
  
  authors: [{ name: "EscortShop Paraguay" }],
  creator: "EscortShop Paraguay",
  publisher: "EscortShop Paraguay",
  
  metadataBase: new URL("https://escortshoppy.com"),
  alternates: {
    canonical: "/",
  },
  
  openGraph: {
    title: "EscortShop Paraguay - Escorts y Acompañantes en Todos los Departamentos",
    description: "Encuentra escorts en los 17 departamentos de Paraguay. Anuncios verificados de mujeres, trans, gay y parejas. La plataforma más completa del país.",
    url: "https://escortshoppy.com",
    siteName: "EscortShop Paraguay",
    locale: "es_PY",
    type: "website",
    images: [
      {
        url: "/logo_escorts.jpg",
        width: 1200,
        height: 630,
        alt: "EscortShop Paraguay - Escorts y Acompañantes",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "EscortShop Paraguay - Escorts en Todo el País",
    description: "Encuentra escorts y acompañantes en los 17 departamentos de Paraguay",
    images: ["/logo_escorts.jpg"],
  },
  
  robots: {
    index: true,
    follow: true,
    nocache: false,
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
  
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo_escorts.jpg", type: "image/jpeg" },
    ],
    apple: "/logo_escorts.jpg",
  },
  
  other: {
    'rating': 'adult',
    'content-type': 'adult',
    'audience': 'adults only',
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-PY">
      <head>
        {/* Meta tags adicionales */}
        <meta name="rating" content="adult" />
        <meta name="language" content="es-PY" />
        <meta name="geo.region" content="PY" />
        <meta name="geo.placename" content="Paraguay" />
        <meta name="audience" content="adults only" />
        
        {/* Structured Data Mejorado (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "EscortShop Paraguay",
              "alternateName": ["EscortShoppy", "Escort Shop PY"],
              "url": "https://escortshoppy.com",
              "description": "Plataforma líder de anuncios clasificados de escorts y acompañantes en Paraguay. Cobertura en los 17 departamentos del país.",
              "inLanguage": "es-PY",
              "areaServed": {
                "@type": "Country",
                "name": "Paraguay"
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://escortshoppy.com/buscar?q={search_term_string}"
                },
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
              }
            })
          }}
        />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "EscortShop Paraguay",
              "url": "https://escortshoppy.com",
              "logo": "https://escortshoppy.com/logo_escorts.jpg",
              "description": "Plataforma de anuncios clasificados para escorts y acompañantes en Paraguay",
              "areaServed": [
                "Asunción", "Central", "Alto Paraná", "Itapúa", "Caaguazú", 
                "San Pedro", "Cordillera", "Concepción", "Guairá", "Paraguarí",
                "Misiones", "Ñeembucú", "Amambay", "Canindeyú", "Presidente Hayes",
                "Alto Paraguay", "Boquerón", "Ciudad del Este", "Encarnación",
                "Salto del Guairá", "Katueté", "Corpus Christi", "Ypehú", "Itanará",
                "Luque", "Fernando de la Mora", "Lambaré", "San Lorenzo", "Capiatá",
                "Ñemby", "Mariano Roque Alonso", "Itauguá", "Villa Elisa", "Limpio",
                "Pedro Juan Caballero", "Villarrica", "Coronel Oviedo"
              ],
              "serviceType": [
                "Anuncios Clasificados",
                "Directorio de Escorts",
                "Servicios para Adultos",
                "Anuncios Eróticos"
              ]
            })
          }}
        />

        {/* Structured Data - BreadcrumbList */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Inicio",
                  "item": "https://escortshoppy.com"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Escorts",
                  "item": "https://escortshoppy.com/escorts"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Trans",
                  "item": "https://escortshoppy.com/trans"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Gay",
                  "item": "https://escortshoppy.com/gay"
                },
                {
                  "@type": "ListItem",
                  "position": 5,
                  "name": "Parejas",
                  "item": "https://escortshoppy.com/parejas"
                }
              ]
            })
          }}
        />

        <meta name="theme-color" content="#ec4899" />
      </head>
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}