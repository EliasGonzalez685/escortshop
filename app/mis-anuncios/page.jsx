'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function MisAnuncios() {
  const router = useRouter()
  const [usuario, setUsuario] = useState(null)
  const [anuncios, setAnuncios] = useState([])
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const [loading, setLoading] = useState(true)
  
  // Estados para el reporte
  const [numeroReportado, setNumeroReportado] = useState('')
  const [tipoProblema, setTipoProblema] = useState('')
  const [descripcionProblema, setDescripcionProblema] = useState('')
  const [enviandoReporte, setEnviandoReporte] = useState(false)

  // Datos de contacto del admin (PRUEBA)
  const ADMIN_WHATSAPP = '595981234567'
  const ADMIN_EMAIL = 'admin@escortshop.com'

  useEffect(() => {
    verificarUsuario()
  }, [])

  const verificarUsuario = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    // Verificar que sea anunciante
    const { data: userData } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', user.email)
      .single()

    if (!userData || userData.role === 'admin') {
      router.push('/admin')
      return
    }

    setUsuario(userData)
    cargarAnuncios(userData.id)
  }

  const cargarAnuncios = async (usuarioId) => {
    setLoading(true)
    
    let query = supabase
      .from('anuncios')
      .select('*, imagenes_anuncios(*)')
      .eq('usuario_id', usuarioId)
      .order('created_at', { ascending: false })

    if (filtroEstado !== 'todos') {
      query = query.eq('estado', filtroEstado)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error:', error)
    } else {
      setAnuncios(data || [])
    }
    
    setLoading(false)
  }

  useEffect(() => {
    if (usuario) {
      cargarAnuncios(usuario.id)
    }
  }, [filtroEstado])

  const enviarReporte = async () => {
    if (!numeroReportado || !tipoProblema || !descripcionProblema) {
      alert('Por favor completa todos los campos')
      return
    }

    setEnviandoReporte(true)

    const { error } = await supabase
      .from('denuncias')
      .insert({
        usuario_id: usuario.id,
        numero_denunciado: numeroReportado,
        tipo_problema: tipoProblema,
        descripcion: descripcionProblema,
        estado: 'pendiente'
      })

    if (error) {
      console.error('Error:', error)
      alert('Error al enviar el reporte')
    } else {
      alert('✅ Reporte enviado correctamente. El administrador lo revisará pronto.')
      setNumeroReportado('')
      setTipoProblema('')
      setDescripcionProblema('')
    }

    setEnviandoReporte(false)
  }

  const cerrarSesion = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  // Calcular estadísticas
  const anunciosActivos = anuncios.filter(a => a.estado === 'activo').length
  const anunciosPendientes = anuncios.filter(a => a.estado === 'pendiente').length
  const proximoVencimiento = anuncios
    .filter(a => a.estado === 'activo' && a.fecha_vencimiento)
    .sort((a, b) => new Date(a.fecha_vencimiento) - new Date(b.fecha_vencimiento))[0]

  if (loading && !usuario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Panel de Anunciante</h1>
              <p className="text-gray-600">Bienvenido, {usuario?.nombre || usuario?.email}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => router.push('/')}
                className="px-4 py-2 text-gray-700 hover:text-pink-600"
              >
                Ver Sitio
              </button>
              <button
                onClick={cerrarSesion}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Anuncios Activos</h3>
            <p className="text-4xl font-bold text-green-600">{anunciosActivos}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Pendientes de Aprobación</h3>
            <p className="text-4xl font-bold text-yellow-600">{anunciosPendientes}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Próximo Vencimiento</h3>
            <p className="text-2xl font-bold text-red-600">
              {proximoVencimiento 
                ? new Date(proximoVencimiento.fecha_vencimiento).toLocaleDateString('es-PY')
                : 'N/A'
              }
            </p>
          </div>
        </div>

        {/* Solicitar Publicación */}
        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-8 rounded-lg shadow-lg mb-8 text-white">
          <h2 className="text-2xl font-bold mb-4">¿Deseas publicar un nuevo anuncio?</h2>
          <p className="mb-6">
            Para publicar un anuncio, primero debes contactar con el administrador y realizar el pago del servicio.
            Una vez confirmado el pago, tu anuncio será publicado.
          </p>
          <div className="flex gap-4">
            <a
              href={`https://wa.me/${ADMIN_WHATSAPP}?text=Hola,%20quiero%20publicar%20un%20anuncio`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium text-center"
            >
              📱 WhatsApp
            </a>
            <a
              href={`mailto:${ADMIN_EMAIL}?subject=Solicitud de Publicación&body=Hola, quisiera publicar un anuncio en EscortShop.`}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium text-center"
            >
              📧 Email
            </a>
          </div>
        </div>

        {/* Mis Anuncios */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Mis Anuncios</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setFiltroEstado('todos')}
                className={`px-4 py-2 rounded-lg ${
                  filtroEstado === 'todos'
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Todos ({anuncios.length})
              </button>
              <button
                onClick={() => setFiltroEstado('pendiente')}
                className={`px-4 py-2 rounded-lg ${
                  filtroEstado === 'pendiente'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pendientes
              </button>
              <button
                onClick={() => setFiltroEstado('activo')}
                className={`px-4 py-2 rounded-lg ${
                  filtroEstado === 'activo'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Activos
              </button>
              <button
                onClick={() => setFiltroEstado('vencido')}
                className={`px-4 py-2 rounded-lg ${
                  filtroEstado === 'vencido'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Vencidos
              </button>
            </div>
          </div>

          {loading ? (
            <p className="text-center text-gray-500 py-8">Cargando anuncios...</p>
          ) : anuncios.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No tienes anuncios aún</p>
              <p className="text-sm text-gray-400">Contacta al administrador para publicar tu primer anuncio</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {anuncios.map((anuncio) => (
                <div key={anuncio.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  {/* Imagen principal */}
                  <div className="h-48 bg-gray-200">
                    {anuncio.imagenes_anuncios && anuncio.imagenes_anuncios.length > 0 ? (
                      <Image
                        src={anuncio.imagenes_anuncios[0].url}
                        alt={anuncio.titulo}
                        width={400}
                        height={300}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Sin imagen
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{anuncio.titulo}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          anuncio.estado === 'activo'
                            ? 'bg-green-100 text-green-700'
                            : anuncio.estado === 'pendiente'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {anuncio.estado.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{anuncio.nombre}</p>
                    <p className="text-sm text-gray-500 mb-4">
                      {anuncio.ciudad}, {anuncio.departamento}
                    </p>
                    {anuncio.fecha_vencimiento && (
                      <p className="text-xs text-gray-400">
                        Vence: {new Date(anuncio.fecha_vencimiento).toLocaleDateString('es-PY')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reportar Problema */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">⚠️ Reportar Problema</h2>
          <p className="text-gray-600 mb-6">
            Si tuviste una mala experiencia o deseas denunciar un número, completa este formulario.
            El administrador revisará tu reporte.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número a Reportar *
              </label>
              <input
                type="text"
                placeholder="Ej: 0981234567"
                value={numeroReportado}
                onChange={(e) => setNumeroReportado(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Problema *
              </label>
              <select
                value={tipoProblema}
                onChange={(e) => setTipoProblema(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Seleccionar...</option>
                <option value="estafa">Estafa / Fraude</option>
                <option value="robo">Robo</option>
                <option value="violencia">Violencia o Amenazas</option>
                <option value="perfil_falso">Perfil Falso</option>
                <option value="servicio_malo">Servicio de Mala Calidad</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Detallada *
              </label>
              <textarea
                rows={5}
                placeholder="Describe lo que sucedió con el mayor detalle posible..."
                value={descripcionProblema}
                onChange={(e) => setDescripcionProblema(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <button
              onClick={enviarReporte}
              disabled={enviandoReporte}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-medium disabled:bg-gray-400"
            >
              {enviandoReporte ? 'Enviando...' : '📤 Enviar Reporte'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}