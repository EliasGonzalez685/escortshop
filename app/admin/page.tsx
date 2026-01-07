'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminPanel() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [anuncios, setAnuncios] = useState([])
  const [filtroEstado, setFiltroEstado] = useState('todos')
  const router = useRouter()

  useEffect(() => {
    checkUser()
  }, [])

  useEffect(() => {
    if (isAdmin) {
      cargarAnuncios()
    }
  }, [isAdmin, filtroEstado])

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    const { data: userData } = await supabase
      .from('usuarios')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userData?.role !== 'admin') {
      router.push('/')
      return
    }

    setUser(user)
    setIsAdmin(true)
    setLoading(false)
  }

  const cargarAnuncios = async () => {
    let query = supabase
      .from('anuncios')
      .select('*, usuarios(nombre, email)')
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
  }

  const cambiarEstado = async (anuncioId, nuevoEstado) => {
    const { error } = await supabase
      .from('anuncios')
      .update({ estado: nuevoEstado })
      .eq('id', anuncioId)

    if (error) {
      alert('Error al cambiar estado: ' + error.message)
    } else {
      alert('Estado actualizado correctamente')
      cargarAnuncios()
    }
  }

  const eliminarAnuncio = async (anuncioId) => {
    if (!confirm('¿Estás seguro de eliminar este anuncio?')) return

    // Primero eliminar las imágenes asociadas
    const { error: imgError } = await supabase
      .from('imagenes_anuncios')
      .delete()
      .eq('anuncio_id', anuncioId)

    if (imgError) {
      console.error('Error al eliminar imágenes:', imgError)
    }

    // Luego eliminar el anuncio
    const { error } = await supabase
      .from('anuncios')
      .delete()
      .eq('id', anuncioId)

    if (error) {
      alert('Error al eliminar: ' + error.message)
    } else {
      alert('Anuncio eliminado')
      cargarAnuncios()
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Verificando permisos...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md border-b-4 border-pink-600">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Panel de Administrador</h1>
              <p className="text-sm text-gray-600">Bienvenido, {user?.email}</p>
            </div>
            <div className="flex gap-4">
              <Link href="/">
                <button className="px-4 py-2 text-gray-700 hover:text-pink-600">
                  Ver Sitio
                </button>
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Gestión de Anuncios</h2>
            <Link href="/admin/nuevo-anuncio">
              <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                + Crear Anuncio
              </button>
            </Link>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setFiltroEstado('todos')}
              className={'px-4 py-2 rounded-lg ' + (filtroEstado === 'todos' ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700')}
            >
              Todos ({anuncios.length})
            </button>
            <button
              onClick={() => setFiltroEstado('pendiente')}
              className={'px-4 py-2 rounded-lg ' + (filtroEstado === 'pendiente' ? 'bg-yellow-600 text-white' : 'bg-gray-200 text-gray-700')}
            >
              Pendientes
            </button>
            <button
              onClick={() => setFiltroEstado('activo')}
              className={'px-4 py-2 rounded-lg ' + (filtroEstado === 'activo' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700')}
            >
              Activos
            </button>
            <button
              onClick={() => setFiltroEstado('vencido')}
              className={'px-4 py-2 rounded-lg ' + (filtroEstado === 'vencido' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700')}
            >
              Vencidos
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Título</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Anunciante</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Ubicación</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Estado</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Vencimiento</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {anuncios.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No hay anuncios para mostrar
                    </td>
                  </tr>
                ) : (
                  anuncios.map((anuncio) => (
                    <tr key={anuncio.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium">{anuncio.titulo}</p>
                        <p className="text-sm text-gray-500">{anuncio.nombre}</p>
                      </td>
                      <td className="px-4 py-3 text-sm">{anuncio.usuarios?.nombre || anuncio.usuarios?.email}</td>
                      <td className="px-4 py-3 text-sm">{anuncio.ciudad}, {anuncio.departamento}</td>
                      <td className="px-4 py-3">
                        <span className={'px-2 py-1 rounded text-xs font-semibold ' + 
                          (anuncio.estado === 'activo' ? 'bg-green-100 text-green-800' :
                           anuncio.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                           'bg-red-100 text-red-800')}>
                          {anuncio.estado}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {anuncio.fecha_vencimiento ? new Date(anuncio.fecha_vencimiento).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2 flex-wrap">
                          <Link href={`/admin/nuevo-anuncio?id=${anuncio.id}`}>
                            <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600">
                              ✏️ Editar
                            </button>
                          </Link>
                          {anuncio.estado === 'pendiente' && (
                            <button
                              onClick={() => cambiarEstado(anuncio.id, 'activo')}
                              className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                            >
                              Aprobar
                            </button>
                          )}
                          {anuncio.estado === 'activo' && (
                            <button
                              onClick={() => cambiarEstado(anuncio.id, 'vencido')}
                              className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
                            >
                              Vencer
                            </button>
                          )}
                          <button
                            onClick={() => eliminarAnuncio(anuncio.id)}
                            className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                          >
                            Eliminar
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}