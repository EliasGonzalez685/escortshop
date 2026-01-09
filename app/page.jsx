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
  }, [])

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

  if (showAgeVerification) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 sm:p-8 text-center">
          <div className="mb-4 sm:mb-6">
            <Image 
              src="/logo_escorts.jpeg" 
              alt="EscortShop" 
              width={150} 
              height={45}
              className="object-contain mx-auto mb-3"
            />
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-3 sm:mb-4">
            POR FAVOR LEER LAS ADVERTENCIAS
          </h2>
          
          <div className="text-left mb-4 sm:mb-6 space-y-2 sm:space-y-3">
            <p className="text-sm sm:text-base text-gray-700">
              Este sitio contiene contenido para adultos y está destinado únicamente a personas mayores de 18 años.
            </p>
            
            <p className="text-sm sm:text-base text-gray-700">
              Al continuar, usted confirma que:
            </p>
            
            <ul className="list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1 sm:space-y-2 ml-2 sm:ml-4">
              <li>Es mayor de 18 años</li>
              <li>Acepta el visionado de textos e imágenes explícitas</li>
              <li>Comprende que este contenido está destinado a un público adulto</li>
              <li>No se ofende por material de naturaleza adulta</li>
            </ul>
            
            <p className="text-sm sm:text-base text-gray-700 font-semibold">
              Si es menor de edad o no desea ver este tipo de contenido, por favor abandone este sitio.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={handleAgeReject}
              className="flex-1 bg-gray-500 text-white py-2.5 sm:py-3 rounded-lg hover:bg-gray-600 font-medium text-sm sm:text-base"
            >
              Rechazar - Salir
            </button>
            <button
              onClick={handleAgeAccept}
              className="flex-1 bg-pink-600 text-white py-2.5 sm:py-3 rounded-lg hover:bg-pink-700 font-medium text-sm sm:text-base"
            >
              Aceptar - Entrar
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Datos completos de todos los departamentos y sus ciudades
  const departamentosCompletos = [
    {
      nombre: 'Central',
      ciudades: ['Asunción', 'Lambaré', 'Fernando de la Mora', 'Luque', 'San Lorenzo', 
                'Mariano Roque Alonso', 'Capiatá', 'Itá', 'Ypané', 'Ñemby', 'San Antonio', 'Villeta', 'San Bernardino', 'j augusto saldivar'],
      color: 'pink',
      descripcion: 'Departamento más poblado con la capital Asunción'
    },
    {
      nombre: 'Alto Paraná',
      ciudades: ['Ciudad del Este', 'Hernandarias', 'Presidente Franco', 'Minga Guazú', 
                'Santa Rita', 'Los Cedrales', 'Naranjal', 'San Alberto'],
      color: 'purple',
      descripcion: 'Frontera con Brasil y Cataratas del Iguazú'
    },
    {
      nombre: 'Itapúa',
      ciudades: ['Encarnación', 'Cambyretá', 'Fram', 'Natalio', 'Carmen del Paraná', 
                'Capitán Miranda', 'Bella Vista', 'San Juan del Paraná'],
      color: 'blue',
      descripcion: 'Frontera con Argentina y playas sobre el río Paraná'
    },
    {
      nombre: 'Cordillera',
      ciudades: ['Caacupé', 'Areguá', 'Piribebuy', 'Arroyos y Esteros', 'San Bernardino', 
                'Tobatí', 'Altos', 'Loma Grande'],
      color: 'red',
      descripcion: 'Región de colinas y capital espiritual Caacupé'
    },
    {
      nombre: 'Concepción',
      ciudades: ['Concepción', 'Belén', 'Loreto', 'San Carlos', 'Horqueta', 
                'San Lázaro', 'Yby Yaú'],
      color: 'green',
      descripcion: 'Norte del país sobre el río Paraguay'
    },
    {
      nombre: 'San Pedro',
      ciudades: ['San Pedro', 'San Estanislao', 'Villa del Rosario', 'Antequera', 
                'Choré', 'Santa Rosa del Aguaray', 'General Isidoro Resquín'],
      color: 'yellow',
      descripcion: 'Corazón de la región oriental'
    },
    {
      nombre: 'Guairá',
      ciudades: ['Villarrica', 'Salto del Guairá', 'Independencia', 'Colonia Mauricio José Troche',
                'Borja', 'Iturbe', 'Ñumí'],
      color: 'indigo',
      descripcion: 'Tierra de música y tradiciones'
    },
    {
      nombre: 'Caaguazú',
      ciudades: ['Coronel Oviedo', 'Doctor Juan Eulogio Estigarribia', 'Doctor Juan Manuel Frutos', 
                'Repatriación', 'Carayaó', 'San Joaquín', 'Yhú'],
      color: 'pink',
      descripcion: 'Capital de la madera y la yerba mate'
    },
    {
      nombre: 'Paraguarí',
      ciudades: ['Paraguarí', 'Yaguarón', 'Carapeguá', 'Ybycuí', 'Acahay', 
                'Sapucaí', 'Escobar'],
      color: 'purple',
      descripcion: 'Región histórica y de cerros'
    },
    {
      nombre: 'Amambay',
      ciudades: ['Pedro Juan Caballero', 'Bella Vista', 'Capitán Bado', 
                'Karapaí', 'Zanja Pytá'],
      color: 'blue',
      descripcion: 'Frontera seca con Brasil'
    },
    {
      nombre: 'Canindeyú',
      ciudades: ['Salto del Guairá', 'Corpus Christi', 'Ypejhú', 'Nueva Esperanza',
                'Katueté', 'La Paloma', 'Yasy Cañy'],
      color: 'red',
      descripcion: 'Noreste del país con represa de Itaipú'
    },
    {
      nombre: 'Misiones',
      ciudades: ['San Juan Bautista', 'Ayolas', 'Santiago', 'Santa Rosa', 
                'San Miguel', 'Santa María', 'San Patricio'],
      color: 'green',
      descripcion: 'Tierras de antiguas misiones jesuíticas'
    },
    {
      nombre: 'Ñeembucú',
      ciudades: ['Pilar', 'Humaitá', 'San Juan Bautista de Ñeembucú', 'Villa Franca',
                'Villa Oliva', 'Desmochados'],
      color: 'yellow',
      descripcion: 'Llanuras y esteros del sur'
    },
    {
      nombre: 'Presidente Hayes',
      ciudades: ['Villa Hayes', 'Benjamín Aceval', 'Nanawa', 'Puerto Pinasco',
                'Teniente Primero Manuel Irala Fernández', 'José Falcón'],
      color: 'indigo',
      descripcion: 'Región chaqueña occidental'
    },
    {
      nombre: 'Alto Paraguay',
      ciudades: ['Fuerte Olimpo', 'Bahía Negra', 'Puerto La Victoria', 
                'Puerto Casado', 'Carmelo Peralta'],
      color: 'pink',
      descripcion: 'Extremo norte, frontera con Bolivia y Brasil'
    },
    {
      nombre: 'Boquerón',
      ciudades: ['Filadelfia', 'Loma Plata', 'Mariscal Estigarribia', 
                'Teniente Esteban Martínez', 'Neuland'],
      color: 'purple',
      descripcion: 'Chaco central, colonias menonitas'
    }
  ];

  const ciudadesPrincipales = [
    { nombre: 'Asunción', departamento: 'Central', tipo: 'capital', emoji: '🏙️' },
    { nombre: 'Ciudad del Este', departamento: 'Alto Paraná', tipo: 'ciudad', emoji: '🛒' },
    { nombre: 'Encarnación', departamento: 'Itapúa', tipo: 'ciudad', emoji: '🏖️' },
    { nombre: 'Caacupé', departamento: 'Cordillera', tipo: 'ciudad', emoji: '⛪' },
    { nombre: 'Salto del Guairá', departamento: 'Canindeyú', tipo: 'ciudad', emoji: '🌊' },
    { nombre: 'Coronel Oviedo', departamento: 'Caaguazú', tipo: 'ciudad', emoji: '🌳' },
    { nombre: 'Pedro Juan Caballero', departamento: 'Amambay', tipo: 'ciudad', emoji: '🇧🇷' },
    { nombre: 'Pilar', departamento: 'Ñeembucú', tipo: 'ciudad', emoji: '🏘️' },
    { nombre: 'Concepción', departamento: 'Concepción', tipo: 'ciudad', emoji: '🚢' },
    { nombre: 'San Pedro', departamento: 'San Pedro', tipo: 'ciudad', emoji: '❤️' },
    { nombre: 'Villarrica', departamento: 'Guairá', tipo: 'ciudad', emoji: '🎵' },
    { nombre: 'Paraguarí', departamento: 'Paraguarí', tipo: 'ciudad', emoji: '⛰️' },
    { nombre: 'San Juan Bautista', departamento: 'Misiones', tipo: 'ciudad', emoji: '⛪' },
    { nombre: 'Villa Hayes', departamento: 'Presidente Hayes', tipo: 'ciudad', emoji: '🏜️' },
    { nombre: 'Filadelfia', departamento: 'Boquerón', tipo: 'ciudad', emoji: '👨‍🌾' },
    { nombre: 'Fuerte Olimpo', departamento: 'Alto Paraguay', tipo: 'ciudad', emoji: '🏰' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Mejorado y Responsive */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
            <Link href="/">
              <Image 
                src="/logo_escorts.jpeg" 
                alt="EscortShop" 
                width={150} 
                height={45}
                className="object-contain cursor-pointer w-32 sm:w-40 md:w-48"
              />
            </Link>
            
            <div className="flex items-center gap-2 sm:gap-4">
              {usuario ? (
                <>
                  <div className="hidden sm:block text-gray-600 text-xs sm:text-sm truncate max-w-[120px] sm:max-w-none">
                    👤 {usuario.email}
                  </div>
                  <div className="flex gap-2 sm:gap-3">
                    {userRole === 'admin' ? (
                      <Link href="/admin">
                        <button className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xs sm:text-sm font-medium transition-all">
                          Panel Admin
                        </button>
                      </Link>
                    ) : (
                      <Link href="/mis-anuncios">
                        <button className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-sm font-medium transition-all">
                          Mis Anuncios
                        </button>
                      </Link>
                    )}
                    <button 
                      onClick={cerrarSesion}
                      className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-xs sm:text-sm font-medium transition-all"
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
                  <div className="flex gap-2 sm:gap-3">
                    <Link href="/login">
                      <button className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 text-xs sm:text-sm font-medium transition-all">
                        Iniciar Sesión
                      </button>
                    </Link>
                    <Link href="/registro">
                      <button className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-xs sm:text-sm font-medium transition-all">
                        Registrarse
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Responsive CON TODAS LAS CIUDADES */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
            Escorts Paraguay - Putas y Acompañantes VIP en Todo el País
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2">
            Encuentra escorts, putas, trans y gay en los 17 departamentos y 250+ ciudades de Paraguay
          </p>
          
          <div className="mt-4 sm:mt-6">
            <p className="text-sm sm:text-base md:text-lg opacity-90 mb-3">
              Busca por ciudad principal:
            </p>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4">
              {ciudadesPrincipales.slice(0, 8).map((ciudad) => (
                <span key={ciudad.nombre} className="bg-white/20 px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-white/30 transition-colors">
                  <a 
                    href={`/escorts?departamento=${encodeURIComponent(ciudad.departamento)}&ciudad=${encodeURIComponent(ciudad.nombre)}`}
                    className="hover:underline flex items-center gap-1"
                  >
                    {ciudad.emoji} {ciudad.nombre}
                  </a>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {ciudadesPrincipales.slice(8).map((ciudad) => (
                <span key={ciudad.nombre} className="bg-white/10 px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-white/20 transition-colors">
                  <a 
                    href={`/escorts?departamento=${encodeURIComponent(ciudad.departamento)}&ciudad=${encodeURIComponent(ciudad.nombre)}`}
                    className="hover:underline flex items-center gap-1"
                  >
                    {ciudad.emoji} {ciudad.nombre}
                  </a>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categorías principales - Responsive */}
      <section className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
          Selecciona una categoría
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-6xl mx-auto">
          {/* ESCORTS */}
          <Link href="/escorts">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group border-2 sm:border-4 border-transparent hover:border-pink-500 transform hover:scale-105">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-4 sm:p-6 md:p-8 text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform">💃</div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">ESCORTS</h3>
                <p className="text-xs sm:text-sm md:text-base text-pink-100">Mujeres acompañantes</p>
              </div>
            </div>
          </Link>

          {/* TRANS */}
          <Link href="/trans">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group border-2 sm:border-4 border-transparent hover:border-purple-500 transform hover:scale-105">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 sm:p-6 md:p-8 text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform">🦋</div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">TRANS</h3>
                <p className="text-xs sm:text-sm md:text-base text-purple-100">Travestis y transexuales</p>
              </div>
            </div>
          </Link>

          {/* GAY */}
          <Link href="/gay">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group border-2 sm:border-4 border-transparent hover:border-blue-500 transform hover:scale-105">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 sm:p-6 md:p-8 text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform">🌈</div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">GAY</h3>
                <p className="text-xs sm:text-sm md:text-base text-blue-100">Hombres escorts</p>
              </div>
            </div>
          </Link>

          {/* PAREJAS */}
          <Link href="/parejas">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group border-2 sm:border-4 border-transparent hover:border-red-500 transform hover:scale-105">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-4 sm:p-6 md:p-8 text-center">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform">💑</div>
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white mb-1 sm:mb-2">PAREJAS</h3>
                <p className="text-xs sm:text-sm md:text-base text-red-100">Parejas y tríos</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* SECCIÓN COMPLETA: Todos los departamentos con sus ciudades */}
      <section className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8 text-gray-800">
          Encuentra Escorts en Todos los Departamentos de Paraguay
        </h2>
        
        <div className="max-w-6xl mx-auto">
          <p className="text-gray-600 mb-8 sm:mb-10 text-center text-sm sm:text-base md:text-lg">
            Busca anuncios de escorts, putas, trans, gay y parejas en las 250+ ciudades de Paraguay
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {departamentosCompletos.map((depto) => (
              <div key={depto.nombre} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-5 sm:p-6 border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`bg-gradient-to-br from-${depto.color}-100 to-${depto.color}-50 text-${depto.color}-600 w-12 h-12 rounded-full flex items-center justify-center text-lg`}>
                    📍
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                      <a 
                        href={`/escorts?departamento=${encodeURIComponent(depto.nombre)}`}
                        className="hover:text-pink-600 transition-colors"
                      >
                        {depto.nombre}
                      </a>
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">{depto.descripcion}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-gray-700 text-sm font-medium mb-2">
                    Principales ciudades para encontrar escorts:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {depto.ciudades.map((ciudad) => (
                      <a
                        key={ciudad}
                        href={`/escorts?departamento=${encodeURIComponent(depto.nombre)}&ciudad=${encodeURIComponent(ciudad)}`}
                        className="inline-block bg-gray-50 hover:bg-pink-50 text-gray-700 hover:text-pink-700 text-xs px-3 py-1 rounded-full border border-gray-200 hover:border-pink-200 transition-all"
                      >
                        {ciudad}
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <a
                    href={`/escorts?departamento=${encodeURIComponent(depto.nombre)}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-pink-600 hover:text-pink-700"
                  >
                    <span>Ver todos los anuncios en {depto.nombre}</span>
                    <span className="text-lg">→</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Sección informativa adicional */}
          <div className="mt-10 sm:mt-12 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-5 sm:p-6 border border-pink-100">
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6">
              <div className="text-4xl sm:text-5xl">🗺️</div>
              <div className="text-center md:text-left">
                <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  Cobertura Nacional Completa
                </h4>
                <p className="text-gray-600 text-sm sm:text-base">
                  EscortShop Paraguay tiene anuncios en los <strong className="text-pink-600">17 departamentos</strong> y más de <strong className="text-pink-600">250 ciudades</strong> de todo el país. 
                  Donde sea que te encuentres, encontrarás acompañantes cerca de ti.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER 1: Anuncia con nosotros - CON WHATSAPP */}
      <section className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-600 rounded-lg shadow-lg p-4 sm:p-6 text-white">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-center sm:text-left">
              <span className="text-3xl sm:text-4xl">📢</span>
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-1">ANUNCIA CON NOSOTROS</h3>
                <p className="text-sm sm:text-base md:text-lg mb-2">Pagos a través de Transferencia o Giros</p>
                <a 
                  href="https://wa.me/595992420313?text=Hola,%20quiero%20información%20sobre%20publicar%20un%20anuncio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-green-600 px-3 sm:px-4 py-2 rounded-lg font-bold text-sm sm:text-base hover:bg-green-50 transition-all"
                >
                  <span className="text-xl sm:text-2xl">📱</span>
                  Contactanos: 0992420313
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER 2: Promo por apertura - Responsive */}
      <section className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-orange-500 rounded-lg shadow-lg p-4 sm:p-6 text-white">
            <div className="text-center">
              <span className="text-3xl sm:text-4xl mb-2 inline-block">🎁</span>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2">PROMO POR APERTURA DE PÁGINA</h3>
              <p className="text-sm sm:text-base md:text-lg font-semibold">
                Recomendando a alguien tenés 50% en publicidad por 1 mes completo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Botón Reviews - Responsive */}
      <section className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto text-center">
          <button 
            disabled
            className="bg-gray-400 cursor-not-allowed text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base md:text-lg shadow-lg inline-flex items-center gap-2 sm:gap-3 opacity-60"
            title="Próximamente disponible"
          >
            ⭐ Ver Reseñas de Clientes
            <span className="text-xs bg-gray-500 px-2 py-1 rounded">Próximamente</span>
          </button>
          <p className="text-gray-500 text-xs sm:text-sm mt-2 sm:mt-3 px-4">
            Función en desarrollo - Próximamente podrás leer experiencias reales
          </p>
        </div>
      </section>

      {/* Call to Action - Publicar Anuncio */}
      <section className="bg-gray-100 py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4 text-center">
          <div className="max-w-2xl mx-auto bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 border-t-4 border-pink-500">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
              ¿Deseas publicar un anuncio?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-4 sm:mb-6">
              Regístrate y comienza a ofrecer tus servicios en la plataforma líder de Paraguay
            </p>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 sm:mb-6 text-left">
              <p className="text-xs sm:text-sm text-gray-700">
                <strong className="text-blue-700">¿Para qué registrarse?</strong><br/>
                Al registrarte podrás controlar tus publicaciones activas, ver estadísticas de visualizaciones, 
                actualizar tu información en tiempo real y hacer sugerencias para mejorar tus anuncios.
              </p>
            </div>
            
            <Link href="/registro">
              <button className="bg-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg md:text-xl font-bold hover:bg-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                📝 Registrarse Ahora
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección informativa - Responsive CON TODAS LAS CIUDADES */}
      <section className="bg-white py-6 sm:py-10 border-t border-gray-200">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-gray-600 text-xs sm:text-sm leading-relaxed space-y-3 sm:space-y-4">
              <p>
                <strong className="text-gray-800">EscortShop Paraguay</strong> es el directorio más completo de escorts y acompañantes en todo el territorio paraguayo. 
                Cubrimos los <strong>17 departamentos</strong> y más de <strong>250 ciudades</strong> desde Asunción hasta las zonas fronterizas con Brasil, Argentina y Bolivia.
              </p>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg p-4 sm:p-5 my-4 border border-pink-100">
                <h4 className="font-bold text-gray-800 mb-3 text-center">📍 Cobertura Nacional Completa</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                  <div>
                    <strong className="text-pink-600">Capital y Central:</strong>
                    <p className="text-gray-600 mt-1">Asunción, Lambaré, Fernando de la Mora, Luque, San Lorenzo, Capiatá</p>
                  </div>
                  <div>
                    <strong className="text-purple-600">Este y Frontera:</strong>
                    <p className="text-gray-600 mt-1">Ciudad del Este, Encarnación, Pedro Juan Caballero, Salto del Guairá</p>
                  </div>
                  <div>
                    <strong className="text-blue-600">Interior y Chaco:</strong>
                    <p className="text-gray-600 mt-1">Concepción, Pilar, Filadelfia, Fuerte Olimpo, Villa Hayes</p>
                  </div>
                </div>
              </div>
              
              <p>
                Ya sea que busques compañía en la capital Asunción, en la vibrante Ciudad del Este, en las playas de Encarnación, 
                en la espiritual Caacupé, o en cualquier otra ciudad del interior, en <strong>EscortShop Paraguay</strong> encontrarás 
                anuncios verificados de escorts independientes que ofrecen sus servicios en tu zona.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 my-3 sm:my-4">
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  <strong className="text-yellow-800">⚠️ Aviso importante:</strong> EscortShop es una plataforma de publicidad para escorts independientes, 
                  no somos una agencia. Cualquier relación o acuerdo que establezcas es bajo tu propia responsabilidad. 
                  Cada anunciante es responsable del contenido que publica. No percibimos comisiones de sus ingresos ni intermediamos en sus servicios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Responsive COMPLETO */}
      <footer className="bg-gray-800 text-gray-300 py-8 sm:py-12">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 text-center">
              EscortShop Paraguay - Tu plataforma de contactos para adultos
            </h3>
            
            <div className="space-y-4 sm:space-y-5 text-xs sm:text-sm leading-relaxed">
              <p>
                <strong className="text-white">EscortShop.com</strong> es la página de contactos con avisos eróticos para adultos líder en Paraguay. 
                Si quieres buscar mujeres o buscas hombres, éste es tu sitio. Un portal web donde cientos de chicas y chicos 
                publican sus anuncios clasificados eróticos de forma profesional.
              </p>
              
              <div className="bg-gray-900/50 rounded-lg p-4 sm:p-5 my-4">
                <h4 className="text-white font-bold mb-3 text-center">📍 Ciudades principales donde encontrar anuncios:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 text-center">
                  {ciudadesPrincipales.map((ciudad) => (
                    <span key={ciudad.nombre} className="text-pink-300 hover:text-pink-200 transition-colors">
                      • {ciudad.nombre}
                    </span>
                  ))}
                </div>
                <p className="text-gray-400 text-xs text-center mt-3">
                  Y todas las demás ciudades de los 17 departamentos de Paraguay
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-white font-bold mb-2">Categorías disponibles:</h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-pink-900/30 text-pink-300 px-3 py-1 rounded-full text-xs">💃 Escorts Mujeres</span>
                    <span className="bg-purple-900/30 text-purple-300 px-3 py-1 rounded-full text-xs">🦋 Trans</span>
                    <span className="bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-xs">🌈 Gay</span>
                    <span className="bg-red-900/30 text-red-300 px-3 py-1 rounded-full text-xs">💑 Parejas</span>
                  </div>
                </div>
                <div>
                  <h5 className="text-white font-bold mb-2">Regiones principales:</h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">🏙️ Capital y Central</span>
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">🛒 Este y Frontera</span>
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">🌳 Interior</span>
                    <span className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs">🏜️ Chaco</span>
                  </div>
                </div>
              </div>
              
              <p className="text-center pt-4 sm:pt-6 border-t border-gray-700">
                <strong className="text-white text-xs sm:text-sm">Departamentos disponibles:</strong><br/>
                <span className="text-[10px] sm:text-xs">
                  Asunción • Central • Alto Paraná • Itapúa • Caaguazú • San Pedro • Cordillera • 
                  Concepción • Guairá • Paraguarí • Misiones • Ñeembucú • Amambay • Canindeyú • 
                  Presidente Hayes • Alto Paraguay • Boquerón
                </span>
              </p>
            </div>
          </div>

          {/* Sección Legal - Responsive */}
          <div className="max-w-4xl mx-auto mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-700">
            <h4 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4 text-center">
              Legal e Información
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-xs text-gray-400 text-center">
              <Link href="/terminos" className="hover:text-pink-400 transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="/contacto" className="hover:text-pink-400 transition-colors">
                Contacto
              </Link>
              <Link href="/politica-privacidad" className="hover:text-pink-400 transition-colors">
                Política de Privacidad
              </Link>
              <Link href="/preguntas-frecuentes" className="hover:text-pink-400 transition-colors">
                Preguntas Frecuentes
              </Link>
            </div>
          </div>

          <div className="text-center mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-700">
            <p className="text-xs sm:text-sm text-gray-400">
              © 2025 EscortShop Paraguay. Todos los derechos reservados. | Sitio para mayores de 18 años.
            </p>
            <p className="text-gray-500 text-[10px] sm:text-xs mt-2">
              Anuncios verificados en los 17 departamentos de Paraguay
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}