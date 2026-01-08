// app/sitemap.js
export default async function sitemap() {
  const baseUrl = 'https://escortshoppy.com';
  const currentDate = new Date();
  
  // Lista COMPLETA de departamentos de Paraguay (17 departamentos)
  const departamentos = [
    { slug: 'alto-paraguay', nombre: 'Alto Paraguay' },
    { slug: 'alto-paraná', nombre: 'Alto Paraná' },
    { slug: 'amambay', nombre: 'Amambay' },
    { slug: 'boquerón', nombre: 'Boquerón' },
    { slug: 'caaguazú', nombre: 'Caaguazú' },
    { slug: 'caazapá', nombre: 'Caazapá' },
    { slug: 'canindeyú', nombre: 'Canindeyú' },
    { slug: 'central', nombre: 'Central' },
    { slug: 'concepción', nombre: 'Concepción' },
    { slug: 'cordillera', nombre: 'Cordillera' },
    { slug: 'guairá', nombre: 'Guairá' },
    { slug: 'itapúa', nombre: 'Itapúa' },
    { slug: 'misiones', nombre: 'Misiones' },
    { slug: 'ñeembucú', nombre: 'Ñeembucú' },
    { slug: 'paraguarí', nombre: 'Paraguarí' },
    { slug: 'presidente-hayes', nombre: 'Presidente Hayes' },
    { slug: 'san-pedro', nombre: 'San Pedro' }
  ];
  
  // Categorías principales de tu sitio
  const categorias = [
    { slug: 'escorts', nombre: 'Escorts' },
    { slug: 'trans', nombre: 'Trans' },
    { slug: 'gay', nombre: 'Gay' },
    { slug: 'parejas', nombre: 'Parejas' }
  ];
  
  // Páginas estáticas importantes
  const paginasEstaticas = [
    { slug: 'login', nombre: 'Iniciar Sesión' },
    { slug: 'registro', nombre: 'Registrarse' },
    { slug: 'mis-anuncios', nombre: 'Mis Anuncios' },
    { slug: 'nuevo-anuncio', nombre: 'Nuevo Anuncio' },
    { slug: 'terminos', nombre: 'Términos y Condiciones' },
    { slug: 'contacto', nombre: 'Contacto' },
    { slug: 'admin', nombre: 'Panel de Administración' }
  ];

  // 1. PÁGINA PRINCIPAL
  const urls = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    }
  ];

  // 2. CATEGORÍAS PRINCIPALES
  categorias.forEach(categoria => {
    urls.push({
      url: `${baseUrl}/${categoria.slug}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    });
  });

  // 3. PÁGINAS ESTÁTICAS
  paginasEstaticas.forEach(pagina => {
    urls.push({
      url: `${baseUrl}/${pagina.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    });
  });

  // 4. PÁGINA DE DEPARTAMENTOS (si la creas)
  urls.push({
    url: `${baseUrl}/departamentos`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  // 5. URLs POR DEPARTAMENTO Y CATEGORÍA (LAS MÁS IMPORTANTES PARA SEO)
  categorias.forEach(categoria => {
    departamentos.forEach(departamento => {
      urls.push({
        url: `${baseUrl}/${categoria.slug}?departamento=${departamento.slug}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.7,
      });
    });
  });

  // 6. URLs ESPECIALES PARA CIUDADES IMPORTANTES
  const ciudadesImportantes = [
    { slug: 'ciudad-del-este', nombre: 'Ciudad del Este', departamento: 'alto-paraná' },
    { slug: 'encarnación', nombre: 'Encarnación', departamento: 'itapúa' },
    { slug: 'coronel-oviedo', nombre: 'Coronel Oviedo', departamento: 'caaguazú' },
    { slug: 'pedro-juan-caballero', nombre: 'Pedro Juan Caballero', departamento: 'amambay' },
    { slug: 'salto-del-guairá', nombre: 'Salto del Guairá', departamento: 'canindeyú' },
    { slug: 'villlarrica', nombre: 'Villarrica', departamento: 'guairá' },
    { slug: 'caacupé', nombre: 'Caacupé', departamento: 'cordillera' },
    { slug: 'pilar', nombre: 'Pilar', departamento: 'ñeembucú' },
    { slug: 'concepción', nombre: 'Concepción', departamento: 'concepción' },
    { slug: 'villa-hayes', nombre: 'Villa Hayes', departamento: 'presidente-hayes' },
    { slug: 'paraguarí', nombre: 'Paraguarí', departamento: 'paraguarí' },
    { slug: 'san-juan-bautista', nombre: 'San Juan Bautista', departamento: 'misiones' },
    { slug: 'filadelfia', nombre: 'Filadelfia', departamento: 'boquerón' },
    { slug: 'fuerte-olimpo', nombre: 'Fuerte Olimpo', departamento: 'alto-paraguay' },
    { slug: 'san-pedro', nombre: 'San Pedro del Ycuamandiyú', departamento: 'san-pedro' },
    { slug: 'caazapá', nombre: 'Caazapá', departamento: 'caazapá' }
  ];

  categorias.forEach(categoria => {
    ciudadesImportantes.forEach(ciudad => {
      urls.push({
        url: `${baseUrl}/${categoria.slug}?departamento=${ciudad.departamento}&ciudad=${ciudad.slug}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.6,
      });
    });
  });

  // 7. URLs PARA CAPITAL (ASUNCIÓN) - ESPECIAL
  categorias.forEach(categoria => {
    urls.push({
      url: `${baseUrl}/${categoria.slug}?departamento=central&ciudad=asunción`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.8,
    });
  });

  // 8. URLs PARA "TODO PARAGUAY" (sin filtros)
  categorias.forEach(categoria => {
    urls.push({
      url: `${baseUrl}/${categoria.slug}?departamento=todo-paraguay`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.7,
    });
  });

  return urls;
}

// También puedes exportar una función para generar robots.txt si quieres
export async function generateRobotsTxt() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: 'https://escortshoppy.com/sitemap.xml',
    host: 'https://escortshoppy.com',
  };
}