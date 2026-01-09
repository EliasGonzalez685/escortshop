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
  title: "EscortShop Paraguay - Encuentra Escorts y Acompañantes en Todo el País 🇵🇾",
  description: "Anuncios de escorts, acompañantes y servicios para adultos en todos los departamentos de Paraguay: Asunción, Central, Alto Paraná, Itapúa, Caaguazú, San Pedro, Cordillera, Concepción, Guairá, Paraguarí, Misiones, Ñeembucú, Amambay, Canindeyú, Presidente Hayes, Alto Paraguay, Boquerón. Publica y encuentra anuncios de mujeres, trans, gay y parejas.",
  keywords: [
    // DEPARTAMENTOS
    "escorts Paraguay", "acompañantes Paraguay",
    
    // CAPITAL Y CENTRAL
    "escorts Asunción", "putas Asunción", "trans Asunción", "gay Asunción",
    "escorts Central", "escorts Lambaré", "escorts Fernando de la Mora", 
    "escorts Luque", "escorts San Lorenzo", "escorts Mariano Roque Alonso",
    "escorts Capiatá", "escorts Itá", "escorts Ypané",
    
    // ALTO PARANÁ
    "escorts Ciudad del Este", "putas CDE", "escorts Alto Paraná",
    "escorts Hernandarias", "escorts Presidente Franco", "escorts Minga Guazú",
    "escorts Puerto Presidente Stroessner", "escorts Santa Rita",
    
    // ITAPÚA
    "escorts Encarnación", "putas Encarnación", "escorts Itapúa",
    "escorts Cambyretá", "escorts Fram", "escorts Natalio",
    "escorts Carmen del Paraná", "escorts Capitán Miranda",
    
    // CORDILLERA
    "escorts Caacupé", "putas Caacupé", "escorts Cordillera",
    "escorts Areguá", "escorts Piribebuy", "escorts Arroyos y Esteros",
    "escorts San Bernardino", "escorts Tobatí",
    
    // CONCEPCIÓN
    "escorts Concepción", "putas Concepción", "escorts Belén",
    "escorts Loreto", "escorts San Carlos", "escorts Horqueta",
    
    // SAN PEDRO
    "escorts San Pedro", "escorts San Estanislao", "escorts Villa del Rosario",
    "escorts Antequera", "escorts Choré",
    
    // GUAIRÁ
    "escorts Salto del Guairá", "putas Salto del Guairá", "escorts Guairá",
    "escorts Villarrica", "escorts Independencia", "escorts Colonia Mauricio José Troche",
    
    // CAAGUAZÚ
    "escorts Coronel Oviedo", "escorts Caaguazú", "escorts Doctor Juan Eulogio Estigarribia",
    "escorts Doctor Juan Manuel Frutos", "escorts Repatriación",
    
    // PARAGUARÍ
    "escorts Paraguarí", "escorts Yaguarón", "escorts Carapeguá",
    "escorts Ybycuí", "escorts Acahay",
    
    // AMAMBAY
    "escorts Pedro Juan Caballero", "putas Pedro Juan Caballero", "escorts Amambay",
    "escorts Bella Vista", "escorts Capitán Bado",
    
    // CANINDEYÚ
    "escorts Salto del Guairá", "escorts Canindeyú", "escorts Corpus Christi",
    "escorts Ypejhú", "escorts Nueva Esperanza",
    
    // MISIONES
    "escorts San Juan Bautista", "escorts Misiones", "escorts Ayolas",
    "escorts Santiago", "escorts Santa Rosa",
    
    // ÑEEMBUCÚ
    "escorts Pilar", "putas Pilar", "escorts Ñeembucú",
    "escorts Humaitá", "escorts San Juan Bautista de Ñeembucú",
    
    // PRESIDENTE HAYES
    "escorts Villa Hayes", "escorts Presidente Hayes", "escorts Benjamín Aceval",
    "escorts Nanawa", "escorts Puerto Pinasco",
    
    // ALTO PARAGUAY
    "escorts Fuerte Olimpo", "escorts Alto Paraguay", "escorts Bahía Negra",
    
    // BOQUERÓN
    "escorts Filadelfia", "escorts Boquerón", "escorts Loma Plata",
    "escorts Mariscal Estigarribia",
    
    // GENERALES
    "mujeres escorts", "trans Paraguay", "gay escorts", "parejas swingers",
    "acompañantes VIP", "masajistas Paraguay", "anuncios adultos Paraguay"
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
        {/* Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "EscortShop Paraguay",
              "alternateName": ["EscortShoppy", "EscortShop PY"],
              "url": "https://escortshoppy.com",
              "description": "Plataforma de anuncios de escorts y acompañantes en todas las ciudades de Paraguay",
              "keywords": "escorts Paraguay, acompañantes, putas, trans, gay, anuncios adultos",
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
              "serviceArea": [
                "Asuncion", "Lambare", "Fernando de la Mora", "Luque", "San Lorenzo", 
                "Mariano Roque Alonso", "Capita", "Ita", "Ypane",
                "Ciudad del Este", "Hernandarias", "Presidente Franco", "Minga Guazu",
                "Encarnacion", "Cambyreta", "Fram", "Natalio",
                "Caacupe", "Aregua", "Piribebuy", "San Bernardino",
                "Concepcion", "Belen", "Loreto", "Horqueta",
                "San Pedro", "San Estanislao", "Villa del Rosario",
                "Villarrica", "Salto del Guaira", "Independencia",
                "Coronel Oviedo", "Pedro Juan Caballero", "Pilar",
                "Villa Hayes", "Fuerte Olimpo", "Filadelfia"
              ],
              "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Escorts en Asunción - Capital de Paraguay"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Escorts en Ciudad del Este - Alto Paraná"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": "Escorts en Encarnación - Itapúa"
                  },
                  {
                    "@type": "ListItem",
                    "position": 4,
                    "name": "Escorts en Caacupé - Cordillera"
                  }
                ]
              }
            })
          }}
        />

        {/* Favicon */}
        <link rel="icon" href="/logo_escorts.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="/logo_escorts.jpg" />
        <meta name="theme-color" content="#ec4899" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}