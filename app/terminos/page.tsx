'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function TerminosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            
            <Link href="/">
              <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                ← Volver al inicio
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Contenido */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center">
            📋 Términos y Condiciones de Uso
          </h1>

          <div className="prose max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">
              Última actualización: Enero 2025
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-sm font-semibold">
                ⚠️ IMPORTANTE: Al acceder y utilizar EscortShop Paraguay, usted acepta estar vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">1. Aceptación de los Términos</h2>
              <p>
                Este Acuerdo de Uso ("Acuerdo") se celebra entre usted ("Usuario") y EscortShop Paraguay ("Empresa", "nosotros" o "EscortShop"). 
                Al acceder, navegar o utilizar nuestro sitio web, usted reconoce que ha leído, entendido y acepta estar legalmente obligado 
                por todos los términos y condiciones establecidos en este documento.
              </p>
              <p className="mt-2">
                El uso continuado del sitio web indica su voluntad de cumplir con estos términos. Si no acepta estos términos, 
                debe abandonar el sitio inmediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">2. Descripción del Servicio</h2>
              <p>
                EscortShop es una plataforma de anuncios clasificados para adultos en Paraguay. Actuamos únicamente 
                como intermediarios, proporcionando un espacio digital donde los anunciantes independientes pueden publicar 
                sus servicios de acompañamiento de forma autónoma.
              </p>
              <p className="mt-2 font-semibold">
                EscortShop NO proporciona servicios de acompañamiento. Somos una plataforma de publicidad, no un proveedor de servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">3. Restricción de Edad y Elegibilidad</h2>
              <p>
                Este sitio web está destinado exclusivamente para personas <strong>mayores de 18 años</strong>. 
                Al utilizar EscortShop, usted declara y garantiza que:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Tiene al menos 18 años de edad</li>
                <li>Tiene la capacidad legal para celebrar contratos vinculantes</li>
                <li>El acceso y visualización de contenido para adultos es legal en su jurisdicción</li>
                <li>No está prohibido por ley utilizar este tipo de servicios</li>
              </ul>
              <p className="mt-2 font-semibold text-red-600">
                El acceso de menores de edad está estrictamente prohibido. No recopilamos intencionalmente información de menores de 18 años.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">4. Registro y Cuenta de Usuario</h2>
              <p>
                Para publicar anuncios, debe registrar una cuenta en EscortShop. Al registrarse, usted acepta:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Proporcionar información verdadera, precisa y actualizada</li>
                <li>Mantener la confidencialidad de su contraseña y credenciales de acceso</li>
                <li>Ser responsable de todas las actividades realizadas desde su cuenta</li>
                <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta</li>
                <li>Actualizar su información de registro cuando sea necesario</li>
              </ul>
              <p className="mt-2">
                EscortShop no será responsable de pérdidas derivadas del uso no autorizado de su cuenta antes de que nos notifique.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">5. Responsabilidad del Usuario y los Anunciantes</h2>
              <p>
                Los usuarios y anunciantes son completamente responsables de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>La veracidad, exactitud y legalidad del contenido que publican</li>
                <li>Verificar que su contenido no viole derechos de terceros</li>
                <li>Asegurar que todas las personas en fotografías/videos sean mayores de 18 años</li>
                <li>Mantener registros que demuestren el cumplimiento de las leyes aplicables</li>
                <li>Cualquier acuerdo, transacción o encuentro con otros usuarios</li>
                <li>Su propia seguridad al interactuar con otros usuarios</li>
              </ul>
              <p className="mt-2 font-semibold">
                EscortShop NO verifica la identidad de los anunciantes, la veracidad de sus anuncios, ni la calidad o legalidad de los servicios ofrecidos.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">6. Contenido Prohibido</h2>
              <p>
                Está estrictamente prohibido publicar anuncios o contenido que:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Involucre o sugiera la participación de menores de edad en cualquier forma</li>
                <li>Promueva explícitamente servicios sexuales o prostitución (servicios de acompañamiento únicamente)</li>
                <li>Contenga información falsa, engañosa o fraudulenta</li>
                <li>Viole derechos de autor, marcas registradas o propiedad intelectual de terceros</li>
                <li>Incluya contenido violento, discriminatorio, racista, xenófobo u ofensivo</li>
                <li>Promueva actividades ilegales o tráfico de personas</li>
                <li>Contenga virus, malware o código malicioso</li>
                <li>Constituya spam, publicidad no autorizada o esquemas piramidales</li>
                <li>Incluya datos personales de terceros sin su consentimiento</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">7. Derechos de Propiedad Intelectual</h2>
              <p>
                El diseño, logotipos, código fuente y estructura del sitio web están protegidos por derechos de autor y son propiedad 
                exclusiva de EscortShop. Al publicar contenido en nuestra plataforma, usted:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Conserva todos los derechos de propiedad sobre su contenido</li>
                <li>Otorga a EscortShop una licencia no exclusiva, mundial y gratuita para usar, mostrar y distribuir su contenido en la plataforma</li>
                <li>Garantiza que tiene todos los derechos necesarios sobre el contenido publicado</li>
                <li>Acepta que podemos usar su contenido para promocionar nuestros servicios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">8. Moderación y Eliminación de Contenido</h2>
              <p>
                EscortShop se reserva el derecho exclusivo e irrevocable de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Revisar, aprobar, rechazar o eliminar cualquier anuncio o contenido</li>
                <li>Suspender o cancelar cuentas de usuario sin previo aviso</li>
                <li>Modificar o eliminar contenido que consideremos inapropiado o ilegal</li>
                <li>Reportar actividades sospechosas o ilegales a las autoridades competentes</li>
                <li>Negarnos a prestar servicios a cualquier persona o entidad</li>
              </ul>
              <p className="mt-2 font-semibold">
                No estamos obligados a proporcionar explicaciones ni reembolsos por contenido eliminado o cuentas canceladas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">9. Conducta del Usuario</h2>
              <p>
                Al utilizar EscortShop, el usuario se compromete a NO:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Intentar acceder a áreas restringidas del sitio o cuentas de otros usuarios</li>
                <li>Usar herramientas automatizadas (bots, scrapers) para extraer información</li>
                <li>Interferir con el funcionamiento normal de la plataforma</li>
                <li>Realizar ingeniería inversa del código del sitio</li>
                <li>Enviar spam o mensajes no solicitados a otros usuarios</li>
                <li>Hacerse pasar por otra persona o entidad</li>
                <li>Acosar, amenazar o intimidar a otros usuarios</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">10. Pagos y Reembolsos</h2>
              <p>
                Los anunciantes que contraten servicios premium o destacados aceptan que:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Los pagos son procesados por terceros (Bancard, Zimple, etc.)</li>
                <li>Los reembolsos solo se otorgan si el servicio contratado no fue activado dentro de las 24 horas</li>
                <li>No hay reembolsos por cancelaciones voluntarias o eliminación de contenido por violar estos términos</li>
                <li>Los precios pueden cambiar sin previo aviso</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">11. Limitación de Responsabilidad</h2>
              <p className="font-semibold">
                EscortShop NO se hace responsable de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>La veracidad, exactitud o legalidad de los anuncios publicados</li>
                <li>La calidad, seguridad o legalidad de los servicios anunciados</li>
                <li>Daños, pérdidas, robos o perjuicios derivados del uso de la plataforma</li>
                <li>Disputas, conflictos o transacciones entre usuarios y anunciantes</li>
                <li>Pérdida de datos, interrupciones del servicio o errores técnicos</li>
                <li>Contenido publicado por terceros o enlaces externos</li>
                <li>Cualquier daño indirecto, incidental o consecuente</li>
              </ul>
              <p className="mt-2">
                El sitio web se proporciona "TAL CUAL" sin garantías de ningún tipo, expresas o implícitas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">12. Indemnización</h2>
              <p>
                El usuario acepta indemnizar, defender y mantener indemne a EscortShop, sus directores, empleados y afiliados 
                de cualquier reclamo, pérdida, daño, responsabilidad o gasto (incluidos honorarios legales) que surja de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Su uso del sitio web</li>
                <li>Violación de estos términos y condiciones</li>
                <li>Violación de derechos de terceros</li>
                <li>Contenido que usted publique en la plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">13. Enlaces a Sitios de Terceros</h2>
              <p>
                EscortShop puede contener enlaces a sitios web de terceros para su conveniencia. No controlamos ni respaldamos 
                estos sitios externos y no somos responsables de su contenido, políticas de privacidad o prácticas.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">14. Modificaciones del Servicio y los Términos</h2>
              <p>
                Nos reservamos el derecho de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Modificar, suspender o discontinuar cualquier aspecto del sitio web en cualquier momento</li>
                <li>Actualizar estos términos y condiciones sin previo aviso</li>
                <li>Cambiar precios, características o funcionalidades</li>
              </ul>
              <p className="mt-2">
                Los cambios entran en vigor inmediatamente después de su publicación. Su uso continuado del sitio constituye 
                aceptación de los términos modificados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">15. Terminación de Cuenta</h2>
              <p>
                Usted puede cancelar su cuenta en cualquier momento contactándonos. EscortShop puede suspender o cancelar 
                su cuenta inmediatamente, con o sin causa, si:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Viola estos términos y condiciones</li>
                <li>Participa en actividades fraudulentas o ilegales</li>
                <li>No paga las tarifas acordadas</li>
                <li>A nuestra discreción, consideramos que su uso es perjudicial</li>
              </ul>
              <p className="mt-2">
                Tras la terminación, perderá acceso a su cuenta y todo el contenido asociado. No estamos obligados a 
                conservar o proporcionar copias de su contenido.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">16. Ley Aplicable y Jurisdicción</h2>
              <p>
                Estos términos se regirán e interpretarán de acuerdo con las leyes de la República del Paraguay. 
                Cualquier disputa relacionada con estos términos estará sujeta a la jurisdicción exclusiva de los 
                tribunales competentes de Paraguay.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">17. Resolución de Disputas</h2>
              <p>
                En caso de controversia, las partes acuerdan intentar resolver la disputa mediante negociación de buena fe. 
                Si no se alcanza un acuerdo, la disputa se someterá a mediación antes de iniciar cualquier acción legal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">18. Divisibilidad</h2>
              <p>
                Si alguna disposición de estos términos se considera inválida o inaplicable por un tribunal competente, 
                las demás disposiciones permanecerán en pleno vigor y efecto.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">19. Acuerdo Completo</h2>
              <p>
                Estos términos y condiciones, junto con nuestra Política de Privacidad, constituyen el acuerdo completo 
                entre usted y EscortShop con respecto al uso del sitio web.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">20. Contacto</h2>
              <p>
                Si tiene preguntas sobre estos Términos y Condiciones, puede contactarnos:
              </p>
              <ul className="list-none space-y-2 mt-3">
                <li>📧 Email: <a href="mailto:escortshoppy@gmail.com" className="text-pink-600 hover:underline">escortshoppy@gmail.com</a></li>
                <li>💬 WhatsApp: <a href="https://wa.me/595992420313" className="text-pink-600 hover:underline">+595 992 420 313</a></li>
              </ul>
            </section>

            <div className="bg-pink-50 border-l-4 border-pink-500 p-4 mt-8">
              <p className="text-sm font-semibold">
                ✅ Al utilizar EscortShop Paraguay, usted confirma que ha leído, comprendido y aceptado estos Términos y Condiciones en su totalidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 EscortShop Paraguay. Todos los derechos reservados. | Sitio para mayores de 18 años.
          </p>
        </div>
      </footer>
    </div>
  )
}