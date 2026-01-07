'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export default function CategoriaPage() {
    const params = useParams()
    const router = useRouter()
    const categoria = params.categoria

    const [anuncios, setAnuncios] = useState([])
    const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState('Todos')
    const [loading, setLoading] = useState(true)
    const [usuario, setUsuario] = useState(null)
    const [userRole, setUserRole] = useState(null)
    const [imageIndexes, setImageIndexes] = useState({})

    const departamentos = [
        'Todos',
        'Alto Paraguay', 'Alto Paraná', 'Amambay', 'Boquerón', 'Caaguazú',
        'Caazapá', 'Canindeyú', 'Central', 'Concepción', 'Cordillera',
        'Guairá', 'Itapúa', 'Misiones', 'Ñeembucú', 'Paraguarí',
        'Presidente Hayes', 'San Pedro'
    ]

    const categoriasConfig = {
        escorts: { emoji: '💃', nombre: 'Escorts', color: 'pink' },
        trans: { emoji: '🦋', nombre: 'Trans', color: 'purple' },
        gay: { emoji: '🌈', nombre: 'Gay', color: 'blue' },
        parejas: { emoji: '💑', nombre: 'Parejas', color: 'red' }
    }

    const config = categoriasConfig[categoria] || categoriasConfig.escorts

    useEffect(() => {
        verificarUsuario()
        cargarAnuncios()
    }, [categoria, departamentoSeleccionado])

    const verificarUsuario = async () => {
        const { data: { user } } = await supabase.auth.getUser()

        if (user) {
            setUsuario(user)

            const { data: userData } = await supabase
                .from('usuarios')
                .select('role')
                .eq('email', user.email)
                .single()

            if (userData) {
                setUserRole(userData.role)
            }
        }
    }

    const cargarAnuncios = async () => {
        setLoading(true)

        let query = supabase
            .from('anuncios')
            .select('*, imagenes_anuncios(*)')
            .eq('estado', 'activo')
            .eq('categoria', categoria)

        if (departamentoSeleccionado && departamentoSeleccionado !== 'Todos') {
            query = query.eq('departamento', departamentoSeleccionado)
        }

        const { data, error } = await query

        if (error) {
            console.error('❌ Error al cargar anuncios:', error)
            setAnuncios([])
        } else {
            setAnuncios(data || [])
            const indexes = {}
            data?.forEach(anuncio => {
                indexes[anuncio.id] = 0
            })
            setImageIndexes(indexes)
        }

        setLoading(false)
    }

    const cerrarSesion = async () => {
        await supabase.auth.signOut()
        setUsuario(null)
        setUserRole(null)
        router.refresh()
    }

    const cambiarImagen = (anuncioId, imagenes, direccion, e) => {
        e.preventDefault()
        e.stopPropagation()
        
        const currentIndex = imageIndexes[anuncioId] || 0
        let newIndex

        if (direccion === 'next') {
            newIndex = currentIndex === imagenes.length - 1 ? 0 : currentIndex + 1
        } else {
            newIndex = currentIndex === 0 ? imagenes.length - 1 : currentIndex - 1
        }

        setImageIndexes(prev => ({
            ...prev,
            [anuncioId]: newIndex
        }))
    }

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

                        <div className="flex flex-col items-end gap-2">
                            {usuario ? (
                                <>
                                    <p className="text-gray-600 text-sm font-medium">
                                        Bienvenido, {usuario.email}
                                    </p>
                                    <div className="flex gap-4">
                                        {userRole === 'admin' ? (
                                            <Link href="/admin">
                                                <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                                    Panel Admin
                                                </button>
                                            </Link>
                                        ) : (
                                            <Link href="/mis-anuncios">
                                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                                    Mis Anuncios
                                                </button>
                                            </Link>
                                        )}
                                        <button
                                            onClick={cerrarSesion}
                                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-600 text-sm font-medium">
                                        ¿Desea publicar un anuncio?
                                    </p>
                                    <div className="flex gap-4">
                                        <Link href="/login">
                                            <button className="px-4 py-2 text-gray-700 hover:text-pink-600">
                                                Iniciar Sesión
                                            </button>
                                        </Link>
                                        <Link href="/registro">
                                            <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700">
                                                Registrarse
                                            </button>
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className={`bg-gradient-to-r from-${config.color}-500 to-${config.color}-600 text-white py-8`}>
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <span className="text-6xl">{config.emoji}</span>
                            <div>
                                <h1 className="text-3xl font-bold">
                                    {config.nombre} en Paraguay - Todos los Departamentos
                                </h1>
                                <p className="text-lg opacity-90">
                                    {departamentoSeleccionado === 'Todos'
                                        ? 'Encuentra los mejores anuncios en todo Paraguay'
                                        : `Los mejores anuncios en ${departamentoSeleccionado}`
                                    }
                                </p>
                            </div>
                        </div>
                        <Link href="/">
                            <button className="bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100">
                                ← Volver al inicio
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-sm border-b">
                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📍 Selecciona un departamento
                            </label>
                            <select
                                value={departamentoSeleccionado}
                                onChange={(e) => setDepartamentoSeleccionado(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-lg"
                            >
                                {departamentos.map((dep) => (
                                    <option key={dep} value={dep}>
                                        {dep === 'Todos' ? '🌎 Todo Paraguay' : `📍 ${dep}`}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={cargarAnuncios}
                                className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 font-semibold text-lg"
                            >
                                🔍 Buscar Anuncios
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        <p>
                            💡 <strong>Tip:</strong> Los anuncios muestran todas las ciudades del departamento seleccionado.
                            No necesitas buscar ciudad por ciudad.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
                        <p className="text-gray-500">Cargando anuncios...</p>
                    </div>
                ) : anuncios.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">😔</div>
                        <p className="text-gray-500 text-lg">
                            No hay anuncios disponibles en {departamentoSeleccionado === 'Todos' ? 'Paraguay' : departamentoSeleccionado}
                        </p>
                        <p className="text-gray-400 mt-2">Intenta seleccionar otro departamento</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-gray-600 text-lg">
                                Se encontraron <strong className="text-pink-600 text-2xl">{anuncios.length}</strong> anuncios
                                {departamentoSeleccionado !== 'Todos' && (
                                    <span className="text-gray-500"> en {departamentoSeleccionado}</span>
                                )}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {anuncios.map((anuncio) => {
                                const imagenes = anuncio.imagenes_anuncios || []
                                const currentIndex = imageIndexes[anuncio.id] || 0
                                
                                return (
                                    <Link key={anuncio.id} href={`/anuncio/${anuncio.id}`}>
                                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                                            <div className="h-64 bg-gray-200 relative group">
                                                {imagenes.length > 0 ? (
                                                    <>
                                                        {imagenes[currentIndex].tipo === 'video' ? (
                                                            <div className="relative w-full h-full">
                                                                <video
                                                                    src={imagenes[currentIndex].url}
                                                                    className="w-full h-full object-cover"
                                                                    onClick={(e) => e.stopPropagation()}
                                                                />
                                                                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 pointer-events-none">
                                                                    <div className="bg-white bg-opacity-90 rounded-full p-4">
                                                                        <span className="text-pink-600 text-4xl">▶</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <Image
                                                                src={imagenes[currentIndex].url}
                                                                alt={anuncio.titulo}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        )}
                                                        
                                                        {imagenes.length > 1 && (
                                                            <>
                                                                <button
                                                                    onClick={(e) => cambiarImagen(anuncio.id, imagenes, 'prev', e)}
                                                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                                >
                                                                    ←
                                                                </button>

                                                                <button
                                                                    onClick={(e) => cambiarImagen(anuncio.id, imagenes, 'next', e)}
                                                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                                >
                                                                    →
                                                                </button>

                                                                <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                                                    {currentIndex + 1}/{imagenes.length}
                                                                </div>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <div className="text-center">
                                                            <div className="text-4xl mb-2">📸</div>
                                                            <p>Sin imagen</p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="absolute top-2 right-2 bg-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                                                    {config.emoji} {config.nombre}
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
                                                    {anuncio.titulo}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-2 font-medium">{anuncio.nombre}</p>

                                                {anuncio.edad && (
                                                    <p className="text-sm text-gray-500 mb-2">🎂 {anuncio.edad} años</p>
                                                )}

                                                <p className="text-sm text-pink-600 font-semibold mb-3">
                                                    📍 {anuncio.ciudad}, {anuncio.departamento}
                                                </p>

                                                <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 font-semibold transition">
                                                    Ver Detalles →
                                                </button>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}