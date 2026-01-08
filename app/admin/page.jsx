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
      // ✅ VENCIMIENTO AUTOMÁTICO: Verifica y actualiza anuncios vencidos
      const hoy = new Date()
      const anunciosProcesados = await Promise.all(
        data.map(async (anuncio) => {
          // Si el anuncio está activo y la fecha de vencimiento ya pasó
          if (anuncio.estado === 'activo' && 
              anuncio.fecha_vencimiento && 
              new Date(anuncio.fecha_vencimiento) < hoy) {
            
            // Actualizar estado en la base de datos
            const { error: updateError } = await supabase
              .from('anuncios')
              .update({ estado: 'vencido' })
              .eq('id', anuncio.id)

            if (!updateError) {
              console.log(`Anuncio ${anuncio.id} marcado como vencido automáticamente`)
              return { ...anuncio, estado: 'vencido' }
            }
          }
          return anuncio
        })
      )
      
      setAnuncios(anunciosProcesados || [])
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
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <p style={{ color: '#6b7280' }}>Verificando permisos...</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header - RESPONSIVE */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        borderBottom: '4px solid #db2777'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                Panel de Administrador
              </h1>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                marginTop: '0.25rem'
              }}>
                Bienvenido, {user?.email}
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              width: '100%'
            }}>
              <Link href="/" style={{ flex: 1 }}>
                <button style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  backgroundColor: 'transparent',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}>
                  Ver Sitio
                </button>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  backgroundColor: '#4b5563',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem',
        paddingTop: '1.5rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          padding: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <h2 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1f2937'
              }}>
                Gestión de Anuncios
              </h2>
              <Link href="/admin/nuevo-anuncio">
                <button style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#db2777',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span>+</span>
                  <span>Crear Anuncio</span>
                </button>
              </Link>
            </div>

            {/* Filtros - RESPONSIVE */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              width: '100%'
            }}>
              {['todos', 'pendiente', 'activo', 'vencido'].map((estado) => {
                const labels = {
                  'todos': `Todos (${anuncios.length})`,
                  'pendiente': 'Pendientes',
                  'activo': 'Activos',
                  'vencido': 'Vencidos'
                }
                const activeColors = {
                  'todos': { bg: '#db2777', color: 'white' },
                  'pendiente': { bg: '#d97706', color: 'white' },
                  'activo': { bg: '#059669', color: 'white' },
                  'vencido': { bg: '#dc2626', color: 'white' }
                }
                const inactiveColors = {
                  'todos': { bg: '#e5e7eb', color: '#374151' },
                  'pendiente': { bg: '#fef3c7', color: '#92400e' },
                  'activo': { bg: '#d1fae5', color: '#065f46' },
                  'vencido': { bg: '#fee2e2', color: '#991b1b' }
                }
                
                const isActive = filtroEstado === estado
                const style = isActive ? activeColors[estado] : inactiveColors[estado]
                
                return (
                  <button
                    key={estado}
                    onClick={() => setFiltroEstado(estado)}
                    style={{
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.5rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      backgroundColor: style.bg,
                      color: style.color,
                      border: 'none',
                      cursor: 'pointer',
                      flex: '1',
                      minWidth: '100px'
                    }}
                  >
                    {labels[estado]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tabla RESPONSIVE */}
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', minWidth: '800px' }}>
              <thead style={{ backgroundColor: '#f3f4f6' }}>
                <tr>
                  <th style={{ 
                    padding: '0.75rem 1rem', 
                    textAlign: 'left', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Título
                  </th>
                  <th style={{ 
                    padding: '0.75rem 1rem', 
                    textAlign: 'left', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Anunciante
                  </th>
                  <th style={{ 
                    padding: '0.75rem 1rem', 
                    textAlign: 'left', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Ubicación
                  </th>
                  <th style={{ 
                    padding: '0.75rem 1rem', 
                    textAlign: 'left', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Estado
                  </th>
                  <th style={{ 
                    padding: '0.75rem 1rem', 
                    textAlign: 'left', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Vencimiento
                  </th>
                  <th style={{ 
                    padding: '0.75rem 1rem', 
                    textAlign: 'left', 
                    fontSize: '0.75rem', 
                    fontWeight: '600',
                    color: '#374151'
                  }}>
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody style={{ borderTop: '1px solid #e5e7eb' }}>
                {anuncios.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ 
                      padding: '2rem 1rem', 
                      textAlign: 'center', 
                      color: '#6b7280',
                      fontSize: '0.875rem'
                    }}>
                      No hay anuncios para mostrar
                    </td>
                  </tr>
                ) : (
                  anuncios.map((anuncio) => {
                    const estaVencido = anuncio.fecha_vencimiento && 
                                      new Date(anuncio.fecha_vencimiento) < new Date()
                    
                    return (
                      <tr 
                        key={anuncio.id} 
                        style={{ 
                          borderBottom: '1px solid #e5e7eb',
                          backgroundColor: estaVencido && anuncio.estado === 'activo' ? '#fef2f2' : 'transparent'
                        }}
                      >
                        <td style={{ padding: '1rem' }}>
                          <p style={{ 
                            fontWeight: '500', 
                            color: '#1f2937',
                            marginBottom: '0.25rem'
                          }}>
                            {anuncio.titulo}
                          </p>
                          <p style={{ 
                            fontSize: '0.75rem', 
                            color: '#6b7280'
                          }}>
                            {anuncio.nombre}
                          </p>
                        </td>
                        <td style={{ 
                          padding: '1rem', 
                          fontSize: '0.875rem',
                          color: '#4b5563'
                        }}>
                          {anuncio.usuarios?.nombre || anuncio.usuarios?.email || 'Sin datos'}
                        </td>
                        <td style={{ 
                          padding: '1rem', 
                          fontSize: '0.875rem',
                          color: '#4b5563'
                        }}>
                          {anuncio.ciudad}, {anuncio.departamento}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <span style={{
                            padding: '0.25rem 0.5rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            backgroundColor: anuncio.estado === 'activo' ? '#d1fae5' :
                                          anuncio.estado === 'pendiente' ? '#fef3c7' :
                                          '#fee2e2',
                            color: anuncio.estado === 'activo' ? '#065f46' :
                                  anuncio.estado === 'pendiente' ? '#92400e' :
                                  '#991b1b'
                          }}>
                            {anuncio.estado}
                          </span>
                        </td>
                        <td style={{ 
                          padding: '1rem', 
                          fontSize: '0.875rem',
                          color: estaVencido ? '#dc2626' : '#4b5563',
                          fontWeight: estaVencido ? '600' : 'normal'
                        }}>
                          {anuncio.fecha_vencimiento ? 
                            new Date(anuncio.fecha_vencimiento).toLocaleDateString('es-PY') : 
                            '-'
                          }
                          {estaVencido && anuncio.estado === 'activo' && (
                            <span style={{
                              display: 'block',
                              fontSize: '0.75rem',
                              color: '#ef4444',
                              marginTop: '0.25rem'
                            }}>
                              ⚠️ Vencido
                            </span>
                          )}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                          }}>
                            <Link href={`/admin/nuevo-anuncio?id=${anuncio.id}`}>
                              <button style={{
                                padding: '0.25rem 0.75rem',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                borderRadius: '0.25rem',
                                border: 'none',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem'
                              }}>
                                <span>✏️</span>
                                <span>Editar</span>
                              </button>
                            </Link>
                            
                            {anuncio.estado === 'pendiente' && (
                              <button
                                onClick={() => cambiarEstado(anuncio.id, 'activo')}
                                style={{
                                  padding: '0.25rem 0.75rem',
                                  backgroundColor: '#10b981',
                                  color: 'white',
                                  borderRadius: '0.25rem',
                                  border: 'none',
                                  fontSize: '0.75rem',
                                  fontWeight: '500',
                                  cursor: 'pointer'
                                }}
                              >
                                Aprobar
                              </button>
                            )}
                            
                            {anuncio.estado === 'activo' && (
                              <button
                                onClick={() => cambiarEstado(anuncio.id, 'vencido')}
                                style={{
                                  padding: '0.25rem 0.75rem',
                                  backgroundColor: '#f59e0b',
                                  color: 'white',
                                  borderRadius: '0.25rem',
                                  border: 'none',
                                  fontSize: '0.75rem',
                                  fontWeight: '500',
                                  cursor: 'pointer'
                                }}
                              >
                                Vencer
                              </button>
                            )}
                            
                            <button
                              onClick={() => eliminarAnuncio(anuncio.id)}
                              style={{
                                padding: '0.25rem 0.75rem',
                                backgroundColor: '#ef4444',
                                color: 'white',
                                borderRadius: '0.25rem',
                                border: 'none',
                                fontSize: '0.75rem',
                                fontWeight: '500',
                                cursor: 'pointer'
                              }}
                            >
                              Eliminar
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info sobre vencimiento automático */}
        <div style={{
          backgroundColor: '#f0f9ff',
          border: '1px solid #bae6fd',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginTop: '1rem'
        }}>
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#0369a1',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>ℹ️</span>
            <span>
              <strong>Sistema de vencimiento automático:</strong> Los anuncios activos 
              cuya fecha de vencimiento ya pasó se marcan automáticamente como "vencidos". 
              Esto sucede cada vez que cargas esta página.
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}