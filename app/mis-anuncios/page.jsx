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
  
  // Estados para el reporte (LO MANTENGO POR SI ACASO, PERO NO SE USA)
  const [numeroReportado, setNumeroReportado] = useState('')
  const [tipoProblema, setTipoProblema] = useState('')
  const [descripcionProblema, setDescripcionProblema] = useState('')
  const [enviandoReporte, setEnviandoReporte] = useState(false)

  // ✅ DATOS CORREGIDOS PERO SIMPLES:
  const ADMIN_WHATSAPP = '595992420313'  // 0992420313
  const ADMIN_EMAIL = 'escortshoppy@gmail.com'

  useEffect(() => {
    verificarUsuario()
  }, [])

  const verificarUsuario = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

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

  // ✅ FUNCIÓN SIMPLIFICADA - SOLO GUARDA EN BD (como antes)
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
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '1rem'
      }}>
        <p style={{ color: '#6b7280' }}>Cargando...</p>
      </div>
    )
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
          padding: '1rem',
          paddingLeft: '1rem',
          paddingRight: '1rem'
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
                color: '#1f2937',
                marginBottom: '0.25rem'
              }}>
                Panel de Anunciante
              </h1>
              <p style={{ 
                fontSize: '0.875rem', 
                color: '#4b5563',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '200px'
              }}>
                Bienvenido, {usuario?.nombre || usuario?.email}
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              width: '100%'
            }}>
              <button
                onClick={() => router.push('/')}
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  backgroundColor: 'transparent',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.color = '#db2777'}
                onMouseOut={(e) => e.target.style.color = '#374151'}
              >
                Ver Sitio
              </button>
              <button
                onClick={cerrarSesion}
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  backgroundColor: '#4b5563',
                  color: 'white',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#374151'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#4b5563'}
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
        paddingTop: '1.5rem',
        paddingBottom: '1.5rem'
      }}>
        {/* Estadísticas - RESPONSIVE */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Anuncios Activos
            </h3>
            <p style={{ 
              fontSize: '2.25rem', 
              fontWeight: 'bold', 
              color: '#059669'
            }}>
              {anunciosActivos}
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Pendientes de Aprobación
            </h3>
            <p style={{ 
              fontSize: '2.25rem', 
              fontWeight: 'bold', 
              color: '#d97706'
            }}>
              {anunciosPendientes}
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            padding: '1.5rem', 
            borderRadius: '0.5rem',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
          }}>
            <h3 style={{ 
              fontSize: '0.875rem', 
              color: '#6b7280', 
              fontWeight: '500',
              marginBottom: '0.5rem'
            }}>
              Próximo Vencimiento
            </h3>
            <p style={{ 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              color: '#dc2626'
            }}>
              {proximoVencimiento 
                ? new Date(proximoVencimiento.fecha_vencimiento).toLocaleDateString('es-PY')
                : 'N/A'
              }
            </p>
          </div>
        </div>

        {/* Contacto para Publicar - RESPONSIVE Y SIMPLE */}
        <div style={{ 
          background: 'linear-gradient(to right, #db2777, #7c3aed)',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          marginBottom: '2rem',
          color: 'white'
        }}>
          <h2 style={{ 
            fontSize: '1.25rem', 
            fontWeight: 'bold', 
            marginBottom: '0.75rem'
          }}>
            📢 ¿Quieres publicar un anuncio?
          </h2>
          <p style={{ 
            fontSize: '0.875rem', 
            marginBottom: '1rem',
            opacity: '0.9'
          }}>
            Contacta al administrador para solicitar la publicación de tu anuncio.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <a
              href={`https://wa.me/${ADMIN_WHATSAPP}?text=Hola,%20quiero%20publicar%20un%20anuncio%20en%20EscortShop`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#10b981',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                textDecoration: 'none',
                fontSize: '0.875rem'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
            >
              <span style={{ fontSize: '1.125rem' }}>📱</span>
              <span>0992420313 (WhatsApp)</span>
            </a>
            <a
              href={`mailto:${ADMIN_EMAIL}?subject=Solicitud de Publicación`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                textDecoration: 'none',
                fontSize: '0.875rem'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              <span style={{ fontSize: '1.125rem' }}>📧</span>
              <span>{ADMIN_EMAIL}</span>
            </a>
          </div>
        </div>

        {/* Mis Anuncios - RESPONSIVE */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <h2 style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: '#1f2937'
            }}>
              Mis Anuncios
            </h2>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {['todos', 'pendiente', 'activo', 'vencido'].map((estado) => {
                const labels = {
                  'todos': `Todos (${anuncios.length})`,
                  'pendiente': 'Pendientes',
                  'activo': 'Activos',
                  'vencido': 'Vencidos'
                }
                const colors = {
                  'todos': { bg: '#e5e7eb', color: '#374151', hover: '#d1d5db' },
                  'pendiente': { bg: '#fef3c7', color: '#92400e', hover: '#fde68a' },
                  'activo': { bg: '#d1fae5', color: '#065f46', hover: '#a7f3d0' },
                  'vencido': { bg: '#fee2e2', color: '#991b1b', hover: '#fecaca' }
                }
                const activeColors = {
                  'todos': { bg: '#db2777', color: 'white' },
                  'pendiente': { bg: '#d97706', color: 'white' },
                  'activo': { bg: '#059669', color: 'white' },
                  'vencido': { bg: '#dc2626', color: 'white' }
                }
                
                const isActive = filtroEstado === estado
                const style = isActive ? activeColors[estado] : colors[estado]
                
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
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) e.target.style.backgroundColor = colors[estado].hover
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) e.target.style.backgroundColor = colors[estado].bg
                    }}
                  >
                    {labels[estado]}
                  </button>
                )
              })}
            </div>
          </div>

          {loading ? (
            <p style={{ 
              textAlign: 'center', 
              color: '#6b7280', 
              padding: '2rem',
              fontSize: '0.875rem'
            }}>
              Cargando anuncios...
            </p>
          ) : anuncios.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: '#6b7280', marginBottom: '0.5rem' }}>
                No tienes anuncios aún
              </p>
              <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                Contacta al administrador para publicar tu primer anuncio
              </p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '1rem'
            }}>
              {anuncios.map((anuncio) => (
                <div 
                  key={anuncio.id} 
                  style={{ 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    backgroundColor: 'white'
                  }}
                >
                  {/* Imagen principal */}
                  <div style={{ height: '12rem', backgroundColor: '#e5e7eb', position: 'relative' }}>
                    {anuncio.imagenes_anuncios && anuncio.imagenes_anuncios.length > 0 ? (
                      <Image
                        src={anuncio.imagenes_anuncios[0].url}
                        alt={anuncio.titulo}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="100vw"
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#9ca3af',
                        fontSize: '0.875rem'
                      }}>
                        Sin imagen
                      </div>
                    )}
                    {/* Badge de estado */}
                    <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                      <span style={{
                        padding: '0.25rem 0.5rem',
                        borderRadius: '9999px',
                        fontSize: '0.625rem',
                        fontWeight: 'bold',
                        backgroundColor: anuncio.estado === 'activo' ? '#10b981' : 
                                       anuncio.estado === 'pendiente' ? '#f59e0b' : '#ef4444',
                        color: 'white'
                      }}>
                        {anuncio.estado.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ 
                      fontSize: '1rem', 
                      fontWeight: 'bold', 
                      color: '#1f2937',
                      marginBottom: '0.5rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {anuncio.titulo}
                    </h3>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#4b5563',
                      marginBottom: '0.25rem'
                    }}>
                      {anuncio.nombre}
                    </p>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: '#6b7280',
                      marginBottom: '0.75rem'
                    }}>
                      {anuncio.ciudad}, {anuncio.departamento}
                    </p>
                    {anuncio.fecha_vencimiento && (
                      <p style={{ 
                        fontSize: '0.75rem', 
                        color: '#9ca3af',
                        borderTop: '1px solid #e5e7eb',
                        paddingTop: '0.75rem',
                        marginTop: '0.75rem'
                      }}>
                        Vence: {new Date(anuncio.fecha_vencimiento).toLocaleDateString('es-PY')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Contacto para Sugerencias/Quejas - SIMPLE */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '0.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          padding: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              borderRadius: '9999px',
              backgroundColor: '#fef3c7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '1.25rem', color: '#d97706' }}>💬</span>
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: '#1f2937'
              }}>
                Contacto
              </h2>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Sugerencias, dudas o quejas
              </p>
            </div>
          </div>
          
          <p style={{ 
            fontSize: '0.875rem', 
            color: '#4b5563',
            marginBottom: '1.5rem',
            lineHeight: '1.5'
          }}>
            Para cualquier consulta, sugerencia, duda o queja, puedes contactarnos directamente:
          </p>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <a
              href={`https://wa.me/${ADMIN_WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#f3f4f6',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: '#1f2937'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            >
              <span style={{ 
                width: '2rem', 
                height: '2rem', 
                borderRadius: '9999px',
                backgroundColor: '#10b981',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                📱
              </span>
              <div>
                <p style={{ fontWeight: '500', fontSize: '0.875rem' }}>WhatsApp</p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>0992420313</p>
              </div>
            </a>
            
            <a
              href={`mailto:${ADMIN_EMAIL}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                backgroundColor: '#f3f4f6',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                color: '#1f2937'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#e5e7eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            >
              <span style={{ 
                width: '2rem', 
                height: '2rem', 
                borderRadius: '9999px',
                backgroundColor: '#3b82f6',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                📧
              </span>
              <div>
                <p style={{ fontWeight: '500', fontSize: '0.875rem' }}>Email</p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{ADMIN_EMAIL}</p>
              </div>
            </a>
          </div>
          
          <div style={{
            marginTop: '1.5rem',
            padding: '0.75rem',
            backgroundColor: '#fef3c7',
            borderRadius: '0.5rem',
            border: '1px solid #fde68a'
          }}>
            <p style={{ 
              fontSize: '0.75rem', 
              color: '#92400e',
              textAlign: 'center'
            }}>
              ⏰ Horario de atención: Lunes a Viernes 9:00 - 18:00
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}