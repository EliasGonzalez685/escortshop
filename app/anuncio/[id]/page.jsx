'use client'

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export default function DetalleAnuncioPage() {
  const params = useParams()
  const router = useRouter()
  const anuncioId = params.id
  
  const [anuncio, setAnuncio] = useState(null)
  const [imagenes, setImagenes] = useState([])
  const [imagenSeleccionada, setImagenSeleccionada] = useState(0)
  const [loading, setLoading] = useState(true)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Configuración de categorías
  const categoriasConfig = {
    escorts: { emoji: '💃', nombre: 'Escorts', color: 'pink', gradient: 'from-pink-500 to-pink-600' },
    trans: { emoji: '🦋', nombre: 'Trans', color: 'purple', gradient: 'from-purple-500 to-purple-600' },
    gay: { emoji: '🌈', nombre: 'Gay', color: 'blue', gradient: 'from-blue-500 to-blue-600' },
    parejas: { emoji: '💑', nombre: 'Parejas', color: 'red', gradient: 'from-red-500 to-red-600' }
  }

  useEffect(() => {
    cargarAnuncio()
  }, [anuncioId])

  const cargarAnuncio = async () => {
    setLoading(true)
    
    // Cargar anuncio con sus imágenes
    const { data: anuncioData, error: anuncioError } = await supabase
      .from('anuncios')
      .select('*')
      .eq('id', anuncioId)
      .single()

    if (anuncioError) {
      console.error('Error al cargar anuncio:', anuncioError)
      setLoading(false)
      return
    }

    // Cargar imágenes del anuncio
    const { data: imagenesData, error: imagenesError } = await supabase
      .from('imagenes_anuncios')
      .select('*')
      .eq('anuncio_id', anuncioId)
      .order('created_at', { ascending: true })

    if (imagenesError) {
      console.error('Error al cargar imágenes:', imagenesError)
    }

    setAnuncio(anuncioData)
    setImagenes(imagenesData || [])
    setLoading(false)
  }

  const cambiarImagen = (index) => {
    setImagenSeleccionada(index)
  }

  const imagenAnterior = () => {
    setImagenSeleccionada((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1))
  }

  const imagenSiguiente = () => {
    setImagenSeleccionada((prev) => (prev === imagenes.length - 1 ? 0 : prev + 1))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-500 text-base sm:text-lg">Cargando anuncio...</p>
        </div>
      </div>
    )
  }

  if (!anuncio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-500 text-lg sm:text-xl mb-4">Anuncio no encontrado</p>
          <Link href="/">
            <button className="px-4 sm:px-6 py-2 sm:py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-sm sm:text-base">
              Volver al inicio
            </button>
          </Link>
        </div>
      </div>
    )
  }

  const config = categoriasConfig[anuncio.categoria] || categoriasConfig.escorts

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Responsive */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-4">
            <Link href="/">
              <Image 
                src="/logo_escorts.jpeg" 
                alt="EscortShop" 
                width={150} 
                height={45}
                className="object-contain cursor-pointer w-28 sm:w-36 md:w-44"
              />
            </Link>
            
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <Link href={`/${anuncio.categoria}`}>
                <button className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 text-xs sm:text-sm">
                  ← {config.nombre}
                </button>
              </Link>
              <Link href="/">
                <button className="px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-xs sm:text-sm">
                  🏠 Inicio
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal - Responsive */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          
          {/* Columna izquierda - Galería de imágenes */}
          <div className="space-y-3 sm:space-y-4">
            {/* Imagen principal - Altura responsive */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
              {imagenes.length > 0 ? (
                <>
                  <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] cursor-pointer" onClick={() => setLightboxOpen(true)}>
                    {imagenes[imagenSeleccionada].tipo === 'video' ? (
                      <video
                        src={imagenes[imagenSeleccionada].url}
                        controls
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <Image
                        src={imagenes[imagenSeleccionada].url}
                        alt={anuncio.titulo}
                        fill
                        className="object-contain"
                      />
                    )}
                    
                    {/* Badge de categoría - Responsive */}
                    <div className={`absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r ${config.gradient} text-white px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full font-semibold shadow-lg text-xs sm:text-sm md:text-base`}>
                      {config.emoji} {config.nombre}
                    </div>

                    {/* Contador de imágenes - Responsive */}
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 bg-black bg-opacity-70 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      {imagenSeleccionada + 1} / {imagenes.length}
                    </div>
                  </div>

                  {/* Flechas de navegación - Responsive */}
                  {imagenes.length > 1 && (
                    <>
                      <button
                        onClick={imagenAnterior}
                        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 sm:p-3 rounded-full transition text-lg sm:text-xl"
                      >
                        ‹
                      </button>
                      <button
                        onClick={imagenSiguiente}
                        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 sm:p-3 rounded-full transition text-lg sm:text-xl"
                      >
                        ›
                      </button>
                    </>
                  )}
                </>
              ) : (
                <div className="h-64 sm:h-80 md:h-96 lg:h-[500px] flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl md:text-6xl mb-4">📸</div>
                    <p className="text-sm sm:text-base">Sin imágenes disponibles</p>
                  </div>
                </div>
              )}
            </div>

            {/* Miniaturas - Responsive */}
            {imagenes.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                {imagenes.map((img, index) => (
                  <div
                    key={img.id}
                    onClick={() => cambiarImagen(index)}
                    className={`relative h-16 sm:h-20 rounded-lg overflow-hidden cursor-pointer border-2 transition ${
                      index === imagenSeleccionada ? 'border-pink-600 scale-105' : 'border-gray-300 hover:border-pink-400'
                    }`}
                  >
                    {img.tipo === 'video' ? (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <span className="text-white text-xl sm:text-2xl">▶</span>
                      </div>
                    ) : (
                      <Image
                        src={img.url}
                        alt={`Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Columna derecha - Información Responsive */}
          <div className="space-y-4 sm:space-y-6">
            {/* Título y nombre - Responsive */}
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {anuncio.titulo}
              </h1>
              <p className="text-xl sm:text-2xl text-pink-600 font-semibold mb-3 sm:mb-4">
                {anuncio.nombre}
              </p>
              
              {/* Info básica - Responsive */}
              <div className="flex flex-wrap gap-3 sm:gap-4 text-gray-600 text-sm sm:text-base">
                {anuncio.edad && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg sm:text-xl">🎂</span>
                    <span className="font-medium">{anuncio.edad} años</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-lg sm:text-xl">📍</span>
                  <span className="font-medium">{anuncio.ciudad}, {anuncio.departamento}</span>
                </div>
              </div>
            </div>

            {/* Descripción - Responsive */}
            {anuncio.descripcion && (
              <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
                  📝 Descripción
                </h2>
                <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line leading-relaxed">
                  {anuncio.descripcion}
                </p>
              </div>
            )}

            {/* Botones de contacto - Responsive */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md space-y-3 sm:space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                📞 Contacto
              </h2>
              
              <div className="grid grid-cols-1 gap-3">
                {anuncio.whatsapp && (
                  <a
                    href={`https://wa.me/${anuncio.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 sm:gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 rounded-lg transition text-base sm:text-lg shadow-lg"
                  >
                    <span className="text-xl sm:text-2xl">💬</span>
                    Contactar por WhatsApp
                  </a>
                )}
                
                {anuncio.telefono && (
                  <a
                    href={`tel:${anuncio.telefono}`}
                    className="flex items-center justify-center gap-2 sm:gap-3 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 sm:py-4 rounded-lg transition text-base sm:text-lg shadow-lg"
                  >
                    <span className="text-xl sm:text-2xl">📞</span>
                    <span className="truncate">Llamar: {anuncio.telefono}</span>
                  </a>
                )}
              </div>

              {/* Advertencia - Responsive */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 mt-3 sm:mt-4">
                <p className="text-xs sm:text-sm text-yellow-800">
                  ⚠️ <strong>Importante:</strong> Verifica siempre la identidad de la persona antes de realizar cualquier pago o encuentro.
                </p>
              </div>
            </div>

            {/* Información adicional - Responsive */}
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">
                ℹ️ Información del anuncio
              </h2>
              <div className="space-y-2 text-gray-600 text-sm sm:text-base">
                <p><strong>Categoría:</strong> {config.emoji} {config.nombre}</p>
                <p><strong>Departamento:</strong> {anuncio.departamento}</p>
                <p><strong>Ciudad:</strong> {anuncio.ciudad}</p>
                {anuncio.fecha_inicio && (
                  <p><strong>Fecha de publicación:</strong> {new Date(anuncio.fecha_inicio).toLocaleDateString('es-PY')}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox para imágenes - Responsive */}
      {lightboxOpen && imagenes.length > 0 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white text-3xl sm:text-4xl hover:text-pink-500 transition z-10"
          >
            ✕
          </button>
          
          <div className="relative max-w-6xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            {imagenes[imagenSeleccionada].tipo === 'video' ? (
              <video
                src={imagenes[imagenSeleccionada].url}
                controls
                className="max-w-full max-h-[90vh] object-contain mx-auto"
              />
            ) : (
              <div className="relative w-full h-[70vh] sm:h-[80vh] md:h-[90vh]">
                <Image
                  src={imagenes[imagenSeleccionada].url}
                  alt={anuncio.titulo}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            
            {imagenes.length > 1 && (
              <>
                <button
                  onClick={imagenAnterior}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 sm:p-3 md:p-4 rounded-full text-2xl sm:text-3xl transition"
                >
                  ‹
                </button>
                <button
                  onClick={imagenSiguiente}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-40 text-white p-2 sm:p-3 md:p-4 rounded-full text-2xl sm:text-3xl transition"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}