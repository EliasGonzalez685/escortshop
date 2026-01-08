'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ContactoPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header Responsive */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            textAlign: 'center'
          }}>
            <Link href="/">
              <Image
                src="/logo_escorts.jpeg"
                alt="EscortShop"
                width={180}
                height={50}
                style={{ objectFit: 'contain', cursor: 'pointer' }}
              />
            </Link>
            
            <Link 
              href="/" 
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#db2777',
                color: 'white',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem',
        paddingTop: '2rem',
        paddingBottom: '2rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
          padding: '1.5rem',
          margin: '0 auto',
          maxWidth: '800px'
        }}>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Contacto
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#4b5563',
            marginBottom: '2rem',
            textAlign: 'center',
            lineHeight: '1.5'
          }}>
            Tienes alguna duda, consulta o deseas denunciar un anuncio? Estamos aquí para ayudarte.
          </p>

          {/* Contact Cards - Responsive Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {/* WhatsApp Card */}
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '2px solid #22c55e',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: '#22c55e',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '1.5rem'
              }}>
                💬
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '0.75rem'
              }}>
                WhatsApp
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#4b5563',
                marginBottom: '1rem',
                lineHeight: '1.4'
              }}>
                Contactanos directamente por WhatsApp para soporte inmediato
              </p>
              <Link
                href="https://wa.me/595992420313"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  width: '100%',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  fontWeight: '600',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  marginBottom: '0.75rem'
                }}
              >
                📱 Enviar mensaje
              </Link>
              <p style={{
                fontSize: '0.875rem',
                color: '#065f46',
                fontWeight: '600'
              }}>
                +595 992 420 313
              </p>
            </div>

            {/* Email Card */}
            <div style={{
              backgroundColor: '#eff6ff',
              border: '2px solid #3b82f6',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              textAlign: 'center'
            }}>
              <div style={{
                width: '3rem',
                height: '3rem',
                backgroundColor: '#3b82f6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                color: 'white',
                fontSize: '1.5rem'
              }}>
                📧
              </div>
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: 'bold',
                color: '#1f2937',
                marginBottom: '0.75rem'
              }}>
                Correo Electrónico
              </h3>
              <p style={{
                fontSize: '0.875rem',
                color: '#4b5563',
                marginBottom: '1rem',
                lineHeight: '1.4'
              }}>
                Envíanos un email y te responderemos a la brevedad
              </p>
              <Link
                href="mailto:escortshoppy@gmail.com"
                style={{
                  display: 'block',
                  width: '100%',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  fontWeight: '600',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  marginBottom: '0.75rem'
                }}
              >
                📨 Enviar email
              </Link>
              <p style={{
                fontSize: '0.875rem',
                color: '#1d4ed8',
                fontWeight: '600'
              }}>
                escortshoppy@gmail.com
              </p>
            </div>
          </div>

          {/* ✅ AÑADIDO: Contacto para sugerencias, quejas y otras cuestiones */}
          <div style={{
            backgroundColor: '#fef3c7',
            border: '1px solid #fbbf24',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              color: '#92400e',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}>
              <span>💬</span>
              <span>Sugerencias, Quejas y Otras Consultas</span>
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: '#92400e',
              lineHeight: '1.5',
              marginBottom: '1rem'
            }}>
              Para <strong>sugerencias</strong> sobre cómo mejorar la plataforma, 
              <strong> quejas</strong> sobre el servicio, o <strong>cualquier otra cuestión</strong> 
              que no esté cubierta abajo, puedes contactarnos directamente por los medios arriba indicados.
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: '#92400e'
            }}>
              <p>📞 <strong>WhatsApp:</strong> 0992420313</p>
              <p>📧 <strong>Email:</strong> escortshoppy@gmail.com</p>
            </div>
          </div>

          {/* Services Section */}
          <div style={{
            backgroundColor: '#f3f4f6',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>
              ¿En qué podemos ayudarte?
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#db2777', flexShrink: 0 }}>•</span>
                <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                  <strong>Soporte técnico:</strong> Problemas con la plataforma o tu cuenta
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#db2777', flexShrink: 0 }}>•</span>
                <span style={{ fontSize: '0.875', color: '#4b5563' }}>
                  <strong>Denuncias:</strong> Reportar anuncios fraudulentos o contenido inapropiado
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#db2777', flexShrink: 0 }}>•</span>
                <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                  <strong>Publicidad:</strong> Consultas sobre planes y tarifas de anuncios
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#db2777', flexShrink: 0 }}>•</span>
                <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                  <strong>Consultas generales:</strong> Cualquier pregunta sobre el funcionamiento
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem'
              }}>
                <span style={{ color: '#db2777', flexShrink: 0 }}>•</span>
                <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                  <strong>Problemas de pago:</strong> Inconvenientes con transacciones o renovaciones
                </span>
              </div>
            </div>
          </div>

          {/* Hours Info */}
          <div style={{
            backgroundColor: '#fef3c7',
            borderLeft: '4px solid #f59e0b',
            padding: '1rem',
            borderRadius: '0 0.5rem 0.5rem 0'
          }}>
            <p style={{
              fontSize: '0.875rem',
              color: '#92400e',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span>⏰</span>
              <span>
                <strong>Horario de atención:</strong> Lunes a Domingo de 9:00 AM a 10:00 PM (hora de Paraguay)
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '1.5rem 1rem',
        marginTop: '2rem'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <p style={{ fontSize: '0.75rem', lineHeight: '1.5' }}>
            © 2025 EscortShop Paraguay. Todos los derechos reservados. 
            <br />
            Sitio para mayores de 18 años.
          </p>
        </div>
      </footer>
    </div>
  )
}