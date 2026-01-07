'use client'

import { useState } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function SubirImagenes() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [anuncio, setAnuncio] = useState(null)
  const [imagenes, setImagenes] = useState([])
  const [videos, setVideos] = useState([])
  const [uploadProgress, setUploadProgress] = useState('')
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const anuncioId = searchParams.get('id')

  useEffect(() => {
    if (anuncioId) {
      cargarAnuncio()
    }
  }, [anuncioId])

  const cargarAnuncio = async () => {
    const { data, error } = await supabase
      .from('anuncios')
      .select('*')
      .eq('id', anuncioId)
      .single()

    if (error) {
      setError('Error al cargar el anuncio')
      console.error(error)
    } else {
      setAnuncio(data)
    }
  }

  const handleImagenesChange = (e) => {
    const nuevasImagenes = Array.from(e.target.files)
    setImagenes([...imagenes, ...nuevasImagenes])
  }

  const handleVideosChange = (e) => {
    const nuevosVideos = Array.from(e.target.files)
    setVideos([...videos, ...nuevosVideos])
  }

  const eliminarImagen = (index) => {
    setImagenes(imagenes.filter((_, i) => i !== index))
  }

  const eliminarVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index))
  }

  const subirArchivos = async () => {
    setLoading(true)
    setError('')
    setUploadProgress('Subiendo archivos...')

    try {
      // Subir imágenes
      for (let i = 0; i < imagenes.length; i++) {
        const imagen = imagenes[i]
        const nombreArchivo = `${anuncioId}_${Date.now()}_${i}.${imagen.name.split('.').pop()}`
        
        setUploadProgress(`Subiendo imagen ${i + 1} de ${imagenes.length}...`)

        // Subir a Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('anuncios-media')
          .upload(`imagenes/${nombreArchivo}`, imagen)

        if (uploadError) {
          throw new Error(`Error al subir imagen: ${uploadError.message}`)
        }

        // Obtener URL pública
        const { data: { publicUrl } } = supabase.storage
          .from('anuncios-media')
          .getPublicUrl(`imagenes/${nombreArchivo}`)

        // Guardar en la tabla imagenes_anuncios
        const { error: dbError } = await supabase
          .from('imagenes_anuncios')
          .insert({
            anuncio_id: anuncioId,
            url: publicUrl,
            tipo: 'imagen'
          })

        if (dbError) {
          throw new Error(`Error al guardar imagen en BD: ${dbError.message}`)
        }
      }

      // Subir videos
      for (let i = 0; i < videos.length; i++) {
        const video = videos[i]
        const nombreArchivo = `${anuncioId}_${Date.now()}_${i}.${video.name.split('.').pop()}`
        
        setUploadProgress(`Subiendo video ${i + 1} de ${videos.length}...`)

        // Subir a Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('anuncios-media')
          .upload(`imagenes/${nombreArchivo}`, video)

        if (uploadError) {
          throw new Error(`Error al subir video: ${uploadError.message}`)
        }

        // Obtener URL pública
        const { data: { publicUrl } } = supabase.storage
          .from('anuncios-media')
          .getPublicUrl(`imagenes/${nombreArchivo}`)

        // Guardar en la tabla imagenes_anuncios
        const { error: dbError } = await supabase
          .from('imagenes_anuncios')
          .insert({
            anuncio_id: anuncioId,
            url: publicUrl,
            tipo: 'video'
          })

        if (dbError) {
          throw new Error(`Error al guardar video en BD: ${dbError.message}`)
        }
      }

      setUploadProgress('¡Archivos subidos exitosamente!')
      
      // Esperar 2 segundos antes de redirigir
      setTimeout(() => {
        router.push('/admin')
      }, 2000)

    } catch (err) {
      setError(err.message)
      setLoading(false)
      setUploadProgress('')
    }
  }

  const omitirPaso = () => {
    router.push('/admin')
  }

  if (!anuncio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md border-b-4 border-pink-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Subir Imágenes y Videos</h1>
            <Link href="/admin">
              <button className="px-4 py-2 text-gray-700 hover:text-pink-600">
                ← Volver al Panel
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          
          {/* Indicador de pasos */}
          <div className="mb-8">
            <div className="flex items-center justify-center">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full font-bold">
                  ✓
                </div>
                <span className="ml-2 font-medium text-green-600">Datos del Anuncio</span>
              </div>
              <div className="w-16 h-1 bg-pink-600 mx-4"></div>
              <div className="flex items-center">
                <div className="flex items-center justify-center w-10 h-10 bg-pink-600 text-white rounded-full font-bold">
                  2
                </div>
                <span className="ml-2 font-medium text-pink-600">Imágenes y Videos</span>
              </div>
            </div>
          </div>

          {/* Información del anuncio */}
          <div className="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">✓ Anuncio creado exitosamente</h3>
            <p className="text-sm text-green-700">
              <strong>Título:</strong> {anuncio.titulo}
            </p>
            <p className="text-sm text-green-700">
              <strong>Nombre:</strong> {anuncio.nombre}
            </p>
            <p className="text-sm text-green-700">
              <strong>Ubicación:</strong> {anuncio.ciudad}, {anuncio.departamento}
            </p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {uploadProgress && (
            <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
              {uploadProgress}
            </div>
          )}

          <div className="space-y-8">
            {/* Sección de imágenes */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                📷 Imágenes del Anuncio
              </label>
              
              <div className="mb-4">
                <label className="w-full flex items-center justify-center px-4 py-3 bg-pink-50 border-2 border-dashed border-pink-300 rounded-lg hover:bg-pink-100 cursor-pointer transition-colors">
                  <span className="text-pink-600 font-medium">+ Agregar Imágenes</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagenesChange}
                    disabled={loading}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Preview de imágenes con botón eliminar */}
              {imagenes.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {imagenes.map((imagen, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group">
                      <Image
                        src={URL.createObjectURL(imagen)}
                        alt={`Imagen ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => eliminarImagen(index)}
                        disabled={loading}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                        {imagen.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {imagenes.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {imagenes.length} imagen{imagenes.length !== 1 ? 'es' : ''} seleccionada{imagenes.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Sección de videos */}
            <div>
              <label className="block text-lg font-semibold text-gray-800 mb-4">
                🎥 Videos Cortos (Shorts)
              </label>
              
              <div className="mb-4">
                <label className="w-full flex items-center justify-center px-4 py-3 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-100 cursor-pointer transition-colors">
                  <span className="text-blue-600 font-medium">+ Agregar Videos</span>
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideosChange}
                    disabled={loading}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Preview de videos con botón eliminar */}
              {videos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {videos.map((video, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group">
                      <video
                        src={URL.createObjectURL(video)}
                        controls
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => eliminarVideo(index)}
                        disabled={loading}
                        className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                        {video.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {videos.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {videos.length} video{videos.length !== 1 ? 's' : ''} seleccionado{videos.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={subirArchivos}
              disabled={loading || (imagenes.length === 0 && videos.length === 0)}
              className="flex-1 bg-pink-600 text-white py-3 px-6 rounded-lg hover:bg-pink-700 disabled:bg-gray-400 font-medium transition-colors"
            >
              {loading ? 'Subiendo...' : `Subir ${imagenes.length + videos.length} archivo${(imagenes.length + videos.length) !== 1 ? 's' : ''}`}
            </button>
            <button
              onClick={omitirPaso}
              disabled={loading}
              className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg hover:bg-gray-600 disabled:bg-gray-400 font-medium transition-colors"
            >
              Omitir por ahora
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>💡 Nota:</strong> Puedes agregar o editar las imágenes más tarde desde el panel de administración.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}