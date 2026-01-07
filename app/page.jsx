'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
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
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="mb-6">
            <Image 
              src="/logo_escorts.jpeg" 
              alt="EscortShop" 
              width={200} 
              height={60}
              className="object-contain mx-auto mb-4"
            />
          </div>
          
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            POR FAVOR LEER LAS ADVERTENCIAS
          </h2>
          
          <div className="text-left mb-6 space-y-4">
            <p className="text-gray-700">
              Este sitio contiene contenido para adultos y está destinado únicamente a personas mayores de 18 años.
            </p>
            
            <p className="text-gray-700">
              Al continuar, usted confirma que:
            </p>
            
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Es mayor de 18 años</li>
              <li>Acepta el visionado de textos e imágenes explícitas</li>
              <li>Comprende que este contenido está destinado a un público adulto</li>
              <li>No se ofende por material de naturaleza adulta</li>
            </ul>
            
            <p className="text-gray-700 font-semibold">
              Si es menor de edad o no desea ver este tipo de contenido, por favor abandone este sitio.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleAgeReject}
              className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 font-medium"
            >
              Rechazar - Salir
            </button>
            <button
              onClick={handleAgeAccept}
              className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 font-medium"
            >
              Aceptar - Entrar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Mejorado */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <Link href="/">
              <Image 
                src="/logo_escorts.jpeg" 
                alt="EscortShop" 
                width={200} 
                height={60}
                className="object-contain cursor-pointer"
              />
            </Link>
            
            <div className="flex items-center gap-6">
              {usuario ? (
                <>
                  <div className="hidden md:block text-gray-600 text-sm">
                    👤 {usuario.email}
                  </div>
                  <div className="flex gap-3">
                    {userRole === 'admin' ? (
                      <Link href="/admin">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-medium transition-all">
                          Panel Admin
                        </button>
                      </Link>
                    ) : (
                      <Link href="/mis-anuncios">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-all">
                          Mis Anuncios
                        </button>
                      </Link>
                    )}
                    <button 
                      onClick={cerrarSesion}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-sm font-medium transition-all"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="hidden md:block text-gray-600 text-sm font-medium">
                    ¿Deseas publicar un anuncio?
                  </div>
                  <div className="flex gap-3">
                    <Link href="/login">
                      <button className="px-4 py-2 border-2 border-pink-600 text-pink-600 rounded-lg hover:bg-pink-50 text-sm font-medium transition-all">
                        Iniciar Sesión
                      </button>
                    </Link>
                    <Link href="/registro">
                      <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-sm font-medium transition-all">
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

      {/* Hero Section - Título principal */}
      <section className="bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenido a EscortShop Paraguay
          </h1>
          <p className="text-xl md:text-2xl mb-2">
            La plataforma de anuncios para adultos más completa de Paraguay
          </p>
          <p className="text-lg opacity-90">
            Encuentra compañía en tu ciudad
          </p>
        </div>
      </section>

      {/* Categorías principales - 4 botones grandes */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Selecciona una categoría
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* ESCORTS */}
          <Link href="/escorts">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group border-4 border-transparent hover:border-pink-500 transform hover:scale-105">
              <div className="bg-gradient-to-br from-pink-500 to-pink-600 p-8 text-center">
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">💃</div>
                <h3 className="text-2xl font-bold text-white mb-2">ESCORTS</h3>
                <p className="text-pink-100">Mujeres acompañantes</p>
              </div>
            </div>
          </Link>

          {/* TRANS */}
          <Link href="/trans">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group border-4 border-transparent hover:border-purple-500 transform hover:scale-105">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-8 text-center">
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">🦋</div>
                <h3 className="text-2xl font-bold text-white mb-2">TRANS</h3>
                <p className="text-purple-100">Travestis y transexuales</p>
              </div>
            </div>
          </Link>

          {/* GAY */}
          <Link href="/gay">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group border-4 border-transparent hover:border-blue-500 transform hover:scale-105">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-8 text-center">
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">🌈</div>
                <h3 className="text-2xl font-bold text-white mb-2">GAY</h3>
                <p className="text-blue-100">Hombres escorts</p>
              </div>
            </div>
          </Link>

          {/* PAREJAS */}
          <Link href="/parejas">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer overflow-hidden group border-4 border-transparent hover:border-red-500 transform hover:scale-105">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-8 text-center">
                <div className="text-7xl mb-4 group-hover:scale-110 transition-transform">💑</div>
                <h3 className="text-2xl font-bold text-white mb-2">PAREJAS</h3>
                <p className="text-red-100">Parejas y tríos</p>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* BANNER 1: Anuncia con nosotros - SIMPLIFICADO */}
      <section className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-green-600 rounded-lg shadow-lg p-6 text-white">
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl">📢</span>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-1">ANUNCIA CON NOSOTROS</h3>
                <p className="text-lg">Pagos a través de Transferencia o Giros</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BANNER 2: Promo por apertura - SIMPLIFICADO */}
      <section className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-orange-500 rounded-lg shadow-lg p-6 text-white">
            <div className="text-center">
              <span className="text-4xl mb-2 inline-block">🎁</span>
              <h3 className="text-2xl font-bold mb-2">PROMO POR APERTURA DE PÁGINA</h3>
              <p className="text-lg font-semibold">
                Recomendando a alguien tenés 50% en publicidad por 1 mes completo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Botón Reviews - DESHABILITADO pero visible */}
      <section className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <button 
            disabled
            className="bg-gray-400 cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg inline-flex items-center gap-3 opacity-60"
            title="Próximamente disponible"
          >
            ⭐ Ver Reseñas de Clientes
            <span className="text-xs bg-gray-500 px-2 py-1 rounded">Próximamente</span>
          </button>
          <p className="text-gray-500 text-sm mt-3">
            Función en desarrollo - Próximamente podrás leer experiencias reales
          </p>
        </div>
      </section>

      {/* Call to Action - Publicar Anuncio */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-t-4 border-pink-500">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              ¿Deseas publicar un anuncio?
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Regístrate y comienza a ofrecer tus servicios en la plataforma líder de Paraguay
            </p>
            <Link href="/registro">
              <button className="bg-pink-600 text-white px-8 py-4 rounded-lg text-xl font-bold hover:bg-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105">
                📝 Registrarse Ahora
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Sección informativa - Bienvenida discreta */}
      <section className="bg-white py-10 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-gray-600 text-sm leading-relaxed space-y-3">
              <p>
                <strong className="text-gray-800">EscortShop Paraguay</strong> es tu portal para encontrar las mejores escorts y acompañantes en todo el país. 
                Somos el directorio más completo, con perfiles de escorts independientes en todos los departamentos. 
                Aquí encontrarás desde acompañantes cariñosas hasta compañía VIP para vivir una experiencia inolvidable.
              </p>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                <p className="text-gray-700 text-xs leading-relaxed">
                  <strong className="text-yellow-800">⚠️ Aviso importante:</strong> EscortShop es una plataforma de publicidad para escorts independientes, 
                  no somos una agencia. Cualquier relación o acuerdo que establezcas es bajo tu propia responsabilidad. 
                  Cada anunciante es responsable del contenido que publica. No percibimos comisiones de sus ingresos ni intermediamos en sus servicios.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer informativo - Texto SEO */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              EscortShop Paraguay - Tu plataforma de contactos para adultos
            </h3>
            
            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                <strong className="text-white">EscortShop.com</strong> es la página de contactos con avisos eróticos para adultos líder en Paraguay. 
                Si quieres buscar mujeres o buscas hombres, éste es tu sitio. Un portal web donde cientos de chicas y chicos 
                publican sus anuncios clasificados eróticos de forma profesional.
              </p>
              
              <p>
                Busca y encuentra en cualquiera de nuestras categorías: <strong className="text-pink-400">escorts mujeres</strong>, 
                <strong className="text-purple-400"> travestis</strong>, <strong className="text-blue-400">escorts gay</strong>, 
                <strong className="text-red-400"> parejas y swingers</strong>. Anuncios de encuentros eróticos y acompañantes en todo Paraguay.
              </p>
              
              <p>
                Si quieres pasar un rato agradable en compañía, en <strong className="text-white">EscortShop</strong> encuentras 
                lo que buscas. Todo tipo de servicios: masajes, masajes eróticos, compañía, y más. 
                Agenda tu cita y encuentra lo que estás buscando en <strong className="text-pink-400">EscortShop.com</strong>
              </p>

              <p className="text-center pt-6 border-t border-gray-700">
                <strong className="text-white">Departamentos disponibles:</strong><br/>
                <span className="text-xs">
                  Asunción • Central • Alto Paraná • Itapúa • Caaguazú • San Pedro • Cordillera • 
                  Concepción • Guairá • Paraguarí • Misiones • Ñeembucú • Amambay • Canindeyú • 
                  Presidente Hayes • Alto Paraguay • Boquerón
                </span>
              </p>
            </div>
          </div>

          {/* Sección Legal e Información */}
          <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-gray-700">
            <h4 className="text-lg font-bold text-white mb-4 text-center">
              Legal e Información
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-gray-400 text-center">
              <Link href="/terminos" className="hover:text-pink-400 transition-colors">
                Términos y Condiciones
              </Link>
              <Link href="/contacto" className="hover:text-pink-400 transition-colors">
                Contacto
              </Link>
            </div>
          </div>

          <div className="text-center mt-8 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-400">
              © 2025 EscortShop Paraguay. Todos los derechos reservados. | Sitio para mayores de 18 años.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}