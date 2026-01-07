"use client"

import { useState, useEffect } from 'react'
import { supabase } from '../../../lib/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function NuevoAnuncio() {
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [usuarios, setUsuarios] = useState([])
  const [imagenes, setImagenes] = useState([])
  const [nuevasImagenes, setNuevasImagenes] = useState([])
  const [nuevosVideos, setNuevosVideos] = useState([])
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const anuncioId = searchParams.get('id') // Si hay ID, estamos editando
  const modoEditar = !!anuncioId

  // Datos del formulario
  const [formData, setFormData] = useState({
    usuario_id: '',
    nombre: '',
    titulo: '',
    descripcion: '',
    edad: '',
    categoria: '',
    departamento: '',
    ciudad: '',
    telefono: '',
    whatsapp: '',
    estado: 'activo',
    fecha_inicio: new Date().toISOString().split('T')[0],
    fecha_vencimiento: ''
  })

  const departamentos = [
    'Alto Paraguay', 'Alto Paraná', 'Amambay', 'Boquerón', 'Caaguazú',
    'Caazapá', 'Canindeyú', 'Central', 'Concepción', 'Cordillera',
    'Guairá', 'Itapúa', 'Misiones', 'Ñeembucú', 'Paraguarí',
    'Presidente Hayes', 'San Pedro'
  ]

  const ciudadesPorDepartamento = {
    'Central': ['Areguá', 'Capiatá', 'Fernando de la Mora', 'Guarambaré', 'Itá', 'Itauguá', 'Juan Augusto Saldívar', 'Lambaré', 'Limpio', 'Luque', 'Mariano Roque Alonso', 'Ñemby', 'Nueva Italia', 'San Antonio', 'San Lorenzo', 'Villa Elisa', 'Villeta', 'Ypacaraí', 'Ypané', 'Asunción'],
    'Alto Paraná': ['Ciudad del Este', 'Doctor Juan León Mallorquín', 'Domingo Martínez de Irala', 'Hernandarias', 'Iruña', 'Itakyry', 'Juan Emilio O\'Leary', 'Los Cedrales', 'Mbaracayú', 'Minga Guazú', 'Minga Porá', 'Ñacunday', 'Naranjal', 'Presidente Franco', 'San Alberto', 'San Cristóbal', 'Santa Rita', 'Santa Rosa del Monday', 'Tavapy', 'Yguazú', 'San Vicente del Ykuá', 'Raúl Arsenio Oviedo'],
    'Itapúa': ['Encarnación', 'Alto Verá', 'Bella Vista', 'Cambyretá', 'Capitán Miranda', 'Capitán Meza', 'Carlos Antonio López', 'Carmen del Paraná', 'Coronel Bogado', 'Edelira', 'Fram', 'General Artigas', 'General Delgado', 'Hohenau', 'Itapúa Poty', 'Jesús', 'José Leandro Oviedo', 'La Paz', 'Mayor Julio Dionisio Otaño', 'Natalio', 'Nueva Alborada', 'Obligado', 'Pirapó', 'San Cosme y Damián', 'San Juan del Paraná', 'San Pedro del Paraná', 'San Rafael del Paraná', 'Tomás Romero Pereira', 'Trinidad', 'Yatytay'],
    'Concepción': ['Concepción', 'Horqueta', 'Belén', 'Loreto', 'Yby Ya\'u'],
    'San Pedro': ['San Pedro', 'Santa Rosa del Aguaray', 'Antequera', 'Choré', 'Unión'],
    'Cordillera': ['Caacupé', 'Eusebio Ayala', 'Piribebuy', 'Arroyos y Esteros', 'Altos'],
    'Guairá': ['Villarrica', 'Mbocayaty', 'Ñumí', 'Borja', 'Independencia'],
    'Caaguazú': ['Coronel Oviedo', 'Caaguazú', 'Carayaó', 'Doctor Juan Manuel Frutos', 'José Domingo Ocampos'],
    'Caazapá': ['Caazapá', 'Abaí', 'Buena Vista', 'San Juan Nepomuceno', 'Yuty'],
    'Misiones': ['San Juan Bautista', 'San Ignacio', 'Santa Rosa', 'Santiago', 'Villa Florida'],
    'Paraguarí': ['Paraguarí', 'Carapeguá', 'Quiindy', 'Ybycuí', 'Sapucai'],
    'Ñeembucú': ['Pilar', 'Humaitá', 'Isla Umbú', 'San Juan Bautista del Ñeembucú', 'Villalbín'],
    'Amambay': ['Pedro Juan Caballero', 'Bella Vista Norte', 'Capitán Bado', 'Karapaí', 'Zanja Pytá'],
    'Canindeyú': ['Salto del Guairá', 'Corpus Christi', 'Itanará', 'Katueté', 'Ypehú'],
    'Presidente Hayes': ['Villa Hayes', 'Benjamín Aceval', 'Nanawa', 'Puerto Pinasco', 'Teniente Primero Manuel Irala Fernández'],
    'Alto Paraguay': ['Fuerte Olimpo', 'Bahía Negra', 'Puerto Casado', 'Carmelo Peralta'],
    'Boquerón': ['Filadelfia', 'Loma Plata', 'Mariscal Estigarribia', 'Neuland', 'Teniente Primero Heriberto Stroessner']
  }

  const [ciudadesDisponibles, setCiudadesDisponibles] = useState([])

  useEffect(() => {
    cargarUsuarios()
    if (modoEditar) {
      cargarAnuncio()
      cargarImagenes()
    }
  }, [anuncioId])

  const cargarUsuarios = async () => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('id, nombre, email')
      .eq('role', 'anunciante')
    
    if (error) {
      console.error('Error cargando usuarios:', error)
    }
    
    setUsuarios(data || [])
  }

  const cargarAnuncio = async () => {
    setLoadingData(true)
    const { data, error } = await supabase
      .from('anuncios')
      .select('*')
      .eq('id', anuncioId)
      .single()

    if (error) {
      setError('Error al cargar el anuncio')
      console.error(error)
    } else {
      setFormData({
        usuario_id: data.usuario_id || '',
        nombre: data.nombre || '',
        titulo: data.titulo || '',
        descripcion: data.descripcion || '',
        edad: data.edad || '',
        categoria: data.categoria || '',
        departamento: data.departamento || '',
        ciudad: data.ciudad || '',
        telefono: data.telefono || '',
        whatsapp: data.whatsapp || '',
        estado: data.estado || 'activo',
        fecha_inicio: data.fecha_inicio || '',
        fecha_vencimiento: data.fecha_vencimiento || ''
      })
      // Cargar ciudades del departamento guardado
      if (data.departamento) {
        setCiudadesDisponibles(ciudadesPorDepartamento[data.departamento] || [])
      }
    }
    setLoadingData(false)
  }

  const cargarImagenes = async () => {
    const { data, error } = await supabase
      .from('imagenes_anuncios')
      .select('*')
      .eq('anuncio_id', anuncioId)

    if (!error) {
      setImagenes(data || [])
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Si cambia el departamento, actualizar las ciudades disponibles y resetear ciudad
    if (name === 'departamento') {
      setCiudadesDisponibles(ciudadesPorDepartamento[value] || [])
      setFormData({
        ...formData,
        departamento: value,
        ciudad: '' // Resetear ciudad cuando cambia departamento
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handleImagenesChange = (e) => {
    const files = Array.from(e.target.files)
    setNuevasImagenes([...nuevasImagenes, ...files])
  }

  const handleVideosChange = (e) => {
    const files = Array.from(e.target.files)
    setNuevosVideos([...nuevosVideos, ...files])
  }

  const eliminarNuevaImagen = (index) => {
    setNuevasImagenes(nuevasImagenes.filter((_, i) => i !== index))
  }

  const eliminarNuevoVideo = (index) => {
    setNuevosVideos(nuevosVideos.filter((_, i) => i !== index))
  }

  const eliminarImagenExistente = async (imagenId) => {
    if (!confirm('¿Eliminar esta imagen?')) return

    const { error } = await supabase
      .from('imagenes_anuncios')
      .delete()
      .eq('id', imagenId)

    if (error) {
      alert('Error al eliminar imagen')
    } else {
      setImagenes(imagenes.filter(img => img.id !== imagenId))
      setSuccess('Imagen eliminada')
      setTimeout(() => setSuccess(''), 3000)
    }
  }

  const subirNuevosArchivos = async (idAnuncio) => {
    try {
      // Subir nuevas imágenes
      for (let i = 0; i < nuevasImagenes.length; i++) {
        const imagen = nuevasImagenes[i]
        const nombreArchivo = `${idAnuncio}_${Date.now()}_${i}.${imagen.name.split('.').pop()}`

        const { error: uploadError } = await supabase.storage
          .from('anuncios-media')
          .upload(`imagenes/${nombreArchivo}`, imagen)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('anuncios-media')
          .getPublicUrl(`imagenes/${nombreArchivo}`)

        await supabase
          .from('imagenes_anuncios')
          .insert({
            anuncio_id: idAnuncio,
            url: publicUrl,
            tipo: 'imagen'
          })
      }

      // Subir nuevos videos
      for (let i = 0; i < nuevosVideos.length; i++) {
        const video = nuevosVideos[i]
        const nombreArchivo = `${idAnuncio}_${Date.now()}_${i}.${video.name.split('.').pop()}`

        const { error: uploadError } = await supabase.storage
          .from('anuncios-media')
          .upload(`imagenes/${nombreArchivo}`, video)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('anuncios-media')
          .getPublicUrl(`imagenes/${nombreArchivo}`)

        await supabase
          .from('imagenes_anuncios')
          .insert({
            anuncio_id: idAnuncio,
            url: publicUrl,
            tipo: 'video'
          })
      }
    } catch (err) {
      throw new Error('Error al subir archivos: ' + err.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // Validaciones básicas
    if (!formData.usuario_id || !formData.titulo || !formData.nombre || !formData.categoria) {
      setError('Por favor completa los campos obligatorios')
      setLoading(false)
      return
    }

    try {
      if (modoEditar) {
        // MODO EDITAR: Actualizar anuncio existente
        const { error: updateError } = await supabase
          .from('anuncios')
          .update(formData)
          .eq('id', anuncioId)

        if (updateError) throw updateError

        // Subir nuevos archivos si hay
        if (nuevasImagenes.length > 0 || nuevosVideos.length > 0) {
          await subirNuevosArchivos(anuncioId)
        }

        setSuccess('¡Anuncio actualizado exitosamente!')
        setTimeout(() => {
          router.push('/admin')
        }, 1500)

      } else {
        // MODO CREAR: Insertar nuevo anuncio
        const { data: nuevoAnuncio, error: insertError } = await supabase
          .from('anuncios')
          .insert([formData])
          .select()
          .single()

        if (insertError) throw insertError

        // Si hay imágenes/videos, subirlos
        if (nuevasImagenes.length > 0 || nuevosVideos.length > 0) {
          await subirNuevosArchivos(nuevoAnuncio.id)
          // Ir al panel admin
          router.push('/admin')
        } else {
          // Si no hay archivos, preguntar si quiere agregar
          if (confirm('Anuncio creado. ¿Deseas agregar imágenes ahora?')) {
            router.push(`/admin/subir-imagenes?id=${nuevoAnuncio.id}`)
          } else {
            router.push('/admin')
          }
        }
      }
    } catch (err) {
      setError(err.message || 'Error al guardar el anuncio')
    } finally {
      setLoading(false)
    }
  }

  if (modoEditar && loadingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando anuncio...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md border-b-4 border-pink-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {modoEditar ? 'Editar Anuncio' : 'Crear Nuevo Anuncio'}
            </h1>
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
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              {success}
            </div>
          )}

          {/* Indicador de modo */}
          {!modoEditar && (
            <div className="mb-8">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-pink-600 text-white rounded-full font-bold">
                    1
                  </div>
                  <span className="ml-2 font-medium text-pink-600">Datos del Anuncio</span>
                </div>
                <div className="w-16 h-1 bg-gray-300 mx-4"></div>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 bg-gray-300 text-gray-600 rounded-full font-bold">
                    2
                  </div>
                  <span className="ml-2 text-gray-500">Imágenes (Opcional)</span>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Usuario Anunciante *
              </label>
              <select
                name="usuario_id"
                value={formData.usuario_id}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">Seleccionar usuario...</option>
                {usuarios.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.nombre || user.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Anunciante *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Ej: Sofia"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edad
                </label>
                <input
                  type="number"
                  name="edad"
                  value={formData.edad}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Ej: 25"
                />
              </div>
            </div>

            {/* Selector de Categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Categoría del Anuncio *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, categoria: 'escorts'})}
                  className={`p-4 border-2 rounded-lg text-center font-medium transition-all ${
                    formData.categoria === 'escorts'
                      ? 'border-pink-600 bg-pink-50 text-pink-700'
                      : 'border-gray-300 hover:border-pink-400'
                  }`}
                >
                  💃 ESCORTS
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, categoria: 'trans'})}
                  className={`p-4 border-2 rounded-lg text-center font-medium transition-all ${
                    formData.categoria === 'trans'
                      ? 'border-pink-600 bg-pink-50 text-pink-700'
                      : 'border-gray-300 hover:border-pink-400'
                  }`}
                >
                  🦋 TRANS
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, categoria: 'gay'})}
                  className={`p-4 border-2 rounded-lg text-center font-medium transition-all ${
                    formData.categoria === 'gay'
                      ? 'border-pink-600 bg-pink-50 text-pink-700'
                      : 'border-gray-300 hover:border-pink-400'
                  }`}
                >
                  🌈 GAY
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, categoria: 'parejas'})}
                  className={`p-4 border-2 rounded-lg text-center font-medium transition-all ${
                    formData.categoria === 'parejas'
                      ? 'border-pink-600 bg-pink-50 text-pink-700'
                      : 'border-gray-300 hover:border-pink-400'
                  }`}
                >
                  💑 PAREJAS
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Título del Anuncio *
              </label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Ej: Bella escort disponible"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Descripción del servicio..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Departamento *
                </label>
                <select
                  name="departamento"
                  value={formData.departamento}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Seleccionar...</option>
                  {departamentos.map((dep) => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ciudad *
                </label>
                <select
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  required
                  disabled={!formData.departamento}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {formData.departamento ? 'Seleccionar ciudad...' : 'Primero selecciona un departamento'}
                  </option>
                  {ciudadesDisponibles.map((ciudad) => (
                    <option key={ciudad} value={ciudad}>{ciudad}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="0981234567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  WhatsApp
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="595981234567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="activo">Activo</option>
                  <option value="vencido">Vencido</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Inicio
                </label>
                <input
                  type="date"
                  name="fecha_inicio"
                  value={formData.fecha_inicio}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fecha Vencimiento
                </label>
                <input
                  type="date"
                  name="fecha_vencimiento"
                  value={formData.fecha_vencimiento}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Sección de imágenes (solo en modo editar o si hay nuevas) */}
            {(modoEditar || nuevasImagenes.length > 0 || nuevosVideos.length > 0) && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">📷 Imágenes y Videos</h3>
                
                {/* Imágenes existentes (solo en modo editar) */}
                {modoEditar && imagenes.length > 0 && (
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-3">Imágenes actuales:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagenes.map((img) => (
                        <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 group">
                          {img.tipo === 'imagen' ? (
                            <Image src={img.url} alt="Imagen" fill className="object-cover" />
                          ) : (
                            <video src={img.url} controls className="w-full h-full object-cover" />
                          )}
                          <button
                            type="button"
                            onClick={() => eliminarImagenExistente(img.id)}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Agregar nuevas */}
                <div className="space-y-4">
                  <div>
                    <label className="w-full flex items-center justify-center px-4 py-3 bg-pink-50 border-2 border-dashed border-pink-300 rounded-lg hover:bg-pink-100 cursor-pointer">
                      <span className="text-pink-600 font-medium">+ Agregar Imágenes</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImagenesChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div>
                    <label className="w-full flex items-center justify-center px-4 py-3 bg-blue-50 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-100 cursor-pointer">
                      <span className="text-blue-600 font-medium">+ Agregar Videos</span>
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={handleVideosChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Preview nuevas imágenes */}
                  {nuevasImagenes.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-3">Nuevas imágenes a subir:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {nuevasImagenes.map((img, i) => (
                          <div key={i} className="relative aspect-square rounded-lg overflow-hidden border-2 border-green-300 group">
                            <Image src={URL.createObjectURL(img)} alt="Nueva" fill className="object-cover" />
                            <button
                              type="button"
                              onClick={() => eliminarNuevaImagen(i)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-xs p-1 text-center">
                              Nueva
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Preview nuevos videos */}
                  {nuevosVideos.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-3">Nuevos videos a subir:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {nuevosVideos.map((vid, i) => (
                          <div key={i} className="relative aspect-square rounded-lg overflow-hidden border-2 border-green-300 group">
                            <video src={URL.createObjectURL(vid)} controls className="w-full h-full object-cover" />
                            <button
                              type="button"
                              onClick={() => eliminarNuevoVideo(i)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 z-10"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            <div className="absolute bottom-0 left-0 right-0 bg-green-600 text-white text-xs p-1 text-center">
                              Nuevo
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 disabled:bg-gray-400 font-medium transition-colors"
              >
                {loading ? 'Guardando...' : (modoEditar ? '💾 Guardar Cambios' : 'Crear Anuncio')}
              </button>
              <Link href="/admin" className="flex-1">
                <button
                  type="button"
                  className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 font-medium transition-colors"
                >
                  Cancelar
                </button>
              </Link>
            </div>
          </form>

          {!modoEditar && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> Puedes agregar imágenes ahora o después. Si omites este paso, podrás agregarlas editando el anuncio más tarde.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}