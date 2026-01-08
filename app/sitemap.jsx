// app/sitemap.js
export default async function sitemap() {
  const baseUrl = 'https://escortshoppy.com';
  const currentDate = new Date().toISOString();
  
  // Departamentos SIN ACENTOS en las URLs (usa slugs sin acentos)
  const departamentos = [
    'alto-paraguay',
    'alto-parana',           // Cambiado: alto-paraná -> alto-parana
    'amambay', 
    'boqueron',              // Cambiado: boquerón -> boqueron
    'caaguazu',              // Cambiado: caaguazú -> caaguazu
    'caazapa',               // Cambiado: caazapá -> caazapa
    'canindeyu',             // Cambiado: canindeyú -> canindeyu
    'central',
    'concepcion',            // Cambiado: concepción -> concepcion
    'cordillera',
    'guaira',                // Cambiado: guairá -> guaira
    'itapua',                // Cambiado: itapúa -> itapua
    'misiones',
    'neembucu',              // Cambiado: ñeembucú -> neembucu
    'paraguari',             // Cambiado: paraguarí -> paraguari
    'presidente-hayes',
    'san-pedro'
  ];
  
  const categorias = ['escorts', 'trans', 'gay', 'parejas'];
  
  const paginasEstaticas = [
    'login',
    'registro',
    'mis-anuncios',
    'nuevo-anuncio',
    'terminos',
    'contacto',
    'admin'
  ];

  // Función para ESCAPAR URLs correctamente
  const escapeUrl = (url) => {
    return url
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u')
      .replace(/ñ/g, 'n')
      .replace(/Á/g, 'A')
      .replace(/É/g, 'E')
      .replace(/Í/g, 'I')
      .replace(/Ó/g, 'O')
      .replace(/Ú/g, 'U')
      .replace(/Ñ/g, 'N');
  };

  const urls = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    }
  ];

  // Categorías principales
  categorias.forEach(categoria => {
    urls.push({
      url: `${baseUrl}/${categoria}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  // Páginas estáticas
  paginasEstaticas.forEach(pagina => {
    urls.push({
      url: `${baseUrl}/${pagina}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // Página de departamentos
  urls.push({
    url: `${baseUrl}/departamentos`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  // URLs por departamento y categoría (ESCAPADAS)
  categorias.forEach(categoria => {
    departamentos.forEach(departamento => {
      const urlEscapada = escapeUrl(`${baseUrl}/${categoria}?departamento=${departamento}`);
      urls.push({
        url: urlEscapada,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.7,
      });
    });
  });

  // URLs para ciudades importantes
  const ciudadesImportantes = [
    { slug: 'ciudad-del-este', departamento: 'alto-parana' },
    { slug: 'encarnacion', departamento: 'itapua' },
    { slug: 'coronel-oviedo', departamento: 'caaguazu' },
    { slug: 'pedro-juan-caballero', departamento: 'amambay' },
    { slug: 'salto-del-guaira', departamento: 'canindeyu' },
    { slug: 'villlarrica', departamento: 'guaira' },
    { slug: 'caacupe', departamento: 'cordillera' },
    { slug: 'pilar', departamento: 'neembucu' },
    { slug: 'concepcion', departamento: 'concepcion' },
    { slug: 'villa-hayes', departamento: 'presidente-hayes' },
    { slug: 'paraguari', departamento: 'paraguari' },
    { slug: 'san-juan-bautista', departamento: 'misiones' },
    { slug: 'filadelfia', departamento: 'boqueron' },
    { slug: 'fuerte-olimpo', departamento: 'alto-paraguay' },
    { slug: 'san-pedro', departamento: 'san-pedro' },
    { slug: 'caazapa', departamento: 'caazapa' }
  ];

  categorias.forEach(categoria => {
    ciudadesImportantes.forEach(ciudad => {
      const urlEscapada = escapeUrl(
        `${baseUrl}/${categoria}?departamento=${ciudad.departamento}&ciudad=${ciudad.slug}`
      );
      urls.push({
        url: urlEscapada,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.6,
      });
    });
  });

  // URLs para "TODO PARAGUAY"
  categorias.forEach(categoria => {
    urls.push({
      url: `${baseUrl}/${categoria}?departamento=todo-paraguay`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.7,
    });
  });

  return urls;
}