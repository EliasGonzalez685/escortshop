'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function ContactoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                src="/logo_escorts.jpeg"
                alt="EscortShop"
                width={200}
                height={60}
                className="object-contain cursor-pointer"
              />
            </Link>
            
            <Link href="/" className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
              Volver al inicio
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            Contacto
          </h1>

          <p className="text-lg text-gray-700 mb-8 text-center">
            Tienes alguna duda, consulta o deseas denunciar un anuncio? Estamos aqui para ayudarte.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                WhatsApp
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                Contactanos directamente por WhatsApp para soporte inmediato
              </p>
              <Link
                href="https://wa.me/595992420313"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition text-center"
              >
                Enviar mensaje
              </Link>
              <p className="text-sm text-gray-500 mt-3 text-center">
                +595 992 420 313
              </p>
            </div>

            <div className="bg-blue-50 border-2 border-blue-500 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                Correo Electronico
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                Envianos un email y te responderemos a la brevedad
              </p>
              <Link
                href="mailto:escortshoppy@gmail.com"
                className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition text-center"
              >
                Enviar email
              </Link>
              <p className="text-sm text-gray-500 mt-3 text-center">
                escortshoppy@gmail.com
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              En que podemos ayudarte?
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>- Soporte tecnico: Problemas con la plataforma o tu cuenta</p>
              <p>- Denuncias: Reportar anuncios fraudulentos o contenido inapropiado</p>
              <p>- Publicidad: Consultas sobre planes y tarifas de anuncios</p>
              <p>- Consultas generales: Cualquier pregunta sobre el funcionamiento de EscortShop</p>
              <p>- Problemas de pago: Inconvenientes con transacciones o renovaciones</p>
            </div>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <p className="text-sm text-yellow-800">
              Horario de atencion: Lunes a Domingo de 9:00 AM a 10:00 PM (hora de Paraguay)
            </p>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            2025 EscortShop Paraguay. Todos los derechos reservados. Sitio para mayores de 18 años.
          </p>
        </div>
      </footer>
    </div>
  )
}