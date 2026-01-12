'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [showAgeVerification, setShowAgeVerification] = useState(true)
  const [usuario, setUsuario] = useState(null)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    verificarUsuario()
    
    // Si es Googlebot, mostrar contenido directamente
    const userAgent = typeof window !== 'undefined' ? navigator.userAgent : ''
    const isGooglebot = /Googlebot|bingbot|Slurp/i.test(userAgent)
    
    if (isGooglebot) {
      setShowAgeVerification(false)
    }
  }, [])

  // Resetear el modal cuando el componente se monte
  useEffect(() => {
    setShowAgeVerification(true)
  }, [])

  // Bloquear scroll cuando modal está activo
  useEffect(() => {
    if (showAgeVerification) {
      const scrollY = window.scrollY
      
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
      
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
    
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [showAgeVerification])

  const verificarUsuario = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      setUsuario(user)
      
      const { data: userData } = await supabase
        .from('usuarios')
        .select('role')
        .eq('email', user.email)
        .single()
      
      if (userData) {
        setUserRole(userData.role)
      }
    }
  }

  const cerrarSesion = async () => {
    await supabase.auth.signOut()
    setUsuario(null)
    setUserRole(null)
    router.refresh()
  }

  const handleAgeAccept = () => {
    setShowAgeVerification(false)
  }

  const handleAgeReject = () => {
    window.location.href = 'https://www.google.com'
  }

  // MODAL DE VERIFICACIÓN DE EDAD - 100% RESPONSIVE
  if (showAgeVerification) {
    return (
      <div 
        className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.95)',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}
      >
        <div className="w-full min-h-full flex items-center justify-center py-4 sm:py-8">
          <div className="bg-white rounded-xl max-w-md w-full mx-auto shadow-2xl" 
               style={{ maxHeight: '95vh', overflowY: 'auto' }}>
            
            <div className="p-5 sm:p-8">
              <div className="mb-5 sm:mb-6 text-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full mx-auto flex items-center justify-center text-5xl sm:text-6xl mb-3 shadow-lg animate-pulse">
                  🔞
                </div>
                <Image 
                  src="/logo_escorts.jpeg" 
                  alt="EscortShop Paraguay - Escorts y Acompañantes" 
                  width={150} 
                  height={45}
                  className="object-contain mx-auto"
                />
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-red-600 mb-4 sm:mb-5 text-center leading-tight">
                POR FAVOR LEER LAS ADVERTENCIAS
              </h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-center">
                <p className="text-xs sm:text-sm text-blue-800 font-medium">
                  ℹ️ Este aviso aparece cada vez que visitas la página principal
                </p>
              </div>
              
              <div className="text-left mb-5 sm:mb-6 space-y-3 bg-gray-50 p-4 sm:p-5 rounded-lg max-h-[40vh] sm:max-h-none overflow-y-auto">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Este sitio contiene contenido para adultos y está destinado únicamente a personas mayores de 18 años.
                </p>
                
                <p className="text-sm sm:text-base text-gray-700 font-semibold">
                  Al continuar, usted confirma que:
                </p>
                
                <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-2 ml-2 sm:ml-4">
                  <li className="leading-relaxed">Es mayor de 18 años</li>
                  <li className="leading-relaxed">Acepta el visionado de textos e imágenes explícitas</li>
                  <li className="leading-relaxed">Comprende que este contenido está destinado a un público adulto</li>
                  <li className="leading-relaxed">No se ofende por material de naturaleza adulta</li>
                </ul>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 mt-4 rounded">
                  <p className="text-xs sm:text-sm text-yellow-800 font-semibold leading-relaxed">
                    ⚠️ Si es menor de edad o no desea ver este tipo de contenido, por favor abandone este sitio.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAgeReject}
                  className="w-full bg-gray-600 text-white py-3 sm:py-3.5 rounded-lg hover:bg-gray-700 active:bg-gray-800 font-semibold text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-95 shadow-md"
                >
                  ❌ Rechazar - Salir
                </button>
                <button
                  onClick={handleAgeAccept}
                  className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 sm:py-3.5 rounded-lg hover:from-pink-700 hover:to-purple-700 active:from-pink-800 active:to-purple-800 font-semibold text-sm sm:text-base transition-all hover:scale-[1.02] active:scale-95 shadow-lg"
                >
                  ✅ Aceptar - Entrar al Sitio
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-4 text-center leading-relaxed">
                Al hacer clic en "Aceptar", confirmas que eres mayor de edad según las leyes de tu país.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // DATOS DE LOS 17 DEPARTAMENTOS
  const todosDepartamentos = [
    {
      nombre: 'Central',
      ciudades: ['Asunción', 'Lambaré', 'Fernando de la Mora', 'Luque', 'San Lorenzo', 'Capiatá'],
      color: 'bg-pink-100 text-pink-600'
    },
    {
      nombre: 'Alto Paraná',
      ciudades: ['Ciudad del Este', 'Hernandarias', 'Presidente Franco', 'Minga Guazú'],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      nombre: 'Itapúa',
      ciudades: ['Encarnación', 'Cambyretá', 'Fram', 'Capitán Miranda'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      nombre: 'Cordillera',
      ciudades: ['Caacupé', 'Areguá', 'Piribebuy', 'San Bernardino'],
      color: 'bg-red-100 text-red-600'
    },
    {
      nombre: 'Concepción',
      ciudades: ['Concepción', 'Belén', 'Loreto', 'Horqueta'],
      color: 'bg-green-100 text-green-600'
    },
    {
      nombre: 'San Pedro',
      ciudades: ['San Pedro', 'San Estanislao', 'Villa del Rosario', 'Antequera'],
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      nombre: 'Guairá',
      ciudades: ['Villarrica', 'Salto del Guairá', 'Independencia', 'Colonia Mauricio José Troche'],
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      nombre: 'Caaguazú',
      ciudades: ['Coronel Oviedo', 'Doctor Juan Eulogio Estigarribia', 'Doctor Juan Manuel Frutos', 'Repatriación'],
      color: 'bg-pink-100 text-pink-600'
    },
    {
      nombre: 'Paraguarí',
      ciudades: ['Paraguarí', 'Yaguarón', 'Carapeguá', 'Ybycuí'],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      nombre: 'Misiones',
      ciudades: ['San Juan Bautista', 'Ayolas', 'Santiago', 'Santa Rosa'],
      color: 'bg-blue-100 text-blue-600'
    },
    {
      nombre: 'Ñeembucú',
      ciudades: ['Pilar', 'Humaitá', 'San Juan Bautista de Ñeembucú', 'Villa Franca'],
      color: 'bg-red-100 text-red-600'
    },
    {
      nombre: 'Amambay',
      ciudades: ['Pedro Juan Caballero', 'Bella Vista', 'Capitán Bado', 'Karapaí'],
      color: 'bg-green-100 text-green-600'
    },
    {
      nombre: 'Canindeyú',
      ciudades: ['Salto del Guairá', 'Corpus Christi', 'Ypejhú', 'Nueva Esperanza'],
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      nombre: 'Presidente Hayes',
      ciudades: ['Villa Hayes', 'Benjamín Aceval', 'Nanawa', 'Puerto Pinasco'],
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      nombre: 'Alto Paraguay',
      ciudades: ['Fuerte Olimpo', 'Bahía Negra', 'Puerto La Victoria', 'Carmelo Peralta'],
      color: 'bg-pink-100 text-pink-600'
    },
    {
      nombre: 'Boquerón',
      ciudades: ['Filadelfia', 'Loma Plata', 'Mariscal Estigarribia', 'Neuland'],
      color: 'bg-purple-100 text-purple-600'
    },
    {
      nombre: 'Caazapá',
      ciudades: ['Caazapá', 'Abai', 'Buena Vista', 'San Juan Nepomuceno'],
      color: 'bg-blue-100 text-blue-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Structured Data para la página principal */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EscortShop Paraguay - Escorts y Acompañantes en Todo el País",
            "description": "Encuentra escorts, putas, trans, gay y acompañantes en los 17 departamentos de Paraguay. Anuncios verificados en Asunción, Ciudad del Este, Encarnación y más.",
            "url": "https://escortshoppy.com",
            "inLanguage": "es-PY",
            "isPartOf": {
              "@type": "WebSite",
              "name": "EscortShop Paraguay",
              "url": "https://escortshoppy.com"
            },
            "about": {
              "@type": "Service",
              "serviceType": "Anuncios Clasificados para Adultos",
              "areaServed": "Paraguay"
            }
          })
        }}
      />

      {/* Header - 100% RESPONSIVE */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <div className="w-full sm:w-auto flex justify-center sm:justify-start mb-2 sm:mb-0">
              <Link href="/">
                <Image 
                  src="/logo_escorts.jpeg" 
                  alt="EscortShop Paraguay - Escorts y Acompañantes" 
                  width={180}
                  height={54}
                  className="object-contain cursor-pointer w-40 sm:w-48"
                  priority
                />
              </Link>
            </div>
            
            <div className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                {usuario ? (
                  <>
                    <div className="hidden sm:block text-gray-600 text-xs sm:text-sm truncate max-w-[120px] md:max-w-[180px]">
                      👤 {usuario.email}
                    </div>
                    <div className="flex flex-wrap justify-center gap-2 w-full sm:w-auto">
                      {userRole === 'admin' ? (
                        <Link href="/admin" className="flex-1 sm:flex-none">
                          <button className="w-full px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xs sm:text-sm font-medium">
                            Panel Admin
                          </button>
                        </Link>
                      ) : (
                        <Link href="/mis-anuncios" className="flex-1 sm:flex-none">
                          <button className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-sm font-medium">
                            Mis Anuncios
                          </button>
                        </Link>
                      )}
                      <button 
                        onClick={cerrarSesion}
                        className="flex-1 sm:flex-none px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-xs sm:text-sm font-medium"
                      >
                        Cerrar
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="hidden lg:block text-gray-600 text-sm font-medium">
                      ¿Deseas publicar un anuncio?
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <Link href="/login" className="flex-1 sm:flex-none">
                        <button className="w-full px-3 py-2 border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 text-xs sm:text-sm font-medium">
                          Iniciar Sesión
                        </button>
                      </Link>
                      <Link href="/registro" className="flex-1 sm:flex-none">
                        <button className="w-full px-3 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-xs sm:text-sm font-medium">
                          Registrarse
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
      
{/* Hero Section - CON LOS 17 DEPARTAMENTOS Y SEO */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8 sm:py-10 md:py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
            Escorts Paraguay - Putas y Acompañantes VIP
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl mb-4">
            Encuentra escorts, putas, prostitutas, trans y gay en los 17 departamentos
          </p>
          
          {/* LOS 17 DEPARTAMENTOS EN EL HERO */}
          <div className="mt-5 sm:mt-6">
            <p className="text-sm sm:text-base md:text-lg opacity-90 mb-3 font-semibold">
              📍 Busca por departamento:
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
              {todosDepartamentos.map((depto) => (
                <a
                  key={depto.nombre}
                  href={`/escorts?departamento=${encodeURIComponent(depto.nombre)}`}
                  className="bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full text-xs sm:text-sm transition-colors inline-block"
                  aria-label={`Ver escorts en ${depto.nombre}`}
                >
                  {depto.nombre}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categorías principales - 100% RESPONSIVE con Schema */}
      <section className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-5 sm:mb-6 text-gray-800">
          Selecciona una categoría
        </h2>
        
        {/* Schema para las categorías */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Categorías de Escorts en Paraguay",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Escorts Mujeres",
                  "url": "https://escortshoppy.com/escorts"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Trans y Travestis",
                  "url": "https://escortshoppy.com/trans"
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": "Escorts Gay",
                  "url": "https://escortshoppy.com/gay"
                },
                {
                  "@type": "ListItem",
                  "position": 4,
                  "name": "Parejas y Swingers",
                  "url": "https://escortshoppy.com/parejas"
                }
              ]
            })
          }}
        />
        
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          <Link href="/escorts" aria-label="Ver escorts mujeres en Paraguay">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden group">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-4 sm:p-5 md:p-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform">💃</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">ESCORTS</h3>
                <p className="text-xs sm:text-sm text-pink-100">Mujeres acompañantes</p>
              </div>
            </div>
          </Link>

          <Link href="/trans" aria-label="Ver trans y travestis en Paraguay">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden group">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 sm:p-5 md:p-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform">🦋</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">TRANS</h3>
                <p className="text-xs sm:text-sm text-purple-100">Travestis y transexuales</p>
              </div>
            </div>
          </Link>

          <Link href="/gay" aria-label="Ver escorts gay en Paraguay">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 sm:p-5 md:p-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform">🌈</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">GAY</h3>
                <p className="text-xs sm:text-sm text-blue-100">Hombres escorts</p>
              </div>
            </div>
          </Link>

          <Link href="/parejas" aria-label="Ver parejas y swingers en Paraguay">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden group">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 sm:p-5 md:p-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform">💑</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">PAREJAS</h3>
                <p className="text-xs sm:text-sm text-red-100">Parejas y tríos</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Sección TODOS los Departamentos con ciudades - 100% RESPONSIVE */}
      <section className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-5 sm:mb-6 text-gray-800">
          Encuentra Escorts en los 17 Departamentos
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 mb-6 sm:mb-8 text-center text-sm sm:text-base">
            Busca anuncios de escorts, putas, prostitutas, trans y gay en todas las ciudades de Paraguay
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {todosDepartamentos.map((depto) => (
              <div key={depto.nombre} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 sm:p-5 border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`${depto.color} w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-base sm:text-lg shrink-0`}>
                    📍
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">
                      <a 
                        href={`/escorts?departamento=${encodeURIComponent(depto.nombre)}`}
                        className="hover:text-pink-600 transition-colors"
                        aria-label={`Ver escorts en ${depto.nombre}`}
                      >
                        {depto.nombre}
                      </a>
                    </h3>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-gray-700 text-xs sm:text-sm font-medium mb-2">
                    Ciudades principales:
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {depto.ciudades.map((ciudad) => (
                      <a
                        key={ciudad}
                        href={`/escorts?departamento=${encodeURIComponent(depto.nombre)}&ciudad=${encodeURIComponent(ciudad)}`}
                        className="inline-block bg-gray-50 hover:bg-pink-50 text-gray-700 hover:text-pink-700 text-xs px-2.5 py-1 rounded-full border border-gray-200 hover:border-pink-200 transition-all"
                        aria-label={`Ver escorts en ${ciudad}, ${depto.nombre}`}
                      >
                        {ciudad}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <a
                    href={`/escorts?departamento=${encodeURIComponent(depto.nombre)}`}
                    className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-pink-600 hover:text-pink-700"
                    aria-label={`Ver todos los anuncios en ${depto.nombre}`}
                  >
                    <span>Ver anuncios en {depto.nombre}</span>
                    <span className="text-sm">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BANNER 1: Anuncia con nosotros - 100% RESPONSIVE */}
      <section className="container mx-auto px-3 sm:px-4 py-4 sm:py-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-600 rounded-lg shadow-lg p-4 sm:p-6 text-white">
            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <span className="text-3xl sm:text-4xl">📢</span>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">ANUNCIA CON NOSOTROS</h3>
                <p className="text-sm sm:text-base mb-3">Pagos por Transferencia o Giros</p>
                <a 
                  href="https://wa.me/595992420313?text=Hola,%20quiero%20información%20sobre%20publicar%20un%20anuncio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-green-600 px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg font-bold text-sm sm:text-base hover:bg-green-50 transition-all shadow-md hover:shadow-lg"
                  aria-label="Contactar por WhatsApp para publicar anuncio"
                >
                  <span className="text-xl sm:text-2xl">📱</span>
                  <span className="hidden sm:inline">Contáctanos: 0992420313</span>
                  <span className="sm:hidden">WhatsApp: 0992420313</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER 2: Promo por apertura - 100% RESPONSIVE */}
      <section className="container mx-auto px-3 sm:px-4 py-4 sm:py-5">
        <div className="max-w-4xl mx-auto">
          <div className="bg-orange-500 rounded-lg shadow-lg p-4 sm:p-6 text-white">
            <div className="text-center">
              <span className="text-3xl sm:text-4xl mb-2 inline-block">🎁</span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">PROMO POR APERTURA</h3>
              <p className="text-sm sm:text-base md:text-lg font-semibold leading-relaxed">
                Recomendando a alguien tenés 50% en publicidad por 1 mes completo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Botón Reviews - 100% RESPONSIVE */}
      <section className="container mx-auto px-3 sm:px-4 py-5 sm:py-6">
        <div className="max-w-4xl mx-auto text-center">
          <button 
            disabled
            className="bg-gray-400 cursor-not-allowed text-white px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base shadow-lg inline-flex items-center gap-2 opacity-60 w-full sm:w-auto justify-center"
            title="Próximamente disponible"
            aria-label="Reseñas de clientes - Próximamente"
          >
            <span className="text-lg sm:text-xl">⭐</span>
            <span>Ver Reseñas de Clientes</span>
            <span className="text-xs bg-gray-500 px-2 py-1 rounded ml-1">Próximamente</span>
          </button>
          <p className="text-gray-500 text-xs sm:text-sm mt-3">
            Función en desarrollo
          </p>
        </div>
      </section>

      {/* Call to Action - Publicar Anuncio - 100% RESPONSIVE */}
      <section className="bg-gray-100 py-6 sm:py-8 md:py-10">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-5 sm:p-6 md:p-8 border-t-4 border-pink-500">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              ¿Deseas publicar un anuncio?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-5 leading-relaxed">
              Regístrate y comienza a ofrecer tus servicios en todo Paraguay
            </p>
            
            <Link href="/registro">
              <button className="bg-pink-600 text-white px-5 sm:px-6 md:px-8 py-3 sm:py-3.5 rounded-lg text-base sm:text-lg font-bold hover:bg-pink-700 active:bg-pink-800 transition-all shadow-lg hover:shadow-xl w-full sm:w-auto hover:scale-[1.02] active:scale-95">
                📝 Registrarse Ahora
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección informativa - 100% RESPONSIVE con Keywords */}
      <section className="bg-white py-5 sm:py-6 md:py-8 border-t border-gray-200">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed space-y-3 sm:space-y-4">
              <p>
                <strong className="text-gray-800">EscortShop Paraguay</strong> es tu portal para encontrar las mejores escorts, putas, prostitutas y acompañantes en todo el país. 
                Somos el directorio más completo, con perfiles de escorts independientes en todos los departamentos. Encuentra escorts en Asunción, Ciudad del Este, Encarnación, 
                Salto del Guairá, Luque, San Lorenzo, Capiatá y todas las ciudades principales.
              </p>
              
              <p>
                Busca <strong>escorts mujeres</strong>, <strong>trans</strong>, <strong>travestis</strong>, <strong>escorts gay</strong>, <strong>parejas</strong> y <strong>swingers</strong> 
                en los 17 departamentos de Paraguay. También ofrecemos anuncios de masajes eróticos, masajes tántricos y servicios VIP para adultos.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 my-4 rounded">
                <p className="text-gray-700 text-xs sm:text-sm md:text-base leading-relaxed">
                  <strong className="text-yellow-800">⚠️ Aviso importante:</strong> EscortShop es una plataforma de publicidad para escorts independientes, 
                  no somos una agencia. Cualquier relación o acuerdo que establezcas es bajo tu propia responsabilidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - 100% RESPONSIVE con Schema */}
      <footer className="bg-gray-800 text-gray-300 py-6 sm:py-8 md:py-10">
        {/* Schema Organization para Footer */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "EscortShop Paraguay",
              "url": "https://escortshoppy.com",
              "logo": "https://escortshoppy.com/logo_escorts.jpg",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+595-992-420313",
                "contactType": "customer service",
                "areaServed": "PY",
                "availableLanguage": ["Spanish"]
              },
              "sameAs": [
                "https://escortshoppy.com"
              ]
            })
          }}
        />
        
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">
              EscortShop Paraguay - Escorts, Putas y Acompañantes
            </h3>
            
            <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base leading-relaxed">
              <p className="text-center sm:text-left">
                <strong className="text-white">EscortShop.com</strong> es la página de contactos con avisos eróticos para adultos líder en Paraguay. 
                Encuentra <strong className="text-pink-400">escorts</strong>, <strong className="text-pink-400">putas</strong>, 
                <strong className="text-pink-400"> prostitutas</strong>, <strong className="text-purple-400"> trans</strong>, 
                <strong className="text-purple-400"> travestis</strong> y <strong className="text-blue-400"> escorts gay</strong> en tu ciudad.
              </p>
              
              <p className="text-center sm:text-left">
                Busca y encuentra en cualquiera de nuestras categorías: <strong className="text-pink-400">escorts mujeres</strong>, 
                <strong className="text-purple-400"> travestis</strong>, <strong className="text-blue-400">escorts gay</strong>, 
                <strong className="text-red-400"> parejas y swingers</strong>. Anuncios en Asunción, Ciudad del Este, Encarnación, Luque, San Lorenzo y todas las ciudades.
              </p>
              
              <p className="text-center pt-4 sm:pt-6 border-t border-gray-700">
                <strong className="text-white">Departamentos disponibles:</strong><br/>
                <span className="text-xs">
                  Central • Alto Paraná • Itapúa • Caaguazú • San Pedro • Cordillera • 
                  Concepción • Guairá • Paraguarí • Misiones • Ñeembucú • Amambay • Canindeyú • 
                  Presidente Hayes • Alto Paraguay • Boquerón • Caazapá
                </span>
              </p>
            </div>
          </div>
          
          {/* Sección Legal - 100% RESPONSIVE */}
          <div className="max-w-4xl mx-auto mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-gray-700">
            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 text-center">
              Información Legal
            </h4>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400 text-center">
              <Link href="/terminos" className="hover:text-pink-400 transition-colors py-2 sm:py-0">
                📄 Términos y Condiciones
              </Link>
              <Link href="/contacto" className="hover:text-pink-400 transition-colors py-2 sm:py-0">
                📧 Contacto
              </Link>
            </div>
          </div>

          {/* Copyright - 100% RESPONSIVE */}
          <div className="text-center mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-gray-700">
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              © 2025 EscortShop Paraguay. Todos los derechos reservados.
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              🔞 Sitio exclusivo para mayores de 18 años
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}