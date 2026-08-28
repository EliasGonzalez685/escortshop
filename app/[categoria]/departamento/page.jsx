'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export default function DepartamentoPage() {
  const params = useParams()
  const router = useRouter()
  const categoria = params.categoria // escorts, trans, gay, parejas
  const departamentoParam = params.departamento // alto-parana
  
  // Convertir slug a nombre real del departamento
  const departamentoNombre = departamentoParam
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
  
  const [anuncios, setAnuncios] = useState([])
  const [loading, setLoading] = useState(true)
  const [usuario, setUsuario] = useState(null)
  const [userRole, setUserRole] = useState(null)

  // Configuración de categorías
  const categoriasConfig = {
    escorts: { emoji: '💃', nombre: 'Escorts', color: 'pink', gradient: 'from-pink-500 to-pink-600' },
    trans: { emoji: '🦋', nombre: 'Trans', color: 'purple', gradient: 'from-purple-500 to-purple-600' },
    gay: { emoji: '🌈', nombre: 'Gay', color: 'blue', gradient: 'from-blue-500 to-blue-600' },
    parejas: { emoji: '💑', nombre: 'Parejas', color: 'red', gradient: 'from-red-500 to-red-600' }
  }

  const config = categoriasConfig[categoria] || categoriasConfig.escorts

  useEffect(() => {
    verificarUsuario()
    cargarAnuncios()
  }, [categoria, departamentoNombre])

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

  const cargarAnuncios = async () => {
    setLoading(true)
    
    let query = supabase
      .from('anuncios')
      .select('*, imagenes_anuncios(*)')
      .eq('estado', 'activo')
      .eq('categoria', categoria)
      .eq('departamento', departamentoNombre)

    const { data, error } = await query
    
    if (error) {
      console.error('❌ Error al cargar anuncios:', error)
      setAnuncios([])
    } else {
      setAnuncios(data || [])
    }
    
    setLoading(false)
  }

  const cerrarSesion = async () => {
    await supabase.auth.signOut()
    setUsuario(null)
    setUserRole(null)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Schema para SEO de la página de departamento */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${config.nombre} en ${departamentoNombre} - EscortShop Paraguay`,
            "description": `Encuentra ${config.nombre.toLowerCase()} en ${departamentoNombre}, Paraguay. Anuncios verificados de acompañantes, putas y servicios para adultos.`,
            "url": `https://escortshoppy.com/${categoria}/${departamentoParam}`,
          })
        }}
      />

      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image 
                src="/logo_escorts.jpeg" 
                alt="EscortShop Paraguay" 
                width={200} 
                height={60}
                className="object-contain cursor-pointer"
              />
            </Link>
            
            <div className="flex flex-col items-end gap-2">
              {usuario ? (
                <>
                  <p className="text-gray-600 text-sm font-medium">
                    Bienvenido, {usuario.email}
                  </p>
                  <div className="flex gap-4">
                    {userRole === 'admin' ? (
                      <Link href="/admin">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                          Panel Admin
                        </button>
                      </Link>
                    ) : (
                      <Link href="/mis-anuncios">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Mis Anuncios
                        </button>
                      </Link>
                    )}
                    <button 
                      onClick={cerrarSesion}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-600 text-sm font-medium">
                    ¿Desea publicar un anuncio?
                  </p>
                  <div className="flex gap-4">
                    <Link href="/login">
                      <button className="px-4 py-2 text-gray-700 hover:text-pink-600">
                        Iniciar Sesión
                      </button>
                    </Link>
                    <Link href="/registro">
                      <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
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

      {/* Título con breadcrumb */}
      <div className={`bg-gradient-to-r ${config.gradient} text-white py-8`}>
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm mb-4 opacity-90">
            <Link href="/" className="hover:underline">Inicio</Link>
            <span className="mx-2">›</span>
            <Link href={`/${categoria}`} className="hover:underline">{config.nombre}</Link>
            <span className="mx-2">›</span>
            <span>{departamentoNombre}</span>
          </nav>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-6xl">{config.emoji}</span>
              <div>
                <h1 className="text-3xl font-bold">
                  {config.nombre} en {departamentoNombre}
                </h1>
                <p className="text-lg opacity-90">
                  Encuentra los mejores anuncios en {departamentoNombre}, Paraguay
                </p>
              </div>
            </div>
            <Link href={`/${categoria}`}>
              <button className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100">
                ← Ver todos los {config.nombre.toLowerCase()}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Anuncios */}
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Cargando anuncios...</p>
          </div>
        ) : anuncios.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <p className="text-gray-500 text-lg">
              No hay anuncios disponibles en {departamentoNombre}
            </p>
            <p className="text-gray-400 mt-2">Intenta buscar en otro departamento</p>
            <Link href={`/${categoria}`}>
              <button className="mt-4 px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                Ver todos los {config.nombre.toLowerCase()}
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600 text-lg">
                Se encontraron <strong className="text-pink-600 text-2xl">{anuncios.length}</strong> anuncios
                <span className="text-gray-500"> en {departamentoNombre}</span>
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {anuncios.map((anuncio) => (
                <Link key={anuncio.id} href={`/anuncio/${anuncio.id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                    {/* Imagen */}
                    <div className="h-64 bg-gray-200 relative">
                      {anuncio.imagenes_anuncios && anuncio.imagenes_anuncios.length > 0 ? (
                        <Image
                          src={anuncio.imagenes_anuncios[0].url}
                          alt={anuncio.titulo}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <div className="text-4xl mb-2">📸</div>
                            <p>Sin imagen</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Badge de categoría */}
                      <div className={`absolute top-2 right-2 bg-gradient-to-r ${config.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
                        {config.emoji} {config.nombre}
                      </div>
                    </div>
                    
                    {/* Contenido */}
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
                        {anuncio.titulo}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 font-medium">{anuncio.nombre}</p>
                      
                      {anuncio.edad && (
                        <p className="text-sm text-gray-500 mb-2">🎂 {anuncio.edad} años</p>
                      )}
                      
                      <p className="text-sm text-pink-600 font-semibold mb-4">
                        📍 {anuncio.ciudad}, {anuncio.departamento}
                      </p>
                      
                      {/* Botones de contacto */}
                      <div className="flex gap-2">
                        {anuncio.whatsapp && (
                          <a
                            href={`https://wa.me/${anuncio.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 bg-green-500 text-white py-2 rounded text-center hover:bg-green-600 text-sm font-semibold transition"
                            onClick={(e) => e.stopPropagation()}
                          >
                            💬 WhatsApp
                          </a>
                        )}
                        {anuncio.telefono && (
                          <a
                            href={`tel:${anuncio.telefono}`}
                            className="flex-1 bg-blue-500 text-white py-2 rounded text-center hover:bg-blue-600 text-sm font-semibold transition"
                            onClick={(e) => e.stopPropagation()}
                          >
                            📞 Llamar
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}