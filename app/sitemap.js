// app/sitemap.js
export default async function sitemap() {
  const baseUrl = 'https://escortshoppy.com';
  const currentDate = new Date().toISOString();
  
  const departamentos = [
    'Alto Paraguay',
    'Alto Paraná', 
    'Amambay',
    'Boquerón',
    'Caaguazú',
    'Caazapá',
    'Canindeyú',
    'Central',
    'Concepción',
    'Cordillera',
    'Guairá',
    'Itapúa',
    'Misiones',
    'Ñeembucú',
    'Paraguarí',
    'Presidente Hayes',
    'San Pedro'
  ];

  // Ciudades PRINCIPALES para SEO (las más buscadas)
  const ciudadesPrincipales = {
    'Central': ['Asunción', 'Luque', 'Fernando de la Mora', 'San Lorenzo', 'Lambaré', 'Capiatá'],
    'Alto Paraná': ['Ciudad del Este', 'Hernandarias', 'Presidente Franco'],
    'Itapúa': ['Encarnación', 'Cambyretá', 'Fram'],
    'Caaguazú': ['Coronel Oviedo'],
    'Amambay': ['Pedro Juan Caballero'],
    'Canindeyú': ['Salto del Guairá', 'Katueté'],
    'Guairá': ['Villarrica'],
    'Concepción': ['Concepción'],
    'San Pedro': ['San Pedro'],
  };
  
  const categorias = ['escorts', 'trans', 'gay', 'parejas'];
  
  const paginasEstaticas = [
    { url: 'login', priority: 0.3 },
    { url: 'registro', priority: 0.4 },
    { url: 'terminos', priority: 0.3 },
    { url: 'contacto', priority: 0.5 },
    { url: 'mis-anuncios', priority: 0.4 },
  ];

  const urls = [];

  // ===== PÁGINA PRINCIPAL (máxima prioridad) =====
  urls.push({
    url: baseUrl,
    lastModified: currentDate,
    changeFrequency: 'daily',
    priority: 1.0,
  });

  // ===== CATEGORÍAS PRINCIPALES (muy importante) =====
  categorias.forEach(categoria => {
    urls.push({
      url: `${baseUrl}/${categoria}`,
      lastModified: currentDate,
      changeFrequency: 'hourly', // Cambiado a hourly porque se actualizan constantemente
      priority: 0.9,
    });
  });

  // ===== PÁGINAS ESTÁTICAS =====
  paginasEstaticas.forEach(({ url, priority }) => {
    urls.push({
      url: `${baseUrl}/${url}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: priority,
    });
  });

  // ===== URLs POR DEPARTAMENTO (importante para SEO local) =====
  categorias.forEach(categoria => {
    departamentos.forEach(departamento => {
      urls.push({
        url: `${baseUrl}/${categoria}/${encodeURIComponent(departamento.toLowerCase().replace(/\s+/g, '-'))}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.8, // Alta prioridad para departamentos
      });
    });
  });

  // ===== URLs POR CIUDAD PRINCIPAL (SÚPER IMPORTANTE PARA SEO) =====
  categorias.forEach(categoria => {
    Object.entries(ciudadesPrincipales).forEach(([departamento, ciudades]) => {
      ciudades.forEach(ciudad => {
        const deptoSlug = departamento.toLowerCase().replace(/\s+/g, '-');
        const ciudadSlug = ciudad.toLowerCase().replace(/\s+/g, '-');
        
        urls.push({
          url: `${baseUrl}/${categoria}/${deptoSlug}/${ciudadSlug}`,
          lastModified: currentDate,
          changeFrequency: 'daily',
          priority: 0.85, // MUY alta prioridad porque son búsquedas específicas
        });
      });
    });
  });

  // ===== ANUNCIOS INDIVIDUALES (si tienes rutas /anuncio/[id]) =====
  // Si necesitas agregar anuncios específicos, descomenta esto:
  /*
  try {
    const { data: anuncios } = await supabase
      .from('anuncios')
      .select('id, updated_at')
      .eq('estado', 'activo')
      .limit(1000);
    
    if (anuncios) {
      anuncios.forEach(anuncio => {
        urls.push({
          url: `${baseUrl}/anuncio/${anuncio.id}`,
          lastModified: anuncio.updated_at || currentDate,
          changeFrequency: 'weekly',
          priority: 0.7,
        });
      });
    }
  } catch (error) {
    console.error('Error cargando anuncios para sitemap:', error);
  }
  */

  return urls;
}